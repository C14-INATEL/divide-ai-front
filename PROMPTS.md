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

# Considerações Finais

A utilização de Inteligência Artificial teve papel de apoio ao desenvolvimento do projeto, contribuindo para acelerar atividades de implementação, design, testes e arquitetura.

As ferramentas utilizadas não substituíram a análise técnica da equipe. Todas as sugestões geradas passaram por revisão humana, validação técnica e adaptações antes de serem incorporadas ao produto final.
