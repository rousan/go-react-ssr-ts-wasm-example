FROM golang:1.18

WORKDIR /app

COPY . .

RUN go mod download

RUN go build -o ./build/app .

EXPOSE 3001

CMD ["./build/app"]