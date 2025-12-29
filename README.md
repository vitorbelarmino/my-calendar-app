# MyCalendar App

## 💻 Projeto

O MyCalendar App é o frontend do sistema de calendário, desenvolvido em React + TypeScript + Vite. Permite ao usuário cadastrar, autenticar, criar, visualizar, editar e excluir eventos pessoais de forma simples e intuitiva. A aplicação se comunica com a MyCalendar API para todas as operações de backend, garantindo segurança e eficiência.

- Integração total com o backend: [my-calendar-api](https://github.com/vitorbelarmino/my-calendar-api)
- Experiência responsiva e fluida
- Interface amigável, com navegação clara e feedback visual

---

## 📝 Funcionalidades

- Cadastro e login de usuários
- Autenticação JWT (com refresh)
- Visualização de eventos em calendário
- Criação, edição e exclusão de eventos
- Listagem de eventos do usuário
- Recuperação de dados do usuário autenticado
- Logout seguro
- Feedback visual para ações (modais, alerts)

---

## 🛠️ Tecnologias & Ferramentas

- React 18+
- TypeScript
- Vite
- TailwindCSS
- Context API (gerenciamento de auth)
- Axios (requisições HTTP)
- ESLint & Prettier

---

## ⬇️ Como executar o projeto

### Pré-requisitos

- Node.js 18+
- Backend rodando ([my-calendar-api](https://github.com/vitorbelarmino/my-calendar-api))

### Passos

```bash
# Clone o repositório
git clone https://github.com/vitorbelarmino/my-calendar-app.git
cd my-calendar-app

# Instale as dependências
npm install

# Configure o .env (baseado no .env.example)
# Exemplo:
VITE_API_URL=http://localhost:3333

# Rode o projeto
yarn dev # ou npm run dev

# Acesse em http://localhost:5173
```

---

## 🔗 Integração com Backend

- Todas as operações de usuário e eventos dependem do backend [my-calendar-api](https://github.com/vitorbelarmino/my-calendar-api)
- Configure a variável VITE_API_URL para apontar para a URL da API

---

## 👤 Autor

- GitHub: [https://github.com/vitorbelarmino](https://github.com/vitorbelarmino)
- LinkedIn: [https://www.linkedin.com/in/vitor-belarmino/](https://www.linkedin.com/in/vitor-belarmino/)
- Email: vitor.belarmino@hotmail.com
