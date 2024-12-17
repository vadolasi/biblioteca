# Instruções para executar o projeto

```bash
npm install -g bun
```

```bash
bun
```

## Na pasra "backend"

```bash
# Na pasta "backend"
bun migrate
```

Adiconar o arquivo `.env` na pasta `backend` com o seguinte conteúdo:

```bash
JWT_SECRET=secret
RESEND_API_KEY=secret
```

## Executar o projeto (pasta raiz)

```bash
bun dev
```
