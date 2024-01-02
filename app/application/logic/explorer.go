package logic

import (
	"bytes"
	"errors"
	"fmt"
	"github.com/donknap/dpanel/common/function"
	"github.com/donknap/dpanel/common/service/docker"
	"github.com/donknap/dpanel/common/service/plugin"
	"log/slog"
	"path/filepath"
	"strings"
)

func NewExplorer(md5 string) (*explorer, error) {
	containerInfo, err := docker.Sdk.Client.ContainerInspect(docker.Sdk.Ctx, md5)
	if err != nil {
		return nil, err
	}
	if containerInfo.State.Pid == 0 {
		return nil, errors.New("please start the container" + md5)
	}
	explorerPlugin, err := plugin.NewPlugin("explorer")
	if err != nil {
		return nil, err
	}
	pluginName, err := explorerPlugin.Create()
	if err != nil {
		return nil, err
	}
	o := &explorer{
		rootPath:   fmt.Sprintf("/proc/%d/root", containerInfo.State.Pid),
		pluginName: pluginName,
	}
	return o, nil
}

type explorer struct {
	pluginName string
	rootPath   string
}

func (self explorer) GetListByPath(path string) (fileList []*fileItem, err error) {
	path = strings.TrimSuffix(path, "/") + "/"
	cmd := fmt.Sprintf("ls -AlhX --full-time %s%s \n", self.rootPath, path)
	slog.Debug("explorer", "cmd", cmd)
	out, err := plugin.Command{}.Result(self.pluginName, cmd)
	if err != nil {
		return fileList, err
	}
	lines := bytes.Split(out, []byte("\n"))
	for _, line := range lines {
		if function.IsEmptyArray(line) {
			continue
		}
		switch line[0] {
		case 'd', 'l', '-', 'b':
			row := strings.Fields(string(line))
			if !function.IsEmptyArray(row) {
				item := &fileItem{
					ShowName: string(line[strings.LastIndex(string(line), row[8]):]),
					IsDir:    line[0] == 'd',
					Size:     row[4],
					Mode:     row[0],
					Change:   -1,
					ModTime:  row[5] + row[6],
				}
				if strings.Contains(item.ShowName, "->") {
					index := strings.Index(item.ShowName, "->")
					item.LinkName = item.ShowName[index+2:]
					item.ShowName = item.ShowName[0:index]
				}
				item.Name = path + item.ShowName
				fileList = append(fileList, item)
			}
		}
	}
	if function.IsEmptyArray(fileList) {
		return fileList, nil
	}
	return fileList, nil
}

func (self explorer) Unzip(rootPath string, zipName string) error {
	cmd := fmt.Sprintf("cd %s/%s && unzip -o ./%s \n", self.rootPath, strings.TrimPrefix(rootPath, "/")+"/", zipName)
	out, err := plugin.Command{}.Result(self.pluginName, cmd)

	if err != nil {
		return err
	}
	if !strings.Contains(string(out), "inflating") {
		return errors.New(string(out))
	}
	return nil
}

func (self explorer) DeleteFileList(fileList []string) error {
	var deleteFileList []string
	for _, path := range fileList {
		deleteFileList = append(deleteFileList, self.rootPath+"/"+strings.TrimPrefix(path, "/"))
	}
	cmd := fmt.Sprintf("cd %s && rm -rf %s \n", self.rootPath, strings.Join(deleteFileList, " "))
	out, err := plugin.Command{}.Result(self.pluginName, cmd)
	if err != nil {
		return err
	}
	slog.Debug("explorer", "out", string(out))
	return nil
}

func (self explorer) Create(path string, isDir bool) error {
	var cmd string
	currentPath := fmt.Sprintf("%s/%s", self.rootPath, strings.TrimPrefix(path, "/"))
	if isDir {
		cmd = fmt.Sprintf(
			`mkdir -p %s/NewFolder$(ls -al %s | grep NewFolder | wc -l | awk '{sub(/^[ \t]+/, ""); print $1+1}') \n`,
			currentPath,
			currentPath)
	} else {
		cmd = fmt.Sprintf(
			`touch %s/NewFile$(ls -al %s | grep NewFile | wc -l | awk '{sub(/^[ \t]+/, ""); print $1+1}') \n`,
			currentPath,
			currentPath)
	}
	out, err := plugin.Command{}.Result(self.pluginName, cmd)
	if err != nil {
		return err
	}
	slog.Debug("explorer", "out", string(out))
	return nil
}

func (self explorer) Rename(file string, newFileName string) error {
	oldFile := fmt.Sprintf("%s/%s", self.rootPath, strings.TrimPrefix(file, "/"))
	newFile := fmt.Sprintf("%s/%s", filepath.Dir(oldFile), newFileName)
	cmd := fmt.Sprintf("mv %s %s \n", oldFile, newFile)
	out, err := plugin.Command{}.Result(self.pluginName, cmd)
	if err != nil {
		return err
	}
	slog.Debug("explorer", "out", string(out))
	return nil
}