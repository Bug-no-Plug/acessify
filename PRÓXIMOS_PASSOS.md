# Acessify — Próximos Passos para Pixel-Perfect

## 🎯 Objetivo
Fazer todas as telas ficar **exatamente iguais** ao protótipo Figma (pixel-perfect).

## 📋 Fase 1: Validação Visual (AGORA)

### O que fazer:
1. Abrir o arquivo `figma-login.png` (imagem de referência capturada do Figma)
2. Abrir a versão local: `http://localhost:5173#/login`
3. Comparar lado a lado os elementos:
   - ✅ Posição do logo (está ao lado do título)
   - ✅ Tamanho do card
   - ✅ Tamanho dos botões
   - ✅ Cores
   - ⚠️ **CRÍTICO**: Os ícones dos botões e campos — estão iguais?
   - ⚠️ **CRÍTICO**: Os SVGs do navbar e outros ícones — estão iguais aos do Figma?

### Ferramentas:
- Abra `figma-login.png` no VSCode ou Paint
- Compare visualmente com a versão local
- Se encontrar diferença, documente em `DIFERENÇAS_ENCONTRADAS.md`

---

## 🔧 Fase 2: Correções de Cores (Se Necessário)

Se as cores estiverem erradas, compare com Figma usando color picker:

```css
/* Arquivo: src/@core/styles/variables.css */

/* Verificar se estes valores correspondem EXATAMENTE ao Figma: */
--color-primary:        #F5E642;   /* amarelo — verificar */
--color-serious:        #8B5CF6;   /* roxo — verificar */
--color-critical:       #FF4444;   /* vermelho — verificar */
--color-bg:             #0D0D0D;   /* fundo — verificar */
--color-bg-surface:     #1A1A1A;   /* cards — verificar */
--color-bg-elevated:    #222222;   /* inputs — verificar */
```

**Como descobrir as cores exatas:**
1. Abra Figma
2. Clique em um elemento (ex: botão)
3. Vá a "Design" > "Fill" ou "Stroke"
4. Veja o código HEX/RGB
5. Compare com as variáveis CSS

---

## 🎨 Fase 3: Correção de Ícones (CRÍTICA!)

### Problema atual:
Os ícones que estão no código podem não ser exatamente iguais aos do Figma.

### Arquivos com ícones:
1. **Navbar**: `src/@templates/components/app-navbar/app-navbar.js`
2. **Botões auth**: `src/@modules/auth/infra/components/login-form/login-form.js`
3. **Cards**: `src/@modules/inicio/...` (vários)
4. **Auditorias**: `src/@modules/auditoria/...` (vários)
5. **Aprender**: `src/@modules/aprender/...` (vários)

### Para cada ícone:
1. No Figma, clique no ícone
2. Vá a "Code" ou "Inspect" (Dev Mode)
3. Copie o SVG exato
4. Cole no arquivo JS correspondente
5. Valide no navegador

### Exemplo - Ícone email (login):
**ERRADO** (genérico):
```javascript
<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
  <polyline points="22,6 12,13 2,6"/>
</svg>
```

**CORRETO** (deve ser exatamente igual ao Figma):
```javascript
/* Extrair do Figma e colar aqui */
<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="..." viewBox="...">
  <!-- paths exatas do Figma -->
</svg>
```

---

## 📏 Fase 4: Validação de Espaçamentos

Usar DevTools do navegador para medir:

```javascript
// No console do navegador:
const card = document.querySelector('auth-page')?.shadowRoot?.querySelector('.auth-page__card');
const rect = card.getBoundingClientRect();
console.log({
  x: rect.left,
  y: rect.top,
  width: rect.width,
  height: rect.height,
  padding: window.getComputedStyle(card).padding
});
```

Comparar com Figma (click elemento > Design > Layout)

---

## 📱 Fase 5: Testar Responsividade

Abrir em diferentes tamanhos:
- Desktop (1440px)
- Tablet (768px)
- Mobile (375px)

Comparar com Figma para cada breakpoint.

---

## ✅ Checklist de Validação Final

Para cada tela (login, register, forgot, inicio, auditorias, etc.):

- [ ] **Login**
  - [ ] Cores exatas
  - [ ] Ícones iguais
  - [ ] Espaçamento correto
  - [ ] Botões dentro do card
  - [ ] Fonte correta

- [ ] **Register**
  - [ ] Campos em ordem correta
  - [ ] Termos visíveis
  - [ ] Espaçamento OK

- [ ] **Forgot Password**
  - [ ] Ícone segurança correto
  - [ ] Mensagem formato correto
  - [ ] Botão OK

- [ ] **Telas autenticadas (Inicio, Auditorias, etc.)**
  - [ ] Navbar ícones corretos
  - [ ] Cards espaçamento OK
  - [ ] Cores badges
  - [ ] Ícones pequeninhos corretos

---

## 🚀 Como Aplicar Correções

1. Identifique o problema (cor, ícone, espaçamento)
2. Encontre o arquivo JS que contém o elemento
3. Altere o valor
4. Salve o arquivo
5. Atualize o navegador (F5)
6. Compare com Figma novamente
7. Se OK, faça commit
8. Se não OK, continue ajustando

---

## 📄 Exemplo de Commit

```bash
git add src/@modules/auth/
git commit -m "fix: atualizar ícone email do login para corresponder exatamente ao Figma"
git add src/@core/styles/
git commit -m "fix: corrigir cor primary de #F5E642 para #E8D633 conforme Figma"
```

---

## 🔗 Referências

- **Figma Link**: https://www.figma.com/design/BirbBQZnSuVa11ddFo7exh/Acessify
- **Local Dev**: http://localhost:5173
- **PNGs de Referência**: Ver arquivos `figma-*.png` na raiz do projeto

---

## 📞 Perguntas Comuns

**P: Como saber o viewBox correto de um SVG?**
R: No Figma, click no ícone > Code > Copy SVG. O viewBox estará lá.

**P: As cores parecem iguais mas DevTools mostra RGB diferente?**
R: RGB (#F5E642) = rgb(245,230,66). Se diferente, significa que a cor do Figma é outra.

**P: Posso testar em múltiplas resoluções?**
R: Sim! DevTools > Responsive Mode (Ctrl+Shift+M no Chrome)

**P: Os botões vazando de novo?**
R: Verifique o padding do card em `auth-page.js` — deve estar em `40px 40px 48px`

---

## 🎓 Resumo Rápido

1. ✅ Padding auth pages: FEITO
2. ⏳ Validar cores: PRÓXIMO
3. ⏳ Corrigir ícones: PRÓXIMO
4. ⏳ Espaçamentos finos: DEPOIS
5. ⏳ Responsividade: DEPOIS

**ETA:** ~2-4 horas para pixel-perfect completo (depende de quantas diferenças encontrar)
