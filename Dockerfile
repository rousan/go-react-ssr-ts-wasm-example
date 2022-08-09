FROM rousan/home:1.0.0

WORKDIR /app

COPY . .

RUN tusk setup:prod

RUN tusk build

EXPOSE 3001

CMD ["tusk", "start"]