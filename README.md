# DivideAi — Frontend

| Aluno                           | Matrícula |
| ------------------------------- | --------- |
| Davi Rosim                      | 223       |
| Henrique Pizzoni                | 527       |
| João Pedro Martins dos Santos   | 309       |
| Juliano Moreira Aleixo          | 501       |
| Leonardo dos Santos Ferreira    | 240       |
| Tiago Braga Bassotto de Andrade | 2104      |

---

## Descrição da aplicação

O DivideAi é uma aplicação web para divisão de despesas e controle de dívidas entre grupos de pessoas. A plataforma permite criar grupos, registrar gastos, acompanhar quem deve para quem e gerenciar acertos financeiros de forma simples e visual. O objetivo é facilitar a gestão de despesas compartilhadas em situações como viagens, repúblicas e eventos.

---

## Tecnologias utilizadas

- **[React 19](https://react.dev/)** — biblioteca principal de UI
- **[TypeScript 5.8](https://www.typescriptlang.org/)** — tipagem estática
- **[Vite 7](https://vite.dev/)** — bundler e servidor de desenvolvimento
- **[Tailwind CSS 4](https://tailwindcss.com/)** — estilização utilitária
- **[DaisyUI 5](https://daisyui.com/)** — componentes de UI baseados em Tailwind
- **[React Router 7](https://reactrouter.com/)** — roteamento client-side
- **[Zustand 5](https://zustand.docs.pmnd.rs/)** — gerenciamento de estado global
- **[Axios](https://axios-http.com/)** — cliente HTTP
- **[Lucide React](https://lucide.dev/)** — biblioteca de ícones
- **[Vitest 4](https://vitest.dev/)** — framework de testes unitários
- **[Testing Library](https://testing-library.com/)** — utilitários de teste para React
- **[Jenkins](https://www.jenkins.io/)** — pipeline de CI/CD (rodando localmente via Docker)
- **[Vercel](https://vercel.com/)** — plataforma de deploy

---

## Como acessar online e como rodar local

### Acesso online

A aplicação está disponível em: **[https://divide-ai-front.vercel.app](https://divide-ai-front.vercel.app)**

### Rodando localmente

**Pré-requisitos:** Node.js 24+, npm

```bash
# Clone o repositório
git clone https://github.com/C14-INATEL/divide-ai-front.git
cd divide-ai-front

# Instale as dependências
npm install

# Configure as variáveis de ambiente
cp .env.example .env
# Edite o .env com a URL da API

# Inicie o servidor de desenvolvimento
npm run dev
```

A aplicação estará disponível em `http://localhost:5173`.

---

## Como testar

```bash
# Rodar todos os testes
npm run test

# Rodar com cobertura
npm run test:coverage
```

Os testes utilizam Vitest + Testing Library com ambiente jsdom. Os arquivos de teste seguem o padrão `*.test.tsx` / `*.test.ts` e ficam junto aos componentes/páginas que testam.

---

## Esquema de pastas

```
divide-ai-front/
├── public/                        # Assets estáticos
├── jenkins/                       # Configuração do Jenkins (Dockerfile, plugins, YAML)
├── src/
│   ├── data/                      # Camada de dados
│   │   ├── hooks/                 # Custom hooks (use-fetch, use-debounce)
│   │   ├── mocks/                 # Dados mockados para desenvolvimento
│   │   └── services/              # Serviços de comunicação com a API
│   │       ├── auth-service/
│   │       ├── debt-service/
│   │       ├── group-service/
│   │       ├── user-service/
│   │       └── http/              # Instância base do Axios
│   ├── domain/                    # Regras de negócio e tipos
│   │   ├── types/
│   │   │   ├── enums/             # Enumerações (expenses, groups, settlements, users)
│   │   │   └── interfaces/        # Interfaces TypeScript (dashboard, expenses, groups, etc.)
│   │   └── utils/                 # Utilitários (auth, avatar, cn)
│   ├── presentation/              # Camada de apresentação
│   │   ├── components/            # Componentes reutilizáveis
│   │   │   ├── add-member-modal/
│   │   │   ├── create-debt-modal/
│   │   │   ├── create-group-modal/
│   │   │   ├── debt-card/
│   │   │   ├── edit-group-modal/
│   │   │   ├── footer/
│   │   │   ├── group-card/
│   │   │   ├── header/
│   │   │   ├── sidebar/
│   │   │   ├── theme-swapper/
│   │   │   ├── modal-container/
│   │   │   └── layouts/           # Layouts (auth, authenticated, root)
│   │   ├── pages/                 # Páginas da aplicação
│   │   ├── routes/                # Configuração de rotas e guards
│   │   └── store/                 # Stores Zustand (auth, modal)
│   ├── test/                      # Setup global de testes
│   ├── main.tsx                   # Entrypoint
│   └── index.css                  # Estilos globais
├── Jenkinsfile                    # Pipeline CI/CD
├── vite.config.ts
├── vitest.config.ts
├── tsconfig.app.json
└── package.json
```

---

## Páginas

| Rota                     | Página              | Autenticada |
| ------------------------ | ------------------- | ----------- |
| `/`                      | Dashboard (Home)    | Sim         |
| `/grupos`                | Listagem de Grupos  | Sim         |
| `/grupos/:id`            | Detalhes do Grupo   | Sim         |
| `/grupos/:id/despesas`   | Despesas do Grupo   | Sim         |
| `/grupos/:id/pagamentos` | Pagamentos do Grupo | Sim         |
| `/grupos/:id/membros`    | Membros do Grupo    | Sim         |
| `/despesas`              | Dívidas             | Sim         |
| `/acertos`               | Acertos             | Sim         |
| `/participantes`         | Participantes       | Sim         |
| `/relatorios`            | Relatórios          | Sim         |
| `/insights`              | Insights            | Sim         |
| `/historico`             | Histórico           | Sim         |
| `/notificacoes`          | Notificações        | Sim         |
| `/configuracoes`         | Configurações       | Sim         |
| `/ajuda`                 | Ajuda               | Sim         |
| `/suporte`               | Suporte             | Sim         |
| `/login`                 | Login               | Não         |
| `/cadastro`              | Cadastro            | Não         |

---

## Exemplo do `.env`

```env
VITE_API_URL=http://localhost:8000
```

---

## Critérios atendidos

| #   | Critério                                                                                                                                    | Status |
| --- | ------------------------------------------------------------------------------------------------------------------------------------------- | ------ |
| 1   | **Aplicação funcional** — aplicação rodando, escopo claro, boas práticas, código legível                                                    | ✅     |
| 2   | **Gerenciamento de dependências** — npm com `package-lock.json` versionado, build reproduzível                                              | ✅     |
| 3   | **Testes unitários relevantes** — cobertura útil com Vitest + Testing Library, testes conectados ao domínio                                 | ✅     |
| 4   | **CI/CD (sem GitHub Actions)** — pipeline Jenkins com stages de lint, build, testes e relatório de cobertura                                | ✅     |
| 5   | **Versionamento e contribuições** — commits significativos de todos os membros, histórico organizado com branches por feature/refactor/test | ✅     |
| 6   | **Revisão de código (PRs)** — pull requests com revisão entre membros antes do merge na `dev`                                               | ✅     |
| 7   | **README completo** — instalação, execução, páginas, estrutura de pastas e seção de Uso de IA                                               | ✅     |
| 8   | **Histórias de usuário** — mínimo 5 histórias com critérios de aceitação e rastreabilidade (ver seção abaixo)                               | ✅     |
| 9   | **Metodologia de desenvolvimento** — metodologia justificada, papéis, cadência e ferramentas (ver seção abaixo)                             | ✅     |
| 10  | **Dinâmica de desenvolvimento** — relato honesto da dinâmica do grupo, decisões e lições aprendidas (ver seção abaixo)                      | ✅     |
| 11  | **Refactoring** — refatorações aplicadas ao longo do projeto com evidência em commits/PRs (branch `refactor/minor-fixes`)                   | ✅     |
| 12  | **Uso transparente de IA** — modelos, prompts, respostas aceitas/descartadas e dinâmica de uso documentados                                 | ✅     |
| 13  | **Defesa Q&A** — todos os membros preparados para responder sobre qualquer parte do sistema                                                 | ✅     |
| 14  | **Engenharia de Software geral** — coerência entre requisitos, código, testes e pipeline; visão de sistema                                  | ✅     |

---

## Metodologia de desenvolvimento

...

---

# Uso de Inteligência Artificial

Durante o desenvolvimento deste projeto, a equipe utilizou ferramentas de Inteligência Artificial como apoio em diferentes etapas da construção do sistema.

Os prompts utilizados encontram-se documentados no arquivo `prompts.md`, incluindo interações realizadas pelos integrantes da equipe para auxiliar em atividades de arquitetura, implementação, design, testes, infraestrutura e documentação.

## Aplicações da IA no Projeto

A Inteligência Artificial foi utilizada para:

- Criação e refinamento de interfaces de usuário;
- Definição e validação de arquiteturas de software;
- Implementação de funcionalidades a partir de histórias de usuário;
- Geração e revisão de cenários de teste;
- Configuração de ferramentas de infraestrutura e CI/CD;
- Apoio na documentação técnica do sistema.

## Resultados Obtidos

Os resultados foram considerados satisfatórios pela equipe. As ferramentas de IA contribuíram para acelerar o desenvolvimento, auxiliar na tomada de decisões técnicas e reduzir o tempo gasto em atividades de pesquisa e prototipação.

Entre os principais resultados obtidos estão:

- Criação de grande parte da interface do sistema com auxílio de IA;
- Estruturação da arquitetura de funcionalidades complexas a partir das regras de negócio definidas;
- Apoio na implementação de módulos do sistema;
- Auxílio na configuração de ferramentas de integração e entrega contínua;
- Geração de cenários de teste e validações baseadas nos requisitos do projeto.

Todas as sugestões geradas foram revisadas, adaptadas e validadas pelos integrantes da equipe antes de serem incorporadas ao produto final.

## Transparência

Para fins de transparência acadêmica e rastreabilidade, todos os prompts utilizados durante o desenvolvimento estão registrados no arquivo [prompts.md](./PROMPTS.md), juntamente com seus respectivos objetivos e resultados obtidos.
