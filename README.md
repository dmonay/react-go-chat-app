# Client React App

## Installation

```bash
git clone https://github.com/dmonay/react-go-chat-app.git
cd react-go-chat-app
yarn
```

## Get started

```bash
yarn start
```

# Go Server

## Installation

1. go get
2. brew install mkcert
3. mkcert -install
4. mkcert localhost
5. update the files in `tls` with the generated values
6. restart browser
7. `go build && ./sinaiChat`

## Dependencies

https://golang.org/cmd/go/#hdr-Preliminary_module_support

go mod init example.com/m

## Things of note:

1. go server uses go modules
2. react code uses hooks
3. http2 server
4. foundation for socket authentication
5. We store the messages in-memory. Messages are keyed by UUID. This allows us to delete messages on-demand and perform other actions on a per-message level.
6. if socket is closed on server-side, redirec back to homepage so that FE and BE state don't get out of sync. In a realstic scenario, we would attempt up to n times to reconnect, and if we re-establish connection with server, grab state from there.
