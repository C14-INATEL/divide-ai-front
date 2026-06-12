Você é um desenvolvedor frontend sênior especialista em testes automatizados, React, TypeScript, Vite, Vitest, React Testing Library e arquitetura frontend moderna.

Quero que você analise a funcionalidade ou componente abaixo e crie testes unitários úteis, bem estruturados e focados em validar comportamentos relevantes da aplicação.

O objetivo não é apenas aumentar cobertura. O objetivo é garantir que a unidade testada funcione corretamente nos cenários mais importantes.

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
- vi.fn
- vi.spyOn

O projeto também pode utilizar:

- React Query
- Context API
- Zustand
- React Hook Form
- Router
- Providers internos da aplicação
- Hooks customizados
- Services internos
- Stores globais

Use os padrões já existentes no projeto sempre que possível.

---

# Funcionalidade analisada

- Funcionalidade: [NOME_DA_FUNCIONALIDADE]
- Tipo da unidade testada: [COMPONENTE / HOOK / SERVICE / GUARD / STORE / UTILS / FORMULÁRIO / OUTRO]
- Arquivo principal: [CAMINHO_DO_ARQUIVO_PRINCIPAL]
- Arquivos relacionados: [CAMINHOS_DOS_ARQUIVOS_RELACIONADOS]
- Objetivo do teste: [OBJETIVO_DO_TESTE]

---

# Contexto funcional

A unidade analisada é responsável por:

[DESCREVA_O_COMPORTAMENTO_ESPERADO]

Considere também:

- regras de negócio envolvidas;
- estados possíveis;
- condições de renderização;
- permissões;
- validações;
- callbacks;
- side effects;
- dependências externas;
- fluxos assíncronos;
- cenários de erro;
- cenários de sucesso.

---

# Objetivo

Quero que você:

1. Analise a funcionalidade;
2. Entenda o comportamento esperado;
3. Identifique os pontos críticos;
4. Sugira os cenários unitários mais importantes;
5. Implemente os testes unitários necessários;
6. Use mocks apenas quando eles ajudarem a isolar a unidade testada;
7. Priorize testes que tragam confiança real para futuras alterações.

---

# Diferença esperada entre teste unitário e integração

Neste prompt, quero testes unitários.

Isso significa que o foco deve estar na unidade principal analisada, como:

- um componente específico;
- um hook específico;
- uma função utilitária;
- um guard;
- uma store;
- um service;
- um formulário isolado;
- uma regra de negócio específica.

Não transforme o teste unitário em um teste de integração grande sem necessidade.

Ao mesmo tempo, não faça testes inúteis demais.

Evite testar somente:

- se renderiza sem quebrar;
- texto estático sem comportamento;
- classe CSS;
- detalhes internos;
- implementação privada;
- snapshots grandes;
- comportamento de bibliotecas externas.

Priorize testar:

- decisões condicionais;
- regras de negócio;
- renderização baseada em estado;
- callbacks importantes;
- payloads enviados;
- validações;
- tratamento de erro;
- loading;
- estado vazio;
- permissões;
- redirecionamentos;
- side effects relevantes.

---

# Muito importante

Não crie testes artificiais apenas para aumentar cobertura.

Os testes devem validar comportamento real da aplicação.

Evite:

- snapshots grandes;
- testes extremamente acoplados à implementação interna;
- mocks exagerados;
- testar detalhes privados;
- testar comportamento que pertence a biblioteca externa;
- duplicação desnecessária;
- asserts frágeis;
- depender de ordem de elementos sem necessidade;
- alterar código de produção sem justificativa.

---

# O que deve ser analisado

Analise, quando fizer sentido para a unidade testada:

- renderização;
- comportamento;
- interações do usuário;
- estados;
- loading;
- erros;
- validações;
- callbacks;
- requests;
- mutations;
- hooks;
- side effects;
- estados condicionais;
- regras de negócio;
- permissões;
- navegação;
- redirects;
- guards;
- estados globais;
- valores retornados;
- exceções;
- fluxos assíncronos.

---

# Cenários esperados

Os cenários abaixo não são obrigatórios.

Eles servem como referência para você identificar o que realmente faz sentido testar na unidade analisada.

Você também pode sugerir cenários adicionais caso encontre comportamentos importantes.

---

## Componentes

Quando a unidade for um componente, valide:

- estado inicial relevante;
- elementos principais;
- renderização condicional;
- loading;
- erro;
- estado vazio;
- estado habilitado/desabilitado;
- interação do usuário;
- callbacks disparados;
- valores exibidos a partir de props;
- comportamento com props diferentes.

---

## Hooks

Quando a unidade for um hook, valide:

- estado inicial;
- valores retornados;
- funções expostas;
- alteração de estado;
- chamadas a services;
- tratamento de sucesso;
- tratamento de erro;
- side effects;
- limpeza de efeitos, se existir.

Use ferramentas adequadas ao padrão do projeto para testar hooks.

---

## Guards de rota

Quando a unidade for um guard, valide:

- usuário autenticado acessando rota privada;
- usuário não autenticado tentando acessar rota privada;
- usuário autenticado tentando acessar rota pública;
- usuário não autenticado acessando rota pública;
- redirecionamento correto;
- preservação de children quando permitido;
- loading de autenticação, se existir;
- permissões ou roles, se existirem.

---

## Formulários

Quando a unidade envolver formulário, valide:

- campos principais;
- preenchimento pelo usuário;
- validações;
- mensagens de erro;
- bloqueio de submit inválido;
- submit válido;
- payload enviado;
- estado de loading;
- erro no submit;
- reset ou fechamento após sucesso, se existir.

---

## Services e funções utilitárias

Quando a unidade for service ou função utilitária, valide:

- entrada válida;
- entrada inválida;
- retorno esperado;
- tratamento de erro;
- parâmetros enviados;
- formatação de dados;
- casos de borda;
- exceções esperadas.

---

## Stores

Quando a unidade for store, valide:

- estado inicial;
- ações expostas;
- atualização de estado;
- reset de estado;
- persistência, se existir;
- side effects, se existirem;
- isolamento entre testes.

---

## Requests e mocks

Caso exista chamada de API, service, hook assíncrono ou mutation:

- use vi.mock;
- não faça requests reais;
- valide loading;
- valide sucesso;
- valide erro;
- valide parâmetros enviados;
- valide atualização da UI ou estado após resposta;
- valide comportamentos assíncronos.

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
- redirects;
- atualização de cache;
- alteração de estado;
- abertura/fechamento de overlays.

---

## Casos de erro

Quando fizer sentido, valide:

- mensagens de erro;
- fallback de erro;
- comportamento após falha;
- ações bloqueadas corretamente;
- consistência dos estados após erro;
- exceções esperadas.

---

# Regras importantes

Siga estas regras:

1. Use nomes de testes claros e descritivos;
2. Teste comportamento, não implementação interna;
3. Não teste detalhes privados;
4. Não teste classes CSS sem necessidade;
5. Não use snapshots grandes;
6. Não altere código de produção sem necessidade;
7. Não ignore warnings dos testes;
8. Não faça mocks globais desnecessários;
9. Não utilize APIs reais;
10. Priorize legibilidade;
11. Use userEvent para interações do usuário;
12. Use fireEvent apenas quando userEvent não for adequado;
13. Limpe mocks entre testes;
14. Garanta isolamento entre testes;
15. Crie helpers somente quando melhorarem a leitura;
16. Reutilize helpers existentes no projeto;
17. Evite duplicação excessiva;
18. Explique mocks internos quando forem necessários.

---

# Estrutura sugerida

Use uma estrutura semelhante a esta, mas adapte ao padrão do projeto:

```ts
describe("[FEATURE_OR_COMPONENT]", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should [EXPECTED_BEHAVIOR]", async () => {
    // arrange
    // act
    // assert
  });
});
```

Utilize Arrange / Act / Assert quando fizer sentido para melhorar a legibilidade.

---

# Estratégia de mocks

Use mocks para isolar a unidade testada quando necessário.

Mocke:

- API;
- services;
- client HTTP;
- autenticação externa;
- router;
- toast;
- dependências externas;
- hooks externos à unidade, se necessário;
- stores globais, se forem dependência indireta.

Evite mockar:

- a própria unidade testada;
- lógica principal que o teste deveria validar;
- validação real do formulário;
- comportamento nativo do React;
- bibliotecas externas sem necessidade.

Se precisar mockar algo interno, explique claramente o motivo.

---

# Estratégia de providers

Se a unidade depender de providers, crie ou reutilize wrappers como:

- renderWithProviders;
- QueryClientProvider de teste;
- RouterProvider de teste;
- FormProvider;
- providers internos do projeto.

Prefira usar helpers existentes no projeto.

Não crie wrappers novos se já houver padrão pronto.

---

# O que espero na resposta

Quero que você entregue:

1. Uma breve análise da unidade testada;
2. Os cenários mais importantes identificados;
3. Sugestões adicionais de testes;
4. Arquivo completo de teste;
5. Mocks necessários;
6. Helpers necessários;
7. Explicações rápidas das decisões tomadas.

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

Só sugira alterações no código principal caso seja realmente necessário para melhorar testabilidade, e explique claramente o motivo.

Priorize trabalhar nos arquivos de teste.

Não implemente mudanças grandes na funcionalidade apenas para facilitar os testes.

---

# Formato esperado da resposta

Responda exatamente nesta estrutura:

## Análise

Explique rapidamente o que a unidade faz e quais comportamentos precisam ser validados.

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

Agora analise a funcionalidade [NOME_DA_FUNCIONALIDADE] localizada em [CAMINHO_DO_ARQUIVO_PRINCIPAL] e implemente os testes unitários necessários seguindo todos os critérios acima.

Antes de escrever os testes, pense nos comportamentos reais da unidade analisada e priorize cenários que realmente tragam confiança para a aplicação.
