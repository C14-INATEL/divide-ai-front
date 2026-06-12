Você é um arquiteto frontend sênior especialista em React, TypeScript, Vite, arquitetura em camadas, separação de responsabilidades, organização de pastas, componentização e manutenção de aplicações frontend modernas.

Quero que você analise a arquitetura atual do projeto abaixo e proponha melhorias, ajustes ou validações arquiteturais sem descaracterizar a estrutura existente.

O objetivo não é reescrever o projeto inteiro. O objetivo é evoluir a arquitetura com segurança, mantendo clareza, organização, escalabilidade e facilidade de manutenção.

---

# Contexto do projeto

Estou trabalhando em uma aplicação frontend utilizando:

- React
- TypeScript
- Vite
- Tailwind CSS
- DaisyUI
- Axios
- Zustand
- Vitest
- React Testing Library
- Jenkins para CI/CD

O projeto segue uma organização em camadas:

- `data`: comunicação com API, hooks e mocks;
- `domain`: tipos, regras de negócio, enums e utilitários;
- `presentation`: componentes, páginas, rotas, layouts e stores;
- `test`: setup global de testes.

---

# Arquitetura atual de pastas

```txt
[COLE_AQUI_A_ARQUITETURA_DE_PASTAS]
```

---

# Funcionalidade ou módulo analisado

- Módulo/feature: [NOME_DO_MODULO_OU_FEATURE]
- Objetivo da análise: [OBJETIVO_DA_ANALISE]
- Arquivos principais: [ARQUIVOS_PRINCIPAIS]
- Arquivos relacionados: [ARQUIVOS_RELACIONADOS]
- Problema percebido: [PROBLEMA_OU_DUVIDA_ARQUITETURAL]

---

# Objetivo

Quero que você:

1. Analise a organização atual do projeto;
2. Verifique se a separação entre `data`, `domain` e `presentation` está coerente;
3. Identifique possíveis problemas de acoplamento;
4. Sugira melhorias na organização de pastas e responsabilidades;
5. Avalie se os componentes estão bem posicionados;
6. Avalie se hooks, services, types, utils e stores estão nas camadas corretas;
7. Sugira uma estrutura melhor somente se realmente fizer sentido;
8. Explique os motivos das decisões arquiteturais;
9. Evite mudanças grandes e desnecessárias.

---

# Critérios de análise

Analise principalmente:

- separação de responsabilidades;
- acoplamento entre camadas;
- reutilização de componentes;
- organização por domínio ou por camada;
- posicionamento de services;
- posicionamento de hooks;
- posicionamento de stores;
- posicionamento de types/interfaces;
- organização de páginas;
- organização de componentes reutilizáveis;
- duplicação de lógica;
- consistência de nomenclatura;
- escalabilidade para novas features;
- facilidade de testes;
- facilidade de manutenção;
- clareza para novos desenvolvedores.

---

# Regras arquiteturais desejadas

Considere como regra geral:

- `data/services`: deve concentrar comunicação com API;
- `data/hooks`: deve conter hooks ligados a dados, fetch, debounce, queries ou manipulação de dados;
- `data/mocks`: deve conter mocks usados para desenvolvimento ou testes;
- `domain/types`: deve conter tipos, interfaces e enums compartilhados;
- `domain/utils`: deve conter funções puras ou utilitários de domínio;
- `presentation/components`: deve conter componentes reutilizáveis;
- `presentation/pages`: deve conter telas/páginas;
- `presentation/routes`: deve conter rotas e guards;
- `presentation/store`: deve conter estados globais de UI/autenticação/modal ou stores usados pela apresentação;
- `presentation/components/layouts`: deve conter layouts reutilizáveis;
- `test`: deve conter setup global e utilitários de teste.

---

# O que evitar

Não quero sugestões exageradas como:

- reescrever toda a arquitetura;
- migrar para outro framework;
- criar complexidade desnecessária;
- aplicar Clean Architecture de forma pesada demais;
- criar muitas abstrações prematuras;
- mover arquivos sem ganho real;
- transformar tudo em módulos complexos;
- criar pastas genéricas demais;
- sugerir padrões difíceis de manter para um projeto pequeno/médio.

Evite também:

- sugestões vagas;
- comentários genéricos;
- mudanças sem justificativa;
- recomendações que não combinem com React/Vite;
- ignorar a estrutura atual.

---

# Tipos de recomendações esperadas

Quando fizer sentido, sugira:

- renomeação de pastas ou arquivos;
- criação de subpastas por feature;
- separação entre componentes globais e componentes específicos;
- extração de hooks;
- extração de types;
- reorganização de services;
- padronização de exports;
- criação de barrel files, se fizer sentido;
- melhoria na localização dos testes;
- melhoria na localização dos mocks;
- separação entre lógica de UI e lógica de dados;
- isolamento de regras de negócio no `domain`;
- redução de acoplamento entre página e service;
- melhoria na escalabilidade do módulo.

---

# Estrutura atual real do projeto

Use como referência esta arquitetura:

```txt
divide-ai-front/
├── public/
├── jenkins/
├── src/
│   ├── data/
│   │   ├── hooks/
│   │   ├── mocks/
│   │   └── services/
│   │       ├── auth-service/
│   │       ├── debt-service/
│   │       ├── group-service/
│   │       ├── user-service/
│   │       └── http/
│   ├── domain/
│   │   ├── types/
│   │   │   ├── enums/
│   │   │   └── interfaces/
│   │   └── utils/
│   ├── presentation/
│   │   ├── components/
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
│   │   │   └── layouts/
│   │   ├── pages/
│   │   ├── routes/
│   │   └── store/
│   ├── test/
│   ├── main.tsx
│   └── index.css
├── Jenkinsfile
├── vite.config.ts
├── vitest.config.ts
├── tsconfig.app.json
└── package.json
```

---

# O que espero na resposta

Responda exatamente nesta estrutura:

## Análise geral

Explique brevemente como está a arquitetura atual e se ela está coerente para o tamanho do projeto.

---

## Pontos positivos

Liste os principais pontos positivos da arquitetura atual.

---

## Pontos de atenção

Liste problemas, riscos ou sinais de possível acoplamento.

---

## Recomendações

Sugira melhorias práticas, priorizando mudanças pequenas e de alto impacto.

---

## Estrutura sugerida

Se fizer sentido, proponha uma estrutura de pastas ajustada.

Se a estrutura atual já estiver adequada, explique que não há necessidade de grandes mudanças.

---

## Aplicação na feature analisada

Explique como as recomendações se aplicam ao módulo ou funcionalidade informada.

---

## Decisões justificadas

Explique por que cada mudança sugerida faz sentido e qual problema resolve.

---

## O que não alterar

Liste o que deve permanecer como está para evitar complexidade desnecessária.

---

# Tarefa final

Agora analise a arquitetura do projeto e o módulo [NOME_DO_MODULO_OU_FEATURE], considerando os arquivos [ARQUIVOS_PRINCIPAIS], e sugira melhorias arquiteturais seguindo os critérios acima.
