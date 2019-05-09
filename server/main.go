package main

import (
	"context"
	"log"
	"net/http"
	"time"
	"fmt"

	"nhooyr.io/websocket"
	"nhooyr.io/websocket/wsjson"
)

const (
	// Message to be displayed if socket is authenticated.
	welcomeMessage = `Welcome to SinaiChat, %s! I'm Simon, your friendly neighborhood chat bot.`

	// Message to be displayed if socket client is unauthenticated.
	unauthenticatedMessage = "You are unauthenticated. Terminating connection."

	// Hardcoded auth string. Can be updated after login is implemented.
	authString = "ch2983r0vhs'.cx8^&#Bf"

	// Port for app to run on. Post-demo this should live in a config.
	port           = "8080"

	// If this client has not sent a message after 10 minutes, we will
	// close this connection to avoid a dangling goroutine and a memory leak.
	waitPeriod = time.Minute*10
)

func main() {
	http.HandleFunc("/socket", handleSocket)

	if err := http.ListenAndServeTLS(":"+port, "tls/cert.pem", "tls/key.pem", nil); err != nil {
		log.Fatalf("server has not started: %+v\n", err)
	}
}

func handleSocket(w http.ResponseWriter, r *http.Request) {
	var (
		c      *websocket.Conn
		ctx    context.Context
		cancel context.CancelFunc
		value  map[string]string
		err    error
	)

	// InsecureSkipVerify avoids CORS issues for purposes of demo.
	if c, err = websocket.Accept(w, r, websocket.AcceptOptions{InsecureSkipVerify: true}); err != nil {
		log.Fatal(err)
	}
	defer c.Close(websocket.StatusInternalError, "the sky is falling")

	for i := 0; ; i++{
		ctx, cancel = context.WithTimeout(r.Context(), waitPeriod)
		defer cancel()

		if err = wsjson.Read(ctx, c, &value); err != nil {
			log.Printf("%s has disconnected!", value["User"])
			return
		}

		if err = initiateSocket(i, value, ctx, c); err != nil {
			return
		}


		log.Printf("%s has connected!", value["User"])
	}
}

// todo turn value into custom type, maybe do some methods on it, like verify
func initiateSocket(i int, value map[string]string, ctx context.Context, c *websocket.Conn) (err error) {
	// we only perform this upon initial connection
	if i != 0 {
		return
	}

	// if user is not authenticated, send a frame and cancel connection
	if value["Authorization"] != authString {
		if err = wsjson.Write(ctx, c, unauthenticatedMessage); err != nil {
			log.Println(err)
			return
		}
		err = fmt.Errorf("Unauthenticated")
		return
	}

	// if user is authenticated, send welcome message
	customWelcomeMessage := fmt.Sprintf(welcomeMessage, value["User"])
	if err = wsjson.Write(ctx, c, customWelcomeMessage); err != nil {
		log.Println(err)
		return
	}

	return
}