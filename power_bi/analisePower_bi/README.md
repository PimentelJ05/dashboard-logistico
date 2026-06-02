# Desafio Logístico — Automação de Cálculo de Rotas e Dashboard Analítico

## Visão Geral

Este projeto foi desenvolvido para automatizar o cálculo de custos logísticos e transformar dados operacionais em informações estratégicas para apoio à tomada de decisão.

A solução integra tratamento de dados, cálculo automatizado de tarifas, construção de uma base padronizada e desenvolvimento de dashboards analíticos para visualização dos resultados.

O objetivo principal foi substituir processos manuais suscetíveis a erros por uma solução estruturada, escalável e orientada a dados.

---

# Objetivos do Projeto

A proposta consistia em calcular automaticamente o custo de uma operação logística considerando:

* Região de atendimento
* Zona de atuação
* Faixa de quilometragem
* Tipo de veículo
* Quantidade de paradas

A partir dessas informações, o sistema determina o valor adequado para cada operação de forma automática e consistente.

---

# Arquitetura da Solução

A solução foi dividida em quatro etapas principais:

## 1. Extração dos Dados

As informações foram recebidas em planilhas Excel contendo tabelas tarifárias separadas por regiões.

Os dados foram importados utilizando Python e Pandas para permitir tratamento automatizado.

### Tecnologias

* Python
* Pandas
* OpenPyXL

---

## 2. Tratamento e Padronização

Durante a análise inicial foram identificadas inconsistências comuns em bases corporativas:

* Diferenças de nomenclatura
* Variações de acentuação
* Espaços extras
* Registros duplicados
* Estruturas diferentes entre planilhas

Foi realizada uma etapa de normalização para garantir a integridade dos dados.

### Estrutura final da base

| Região | Zona | KM Inicial | KM Final | Veículo | Custo Fixo |
| ------ | ---- | ---------- | -------- | ------- | ---------- |

Essa modelagem permitiu consultas rápidas e flexíveis para qualquer combinação de parâmetros.

---

## 3. Motor de Cálculo

Foi implementada uma lógica capaz de identificar automaticamente:

* Região correspondente
* Faixa de quilometragem
* Tipo de veículo
* Custos aplicáveis

A partir dessas informações o sistema retorna o valor correto da operação.

### Processo

1. Identificação da região
2. Identificação da zona
3. Busca da faixa de KM
4. Identificação do veículo
5. Aplicação da tarifa correspondente
6. Retorno do custo final

---

## 4. API de Dados

Para disponibilizar as informações ao dashboard foi criada uma API utilizando Flask.

### Endpoints desenvolvidos

| Endpoint   | Função               |
| ---------- | -------------------- |
| /dashboard | Indicadores gerais   |
| /custos    | Métricas financeiras |
| /veiculos  | Análise por veículo  |
| /regioes   | Comparativo regional |
| /operacoes | Análise operacional  |
| /simulador | Dados para simulação |

A API centraliza toda a lógica de negócio e disponibiliza os dados em formato JSON.

---

# Dashboard Analítico

Além do cálculo logístico, foi desenvolvido um dashboard interativo inspirado em ferramentas de Business Intelligence.

O dashboard permite acompanhar indicadores estratégicos da operação.

---

## Dashboard Executivo

Apresenta uma visão geral do cenário logístico.

### Indicadores

* Total de regiões
* Total de zonas
* Total de veículos
* Custo médio geral

### Análises

* Distribuição de custos por região
* Distribuição de custos por veículo
* Ranking regional

---

## Dashboard de Custos

Responsável por analisar a estrutura tarifária.

### Indicadores

* Maior tarifa
* Menor tarifa
* Tarifa média
* Amplitude de custos

### Análises

* Evolução de custos por faixa de KM
* Comportamento das tarifas

---

## Dashboard de Veículos

Permite comparar o desempenho financeiro entre categorias de veículos.

### Indicadores

* Total de veículos
* Veículo mais caro
* Veículo mais econômico

### Análises

* Ranking por custo
* Comparação entre categorias
* Participação de cada veículo nos custos totais

---

## Dashboard Regional

Focado em análises geográficas.

### Indicadores

* Regiões atendidas
* Distribuição dos custos
* Ranking regional

### Análises

* Comparação entre regiões
* Participação percentual
* Identificação de regiões com maior impacto financeiro

---

## Dashboard Operacional

Permite avaliar a operação por zonas de atendimento.

### Indicadores

* Quantidade de operações
* Custos por zona

### Análises

* Ranking operacional
* Distribuição geográfica

---

# Informações Estratégicas Obtidas

A solução permite responder perguntas como:

### Custos

* Qual veículo possui maior custo operacional?
* Qual faixa de KM apresenta maior impacto financeiro?
* Qual a tarifa média da operação?

### Operação

* Quantas zonas estão cadastradas?
* Quais regiões concentram maiores custos?
* Quais veículos são mais utilizados?

### Gestão

* Onde estão os maiores gastos?
* Quais regiões exigem maior investimento?
* Como o custo evolui conforme a quilometragem?

---

# Benefícios da Solução

## Automação

Redução significativa de processos manuais.

## Confiabilidade

Eliminação de erros causados por preenchimento manual.

## Escalabilidade

Novas regiões, veículos e tabelas podem ser adicionados facilmente.

## Governança de Dados

Base única e padronizada para consultas e análises.

## Tomada de Decisão

Disponibilização de indicadores relevantes para gestores e analistas.

---

# Tecnologias Utilizadas

## Backend

* Python
* Flask
* Flask-CORS
* Pandas
* OpenPyXL

## Frontend

* HTML5
* CSS3
* JavaScript
* Chart.js

## Dados

* Excel
* JSON

---

# Estrutura do Projeto

backend/

├── app.py

├── tabela_final.xlsx

frontend/

├── index.html

├── custos.html

├── veiculos.html

├── regioes.html

├── operacoes.html

├── simulador.html

css/

└── styles.css

js/

├── dashboard.js

├── custos.js

├── veiculos.js

├── regioes.js

├── operacoes.js

└── simulador.js

---

# Conclusão

Este projeto demonstra a aplicação prática de conceitos de análise de dados, automação de processos, engenharia de dados e desenvolvimento web para resolver um problema real de logística.

Mais do que realizar cálculos, a solução transforma dados operacionais em informações estratégicas, permitindo análises detalhadas e suporte à tomada de decisão baseada em dados.
