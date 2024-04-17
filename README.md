## Sobre
No projeto foi desenvolvido com ReactJS e NextJS, uma plataforma para listagem de posts com a possibildiade de gerir um serviço de assinatura.

A aplicação foi desenvolvida utilizando o framework NextJS aplicando conceitos como consumo de API externas, API Root, Server Side Rendering (SSR), Static Site Generation (SSG), STRIPE para pagamentos das subscriptions, NextAuth para autenticação com Github, FaunaDB para armazenar as informações do usuário em um banco de dados e Prismic CMS para adição e gerenciamento do conteúdo dos posts.

## Tecnologias

- ReactJS
- NextJS
- TypeScript
- SASS
- Next-Auth
- Stripe
- FaunaDB
- Prismic CMS

## Passo a passo

``` bash
# Execute yarn para instalar as dependências
$ yarn

# Na raiz do projeto crie uma copia do arquivo .env.local.example
# Altere o nome da copia para .env.local
# Preencha as variáveis ambiente de acordo com as instruções
$ cp .env.local.example .env.local

# Execute stripe listen para ouvir eventos do webhook
$ stripe listen --forward-to localhost:3000/api/webhooks 

# Para iniciar a aplicação
$ yarn dev
```

## Requisitos obrigatorios 

Instalação: 
- Git
- Yarn
- Stripe CLI

Contas para acesso:
- Stripe
- FaunaDB
- Prismic CMS
