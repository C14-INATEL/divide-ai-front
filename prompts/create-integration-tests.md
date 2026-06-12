Você é um desenvolvedor frontend sênior especialista em testes de integração, React, TypeScript, Vite, Vitest, React Testing Library e arquitetura frontend moderna.

Quero que você analise a funcionalidade abaixo e crie testes de integração úteis, bem estruturados e focados em validar o comportamento real entre partes da aplicação.

O objetivo não é testar uma função isolada. O objetivo é validar se diferentes partes da feature funcionam corretamente juntas.

---

# Contexto do projeto

Estou trabalhando em uma aplicação frontend utilizando:

- React
- TypeScript
- Vite
- Vitest
- React Testing Library
- userEvent

Os mocks normalmente são feitos com:

- vi.mock

O projeto pode usar providers como:

- React Query
- Context API
- Zustand
- React Hook Form
- Router
- Providers internos da aplicação

Use os padrões já existentes no projeto sempre que possível.

---

# Funcionalidade analisada

- Funcionalidade: [NOME_DA_FUNCIONALIDADE]
- Página/Componente principal: [CAMINHO_DO_ARQUIVO_PRINCIPAL]
- Componentes relacionados: [CAMINHOS_DOS_COMPONENTES_RELACIONADOS]
- Hooks relacionados: [CAMINHOS_DOS_HOOKS_RELACIONADOS]
- Services/API relacionados: [CAMINHOS_DOS_SERVICES_RELACIONADOS]
- Objetivo do teste: [OBJETIVO_DO_TESTE]

---

# Objetivo

Quero que você:

1. Analise a feature de ponta a ponta dentro do frontend;
2. Entenda quais partes trabalham juntas;
3. Identifique os fluxos mais importantes;
4. Sugira os cenários de integração mais relevantes;
5. Implemente testes de integração que tragam confiança real;
6. Use mocks somente nas fronteiras externas, como API, services ou dependências fora da feature.

---

# Diferença esperada entre teste unitário e integração

Neste prompt, não quero testes unitários isolados demais.

Não quero testar apenas:

- uma função pura;
- um componente completamente isolado;
- uma prop simples;
- um texto estático;
- uma classe CSS;
- detalhes internos de implementação.

Quero testar fluxos onde várias partes funcionam juntas, por exemplo:

- página + formulário + hook;
- formulário + validação + submit;
- tabela + filtro + request;
- modal + mutation + atualização de listagem;
- hook + service mockado + estado de tela;
- página + providers + interação do usuário;
- componente pai + componentes filhos relevantes.

---

# Muito importante

Não crie testes artificiais apenas para aumentar cobertura.

Priorize testes que validem comportamento real da aplicação e que dariam confiança para alterar a feature no futuro.

Evite:

- snapshots grandes;
- testes que só verificam se renderizou;
- testes extremamente acoplados à implementação interna;
- mocks exagerados;
- testar detalhes privados;
- testar comportamento que já está coberto em teste unitário;
- testar biblioteca externa;
- depender de ordem frágil de elementos sem necessidade.

---

# O que deve ser analisado

Analise a integração entre:

- componentes pais e filhos;
- hooks;
- services;
- stores;
- providers;
- formulários;
- validações;
- requests;
- mutations;
- estados assíncronos;
- loading;
- erro;
- estado vazio;
- filtros;
- paginação;
- modais;
- sheets;
- dropdowns;
- navegação;
- side effects;
- callbacks importantes;
- regras de negócio da feature.

---

# Cenários esperados

Os cenários abaixo não são obrigatórios.

Eles servem como referência para você identificar o que realmente faz sentido testar na funcionalidade analisada.

Você também pode sugerir cenários adicionais caso encontre comportamentos importantes.

---

## Fluxo principal da feature

Quando fizer sentido, valide o fluxo principal usado pelo usuário.

Exemplos:

- usuário acessa a página;
- dados iniciais são carregados;
- usuário interage com formulário/tabela/modal;
- usuário confirma uma ação;
- aplicação chama o service correto;
- tela atualiza após sucesso.

---

## Integração com formulários

Quando houver formulário, valide:

- renderização dos campos principais;
- preenchimento pelo usuário;
- validações integradas;
- mensagens de erro;
- bloqueio de submit inválido;
- envio com payload correto;
- comportamento após submit com sucesso;
- comportamento após submit com erro;
- reset ou fechamento após sucesso, se existir.

---

## Integração com API/services

Quando houver request, mutation ou service:

- mocke a fronteira externa com vi.mock;
- não chame API real;
- valide loading;
- valide sucesso;
- valide erro;
- valide dados renderizados;
- valide payload enviado;
- valide parâmetros de busca/filtro/paginação;
- valide atualização da UI depois da mutation.

---

## Integração com tabela/listagem

Quando houver tabela ou listagem, valide:

- carregamento inicial;
- renderização dos itens;
- estado vazio;
- loading;
- erro;
- filtro;
- busca;
- paginação;
- ordenação, se existir;
- ação em linha;
- atualização da lista após uma ação.

---

## Integração com modal, sheet ou dropdown

Quando houver overlays, valide:

- abertura;
- fechamento;
- interação interna;
- confirmação;
- cancelamento;
- envio de dados;
- atualização da tela pai após ação;
- comportamento em erro.

---

## Integração com estados globais ou providers

Quando a feature depender de store ou provider, valide:

- estado inicial fornecido pelo provider;
- alteração de estado após interação;
- consumo correto do estado;
- side effects relevantes;
- isolamento entre testes.

Use wrappers de teste quando necessário.

---

## Integração com navegação

Quando houver router ou navegação:

- valide redirecionamento após ação;
- valide mudança de rota;
- valide parâmetros de rota;
- valide bloqueios de acesso, se fizer sentido;
- mocke navegação se o projeto seguir esse padrão.

---

## Estados assíncronos

Use corretamente:

- findBy...
- waitFor
- waitForElementToBeRemoved

Não use setTimeout manual.

Garanta que os testes aguardem corretamente:

- requests;
- mutations;
- debounce;
- loaders;
- refetch;
- atualização de cache;
- alteração de estado;
- abertura/fechamento de overlays.

---

# Regras importantes

Siga estas regras:

1. Teste comportamento integrado, não implementação interna;
2. Use userEvent para interações do usuário;
3. Use vi.mock para dependências externas quando necessário;
4. Não faça requests reais;
5. Não use snapshots grandes;
6. Não teste detalhes privados;
7. Não teste classes CSS sem necessidade;
8. Não altere código de produção sem justificar;
9. Use nomes de testes claros e descritivos;
10. Respeite os padrões existentes do projeto;
11. Crie helpers somente quando melhorarem legibilidade;
12. Garanta isolamento entre testes;
13. Limpe mocks entre testes;
14. Evite duplicação excessiva;
15. Priorize os fluxos mais críticos da feature.

---

# Estrutura sugerida

Use uma estrutura semelhante a esta, mas adapte ao padrão do projeto:

- describe da feature ou página testada;
- setup de mocks;
- helper de renderização, se necessário;
- testes organizados por fluxo;
- limpeza de mocks no beforeEach ou afterEach;
- asserts baseados no comportamento visível.

Exemplo conceitual sem bloco de código:

describe da feature
beforeEach limpando mocks
it deve carregar dados iniciais
it deve permitir preencher e enviar o formulário
it deve exibir erro quando a mutation falhar
it deve atualizar a tela após sucesso

---

# Estratégia de mocks

Use mocks apenas nas bordas da integração.

Mocke:

- API;
- service;
- client HTTP;
- autenticação externa;
- router, se necessário;
- toast, se necessário;
- dependências externas ao fluxo.

Evite mockar:

- componente filho importante da própria feature;
- hook interno que faz parte do comportamento testado;
- validação real do formulário;
- lógica principal que o teste deveria validar.

Se precisar mockar algo interno, explique claramente o motivo.

---

# Estratégia de providers

Se a feature depender de providers, crie ou reutilize wrappers como:

- renderWithProviders;
- QueryClientProvider de teste;
- RouterProvider de teste;
- FormProvider, quando necessário;
- providers internos do projeto.

Prefira usar helpers existentes no projeto.

Não crie wrappers novos se já houver padrão pronto.

---

# O que espero na resposta

Quero que você entregue:

1. Uma análise breve da feature;
2. Quais partes estão sendo integradas;
3. Cenários de integração identificados;
4. Sugestões adicionais de teste;
5. Arquivo completo de teste;
6. Mocks necessários;
7. Helpers necessários;
8. Observações importantes sobre decisões tomadas.

---

# Arquivos para análise

Analise principalmente:

[ARQUIVOS_PRINCIPAIS]

Também considere:

[ARQUIVOS_DE_CONTEXTO]

---

# Referências do projeto

Use os padrões já existentes no projeto como referência.

Arquivos de teste existentes:

[ARQUIVOS_DE_TESTE_EXISTENTES]

Helpers existentes:

[HELPERS_EXISTENTES]

Mocks existentes:

[MOCKS_EXISTENTES]

---

# Restrições

Evite alterar código de produção.

Só sugira alterações no código principal caso isso seja realmente necessário para melhorar testabilidade, e explique claramente o motivo.

Priorize trabalhar nos arquivos de teste.

Não implemente mudanças grandes na feature apenas para facilitar os testes.

---

# Formato esperado da resposta

Responda exatamente nesta estrutura:

## Análise

Explique rapidamente o que a feature faz e quais integrações precisam ser validadas.

---

## Partes integradas

Liste quais partes da aplicação estão envolvidas no teste.

---

## Cenários identificados

Liste os cenários principais que devem ser cobertos.

---

## Sugestões adicionais

Liste cenários opcionais ou melhorias futuras, se fizer sentido.

---

## Arquivo de teste

Entregue o arquivo de teste completo.

---

## Mocks e helpers necessários

Entregue os mocks/helpers necessários ou explique quais já existem no projeto e devem ser reutilizados.

---

## Observações

Explique decisões relevantes, limitações ou pontos de atenção.

---

# Tarefa final

Agora analise a funcionalidade [NOME_DA_FUNCIONALIDADE] localizada em [CAMINHO_DO_ARQUIVO_PRINCIPAL] e implemente os testes de integração necessários seguindo todos os critérios acima.

Antes de escrever os testes, pense nos fluxos reais da feature e priorize cenários que realmente tragam confiança para a aplicação.
