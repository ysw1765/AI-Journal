FROM golang:1.22-alpine

WORKDIR /app

COPY go.mod .
RUN go mod download

COPY . .

RUN go build -o /bin/go-gateway ./cmd/server

CMD ["/bin/go-gateway"]
