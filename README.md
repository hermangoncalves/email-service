# 📧 Serviço de E-mail com Failover

Um serviço de envio de e-mails baseado em **Fastify** e **TypeScript**, com suporte a múltiplos provedores de e-mail e failover automático em caso de falha de um provedor.

---

## ✨ Funcionalidades

- Envio de e-mails via API RESTful com entrada/saída em JSON.
- Failover entre provedores de e-mail.
- Documentação automática da API com Swagger.
- Verificação de saúde dos provedores.
- Testes unitários com Vitest.
- Suporte a TypeScript para maior segurança de tipos.

---

## ⚙️ Pré-requisitos

- Node.js (versão 18 ou superior)
- Contas ativas e credenciais nos provedores de e-mail:
  - **Gmail**: Conta com verificação em duas etapas e App Password gerado.

---

## 🚀 Instalação

1. Clone o repositório:

```bash
git clone https://github.com/hermangoncalves/email-service.git
cd email-service
````

2. Instale as dependências:

```bash
pnpm install
```

3. Crie um arquivo `.env` na raiz do projeto com as credenciais dos provedores:

```env
GMAIL_SENDER_EMAIL=your-email@gmail.com
GMAIL_APP_PASSWORD=your-16-character-app-password
```

4. Inicie o servidor:

```bash
npm run dev
```

---

## 📬 Endpoints da API

### `POST /api/email/send`

Envia um e-mail.

**Payload de exemplo:**

```json
{
  "to": "destinatario@example.com",
  "subject": "Assunto do E-mail",
  "text": "Corpo do e-mail",
  "html": "<p>Corpo do e-mail em HTML</p>"
}
```

### `GET /health`

Verifica a saúde do serviço.

### `GET /documentation`

Acessa a documentação da API (Swagger).

---

## 🧪 Testes

Execute os testes unitários com:

```bash
pnpm run test
```

---

## 🧑‍💻 Como Usar

1. Configure as credenciais no arquivo `.env`.
2. Inicie o servidor com `pnpm run dev`.
3. Use um cliente HTTP (como Postman ou curl) para enviar requisições à API.
4. Acesse a documentação da API em: [http://localhost:3000/documentation](http://localhost:3000/documentation)

---

## ⚠️ Notas

* **Gmail:** Use um App Password para autenticação. Ative a verificação em duas etapas e gere um App Password na sua conta Google.
