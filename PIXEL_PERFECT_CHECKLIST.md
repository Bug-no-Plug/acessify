# Acessify — Checklist Pixel-Perfect Figma ✓

## Status: EM PROGRESSO

### Alterações Realizadas Recentemente ✅

1. **Fix: Padding e Espaçamento Auth Pages**
   - Aumentado padding do `.auth-page__card` de `var(--space-8), var(--space-10)` → `var(--space-10), var(--space-12)`
   - Aumentado gap nos formulários de `var(--space-5)` → `var(--space-6)` (login, register, forgot)
   - Adicionado `overflow: hidden` ao `.auth-page__card` para evitar botões vazarem
   - ✅ Resultado: Botão "Criar conta grátis" agora está dentro do card (não mais vazando)

2. **Commits Realizados:**
   - `aa8c930` - fix: aumentar padding e espaçamento nas telas de auth para evitar botões vazarem do card

---

## Telas a Validar (Ordem de Prioridade)

### 1️⃣ LOGIN — status: ✅ CORRIGIDO, PRECISA VALIDAÇÃO VISUAL
**URL**: `#/login`

**Elementos comparados:**
| Elemento | Esperado | Atual | Status |
|----------|----------|-------|--------|
| Logo | SVG ⭐ (estrela 5 pontas) | SVG ⭐ | ✅ |
| Título | "Acessify" | "Acessify" | ✅ |
| Subtítulo | "Acesse sua conta" | "Acesse sua conta" | ✅ |
| Card Padding | 40px todas as direções | 40px (atual) | ✅ |
| Card Background | #1A1A1A (rgb(26,26,26)) | rgb(26,26,26) | ✅ |
| Card Border Radius | 24px | 24px | ✅ |
| Input Height | 52px | 52px | ✅ |
| Input Background | #222222 (rgb(34,34,34)) | rgb(34,34,34) | ✅ |
| Input Border Color | rgba(255,255,255,0.1) | rgba(255,255,255,0.1) | ✅ |
| Botão Primary (Entrar) | Amarelo #F5E642 | rgb(245,230,66) | ✅ |
| Botão Outline (Criar conta) | Roxo border #8B5CF6 | rgb(139,92,246) | ✅ |
| Botão Overflow | DENTRO do card | DENTRO | ✅ |
| Font Title | 24px, bold 800 | 24px, 800 | ✅ |
| Font Subtitle | 14px | 14px | ✅ |

**Observações:**
- ✅ Layout visualmente correto após aumento de padding
- ⚠️ PENDENTE: Comparação pixel-perfect com Figma (ref: `figma-login.png`)
- ⚠️ PENDENTE: Validar ícones do SVG (deve ser exatamente igual ao Figma)

---

### 2️⃣ REGISTRO (CADASTRO) — status: ✅ CORRIGIDO, PRECISA VALIDAÇÃO
**URL**: `#/register`

**Elementos:** 4 campos (Nome, Email, Senha, Confirmar Senha) + checkbox termos + 2 botões

**Alterações aplicadas:**
- ✅ Mesmo padding e overflow que login
- ✅ Espaçamento aumentado entre campos

**Pendências:**
- ⚠️ Comparação visual com `figma-nova.png` (se refere a nova auditoria, não registro — verificar)
- ⚠️ Validar se há termos de uso vistos no Figma

---

### 3️⃣ RECUPERAÇÃO DE SENHA — status: ✅ CORRIGIDO, PRECISA VALIDAÇÃO
**URL**: `#/forgot-password`

**Alterações aplicadas:**
- ✅ Mesmo padding e overflow que login
- ✅ Espaçamento aumentado

**Pendências:**
- ⚠️ Ícone de segurança (cadeado) — validar se é igual ao Figma
- ⚠️ Mensagem de segurança — verificar tipografia

---

## Telas Adicionais para Verificação

### Páginas de Conteúdo

| Tela | URL | Status | Referência |
|------|-----|--------|-----------|
| Início | `#/` | ⚠️ Verificado | `figma-inicio.png` |
| Nova Auditoria | `#/nova-auditoria` | ⚠️ Verificado | `figma-nova.png` |
| Auditorias (Lista) | `#/auditorias` | ⚠️ Verificado | `figma-auditorias.png` |
| Auditoria (Individual) | `#/auditoria` | ⚠️ Verificado | `figma-auditoria.png` |
| Aprender | `#/aprender` | ⚠️ Verificado | `figma-aprender.png` |

---

## Checklist de Validação Visual (Pixel-Perfect)

### Para cada tela, validar:

- [ ] **Cores**
  - [ ] Fundo (#0D0D0D)
  - [ ] Card (#1A1A1A)
  - [ ] Texto (#FFFFFF)
  - [ ] Texto muted (#A0A0A0)
  - [ ] Primary amarelo (#F5E642)
  - [ ] Serious roxo (#8B5CF6)
  - [ ] Critical vermelho (#FF4444)
  - [ ] Success verde (#22C55E)

- [ ] **Tipografia**
  - [ ] Font family (Inter)
  - [ ] Font sizes (24px titulo, 14px subtitle, 16px body)
  - [ ] Font weights (700 normal, 800 title)
  - [ ] Line heights

- [ ] **Espaçamento**
  - [ ] Padding externo (página)
  - [ ] Padding do card
  - [ ] Gaps entre elementos
  - [ ] Margens

- [ ] **Bordas e Raios**
  - [ ] Border radius cards (24px)
  - [ ] Border radius inputs (12px)
  - [ ] Border colors e styles

- [ ] **Ícones**
  - [ ] SVG path correto
  - [ ] Tamanho (14px, 16px, 20px, 22px, etc.)
  - [ ] Stroke width
  - [ ] Fill vs stroke

- [ ] **Sombras**
  - [ ] Shadow cards (0 24px 64px rgba(0,0,0,0.6))
  - [ ] Shadow inputs/elementos

- [ ] **Estados (Hover, Focus)**
  - [ ] Botão primary hover
  - [ ] Botão outline hover
  - [ ] Input focus state
  - [ ] Link hover

---

## Como Comparar com Figma

### Método 1: Screenshots Side-by-Side
1. Abra `figma-login.png` (ou outra) num editor
2. Abra a versão local em `http://localhost:5173#/login`
3. Compare elemento a elemento
4. Documente diferenças em `DIFERENÇAS_ENCONTRADAS.md`

### Método 2: Inspect Element
```javascript
// No navegador (aba local), execute:
const card = document.querySelector('auth-page')?.shadowRoot?.querySelector('.auth-page__card');
console.log(window.getComputedStyle(card));
```

### Método 3: Design Tokens Verificação
- Verificar `src/@core/styles/variables.css`
- Comparar cada var com valor no Figma
- Validar que não há divergências

---

## Próximas Ações

### Imediatamente
1. ✅ FEITO - Aumentar padding/espaçamento auth pages
2. ⏳ Comparar visualmente cada tela com PNG de referência
3. ⏳ Extrair cores EXATAS do Figma (usar color picker)
4. ⏳ Validar SVG icons (viewBox, stroke-width, paths)

### Depois
5. ⏳ Testar responsividade mobile vs Figma
6. ⏳ Validar transições/animações (se houver)
7. ⏳ Testar estados hover/focus
8. ⏳ Validação de acessibilidade (ARIA, contraste, etc.)

---

## Arquivos PNG de Referência (do Figma)

Localizados em `acessify/`:
- `figma-login.png` — Tela de Login (referência)
- `figma-nova.png` — Criar Nova Auditoria (referência)
- `figma-auditorias.png` — Lista de Auditorias (referência)
- `figma-auditoria.png` — Auditoria Individual (referência)
- `figma-inicio.png` — Página Inicial (referência)
- `figma-aprender.png` — Aprender (referência)

---

## Notas Importantes

- **Design System**: Tudo deve usar as variáveis CSS em `variables.css`
- **Sem hard-coding**: Não colocar cores/tamanhos diretos, usar `var()`
- **Responsividade**: Breakpoints em `src/@modules/*/style/responsive.css`
- **Components**: São Web Components nativos (Shadow DOM)
- **Testing**: Abrir em navegador, não em Figma preview

---

## Histórico de Alterações

| Data | Commit | Descrição | Status |
|------|--------|-----------|--------|
| 2026-06-30 | aa8c930 | fix: padding e espaçamento auth | ✅ Merged |
| - | - | - | - |

---

## Contato / Questões

Se encontrar divergências com Figma:
1. Documente em `DIFERENÇAS_ENCONTRADAS.md`
2. Tire screenshot do Figma + local
3. Identifique o elemento específico
4. Especifique a mudança necessária

Exemplo:
```
### DIFERENÇA: Tamanho do Logo
- Figma: 36px
- Local: 48px
- Solução: Alterar width/height do .auth-page__logo-icon de 48px para 36px
```
