# GraphQL-authentication


### Install Dependencies and run the graphQl server

```bash
npm install
npm run start
```

### To run mongodb 
```bash
docker compose up -d
```

### To check graphQl server

```bash
query{
  hello
}
```

### Create user 

```bash
mutation CreateUser {
  createUser(input: { name: "Peter Parker", email: "peter.parker@example.com", password: "securepassword123" }) {
    id
    name
    email
  }
}
```

### Login using user credentials

```bash
mutation Login {
  login(email: "peter.parker@example.com", password: "securepassword123") {
    token
    user {
      id
      name
      email
    }
  }
}
```
or you can add http://localhost:4000/graphql url in postman to get all the queries of GraphQl
## Stay in touch

- Author - [Nikhil Babu P](https://www.linkedin.com/in/nikhilbabupurakkal/)
- GitHub - [https://github.com/Nikhilbabup](https://github.com/Nikhilbabup)