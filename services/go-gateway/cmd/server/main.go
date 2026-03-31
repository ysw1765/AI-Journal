package main

import "github.com/gin-gonic/gin"

func main() {
	router := gin.Default()
	router.GET("/healthz", func(c *gin.Context) {
		c.JSON(200, gin.H{"status": "ok"})
	})
	router.Run(":8080")
}
