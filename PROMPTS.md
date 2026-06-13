# Prompts Utilizados

## Objetivo

Este documento registra a utilização de ferramentas de Inteligência Artificial durante o desenvolvimento do projeto.

Os prompts documentados abaixo foram utilizados pelos integrantes da equipe como apoio em atividades de desenvolvimento, arquitetura, design, testes, infraestrutura e documentação.

Todos os artefatos gerados pela IA foram revisados, adaptados e validados manualmente antes de serem incorporados ao projeto.

---

# Registro de Utilizações

## Utilização 01 - Configuração de CI/CD com Jenkins

**Responsável:** Juliano

**Ferramenta:** Claude

### Objetivo

Configurar um ambiente Jenkins do zero para realizar integração contínua e deploy automático de uma aplicação React desenvolvida com Vite.

### Prompt

> me ajude a configurar meu jenkins para que faça o CI/CD do meu projeto front-end react. não tenho nada baixado/configurado do jenkins. então seu guia deve ser bem nível basico. apenas tenho conhecimento de github actions, então não manjo muito. De inicio, faça para que o jenkins faça o deploy do meu projeto vite react tsx na vercel, ou algo assim

### Resultado Obtido

Resultado satisfatório.

A IA forneceu um guia completo para instalação, configuração e utilização do Jenkins, permitindo a criação de um pipeline de CI/CD para o projeto frontend e sua integração com a plataforma de deploy.

### Impacto no Projeto

- Redução do tempo de configuração do ambiente;
- Apoio na criação do pipeline de integração contínua;
- Automatização do processo de deploy.

---

## Utilização 02 - Estruturação do Módulo de Dívidas

**Responsável:** Juliano

**Ferramenta:** Codex

### Objetivo

Auxiliar na modelagem e implementação do módulo de gerenciamento de dívidas coletivas a partir da arquitetura existente do sistema e das regras de negócio definidas na história de usuário.

### Prompt

> Com base na arquitetura atual do sistema, crie a parte de dívidas de uma maneira similar à parte de grupos. Use o mesmo layout pois será bem parecido. Vou mandar os endpoints disponíveis no backend e a história de usuário para contextualização.

_(História de usuário e regras de negócio do card do Jira foram fornecidas ao modelo para maior embasamento e contexto)_

### Resultado Obtido

Resultado muito satisfatório.

A IA auxiliou na definição da estrutura do módulo, no consumo correto dos endpoints disponíveis e na validação das regras de negócio descritas na documentação funcional.

### Impacto no Projeto

- Agilidade na implementação da funcionalidade;
- Melhor aderência às regras de negócio;
- Redução do tempo gasto na modelagem inicial da solução.

---

## Utilização 03 - Geração de Interface de Usuário

**Responsável:** Tiago Andrade

**Ferramenta:** Claude

### Objetivo

Gerar interfaces e componentes visuais a partir dos requisitos do sistema.

### Prompt

Template genérico armazenado no arquivo [generate-interface.md](./prompts/generate-interface.md).

O prompt utiliza placeholders para descrição da funcionalidade, requisitos visuais, regras de negócio e componentes esperados.

### Resultado Obtido

Resultado satisfatório.

Grande parte da interface do sistema foi construída utilizando sugestões geradas pela IA, incluindo estrutura de telas, organização de componentes e fluxos de navegação.

### Impacto no Projeto

- Aceleração do desenvolvimento frontend;
- Maior produtividade na construção das telas;
- Apoio na definição da experiência do usuário.

---

## Utilização 04 - Geração de Casos de Teste

**Responsável:** Tiago Andrade

**Ferramenta:** Claude

### Objetivo

Auxiliar na criação de cenários e casos de teste a partir de histórias de usuário e critérios de aceite.

### Prompt

Template genérico armazenado nos arquivos [create-unit-tests.md](./prompts/create-unit-tests.md) e [create-integration-tests.md](./prompts/create-integration-tests.md).

O prompt utiliza placeholders para história de usuário, regras de negócio, critérios de aceite e fluxos esperados.

### Resultado Obtido

Resultado satisfatório.

A IA auxiliou na identificação de cenários positivos, negativos, validações de campos e testes de borda que serviram de base para o processo de qualidade.

### Impacto no Projeto

- Maior cobertura de testes;
- Identificação antecipada de possíveis falhas;
- Apoio ao processo de QA.

---

## Utilização 05 - Apoio Arquitetural

**Responsável:** Tiago Andrade

**Ferramenta:** Claude

### Objetivo

Auxiliar na definição e validação da arquitetura frontend do projeto, incluindo organização de pastas, separação de responsabilidades entre camadas, posicionamento de componentes, stores, hooks, services e tipagens compartilhadas.

### Prompt

Template genérico armazenado no arquivo [architeture.md](./prompts/architeture.md).

O prompt foi utilizado para analisar a estrutura arquitetural do projeto, baseada nas camadas `data`, `domain` e `presentation`, avaliando aspectos como:

- organização de componentes reutilizáveis;
- separação entre regras de negócio e apresentação;
- estruturação de services e comunicação com API;
- organização de hooks e stores;
- escalabilidade para novas funcionalidades;
- redução de acoplamento entre módulos;
- manutenção da consistência arquitetural do projeto.

### Resultado Obtido

Resultado satisfatório.

A IA auxiliou na validação da arquitetura adotada pelo projeto e forneceu recomendações para organização de módulos, componentes e responsabilidades entre camadas. As sugestões contribuíram para a definição da estrutura inicial do frontend e para a padronização da organização do código ao longo do desenvolvimento.

### Impacto no Projeto

- Melhor organização da estrutura de pastas;
- Separação mais clara de responsabilidades entre camadas;
- Maior padronização entre funcionalidades e componentes;
- Redução de possíveis acoplamentos desnecessários;
- Facilidade para evolução e manutenção futura do sistema;
- Maior consistência na implementação de novas features.


## Utilização 06 - Testes Unitários e Adições no Pipeline Jenkins

**Responsável:** Leonardo Ferreira

**Ferramenta:** Claude

### Objetivo

Adicionar jobs de testes e relatórios no Jenkins, configurar o salvamento de artefatos (Vitest coverage v8 e JUnit), e corrigir quebras no pipeline causadas por tipagens TypeScript antigas e falta de recursos no Node.js do CI.

### Prompt

> "Me ajuda a adicionar no Jenkins um job de testes, um job de relatório de testes e salvar os artefatos.", "O build está quebrando com esses erros de TypeScript, me ajuda a corrigir." e "Os testes de login e register passam na minha máquina mas falham no Jenkins com erro de localStorage."

### Resultado Obtido

Resultado satisfatório com ajustes manuais.

O pipeline foi configurado com stages de testes resilientes (usando `catchError` para publicar o relatório mesmo com falha em testes unitários). A IA também identificou incompatibilidades de versão e sugeriu a implementação de um polyfill de `localStorage` para destravar os testes no servidor, além de ajudar no alinhamento das tipagens na tela Home.

### Impacto no Projeto

- Garantia de qualidade contínua com relatórios automatizados no CI;
- Estabilização da esteira de testes que antes falhava por diferenças de ambiente;
- Refatoração de dívidas técnicas de tipagem no componente Home.

---

## Utilização 07 - Configuração de Banco de Dados Local com Docker

**Responsável:** Leonardo Ferreira

**Ferramenta:** Gemini

### Objetivo

Subir um ambiente local e isolado do PostgreSQL utilizando Docker para permitir a execução das migrations do backend e solucionar erros de conexão recusada.

### Prompt

> "docker run --name divide-ai-db -e POSTGRES_USER=admin -e POSTGRES_PASSWORD=admin -e POSTGRES_DB=divide_ai -p 5432:5432 -d postgres:15 explica essa linha de código para mim pf" e dúvidas sobre o erro `Connection refused (0x0000274D)`.

### Resultado Obtido

Resultado satisfatório.

A IA destrinchou os comandos de containerização e auxiliou no ajuste correto das credenciais e string de conexão no arquivo `.env` do backend, o que permitiu rodar as migrations do Alembic sem erros no Windows.

### Impacto no Projeto

- Configuração ágil do ambiente de desenvolvimento local;
- Destravamento das rotinas de banco de dados e backend na máquina de desenvolvimento sem necessidade de instalações pesadas.

---

## Utilização 08 - Debugging de Integração (Front-end e Back-end)

**Responsável:** Leonardo Ferreira

**Ferramenta:** Gemini

### Objetivo

Diagnosticar e resolver falhas de comunicação entre a API e o Front-end durante a renderização da tela Home, diferenciando bloqueios de rede de erros de autenticação.

### Prompt

> "coloquei o token no group service e rodei o front, mas as telas tão quebradas n aparece o grupo."

### Resultado Obtido

Resultado muito satisfatório.

A IA forneceu um roteiro prático de investigação utilizando as abas Network e Console do navegador para mapear problemas comuns, ajudando a identificar se a falha se tratava de um bloqueio de CORS vindo da API, um erro `401 Unauthorized` por token inválido ou um simples retorno vazio (`[]`) do banco.

### Impacto no Projeto

- Autonomia e agilidade na resolução de bugs de comunicação de APIs;
- Estabilização da renderização dinâmica e consumo de dados reais pela interface da tela Home.

# Considerações Finais

A utilização de Inteligência Artificial teve papel de apoio ao desenvolvimento do projeto, contribuindo para acelerar atividades de implementação, design, testes e arquitetura.

As ferramentas utilizadas não substituíram a análise técnica da equipe. Todas as sugestões geradas passaram por revisão humana, validação técnica e adaptações antes de serem incorporadas ao produto final.
