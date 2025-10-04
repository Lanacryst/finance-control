# 📊 **Finance Control**

### *Sistema de Cadastro e Monitoramento de Gastos e Investimentos Pessoais/Familiares*

---

## 📖 **Sobre o Projeto**

O **Finance Control** é uma aplicação web desenvolvida como projeto acadêmico da disciplina de **Engenharia de Software (UFRN)**.
Seu objetivo é auxiliar no **cadastro, controle e monitoramento** de **gastos, orçamentos, investimentos e metas financeiras**, tanto **pessoais** quanto **familiares**, oferecendo uma interface simples e funcional para o **gerenciamento financeiro integrado**.

---

## 🎯 **Funcionalidades Principais (Planejadas)**

* **Gestão de perfil de usuário**
* **Vinculação e gerenciamento de contas familiares**
* **Definição de orçamentos por categoria**
* **Criação e acompanhamento de metas de economia**
* **Monitoramento de despesas, receitas e saldo em tempo real**
* **Visualização de relatórios e gráficos financeiros**

---

## 👥 **Integrantes do Grupo**

* **Alana Crystina Pessoa Lima**
* **Eduardo Murilo Pinto Taborda**
* **José Renato de Araújo Ribeiro**

---

## 📂 **Estrutura do Projeto**

```
Finance-Control/
│
├── src/
│   ├── components/       # Componentes reutilizáveis
│   ├── pages/            # Páginas principais
│   ├── services/         # Regras de negócio e integração com API
│   ├── assets/           # Ícones, imagens e estilos
│   └── utils/            # Funções auxiliares
│
├── public/               # Arquivos estáticos
├── README.md
├── package.json
└── .gitignore
```

---

## 📋 **User Stories (Product Requirements)**

### 👤 **US01 – Gestão de Perfil de Usuário**

| **Item**                   | **Descrição**                                                                                                                                                                               |
| -------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **História**               | Como **usuário**, eu quero **gerenciar as informações e configurações do meu próprio perfil** para manter meus dados atualizados e personalizados.                                          |
| **Critérios de Aceitação** | - O usuário pode editar seu nome.<br> - O usuário pode carregar e alterar sua foto de perfil.<br> - O usuário pode definir suas preferências de notificação e tema (ex: modo claro/escuro). |
| **Prioridade**             | Média                                                                                                                                                                                       |
| **Estimativa**             | 2 pontos                                                                                                                                                                                    |

---

### 👨‍👩‍👧 **US02 – Gestão de Contas Familiares Vinculadas**

| **Item**                   | **Descrição**                                                                                                                                                                                                                                                             |
| -------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **História**               | Como **usuário principal**, eu quero **convidar e gerenciar membros da minha família na plataforma** para que possamos **administrar as finanças de forma colaborativa**.                                                                                                 |
| **Critérios de Aceitação** | - O usuário pode enviar convites por e-mail.<br> - O convidado pode aceitar ou recusar o convite.<br> - O usuário principal pode definir permissões de leitura ou edição.<br> - Um histórico registra qual membro realizou cada ação (ex: “Maria adicionou a despesa X”). |
| **Prioridade**             | Média                                                                                                                                                                                                                                                                     |
| **Estimativa**             | 3 pontos                                                                                                                                                                                                                                                                  |

---

### 💸 **US03 – Gestão de Orçamentos por Categoria**

| **Item**                   | **Descrição**                                                                                                                                                                                                                                                                                                |
| -------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **História**               | Como **usuário**, eu quero **definir orçamentos mensais por categoria de despesa** para **monitorar e controlar meus gastos de forma eficaz**.                                                                                                                                                               |
| **Critérios de Aceitação** | - O usuário pode criar um orçamento por categoria (ex: "Alimentação").<br> - Pode definir um valor limite mensal para cada orçamento.<br> - O sistema notifica o usuário quando atingir um percentual configurável (ex: 80%).<br> - O sistema exibe visualmente o progresso dos gastos em relação ao limite. |
| **Prioridade**             | Alta                                                                                                                                                                                                                                                                                                         |
| **Estimativa**             | 3 pontos                                                                                                                                                                                                                                                                                                     |

---

### 🎯 **US04 – Criação e Acompanhamento de Metas de Economia**

| **Item**                   | **Descrição**                                                                                                                                                                                                                              |
| -------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **História**               | Como **usuário**, eu quero **criar metas de economia** para **visualizar e acompanhar meu progresso em direção aos meus objetivos financeiros de longo prazo**.                                                                            |
| **Critérios de Aceitação** | - O usuário pode criar uma meta com nome, valor total e data limite (ex: "Viagem", R$ 5.000, até 15/12/2026).<br> - Pode registrar valores alocados para cada meta.<br> - O sistema exibe o progresso e percentual concluído de cada meta. |
| **Prioridade**             | Alta                                                                                                                                                                                                                                       |
| **Estimativa**             | 2 pontos                                                                                                                                                                                                                                   |

---

## 🧮 **Resumo das User Stories**

| **ID** | **Título**                                    | **Prioridade** | **Estimativa (Story Points)** |
| ------ | --------------------------------------------- | -------------- | ----------------------------- |
| US01   | Gestão de Perfil de Usuário                   | Média          | 2                             |
| US02   | Gestão de Contas Familiares Vinculadas        | Média          | 3                             |
| US03   | Gestão de Orçamentos por Categoria            | Alta           | 3                             |
| US04   | Criação e Acompanhamento de Metas de Economia | Alta           | 2                             |

---

## 🕒 **Planejamento de Sprints (Scrum)**

### 🌀 **Sprint 1 – Estrutura Inicial e Perfil do Usuário**

**Duração:** 2 semanas
**Objetivo:** Criar a base do sistema e permitir personalização do perfil.

| **User Stories**                              | **Tarefas Principais**                                              |
| --------------------------------------------- | ------------------------------------------------------------------- |
| US01 – Gestão de Perfil de Usuário            | Implementar edição de dados, upload de foto e configuração de tema. |
| US02 – Gestão de Contas Familiares Vinculadas | Criar estrutura de convites e permissões básicas.                   |

**Total Estimado:** 5 pontos

---

### 💰 **Sprint 2 – Controle Financeiro e Orçamento**

**Duração:** 2 semanas
**Objetivo:** Desenvolver o controle de orçamento e início das metas financeiras.

| **User Stories**                                     | **Tarefas Principais**                                           |
| ---------------------------------------------------- | ---------------------------------------------------------------- |
| US03 – Gestão de Orçamentos por Categoria            | Implementar criação de orçamentos, alertas e barra de progresso. |
| US04 – Criação e Acompanhamento de Metas de Economia | Criar metas, registrar aportes e calcular progresso.             |

**Total Estimado:** 5 pontos

---

### 📈 **Sprint 3 – Integração e Visualização**

**Duração:** 2 semanas
**Objetivo:** Integrar todas as funcionalidades e criar dashboards e relatórios visuais.

| **Tarefas Principais**                                 |
| ------------------------------------------------------ |
| Integração entre módulos (perfil, orçamentos e metas). |
| Criação de dashboards e gráficos de acompanhamento.    |
| Testes e refinamento de interface.                     |

**Total Estimado:** 5 pontos

---

## 🛠️ **Tecnologias Previstas**

* **Front-end:** React.js + Vite + Tailwind CSS
* **Back-end:** Node.js (Express)
* **Banco de Dados:** PostgreSQL
* **Autenticação:** JWT
* **Metodologia:** Scrum (com Sprints e User Stories)
* **Controle de Versão:** Git e GitHub

---

## 🚀 **Próximos Passos**

1. Criação do **protótipo visual** no Figma.
2. Configuração do **banco de dados e autenticação**.
3. Implementação das **funcionalidades do Sprint 1**.
4. Testes e validações com usuários simulados.

