package models

import "time"

// The `Product` type represents a product with an ID, product ID, title, price, and timestamps for
// creation and update.
// @property {uint} ID - The ID property is of type uint and is marked as the primary key in the
// database. It is also tagged with `json:"id"` to specify the JSON key for this field.
// @property {string} ProductId - ProductId is a unique identifier for the product. It is a string type
// and is marked as not null and unique in the database. It is also represented as "_id" in the JSON
// response.
// @property {string} Title - The title of the product.
// @property {int} Price - The "Price" property is an integer that represents the price of the product.
// @property CreatedAt - CreatedAt is a field of type time.Time that represents the timestamp when the
// product was created. It is automatically populated with the current time when a new product is
// created.
// @property UpdatedAt - UpdatedAt is a property of type time.Time that represents the timestamp when
// the product was last updated.

type Product struct {
	ID          uint      `gorm:"primaryKey" json:"id"`
	ProductId   string    `gorm:"not null;unique" json:"_id"`
	Title       string    `gorm:"not null" json:"title"`
	Price       int       `gorm:"not null" json:"price"`
	StockInHand int       `gorm:"not null" json:"stock_in_hand"`
	CreatedAt   time.Time `gorm:"autoCreateTime" json:"created_at"`
	UpdatedAt   time.Time `gorm:"autoCreateTime" json:"updated_at"`
}
