package main

import (
	"fmt"
	"log"
	"net/http"
	"os"
	"path"
	"sort"
	"strings"
	"time"

	"github.com/gin-contrib/static"
	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
	"github.com/joho/godotenv"
	"github.com/samber/lo"
	"github.com/spf13/afero"
)

type Todo struct {
	Id        string `json:"id"`
	Text      string `json:"text"`
	CreatedAt int64  `json:"createdAt"`
}

var todos = make(map[string]*Todo, 0)

func notFoundHandler(ctx *gin.Context) {
	ctx.JSON(http.StatusNotFound, gin.H{
		"status":  "failed",
		"message": "Not Found",
	})
}

const apiRoutePrefix = "/api"

func main() {
	godotenv.Load()
	gin.SetMode(gin.ReleaseMode)
	r := gin.Default()

	r.NoRoute(notFoundHandler)

	if os.Getenv("CACHE_ASSETS") == "true" {
		assetFs := getCacheFs("../client/build", 0)
		r.Use(static.Serve("/", aferoToGinFs(assetFs)))
	} else {
		r.Use(static.ServeRoot("/", "../client/build"))
	}

	apiGroup := r.Group(apiRoutePrefix)

	apiGroup.POST("/v1/todos", func(ctx *gin.Context) {
		payloadTodo := new(Todo)

		if err := ctx.ShouldBindJSON(&payloadTodo); err != nil {
			log.Println(err)
			ctx.JSON(http.StatusBadRequest, gin.H{
				"status":  "failed",
				"message": err.Error(),
			})
			return
		}

		if payloadTodo.Text == "" {
			ctx.JSON(http.StatusBadRequest, gin.H{
				"status":  "failed",
				"message": "Todo text can't be empty",
			})
			return
		}

		newTodo := &Todo{
			Id:        uuid.NewString(),
			Text:      payloadTodo.Text,
			CreatedAt: time.Now().UnixMilli(),
		}

		todos[newTodo.Id] = newTodo

		ctx.JSON(http.StatusCreated, newTodo)
	})

	apiGroup.DELETE("/v1/todos/:todoId", func(ctx *gin.Context) {
		todoId := ctx.Param("todoId")
		delete(todos, todoId)

		ctx.JSON(http.StatusNoContent, nil)
	})

	apiGroup.GET("/v1/todos", func(ctx *gin.Context) {
		todoVals := lo.Values(todos)
		sort.SliceStable(todoVals, func(i, j int) bool {
			return todoVals[i].CreatedAt < todoVals[j].CreatedAt
		})

		ctx.JSON(http.StatusOK, todoVals)
	})

	apiGroup.GET("/v1/todos/:todoId", func(ctx *gin.Context) {
		todoId := ctx.Param("todoId")

		todo, ok := todos[todoId]
		if !ok {
			ctx.JSON(http.StatusNotFound, gin.H{
				"status":  "failed",
				"message": fmt.Sprintf("Todo is not found: %v", todoId),
			})
			return
		}

		ctx.JSON(http.StatusOK, todo)
	})

	log.Println("Listening the server on :3001")
	http.ListenAndServe(":3001", r.Handler())
}

func getCacheFs(sourcePath string, cacheTime time.Duration) afero.Fs {
	base := afero.NewBasePathFs(afero.NewOsFs(), sourcePath)
	layer := afero.NewMemMapFs()
	ufs := afero.NewCacheOnReadFs(base, layer, cacheTime)
	return ufs
}

type pipeServeFileSystem struct {
	input afero.Fs
}

func (pFs *pipeServeFileSystem) Open(name string) (http.File, error) {
	return pFs.input.Open(name)
}

func (pFs *pipeServeFileSystem) Exists(prefix string, filepath string) bool {
	if strings.HasPrefix(filepath, apiRoutePrefix) {
		return false
	}

	if p := strings.TrimPrefix(filepath, prefix); len(p) < len(filepath) {
		stats, err := pFs.input.Stat(p)
		if err != nil {
			return false
		}
		if stats.IsDir() {
			index := path.Join(p, "index.html")
			_, err := pFs.input.Stat(index)
			if err != nil {
				return false
			}
		}
		return true
	}
	return false
}

func aferoToGinFs(fs afero.Fs) static.ServeFileSystem {
	return &pipeServeFileSystem{fs}
}

// func copyFilesToAferoFs(source string, dest afero.Fs) error {
// 	return filepath.WalkDir(source, func(path string, d fs.DirEntry, err error) error {
// 		if err != nil {
// 			return err
// 		}

// 		destPath := strings.TrimPrefix(strings.TrimPrefix(path, source), "/")

// 		if destPath == "" {
// 			return nil
// 		}

// 		if d.IsDir() {
// 			err := dest.MkdirAll(destPath, 0666)
// 			if err != nil {
// 				return err
// 			}
// 		} else if d.Type().IsRegular() {
// 			destF, err := dest.OpenFile(destPath, os.O_CREATE|os.O_WRONLY|os.O_TRUNC, 0666)
// 			if err != nil {
// 				return err
// 			}

// 			sourceF, err := os.Open(path)
// 			if err != nil {
// 				return err
// 			}

// 			_, err = io.Copy(destF, sourceF)
// 			if err != nil {
// 				return err
// 			}
// 		}

// 		return nil
// 	})
// }
