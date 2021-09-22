# TB Message Server

## Quick start

    yarn                                        # install deps
    npx husky install                           # set up code rules
    docker-compose up -d                        # create mongo db
    yarn start                                  # start the server
    wget -q -O - http://localhost:3000/messages # get a list of all messages

## Send a message (CLI)

    curl -X PUT -H "Content-Type: application/json" -d '{"dest":"gabriel", msg: "oh my god its full of stars"}' "http://localhost:3000/messages"
