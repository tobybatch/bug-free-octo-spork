# TB Message Server

## Quick start

    npm install                                 # install deps
    docker-compose up -d                        # create mongo db
    npm start                                   # start the server
    wget -q -O - http://localhost:3000/messages # get a list of all messages

## Send a message (CLI)

    curl -X PUT -H "Content-Type: application/json" -d '{"dest":"gabriel", msg: "oh my god its full of stars"}' "http://localhost:3000/messages"
