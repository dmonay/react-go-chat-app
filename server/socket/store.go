package socket

// NewStore initializes our store for each user's messages.
// This will eventually hook into a data store such as Postgres.
// For the demo, it lives in memory.
func NewStore(userEmail string) *UserMessages {
	var um UserMessages
	um.userEmail = userEmail

	return &um
}

// UserMessages manages User
type UserMessages struct {
	userEmail     string
	messages      []socketFrame
	totalMessages int
}

// Add adds the latest message to our store
func (um *UserMessages) Add(msg socketFrame) {
	um.messages = append(um.messages, msg)
	um.totalMessages++
}
