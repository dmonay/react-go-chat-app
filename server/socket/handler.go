package socket

import (
	"context"
	"log"
	"net/http"
	"time"

	uuid "github.com/satori/go.uuid"
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

	// If this client has not sent a message after 10 minutes, we will
	// close this connection to avoid a dangling goroutine and a memory leak.
	waitPeriod = time.Minute * 10
)

// socketFrame holds the data that will be communicated between clietn and server over the socket
type socketFrame struct {
	Authorization string    `json:"authorization"`
	User          string    `json:"user"`
	Author        string    `json:"author"`
	NumMessages   int       `json:"numberOfMessages"`
	Value         string    `json:"value"`
	ID            uuid.UUID `json:"id"`
}

// HandleSocket is the handler for an incoming socket connection
func HandleSocket(w http.ResponseWriter, r *http.Request) {
	var (
		c             *websocket.Conn
		ctx           context.Context
		cancel        context.CancelFunc
		sf            socketFrame
		messagesStore *UserMessages
		err           error
	)

	// InsecureSkipVerify avoids CORS issues for purposes of demo.
	if c, err = websocket.Accept(w, r, websocket.AcceptOptions{InsecureSkipVerify: true}); err != nil {
		log.Fatal(err)
	}
	defer c.Close(websocket.StatusInternalError, "the sky is falling")

	ctx, cancel = context.WithTimeout(r.Context(), waitPeriod)
	defer cancel()

	for i := 0; ; i++ {
		if err = wsjson.Read(ctx, c, &sf); err != nil {
			log.Printf("%s has disconnected!", sf.User)
			return
		}

		if i == 0 {
			messagesStore = NewStore(sf.User)
		}

		if err = sf.initiateSocket(i, ctx, c, messagesStore); err != nil {
			return
		}

		log.Printf("%s has connected!", sf.User)

		if i == 0 {
			continue
		}
		totalMessages := messagesStore.totalMessages + 1

		responseFrame := socketFrame{
			User:        sf.User,
			NumMessages: totalMessages,
			Author:      "user",
			Value:       sf.Value,
			ID:          uuid.NewV4(),
		}

		messagesStore.Add(responseFrame)

		if err = wsjson.Write(ctx, c, responseFrame); err != nil {
			log.Println(err)
			return
		}
	}
}
