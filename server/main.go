package main

import (
	"fmt"
	"log"
	"net/http"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/gorilla/websocket"
)

var upgrader = websocket.Upgrader{CheckOrigin: func(r *http.Request) bool {
	return true
}}

func main() {
	gin.SetMode(gin.ReleaseMode)
	r := gin.Default()

	r.GET("/api/ping", func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{
			"message": "pong",
		})
	})

	r.GET("/api/ws", func(ctx *gin.Context) {
		wsConn, err := upgrader.Upgrade(ctx.Writer, ctx.Request, nil)
		if err != nil {
			log.Println("err", err)
			ctx.JSON(http.StatusBadRequest, gin.H{
				"message": "Error",
			})
			return
		}
		defer wsConn.Close()

		for {
			err = wsConn.WriteMessage(websocket.TextMessage, []byte(fmt.Sprint(time.Now())))
			if err != nil {
				log.Println("write:", err)
				break
			}
			time.Sleep(time.Second * 1)
		}
	})

	log.Println("Listening the server on :3001")
	http.ListenAndServe(":3001", r.Handler())
}
