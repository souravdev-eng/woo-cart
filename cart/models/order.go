package models

import "time"

type Order struct {
	ID        uint      `gorm:"primaryKey" json:"id"`
	ProductId string    `gorm:"not null;unique" json:"product_id"`
	UserId    string    `gorm:"not null" json:"user_id"`
	Quantity  int       `gorm:"default:1" json:"quantity"`
	CreatedAt time.Time `gorm:"autoCreateTime" json:"created_at"`
	UpdatedAt time.Time `gorm:"autoCreateTime" json:"updated_at"`
}
