package main

import (
	"log"
	"net/http"
	"fmt"

	"dmonay/react-go-chat-app/socket"
)

// Port for app to run on. Post-demo this should live in a config file.
const port = "8080"

func main() {
	http.HandleFunc("/socket", socket.HandleSocket)

	fmt.Printf("Server is running on port %s\n", port)
	if err := http.ListenAndServeTLS(":"+port, "tls/cert.pem", "tls/key.pem", nil); err != nil {
		log.Fatalf("server has not started: %+v\n", err)
	}
}

