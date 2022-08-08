package main

import (
	"rousan.io/myapp/wasm/exports"
)

func main() {
	done := make(chan struct{})
	runApp()
	<-done
}

func runApp() {
	exports.Register()
}
