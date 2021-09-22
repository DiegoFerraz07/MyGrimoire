# JSON Server MY-grimoire


## Getting started

Install JSON Server 

```
npm install -g json-server
```

Para rodar o servidor, execute o comando abaixo:
```
json-server --watch resources/db/mygrimorio.json
```

Para executar na rede rode o comando

```
json-server --host 192.168.0.101 resources/db/mygrimorio.json
```

Agora basta acessar [http://localhost:3000/](http://localhost:3000/)

```json
Resources
  http://localhost:3000/magics
  http://localhost:3000/users
  http://localhost:3000/persons

```
