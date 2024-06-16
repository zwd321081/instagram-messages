启动本地的mongodb
mongod --dbpath ~/data/db 

test graphql
```bash
curl -X POST \
-H "Content-Type: application/json" \
-d '{"query": "{ hello }"}' \
http://localhost:4000/graphql
```

<!-- query ChannelQuery($channelName: String!) {
  channel(name: $channelName) {
    name,
    users{
      name
    }
  }
} -->

## todo

