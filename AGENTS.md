# DevRoast - AGENTS.md

## Visão Geral
Aplicativo web para analisar e criticar (roast) código do usuário, desenvolvido durante o NLW da Rocketseat.

## Stack Tecnológica
- **Framework:** Next.js 16 (App Router)
- **Linguagem:** TypeScript
- **Estilização:** Tailwind CSS v4
- **Componentes:** React Server/Client Components

## Padrões Globais

### Estrutura de Pastas
```
src/
├── app/           # Páginas e rotas
├── components/    # Componentes React
│   └── ui/        # Componentes de UI reutilizáveis
└── lib/           # Utilitários
```

### Nomenclatura
- **Componentes:** PascalCase (`Button`, `CodeInputRoot`)
- **Arquivos:** kebab-case (`code-input.tsx`, `leaderboard.tsx`)
- **Variáveis:** camelCase
- **Constantes:** UPPER_SNAKE_CASE

### Componentes UI (Padrão de Composição)
- Usar **Compound Components** ao invés de muitas props
- Exemplo: `CodeInputRoot`, `CodeInputHeader`, `CodeInputContent`
- Context API para compartilhar estado entre sub-componentes

### Importações
- Usar alias `@/` para imports do diretório `src/`
- Exemplo: `import { Button } from "@/components/ui"`

### Code Style
- **Indentação:** 2 espaços
- **Aspas:** Duplas (`"`)
- **Ponto e vírgula:** Obrigatório

### Lint e Formatação
Antes de commitar:
```bash
npm run format  # Formata o código
npm run lint    # Verifica erros
```

### Componentes Disponíveis
- **Button:** Botões com variantes
- **Card:** Container com header, content, footer
- **CodeInput:** Entrada de código com line numbers
- **Leaderboard:** Tabela de ranking
- **RoastButton:** Botão de submissão
- **Toggle:** Switch toggle
