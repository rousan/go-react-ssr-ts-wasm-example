package main

import (
	"log"
	"net"
	"net/http"
	"net/http/httputil"
	"net/url"
	"os"

	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
)

type Todo struct {
	Id        string `json:"id"`
	Text      string `json:"text"`
	CreatedAt int64  `json:"createdAt"`
}

var todos = make(map[string]*Todo, 0)

func main() {
	godotenv.Load()
	gin.SetMode(os.Getenv("GIN_MODE"))
	r := gin.Default()

	clientProxy := httputil.NewSingleHostReverseProxy(&url.URL{
		Scheme: os.Getenv("CLIENT_SCHEME"),
		Host:   net.JoinHostPort(os.Getenv("CLIENT_HOST"), os.Getenv("CLIENT_PORT")),
	})

	r.NoRoute(gin.WrapH(clientProxy))
	registerAPIRoutes(r)

	log.Println("Listening the server on :3001")
	http.ListenAndServe(":3001", r.Handler())
}
