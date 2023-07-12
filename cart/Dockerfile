FROM golang:1.20

WORKDIR /app

RUN go install github.com/cosmtrek/air@latest

COPY go.mod . 
COPY . .

RUN go build -o bin .

CMD ["air", "-c", ".air.toml"]


