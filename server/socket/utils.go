package socket

import (
	"context"
	"fmt"
	"log"

	uuid "github.com/satori/go.uuid"
	"nhooyr.io/websocket"
	"nhooyr.io/websocket/wsjson"
)

func (sf *socketFrame) initiateSocket(i int, ctx context.Context, c *websocket.Conn, um *UserMessages) (err error) {
	// we only perform this upon initial connection
	if i != 0 {
		return
	}

	// if user is not authenticated, send a frame and cancel connection
	if sf.Authorization != authString {
		if err = wsjson.Write(ctx, c, unauthenticatedMessage); err != nil {
			log.Println(err)
			return
		}
		err = fmt.Errorf("Unauthenticated")
		return
	}

	// if user is authenticated, send welcome message
	customWelcomeMessage := fmt.Sprintf(welcomeMessage, sf.User)

	responseFrame := socketFrame{
		User:        sf.User,
		NumMessages: 1,
		Author:      "system",
		Value:       customWelcomeMessage,
		ID:          uuid.NewV4(),
	}

	um.Add(responseFrame)

	if err = wsjson.Write(ctx, c, responseFrame); err != nil {
		log.Println(err)
		return
	}

	return
}
