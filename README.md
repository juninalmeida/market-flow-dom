# 🛒 MarketFlow

<div align="center">
  <img src="./assets/icons/fruitmarket.svg" alt="MarketFlow Logo" width="120">
  
  ### Lista de Compras Inteligente com Interface Glassmorphism
  
  Uma aplicação web moderna para gerenciar suas compras com validação inteligente de formulários, estatísticas em tempo real e design responsivo.
  
  [![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/HTML)
  [![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/CSS)
  [![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
</div>

---

## 📋 Índice

- [Sobre o Projeto](#-sobre-o-projeto)
- [Demo](#-demo)
- [Funcionalidades](#-funcionalidades)
- [Tecnologias](#-tecnologias)
- [Conceitos Aplicados](#-conceitos-aplicados)
- [Estrutura do Projeto](#-estrutura-do-projeto)
- [Instalação](#-instalação)
- [Como Usar](#-como-usar)
- [Destaques Técnicos](#-destaques-técnicos)
- [Roadmap](#-roadmap)
- [Autor](#-autor)
- [Licença](#-licença)

## 💡 Sobre o Projeto

MarketFlow é uma aplicação de lista de compras desenvolvida com foco em **usabilidade**, **validação robusta** e **design moderno**. O projeto demonstra domínio de fundamentos web através de:

- **Manipulação avançada do DOM** sem frameworks
- **Validação em tempo real** com sanitização de inputs
- **Sistema de design consistente** usando CSS Custom Properties
- **Arquitetura modular** e manutenível em JavaScript vanilla
- **Interface glassmorphism** com gradientes e transparências

O objetivo é criar uma experiência de usuário fluida, prevenindo erros comuns (duplicatas, formatos inválidos) e fornecendo feedback visual imediato.

## 🎬 Demo

> **Deploy**: [Em breve no GitHub Pages]

### Preview da Interface

A aplicação apresenta:

- Dashboard com estatísticas em tempo real
- Formulário com validação instantânea
- Lista de itens com interações visuais
- Barra de progresso dinâmica
- Design totalmente responsivo

## ✨ Funcionalidades

### Core Features

- **➕ Adicionar Itens**: Nome (obrigatório) + Quantidade opcional (formato: 10g, 5kg)
- **✓ Marcar como Comprado**: Checkbox visual com estado persistente
- **🗑️ Remover Itens**: Exclusão instantânea da lista
- **📊 Estatísticas Automáticas**: Total, Comprados e Restantes atualizados em tempo real
- **📈 Barra de Progresso**: Indicador visual de conclusão das compras

### Validações e UX

- **🔒 Sanitização de Inputs**:
  - Nome aceita apenas letras e espaços
  - Quantidade aceita apenas números + "kg" ou "g"
- **🚫 Prevenção de Duplicatas**: Detecta itens repetidos (case-insensitive) com highlight visual
- **⚡ Validação em Tempo Real**: Botão "Adicionar" desabilitado até formulário válido
- **📱 Mobile First**: Layout otimizado para dispositivos móveis
- **♿ Acessibilidade**: Labels ARIA e navegação por teclado

## 🚀 Tecnologias

### Frontend

- **HTML5**: Estrutura semântica com tags apropriadas
- **CSS3**: Flexbox, Grid, Custom Properties, Gradientes, Glassmorphism
- **JavaScript ES6+**: Modules pattern (IIFE), Arrow functions, Destructuring, Array methods

### Ferramentas

- Git & GitHub para versionamento
- Live Server para desenvolvimento local
- GitHub Pages para deploy (em breve)

## 🧠 Conceitos Aplicados

### JavaScript

- ✅ **IIFE (Immediately Invoked Function Expression)**: Encapsulamento de código
- ✅ **Event Delegation**: Otimização de listeners na lista de itens
- ✅ **Sanitização de Inputs**: Regex para validação e limpeza de dados
- ✅ **Manipulação do DOM**: QuerySelector, createElement, classList
- ✅ **Normalização de Strings**: Case-insensitive comparisons
- ✅ **Estado da UI**: Atualização reativa de estatísticas e progresso

### CSS

- ✅ **Design System**: Tokens CSS (cores, espaçamentos, tipografia)
- ✅ **Mobile First**: Media queries progressivas
- ✅ **Glassmorphism**: Efeitos de vidro com backdrop-filter e transparências
- ✅ **Fluid Typography**: clamp() para responsividade
- ✅ **CSS Variables**: Custom properties para tematização
- ✅ **BEM Naming**: Convenção de nomenclatura de classes

### Arquitetura

- ✅ **Separation of Concerns**: Funções com responsabilidade única
- ✅ **Modularização CSS**: Arquivos separados por componente
- ✅ **Código Autodocumentado**: Nomes descritivos e estrutura clara

## 🎯 Destaques Técnicos

### 1. Validação de Inputs com Regex

O sistema de validação permite entrada progressiva enquanto digita, mas valida estritamente no submit:

```javascript
function sanitizeQtyValue(value) {
  const normalized = value.toLowerCase().replace(/\s+/g, "");
  const onlyAllowedChars = normalized.replace(/[^0-9kg]/g, "");

  // Permite "10k" durante digitação
  const partialPattern = /^\d+(k|kg|g)?$/;
  // Exige "10kg" ou "10g" no final
  const strictPattern = /^\d+(kg|g)?$/;

  if (partialPattern.test(onlyAllowedChars)) return onlyAllowedChars;

  const digitsOnlyMatch = onlyAllowedChars.match(/^\d+/);
  return digitsOnlyMatch ? digitsOnlyMatch[0] : "";
}
```

**Por que essa abordagem?**

- Permite UX fluida (não bloqueia "10k" enquanto usuário digita "10kg")
- Garante dados válidos no submit com `strictPattern`
- Limpa automaticamente caracteres inválidos em tempo real

### 2. Prevenção de Duplicatas Inteligente

```javascript
function normalizeText(value) {
  return value.trim().replace(/\s+/g, " ").toLowerCase();
}

function findDuplicateItem(normalizedName) {
  const items = getItems();

  for (let i = 0; i < items.length; i++) {
    const nameEl = items[i].querySelector(".item__name");
    if (!nameEl) continue;

    const currentName = normalizeText(nameEl.textContent);

    if (currentName === normalizedName) {
      return items[i];
    }
  }

  return null;
}

function highlightItem(item) {
  item.classList.add("item--highlight");
  item.scrollIntoView({ block: "center" });

  setTimeout(() => {
    item.classList.remove("item--highlight");
  }, 700);
}
```

**Funcionalidades:**

- Normaliza "Tomate", "TOMATE", " tomate " para a mesma string
- Encontra duplicata e destaca visualmente por 700ms
- Rola automaticamente para o item na tela

### 3. Estado do Botão Baseado em Validação

```javascript
function updateAddButtonState() {
  const name = sanitizeNameValue(elements.nameInput.value).trim();
  const qty = sanitizeQtyValue(elements.qtyInput.value);

  const qtyStrictPattern = /^\d+(kg|g)$/;
  const isQtyValid = qty.length > 0 && qtyStrictPattern.test(qty);

  const isFormValid = name.length > 0 && isQtyValid;

  elements.addButton.disabled = !isFormValid;
}

// Chamado em cada input do usuário
elements.nameInput.addEventListener("input", handleNameInput);
elements.qtyInput.addEventListener("input", handleQtyInput);
```

**Decisão de design:**

- Botão desabilitado até formulário 100% válido
- Feedback visual imediato através do estado `disabled`
- Previne submissões inválidas antes mesmo do clique

### 4. Atualização Reativa de Estatísticas

```javascript
function refreshUI() {
  const items = getItems();
  const stats = getStats(items);

  updateStatsUI(stats);
  updateSubtitleUI(stats);
  updateProgressUI(stats);
}

function updateProgressUI(stats) {
  let percent = 0;

  if (stats.total > 0) {
    percent = Math.round((stats.bought / stats.total) * 100);
  }

  // Atualiza CSS custom property dinamicamente
  elements.progressBar.style.setProperty("--progress", percent + "%");
}
```

**Como funciona:**

- Cada ação (adicionar, remover, marcar) chama `refreshUI()`
- Recalcula estatísticas do zero (fonte única da verdade)
- Atualiza CSS variable `--progress` que controla o ::before da barra

### 5. Event Delegation para Performance

```javascript
// Um único listener na lista, não em cada item
elements.itemsList.addEventListener("click", handleItemsListClick);

function handleItemsListClick(event) {
  // Delegar para botão de exclusão
  const deleteButton = event.target.closest(".item__delete");
  if (deleteButton) {
    const item = deleteButton.closest(".item");
    item.remove();
    refreshUI();
    return;
  }

  // Delegar para checkbox
  const checkboxButton = event.target.closest(".item__checkbox");
  if (checkboxButton) {
    const item = checkboxButton.closest(".item");
    const willBeCompleted = !item.classList.contains("item--completed");

    item.classList.toggle("item--completed", willBeCompleted);
    setCheckboxState(checkboxButton, willBeCompleted);
    refreshUI();
  }
}
```

**Vantagens:**

- Não adiciona listeners a cada item criado dinamicamente
- Melhor performance com listas grandes
- Código mais simples e manutenível

## 📱 Responsividade

### Breakpoints

```css
/* Mobile First (padrão) */
.app__content {
  flex-direction: column;
}

/* Tablet/Desktop (≥768px) */
@media (min-width: 768px) {
  .app__content {
    flex-direction: row;
  }

  .dashboard {
    flex: 0 0 32%; /* Sidebar fixa */
  }

  .shopping-list {
    flex: 1; /* Ocupa espaço restante */
  }
}
```

### Fluid Typography

Todos os tamanhos se adaptam ao viewport usando `clamp()`:

```css
.shopping-list__title {
  font-size: clamp(1.25rem, 1rem + 1vw, 1.875rem);
  /* Min: 20px | Fluido | Max: 30px */
}
```

## 🎨 Design System

### Paleta de Cores

```css
:root {
  /* Primária (Laranja) */
  --color-primary-500: #fe9a00;
  --color-primary-600: #e17100;
  --color-primary-700: #bb4d00;

  /* Gradientes (Marrom) */
  --color-brown-dark: rgba(123, 51, 6, 0.4);
  --color-brown-light: rgba(151, 60, 0, 0.4);

  /* Glassmorphism (White com opacidades) */
  --color-white-90: rgba(255, 255, 255, 0.9);
  --color-white-20: rgba(255, 255, 255, 0.2);
  --color-white-10: rgba(255, 255, 255, 0.1);
}
```

### Efeito Glassmorphism

```css
.card {
  background-color: var(--color-white-10);
  border: var(--border-width) solid var(--color-white-20);
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-lg);
}
```

### Sistema de Tokens

| Token               | Valor                                     | Uso                   |
| ------------------- | ----------------------------------------- | --------------------- |
| `--spacing-4`       | 1rem                                      | Padding padrão        |
| `--radius-sm`       | 0.625rem                                  | Border radius pequeno |
| `--radius-md`       | 0.875rem                                  | Border radius médio   |
| `--shadow-lg`       | `0px 25px 50px -12px rgba(0, 0, 0, 0.25)` | Sombra cards          |
| `--transition-base` | `200ms ease`                              | Transições padrão     |

## 📁 Estrutura do Projeto

```
MarketFlow/
│
├── 📂 assets/
│   ├── 📂 icons/              # SVG icons (cart, bag, trash, etc)
│   │   ├── fruitmarket.svg
│   │   ├── cart.svg
│   │   ├── bag.svg
│   │   ├── trashicon.svg
│   │   ├── itemcheck.svg
│   │   └── same.svg
│   │
│   └── 📂 background/
│       └── marketbackground.png
│
├── 📂 styles/
│   ├── global.css           # Reset + CSS Variables (tokens)
│   ├── app.css              # Layout principal e overlay
│   ├── dashboard.css        # Estatísticas e cards
│   ├── shopping-list.css    # Lista, form e itens
│   └── index.css            # Importa todos os CSS
│
├── scripts.js               # Lógica da aplicação (IIFE)
├── index.html               # Estrutura HTML
└── README.md
```

### Organização CSS (Modular)

Cada arquivo CSS tem uma responsabilidade específica:

- **global.css**: Tokens de design system + reset CSS
- **app.css**: Container principal, background e overlay
- **dashboard.css**: Header, stats cards e tip card
- **shopping-list.css**: Form, inputs, items list, progress bar

## 🔧 Instalação

### Pré-requisitos

- Navegador moderno (Chrome, Firefox, Edge, Safari)
- Editor de código (VS Code recomendado)
- Live Server (opcional, para development)

### Passos

1. **Clone o repositório**

```bash
git clone https://github.com/juninalmeida/marketflow.git
cd marketflow
```

2. **Abra com Live Server** (VS Code)

```
Clique com botão direito em index.html → Open with Live Server
```

**OU**

2. **Abra diretamente no navegador**

```bash
# Linux/Mac
open index.html

# Windows
start index.html
```

## 📖 Como Usar

### Adicionar Item

1. Digite o nome do produto (apenas letras)
2. Digite a quantidade no formato `10g`, `5kg` ou deixe vazio
3. Clique em "Adicionar Item" (botão só habilita quando válido)

### Marcar como Comprado

- Clique no checkbox circular à esquerda do item
- Item ficará riscado e com opacidade reduzida
- Estatísticas e barra de progresso atualizam automaticamente

### Remover Item

- Clique no ícone de lixeira à direita do item
- Item é removido instantaneamente

### Tentativa de Duplicata

Se tentar adicionar um item que já existe:

- Item existente será destacado com borda laranja
- Tela rolará automaticamente para o item
- Destaque desaparece após 700ms

## 🗺️ Roadmap

### Versão 1.1

- [ ] **LocalStorage**: Persistir dados localmente
- [ ] **Modo Edição**: Editar nome/quantidade de itens existentes
- [ ] **Categorias**: Agrupar por seção do mercado (frutas, laticínios, etc)
- [ ] **Ordenação**: Por nome, categoria ou ordem de adição
- [ ] **Limpar Lista**: Botão para remover todos os itens comprados

### Versão 2.0 (Futuro)

- [ ] **Tema Escuro/Claro**: Toggle entre temas
- [ ] **Histórico de Preços**: Registrar valor pago por item
- [ ] **Sugestões Inteligentes**: Autocompletar com produtos comuns

## 🎓 Aprendizados

Este projeto foi desenvolvido como parte dos meus estudos em desenvolvimento web, focando em:

### JavaScript

- Escrever código limpo e autodocumentado sem comentários excessivos
- Aplicar padrões como IIFE para encapsulamento
- Manipular DOM de forma eficiente com event delegation
- Criar validações robustas com regex
- Gerenciar estado da aplicação sem frameworks

### CSS

- Criar design systems escaláveis com custom properties
- Aplicar metodologia BEM para nomenclatura
- Implementar layouts responsivos mobile-first
- Utilizar técnicas modernas (clamp, grid, flexbox)
- Desenvolver interfaces com glassmorphism

### Boas Práticas

- Separação de responsabilidades (cada função faz uma coisa)
- Código DRY (Don't Repeat Yourself)
- Acessibilidade (ARIA labels, navegação por teclado)
- Versionamento com Git e commits semânticos

## 👨‍💻 Autor

<table>
  <tr>
    <td align="center">
      <a href="https://github.com/juninalmeida">
        <img src="https://github.com/juninalmeida.png" width="100px;" alt="Foto do Horacio Junior"/><br>
        <sub>
          <b>Horacio Junior</b>
        </sub>
      </a>
      <br>
      <sub>Desenvolvedor Web</sub>
    </td>
  </tr>
</table>

### 📫 Entre em Contato

[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/júnior-almeida-3563a934b/)
[![GitHub](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)](https://github.com/juninalmeida)
[![Email](https://img.shields.io/badge/Email-D14836?style=for-the-badge&logo=gmail&logoColor=white)](mailto:junioralmeidati2023@gmail.com)

---

<div align="center">

**Desenvolvido com 🧡 por [Horacio Junior](https://github.com/juninalmeida)**

</div>
