package socket

import (
	"context"
	"fmt"
	"log"
	"net/http"
	"time"
	"encoding/json"

	"nhooyr.io/websocket"
	"nhooyr.io/websocket/wsjson"
	"github.com/satori/go.uuid"
)

const (
	// Message to be displayed if socket is authenticated.
	welcomeMessage = `Welcome to SinaiChat, %s! I'm Simon, your friendly neighborhood chat bot.`

	// Message to be displayed if socket client is unauthenticated.
	unauthenticatedMessage = "You are unauthenticated. Terminating connection."

	// Hardcoded auth string. Can be updated after login is implemented.
	authString = "ch2983r0vhs'.cx8^&#Bf"

	// If this client has not sent a message after 10 minutes, we will
	// close this connection to avoid a dangling goroutine and a memory leak.
	waitPeriod = time.Minute * 10
)

// socketFrame holds the data that will be communicated between clietn and server over the socket
type socketFrame struct {
	Authorization string `json:"authorization"`
	User          string `json:"user"`
	Author          string `json:"author"`
	NumMessages   int `json:"numberOfMessages"`
	ID            uuid.UUID    `json:"id"`
}

// HandleSocket is the handler for an incoming socket connection
func HandleSocket(w http.ResponseWriter, r *http.Request) {
	var (
		c      *websocket.Conn
		ctx    context.Context
		cancel context.CancelFunc
		sf     socketFrame
		messagesStore *UserMessages
		err    error
	)

	// InsecureSkipVerify avoids CORS issues for purposes of demo.
	if c, err = websocket.Accept(w, r, websocket.AcceptOptions{InsecureSkipVerify: true}); err != nil {
		log.Fatal(err)
	}
	defer c.Close(websocket.StatusInternalError, "the sky is falling")

	ctx, cancel = context.WithTimeout(r.Context(), waitPeriod)
	defer cancel()

	for i := 0; ; i++ {
		var (
			id uuid.UUID
			author string
			responseBytes []byte
		)

		if err = wsjson.Read(ctx, c, &sf); err != nil {
			log.Printf("%s has disconnected!", sf.User)
			return
		}

		if err = sf.initiateSocket(i, ctx, c); err != nil {
			return
		}

		log.Printf("%s has connected!", sf.User)

		if i == 0 {
			messagesStore = NewStore(sf.User)
			author = "system"
		} else {
			author = "user"
		}

		responseFrame := socketFrame{
			User: sf.User,
			NumMessages: sf.NumMessages,
			Author: author,
			ID: id,
		}
		messagesStore.Add(responseFrame)

		var err error
		if id = uuid.NewV4(); err != nil {
			fmt.Printf("Error generaing uuid: %+v", err)
			return
		}

		fmt.Printf("store is now: %+v\n", *messagesStore)

		if i == 0 {
			continue
		}

		if responseBytes, err = json.Marshal(messagesStore); err != nil {
			log.Println(err)
			return
		}

		if err = wsjson.Write(ctx, c, string(responseBytes)); err != nil {
			log.Println(err)
			return
		}
	}
}
