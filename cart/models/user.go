package models

import "time"

// The User struct represents a user with properties such as ID, UserId, Name, Email, CreatedAt, and
// UpdatedAt.
// @property {uint} ID - The ID property is of type uint and is marked as the primary key in the
// database. It is also tagged with `json:"id"` to specify the JSON key for this field.
// @property {string} UserId - The `UserId` property is a unique identifier for the user. It is of type
// string and is annotated with `gorm:"not null;unique"`, which means it cannot be null and must be
// unique in the database.
// @property {string} Name - The "Name" property is a string that represents the name of the user.
// @property {string} Email - The "Email" property is a string that represents the email address of the
// user. It is marked as "not null" to ensure that a value is always provided, and "unique" to enforce
// uniqueness among all user records.
// @property CreatedAt - CreatedAt is a property of type time.Time that represents the timestamp when
// the user record was created. It is annotated with `gorm:"autoCreateTime"` which means that the value
// for this property will be automatically set to the current time when a new user record is created.
// @property UpdatedAt - UpdatedAt is a property of the User struct that represents the timestamp of
// when the user was last updated. It is of type time.Time and is annotated with
// `gorm:"autoCreateTime"`, which means that the value will be automatically set to the current time
// when the user is updated in the database.
type User struct {
	ID        uint      `gorm:"primaryKey" json:"id"`
	UserId    string    `gorm:"not null;unique" json:"_id"`
	Name      string    `gorm:"not null" json:"name"`
	Email     string    `gorm:"not null;unique" json:"email"`
	CreatedAt time.Time `gorm:"autoCreateTime" json:"created_at"`
	UpdatedAt time.Time `gorm:"autoCreateTime" json:"updated_at"`
}
