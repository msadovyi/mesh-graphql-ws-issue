# graphql-mesh-ws-issue

Description of graphql-mesh-ws-issue

How to reproduce:
1. Run `yarn && yarn start`. It runs source at port 3000 and grapql-mesh at 4000.
2. Go to `http://localhost:3000/graphql` and make sure query `{ hello }` and `subscription { greetings }` returns values.
3. Open `http://localhost:4000/graphql` and execute same queries: `{ hello }`, `subscription { greetings }`.

Expected behaviour: both of queries works correctly and returns values as source does.
Current behaviour: `subscription { greetings }` returns "Hi" in 5 languages, `{ hello }` returns null.
