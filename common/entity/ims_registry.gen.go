// Code generated by gorm.io/gen. DO NOT EDIT.
// Code generated by gorm.io/gen. DO NOT EDIT.
// Code generated by gorm.io/gen. DO NOT EDIT.

package entity

const TableNameRegistry = "ims_registry"

// Registry mapped from table <ims_registry>
type Registry struct {
	ID            int32  `gorm:"column:id;type:INTEGER" json:"id"`
	Title         string `gorm:"column:title" json:"title"`
	ServerAddress string `gorm:"column:server_address" json:"serverAddress"`
	Username      string `gorm:"column:username" json:"username"`
	Password      string `gorm:"column:password" json:"password"`
	Email         string `gorm:"column:email" json:"email"`
}

// TableName Registry's table name
func (*Registry) TableName() string {
	return TableNameRegistry
}