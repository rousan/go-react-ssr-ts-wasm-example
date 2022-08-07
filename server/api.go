package main

import (
	"fmt"
	"log"
	"net/http"
	"sort"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
	"github.com/samber/lo"
)

func registerAPIRoutes(r gin.IRouter) {
	r.POST("/api/v1/todos", func(ctx *gin.Context) {
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

	r.DELETE("/api/v1/todos/:todoId", func(ctx *gin.Context) {
		todoId := ctx.Param("todoId")
		delete(todos, todoId)

		ctx.JSON(http.StatusNoContent, nil)
	})

	r.GET("/api/v1/todos", func(ctx *gin.Context) {
		todoVals := lo.Values(todos)
		sort.SliceStable(todoVals, func(i, j int) bool {
			return todoVals[i].CreatedAt < todoVals[j].CreatedAt
		})

		ctx.JSON(http.StatusOK, todoVals)
	})

	r.GET("/api/v1/todos/:todoId", func(ctx *gin.Context) {
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
}
