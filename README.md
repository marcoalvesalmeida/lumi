# LUMI APP

Esse projeto foi desenvolvido utilizando

- NodeJS
- Express
- Postgres
- Prisma
- Vite
- React
- TailwindCSS
- Typescript
- Eslint
- Prettier

O projeto está dividido em dois diretórios que possuem a seguinte estrutura:

```sh
── backend
│   ├── data
│   ├── prisma
│   │   └── migrations
│   │       ├── 20240522010905_init
│   │       ├── 20240522012623_remove_name
│   │       └── 20240522140959_add_installation_code
│   ├── src
│   │   ├── db
│   │   ├── modules
│   │   │   ├── client
│   │   │   ├── extractor
│   │   │   │   └── invoices
│   │   │   │       ├── 3000055479
│   │   │   │       └── 3004298116
│   │   │   ├── installation
│   │   │   └── invoices
│   │   ├── routes
│   │   └── swagger
│   └── __tests__
└── frontend
  ├── dist
  │   └── assets
  ├── public
  ├── src
  │   ├── assets
  │   ├── components
  │   │   ├── Button
  │   │   ├── ChartBarKwh
  │   │   ├── ChartBarMoney
  │   │   ├── EmptyDataMessage
  │   │   └── Input
  │   ├── context
  │   ├── hooks
  │   ├── layouts
  │   ├── pages
  │   │   ├── Dashboard
  │   │   ├── Home
  │   │   └── InvoicesLibrary
  │   ├── services
  │   │   ├── Client
  │   │   └── Invoices
  │   ├── styles
  │   └── utils
  └── __tests__

```

## Documentação da API

O backend foi documentado utilizando o Swagger e isso garante uma documentação intuitiva e prática, visto que os testes podem ser realizados diretamente pela página web. Para acessar a documentação basta clica no link a seguir:

https://lumi-app-c1b5a2433b74.herokuapp.com/api/docs/

Para testar os enpoints basta escolher um deles e clicar na opção "Try it out".

## Demonstração

Para facilitar a demonstração foi realizado o deploy do frontend na Vercel e do backend na Heroku. Para visualizar a demonstração basta clicar no link a seguir:

https://lumi-roan.vercel.app/

<p align="center">
  <a href="https://lumi-roan.vercel.app/">
    <img src="/assets/img/print.png" alt="Tela Desktop" />
  </a>
</p>

## Pré-requisitos

Para utilizar esse projeto localmente é necessário a instalação do NodeJS, bem como a instalação do Yarn, Docker e Docker Compose.

## Banco de Dados

Na imagem a seguir é possível visualizar o Digrama de Entidade Relacionamento desse projeto.

<p align="center">
  <a href="https://lumi-roan.vercel.app/">
    <img src="/assets/img/der.png" alt="DER" />
  </a>
</p>

## Instalação

Para realizar a instalação local siga os seguintes passos:

1. Clone o repositório
   ```sh
   git clone https://github.com/marcoalvesalmeida/lumi.git
   ```
2. Entre na pasta raiz do projeto e depois na pasta backend com os seguintes comandos:
   ```sh
   cd lumi
   cd backend
   ```
3. E em seguida instale as dependências do backend:
   ```sh
   yarn install
   ```
4. Agora copie o arqivo ".env.example" para um arquivo ".env":
   ```sh
   cp .env.example .env
   ```
5. Edite o arquivo inserindo os dados que você deseja, não se preocupe, o docker-compose usará essa variáves para criar o banco, o que quer dizer que você não precisará que elas sejam pré-existentes (Obs: Não é necessário preencher a variável DATABASE_URL, ela será gerada automaticamente):
   ```sh
   DB_USER=your_db_user
   DB_PASSWORD=your_db_password
   DB_NAME=your_db_name
   PGADMIN_USER=your_email
   PGADMIN_PASSWORD=any_secret_key
   DATABASE_URL="postgresql://${DB_USER}:${DB_PASSWORD}@localhost:5432/${DB_NAME}?schema=public"
   ```
6. Usando o Docker execute os seguintes comandos para subir o container do PostgreSQL:
   ```sh
   docker-compose build
   docker-compose up -d
   ```
7. Para executar as migrations do Prisma utiliza o seguinte comando:
   ```sh
   yarn migrate
   ```
8. A partir desses passos você estará pronto para executar a extração de dados com um simples comando:
   ```sh
   yarn extract:data
   ```
9. E então poderá rodar o servidor:
   ```sh
   yarn start
   ```
10. Por padrão o projeto será executado na porta 3333 e então sua URL ficará da seguinte forma: http://localhost:3333

11. A partir disso precisaremos agora executar o projeto frontend, volte para a pasta raiz e em seguida entre na pasta frontend:

```sh
cd ..
cd frontend
```

12. Instale as dependências:

```sh
yarn install
```

13. Copie o arquivo ".env.example" para ".env":

```sh
cp .env.example .env
```

14. Se não houve modificação na URL do backend o arquivo derá permanecer da seguinte maneira:

```sh
VITE_API_URL=http://localhost:3333/api
```

15. Em seguida execute o frontend:

```sh
yarn dev
```

16. Então você poderá visualizar na URL fornecida que provavelmente será:
    http://localhost:5173/

## Rodando os testes

Para rodar os testes entre no diretório /frontend' ou /backend e execute:

```bash
  yarn test
```
