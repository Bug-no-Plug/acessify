# Acessify — Documentação do Projeto

> Disciplina: Ferramentas Web e UX · N3  
> Tecnologias: HTML · CSS · JavaScript (Web Components nativos)  
> Tema: Ferramenta de Auditoria de Acessibilidade Web (WCAG 2.2)

---

## Estrutura de Pastas

```
acessify/
├── index.html                            ← Entry point único da aplicação
│
└── src/
    ├── @core/                            ← Configuração global
    │   ├── config/app.js                 ← Registro de todos os Web Components
    │   ├── router/router.js              ← Roteador hash-based com guard de auth
    │   └── styles/
    │       ├── variables.css             ← Design tokens (cores, tipografia, espaços)
    │       ├── base.css                  ← Reset global + fontes
    │       └── utilities.css            ← Classes utilitárias (.btn, .badge, .input...)
    │
    ├── @templates/                       ← Componentes globais reutilizáveis
    │   ├── layouts/
    │   │   ├── app-layout/              ← Layout autenticado (navbar + main + footer)
    │   │   └── auth-layout/             ← Layout de auth (sem navbar)
    │   └── components/
    │       ├── app-navbar/              ← <app-navbar> — responsivo, dropdown de usuário
    │       └── app-footer/              ← <app-footer> — 4 colunas + social
    │
    └── @modules/                         ← Um módulo por funcionalidade
        │
        ├── inicio/                       ← Página inicial / landing
        │   ├── infra/components/
        │   │   ├── stats-grid/          ← Cards 100+, 50+, 4, 24/7
        │   │   ├── feature-card/        ← Cards "Por que usar o Acessify"
        │   │   ├── mission-block/       ← Bloco de missão com badges
        │   │   └── faq-accordion/       ← Accordion de 10 perguntas
        │   ├── infra/pages/inicio-page/
        │   ├── service/InicioService.js
        │   └── style/responsive.css
        │
        ├── nova-auditoria/              ← Criar nova auditoria
        │   ├── infra/components/
        │   │   ├── audit-tabs/          ← Toggle URL / Arquivo HTML
        │   │   ├── url-form/            ← Formulário de URL
        │   │   ├── file-upload/         ← Drag & drop de arquivo HTML
        │   │   └── feature-card-mini/   ← Cards de features menores
        │   ├── infra/pages/nova-auditoria-page/
        │   ├── service/NovaAuditoriaService.js
        │   └── style/responsive.css
        │
        ├── auditorias/                  ← Lista geral de auditorias
        │   ├── infra/components/
        │   │   ├── stats-summary/       ← 4 cards de resumo no topo
        │   │   ├── audit-list-item/     ← Item da lista com badges de severidade
        │   │   ├── audit-empty-state/   ← Estado vazio "sem auditorias"
        │   │   └── search-bar/          ← Barra de busca por URL
        │   ├── infra/pages/auditorias-page/
        │   ├── service/AuditoriasService.js
        │   └── style/responsive.css
        │
        ├── auditoria/                   ← Resultado individual da auditoria
        │   ├── infra/components/
        │   │   ├── score-card/          ← Score 68/100 com anel SVG dinâmico
        │   │   ├── severity-counters/   ← Contadores crítico/sério/moderado/menor
        │   │   ├── filter-tabs/         ← Filtro Todos/Críticos/Sérios/etc.
        │   │   └── issue-card/          ← Card de problema com severidade e WCAG
        │   ├── infra/pages/auditoria-page/
        │   ├── service/AuditoriaService.js
        │   └── style/responsive.css
        │
        ├── aprender/                    ← Centro de aprendizado
        │   ├── infra/components/
        │   │   ├── banner-card/         ← Banner roxo "Construa sites mais inclusivos"
        │   │   ├── progress-bar/        ← Barra de progresso "2 de 6 completos"
        │   │   ├── lesson-card/         ← Card de aula com nível e duração
        │   │   └── resource-link/       ← Link de recurso externo
        │   ├── infra/pages/aprender-page/
        │   ├── service/AprenderService.js
        │   └── style/responsive.css
        │
        ├── settings/                    ← Configurações da conta
        │   ├── infra/components/
        │   │   ├── toggle-switch/       ← Toggle acessível (role="switch")
        │   │   ├── settings-sidebar/    ← Navegação lateral (Perfil/Notif/Seg/Aparência)
        │   │   ├── settings-profile/    ← Painel de informações pessoais
        │   │   ├── settings-notifications/ ← Painel de notificações com toggles
        │   │   ├── settings-security/   ← Alterar senha + exportar + excluir conta
        │   │   └── settings-appearance/ ← Seletor Light/Dark mode
        │   ├── infra/pages/settings-page/
        │   ├── service/SettingsService.js
        │   └── style/responsive.css
        │
        └── auth/                        ← Autenticação
            ├── infra/components/
            │   ├── login-form/          ← Formulário de login
            │   ├── register-form/       ← Formulário de cadastro
            │   └── forgot-password-form/ ← Recuperação de senha
            ├── infra/pages/auth-page/   ← Renderiza formulário conforme rota
            ├── service/AuthService.js
            └── style/responsive.css
```

---

## Rotas

| Hash                | Componente de página   | Layout    |
|---------------------|------------------------|-----------|
| `#/`                | `<inicio-page>`        | App       |
| `#/nova-auditoria`  | `<nova-auditoria-page>`| App       |
| `#/auditorias`      | `<auditorias-page>`    | App       |
| `#/auditoria`       | `<auditoria-page>`     | App       |
| `#/aprender`        | `<aprender-page>`      | App       |
| `#/settings`        | `<settings-page>`      | App       |
| `#/login`           | `<auth-page view="login">` | Auth  |
| `#/register`        | `<auth-page view="register">` | Auth |
| `#/forgot-password` | `<auth-page view="forgot">` | Auth |

> Rotas privadas redirecionam para `#/login` se não houver `acessify_user` no sessionStorage.

---

## Como executar

1. Abra a pasta no **VSCode**
2. Instale a extensão **Live Server**
3. Clique em **Go Live** (canto inferior direito)
4. Acesse `http://127.0.0.1:5500`

> É necessário Live Server (ou qualquer servidor HTTP local) por causa dos `import.meta.url` e ES Modules nativos.

---

## Adicionar um novo módulo

1. Crie `src/@modules/meu-modulo/` com a estrutura completa
2. Importe e registre em `@core/config/app.js`
3. Adicione a rota em `@core/router/router.js`
4. Adicione o link no `app-navbar`

---

## Breakpoints de responsividade

| Nome      | Largura           |
|-----------|-------------------|
| mobile-sm | < 480px           |
| mobile    | < 768px           |
| tablet    | 768px – 1024px    |
| desktop   | ≥ 1024px          |

---

## Publicação no GitHub Pages

1. Crie repositório público no GitHub
2. Faça push de todos os arquivos
3. **Settings → Pages → Source:** selecione `main / root`
4. Acesse `https://SEU_USUARIO.github.io/acessify/`
