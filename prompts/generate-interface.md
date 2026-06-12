Você é um desenvolvedor frontend sênior com forte senso de UI/UX, especialista em React, TypeScript, Tailwind CSS, DaisyUI, componentização e criação de interfaces modernas para produtos SaaS.

Quero que você analise o contexto abaixo e crie uma tela web responsiva, refinada e pronta para produção, seguindo o design system e a identidade visual descritos neste prompt.

O objetivo não é criar uma tela genérica. O objetivo é gerar uma interface realista, bonita, limpa, reutilizável e coerente com um produto moderno.

---

# Contexto do projeto

Estou trabalhando em uma aplicação frontend utilizando:

- React
- TypeScript
- Tailwind CSS
- DaisyUI

O projeto é uma aplicação de:

[DESCREVA_O_TIPO_DE_PRODUTO]

Exemplo:

- sistema financeiro;
- dashboard administrativo;
- plataforma colaborativa;
- sistema de gestão;
- aplicação de divisão de despesas;
- marketplace;
- painel interno;
- produto SaaS.

---

# Funcionalidade / Página

- Nome da página: [NOME_DA_PAGINA]
- Tipo da página: [DASHBOARD / LISTAGEM / FORMULÁRIO / DETALHES / CONFIGURAÇÕES / RELATÓRIO / OUTRO]
- Usuário principal da tela: [TIPO_DE_USUARIO]
- Objetivo principal da tela: [OBJETIVO_DA_TELA]
- Contexto de uso: [CONTEXTO_DE_USO]
- Nível de importância da tela no produto: [PRINCIPAL / SECUNDÁRIA / AUXILIAR]

---

# Contexto funcional

A tela deve representar o seguinte fluxo ou funcionalidade:

[DESCREVA_A_FUNCIONALIDADE]

Inclua aqui, se fizer sentido:

- regras de negócio;
- ações disponíveis;
- informações que precisam aparecer;
- permissões do usuário;
- estados importantes;
- fluxos principais;
- mensagens relevantes;
- dados que o usuário precisa entender rapidamente.

---

# Design system e identidade visual

Use como base uma identidade visual com aparência:

- minimalista;
- limpa;
- intuitiva;
- moderna;
- premium, mas sem exagero;
- elegante;
- organizada;
- confiável;
- humana;
- não genérica;
- não parecida com template pronto;
- não artificial ou “AI-looking”.

A interface deve parecer um produto real, criado por um designer cuidadoso.

Evite:

- gradientes aleatórios;
- efeitos exagerados;
- excesso de sombras;
- excesso de bordas;
- excesso de ícones;
- cores muito saturadas;
- componentes poluídos;
- aparência genérica de dashboard;
- layout com cara de template automático.

---

# Direção visual

Siga estas decisões visuais:

- tema preferencialmente claro;
- paleta neutra e elegante;
- bom uso de whitespace;
- hierarquia visual clara;
- espaçamento consistente;
- cantos arredondados, mas sem exagero;
- sombras suaves;
- cards discretos;
- tipografia limpa;
- informações importantes com destaque sutil;
- ações principais bem visíveis;
- ações secundárias mais discretas;
- ações perigosas pouco chamativas, mas acessíveis;
- layout fácil de escanear;
- responsividade para desktop e mobile.

A tela deve transmitir uma sensação de produto financeiro/colaborativo confiável, mesmo que a funcionalidade não seja necessariamente financeira.

---

# Componentes esperados

Use DaisyUI como base do design system, customizando com Tailwind quando necessário para deixar a interface mais refinada.

Quando fizer sentido para a tela, utilize componentes como:

- card;
- stats;
- button;
- badge;
- dropdown;
- modal;
- tabs;
- table;
- avatar;
- input;
- select;
- textarea;
- alert;
- skeleton/loading;
- menu;
- tooltip.

Não use componentes apenas por usar. Escolha os que realmente fazem sentido para a experiência da página.

---

# Estrutura sugerida da tela

A estrutura abaixo serve como referência. Adapte conforme a página solicitada.

## 1. Header da página

Crie um topo bem organizado contendo:

- título principal;
- subtítulo ou descrição curta;
- metadados relevantes;
- ação primária;
- ações secundárias;
- menu discreto para ações adicionais;
- ação perigosa, se existir, em local menos chamativo.

O header deve ser equilibrado, limpo e não pode parecer lotado.

---

## 2. Indicadores principais

Quando fizer sentido, adicione cards ou stats com os principais números da página.

Exemplos:

- total de registros;
- valor total;
- status pendentes;
- itens confirmados;
- quantidade de participantes;
- progresso;
- métricas importantes da funcionalidade.

Esses indicadores devem ser minimalistas, legíveis e fáceis de comparar.

---

## 3. Conteúdo principal

Crie a área principal da tela de acordo com a funcionalidade.

Ela pode conter:

- lista;
- tabela;
- cards;
- formulário;
- detalhes;
- gráfico simples;
- timeline;
- resumo;
- agrupamentos por status;
- seções lado a lado;
- painel lateral;
- abas internas.

Escolha a estrutura que tornar a experiência mais clara e natural.

---

## 4. Navegação interna

Se a página tiver muitas informações, use uma navegação interna com tabs ou navegação segmentada.

Exemplos:

- Visão geral;
- Detalhes;
- Participantes;
- Pagamentos;
- Histórico;
- Configurações;
- Relatórios;
- Atividades.

A aba inicial deve ser a mais importante para o usuário.

---

## 5. Estados e feedbacks

Inclua, quando fizer sentido:

- loading;
- estado vazio;
- erro;
- sucesso;
- status pendente;
- status confirmado;
- status parcial;
- status bloqueado;
- feedback visual de validação;
- mensagens explicativas.

Os feedbacks devem ser claros, mas discretos.

---

## 6. Histórico ou atividade

Se a funcionalidade tiver ações recentes ou rastreabilidade, inclua uma seção secundária com histórico.

Exemplos:

- item criado;
- pagamento confirmado;
- usuário adicionado;
- alteração realizada;
- status atualizado;
- configuração modificada.

Essa seção deve ser visualmente secundária.

---

# Conteúdo da tela

Use dados realistas e coerentes com o contexto informado.

Idioma dos textos da interface: [IDIOMA_DA_INTERFACE]

Exemplos de dados que podem ser usados:

- nomes de pessoas;
- nomes de grupos;
- descrições realistas;
- datas;
- valores;
- status;
- categorias;
- e-mails;
- chaves PIX;
- nomes de empresas;
- mensagens de sistema.

Não use textos genéricos como “Lorem ipsum” ou conteúdos sem contexto.

---

# Requisitos de UX

A tela deve seguir estes princípios:

1. Ser fácil de entender rapidamente;
2. Priorizar as informações mais importantes;
3. Evitar poluição visual;
4. Deixar ações principais óbvias;
5. Manter ações perigosas discretas;
6. Usar hierarquia visual consistente;
7. Ser responsiva;
8. Parecer pronta para produção;
9. Ter boa legibilidade;
10. Evitar decisões visuais exageradas.

---

# Requisitos técnicos

Implemente usando:

- React;
- TypeScript;
- Tailwind CSS;
- DaisyUI.

Siga estas regras:

- componentize a tela de forma reutilizável;
- evite um único componente gigante;
- use nomes claros para componentes;
- mantenha o código organizado;
- evite repetição excessiva;
- use dados mockados somente quando necessário;
- deixe fácil substituir mocks por dados reais;
- mantenha a estrutura compatível com uma aplicação frontend moderna;
- não use bibliotecas externas desnecessárias;
- não crie lógica complexa sem necessidade.

---

# Componentização esperada

Quando fizer sentido, separe a tela em componentes como:

- PageHeader;
- SummaryCards;
- MainTabs;
- ContentSection;
- DataTable;
- EmptyState;
- StatusBadge;
- ActionDropdown;
- ActivityTimeline;
- DetailsCard;
- FormSection.

Adapte os nomes conforme a funcionalidade.

---

# Acessibilidade e responsividade

Garanta que a interface:

- funcione bem em mobile e desktop;
- tenha botões com textos claros;
- tenha contraste adequado;
- use labels quando houver campos;
- evite depender apenas de cor para indicar status;
- mantenha boa navegação visual.

---

# Arquivos e contexto do projeto

Considere os arquivos abaixo, se forem fornecidos:

- Página principal: [CAMINHO_DA_PAGINA]
- Componentes existentes: [CAMINHOS_DOS_COMPONENTES]
- Design system existente: [CAMINHO_DO_DESIGN_SYSTEM]
- Hooks relacionados: [CAMINHOS_DOS_HOOKS]
- Services relacionados: [CAMINHOS_DOS_SERVICES]
- Tipagens existentes: [CAMINHOS_DAS_TYPES]
- Rotas relacionadas: [CAMINHOS_DAS_ROTAS]

Use padrões já existentes no projeto sempre que possível.

---

# Restrições

Não quero:

- layout genérico de admin panel;
- excesso de gradiente;
- visual exageradamente colorido;
- código muito acoplado;
- componentes difíceis de reutilizar;
- interface poluída;
- conteúdo sem sentido;
- aparência de template automático;
- alterações desnecessárias fora da página solicitada.

---

# O que espero na resposta

Responda exatamente nesta estrutura:

## Análise da tela

Explique brevemente o objetivo da tela e a lógica visual escolhida.

---

## Decisões de design

Liste as principais decisões visuais e de UX adotadas.

---

## Estrutura de componentes

Liste os componentes criados ou sugeridos.

---

## Código da tela

Entregue o código completo da tela.

---

## Dados mockados

Entregue os dados mockados utilizados, caso existam.

---

## Observações

Explique decisões importantes, limitações ou pontos que podem ser conectados posteriormente com API.

---

# Tarefa final

Agora crie a tela [NOME_DA_PAGINA] para a funcionalidade [NOME_DA_FUNCIONALIDADE], considerando o seguinte contexto:

[DESCREVA_AQUI_O_CONTEXTO_COMPLETO_DA_TELA]

A tela deve seguir o design system descrito neste prompt e manter uma aparência limpa, minimalista, premium, intuitiva, humana e pronta para produção.
