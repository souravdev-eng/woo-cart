package main

import (
	"fmt"

	"github.com/gin-gonic/gin"
)

// The main function sets up a server using the Gin framework and responds with "pong" when a GET
// request is made to "/api/cart/ping".
func main() {
	r := gin.Default()
	fmt.Println("Hello world")
	r.GET("/api/cart/ping", func(c *gin.Context) {
		c.JSON(200, gin.H{
			"message": "pong",
		})
	})
	r.Run(":8080")
}
