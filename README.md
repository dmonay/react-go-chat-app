# Chat App Prototype built with React, Redux, MaterialUI and Go

This repo consists of both the clientside and serverside code.

# Client React App

## Install

```bash
git clone https://github.com/dmonay/react-go-chat-app.git
cd react-go-chat-app
yarn
```

## Get started

1. `yarn start`
2. Load `localhost:3000` in yor browser.

## Things to note:

1. React code uses hooks where applicable, keeping use of more complex class components to a minimum
2. MaterialUI comes with JSS and thus that is the CSS authoring tool of choice.
3. We support basic error handling. If a server terminated the socket connection for whatever reason, we redirect user to an error page, which then allows user to navigate home
   and reattempt to enter the chat.
4. If the client terminates the socket connection, we exit the goroutine that was handling that socket connection, avoiding any memory leaks.
5. Basic validation is performed on the email address input.

# Go Server

## Installation

1. `cd server && go get`
2. Set up [mkcert](https://github.com/FiloSottile/mkcert). It is used to install a locally-trusted dev certificate into the CA chain on your machine so that we can
   run Go's HTTP2 server in our dev environment:
   - `brew install mkcert`
   - `mkcert -install`
   - `mkcert localhost`
   - Create `cert.pem` and `key.pem` in `tls` and add the generated values.
   - If on Firefox, restart browser.
3. `go build && ./sinaiChat`

## Dependencies

1. This project uses Go modules, which require Go version 1.11 or greater. See [this page](https://golang.org/cmd/go/#hdr-Preliminary_module_support) for more info. The easiest way to ensure modules work as intended is to check out this directory _**outside GOPATH/src**_.

## Things to note:

1. The server features a foundation for socket authentication. If a login is implemented before the socket is initiated, an auth token can be used to ensure connecting client is authenticated
   and/or authorized.
2. For the pruposes of the demo, we store the messages in-memory. Messages are stored in a slice and maintain a UUID. In the future, this could allow us to delete messages on-demand and perform other actions on a per-message level (favorite, respond, etc). Note: a slice is not an ideal data structure for scale. To maintain order and also allow for quick lookups by UUID, a tree will be a better data structre.
3. The `store` service is architected to be expanded with further types and methods to be used for persistent storage.
4. If socket is closed on the server-side, client redirects back to homepage so that FE and BE state don't get out of sync. You can test this by killing the server while client is running. In a realstic scenario, we would attempt up to n times to reconnect, and if we re-establish connection with server, grab state from there.
5. You can simulate multiple clients connecting by opening `localhost:3000` in multiple tabs. The server will log whenever a client connects and disconnects.
6. To avoid memory leaks, we terminate a socket-handling goroutine 10 minutes after no frames had been received over that socket
