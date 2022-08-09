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
	"github.com/samber/lo"
)

type Todo struct {
	Id        string `json:"id"`
	Text      string `json:"text"`
	CreatedAt int64  `json:"createdAt"`
}

var todos = make(map[string]*Todo, 0)

func main() {
	godotenv.Load("../.env")
	gin.SetMode(os.Getenv("GIN_MODE"))
	r := gin.Default()

	clientProxy := httputil.NewSingleHostReverseProxy(&url.URL{
		Scheme: os.Getenv("CLIENT_SCHEME"),
		Host:   net.JoinHostPort(os.Getenv("CLIENT_HOST"), os.Getenv("CLIENT_PORT")),
	})

	r.NoRoute(gin.WrapH(clientProxy))
	registerAPIRoutes(r)

	port := lo.Ternary(os.Getenv("PORT") != "", os.Getenv("PORT"), os.Getenv("SERVER_PORT"))
	addr := net.JoinHostPort("0.0.0.0", port)
	log.Println("Listening the server on: ", addr)
	http.ListenAndServe(addr, r.Handler())
}
