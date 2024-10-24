package compose

import (
	"context"
	"fmt"
	"github.com/compose-spec/compose-go/v2/cli"
	"github.com/compose-spec/compose-go/v2/types"
	"github.com/docker/go-units"
	"github.com/donknap/dpanel/common/accessor"
	"github.com/donknap/dpanel/common/function"
	"strconv"
	"strings"
)

func WithYamlPath(path string) cli.ProjectOptionsFn {
	return func(options *cli.ProjectOptions) error {
		options.ConfigPaths = append(options.ConfigPaths, path)
		return nil
	}
}

func NewCompose(opts ...cli.ProjectOptionsFn) (*Wrapper, error) {
	// 自定义解析
	opts = append(opts,
		cli.WithExtension(ExtensionName, Ext{}),
		cli.WithExtension(ExtensionServiceName, ExtService{}),
	)
	options, err := cli.NewProjectOptions(
		[]string{},
		opts...,
	)
	if err != nil {
		return nil, err
	}

	project, err := options.LoadProject(context.Background())
	if err != nil {
		return nil, err
	}
	wrapper := &Wrapper{
		Project: project,
	}
	return wrapper, nil
}

func NewComposeBySiteEnvMap(options map[string]accessor.SiteEnvOption) (*Wrapper, error) {
	arr := make([]accessor.SiteEnvOption, 0)
	for _, option := range options {
		arr = append(arr, option)
	}
	return NewComposeBySiteEnv(arr...)
}

func NewComposeBySiteEnv(options ...accessor.SiteEnvOption) (*Wrapper, error) {
	// 完全适配 compose spec 的参数
	project := types.Project{
		Services: map[string]types.ServiceConfig{},
		Networks: make(types.Networks),
		Volumes:  make(types.Volumes),
	}
	extProject := Ext{
		DisabledServices: make([]string, 0),
	}

	for _, siteOption := range options {
		service := types.ServiceConfig{
			Name:          siteOption.Name,
			Image:         siteOption.ImageName,
			ExternalLinks: make([]string, 0),
			Ports:         make([]types.ServicePortConfig, 0),
			Volumes:       make([]types.ServiceVolumeConfig, 0),
			Networks:      map[string]*types.ServiceNetworkConfig{},
			Privileged:    siteOption.Privileged,
			Restart:       siteOption.Restart,
			CPUS:          siteOption.Cpus,
			MemLimit:      types.UnitBytes(siteOption.Memory * 1024 * 1024),
			WorkingDir:    siteOption.WorkDir,
			User:          siteOption.User,
			//Command:       make(types.ShellCommand, 0),
			//Entrypoint:    make(types.ShellCommand, 0),
			LogDriver:  "",
			LogOpt:     make(map[string]string),
			DNS:        siteOption.Dns,
			Labels:     make(types.Labels),
			ExtraHosts: make(types.HostsList),
		}
		extService := ExtService{
			External: ExternalItem{
				VolumesFrom: make([]string, 0),
				Volumes:     make([]string, 0),
			},
			AutoRemove: siteOption.AutoRemove,
			Ports: PortsItem{
				BindIPV6:   siteOption.BindIpV6,
				PublishAll: siteOption.PublishAllPorts,
			},
		}

		if !function.IsEmptyArray(siteOption.Environment) {
			envList := make([]string, 0)
			for _, item := range siteOption.Environment {
				envList = append(envList, fmt.Sprintf("%s=%s", item.Name, item.Value))
			}
			service.Environment = types.NewMappingWithEquals(envList)
		}

		// links 对应 compose 中的 external_links
		if !function.IsEmptyArray(siteOption.Links) {
			for _, item := range siteOption.Links {
				service.ExternalLinks = append(service.ExternalLinks, fmt.Sprintf("%s:%s", item.Name, item.Alise))
				if item.Volume {
					extService.External.VolumesFrom = append(extService.External.VolumesFrom, item.Name)
				}
			}
		}

		if !function.IsEmptyArray(siteOption.Replace) {
			for _, item := range siteOption.Replace {
				// 替换compose中服务时，部署时需要过滤掉
				if item.Depend != "" && item.Target != "" {
					service.ExternalLinks = append(service.ExternalLinks, fmt.Sprintf("%s:%s", item.Target, item.Depend))
					extProject.DisabledServices = append(extProject.DisabledServices, item.Depend)
				}
			}
		}

		for _, item := range siteOption.Ports {
			target, _ := strconv.Atoi(item.Dest)
			service.Ports = append(service.Ports, types.ServicePortConfig{
				HostIP:    item.HostIp,
				Target:    uint32(target),
				Published: item.Host,
			})
		}

		for _, item := range siteOption.Volumes {
			if !strings.Contains(item.Host, "/") {
				service.Volumes = append(service.Volumes, types.ServiceVolumeConfig{
					Type:     types.VolumeTypeVolume,
					Source:   item.Host,
					Target:   item.Dest,
					ReadOnly: item.Permission == "read",
				})
				project.Volumes[item.Host] = types.VolumeConfig{
					Name: item.Host,
				}
			} else {
				service.Volumes = append(service.Volumes, types.ServiceVolumeConfig{
					Type:     types.VolumeTypeBind,
					Source:   item.Host,
					Target:   item.Dest,
					ReadOnly: item.Permission == "read",
				})
			}
		}

		for _, item := range siteOption.VolumesDefault {
			volumePath := fmt.Sprintf("%s.%s", siteOption.Name, strings.Join(strings.Split(item.Dest, "/"), "-"))
			service.Volumes = append(service.Volumes, types.ServiceVolumeConfig{
				Source:   volumePath,
				Target:   item.Dest,
				ReadOnly: item.Permission == "read",
				Type:     types.VolumeTypeVolume,
			})
			project.Volumes[volumePath] = types.VolumeConfig{
				Name: volumePath,
			}
		}

		for _, item := range siteOption.Network {
			service.Networks[item.Name] = &types.ServiceNetworkConfig{
				Aliases:     item.Alise,
				Ipv4Address: item.IpV4,
				Ipv6Address: item.IpV6,
			}
			projectNetworkConfig := types.NetworkConfig{
				Name:     item.Name,
				External: true,
			}
			project.Networks[item.Name] = projectNetworkConfig
		}

		if siteOption.ShmSize != "" {
			size, _ := units.RAMInBytes(siteOption.ShmSize)
			service.ShmSize = types.UnitBytes(size)
		}

		if siteOption.Command != "" {
			service.Command = function.CommandSplit(siteOption.Command)
		}

		if siteOption.Entrypoint != "" {
			service.Entrypoint = function.CommandSplit(siteOption.Entrypoint)
		}

		if siteOption.UseHostNetwork {
			service.NetworkMode = "host"
		}

		if siteOption.Log.Driver != "" {
			loggingOpts := &types.LoggingConfig{
				Driver:  siteOption.Log.Driver,
				Options: make(types.Options),
			}
			if siteOption.Log.MaxSize != "" {
				loggingOpts.Options["max-size"] = siteOption.Log.MaxSize
			}
			if siteOption.Log.MaxFile != "" {
				loggingOpts.Options["max-file"] = siteOption.Log.MaxFile
			}
			service.Logging = loggingOpts
		}

		for _, item := range siteOption.Label {
			service.Labels[item.Name] = item.Value
		}

		hostList := make([]string, 0)
		for _, item := range siteOption.ExtraHosts {
			hostList = append(hostList, fmt.Sprintf("%s=%s", item.Name, item.Value))
		}
		if !function.IsEmptyArray(hostList) {
			hostLists, err := types.NewHostsList(hostList)
			if err != nil {
				service.ExtraHosts = make(types.HostsList)
			} else {
				service.ExtraHosts = hostLists
			}
		}

		service.Extensions = map[string]any{
			ExtensionServiceName: extService,
		}

		if siteOption.IpV4.Address != "" || siteOption.IpV6.Address != "" {
			projectNetworkConfig := types.NetworkConfig{
				Name: siteOption.Name,
				Ipam: types.IPAMConfig{
					Driver: "default",
					Config: make([]*types.IPAMPool, 0),
				},
			}

			networkConfig := &types.ServiceNetworkConfig{}
			if siteOption.IpV4.Address != "" {
				networkConfig.Ipv4Address = siteOption.IpV4.Address
				projectNetworkConfig.Ipam.Config = append(projectNetworkConfig.Ipam.Config, &types.IPAMPool{
					Subnet:  siteOption.IpV4.Subnet,
					Gateway: siteOption.IpV4.Gateway,
				})
			}
			if siteOption.IpV6.Address != "" {
				projectNetworkConfig.EnableIPv6 = function.PtrBool(true)
				networkConfig.Ipv6Address = siteOption.IpV6.Address
				projectNetworkConfig.Ipam.Config = append(projectNetworkConfig.Ipam.Config, &types.IPAMPool{
					Subnet:  siteOption.IpV6.Subnet,
					Gateway: siteOption.IpV6.Gateway,
				})
			}
			service.Networks[siteOption.Name] = networkConfig
			project.Networks[siteOption.Name] = projectNetworkConfig
		}
		project.Services[siteOption.Name] = service
	}
	project.Extensions = map[string]any{
		ExtensionName: extProject,
	}
	return &Wrapper{
		Project: &project,
	}, nil
}