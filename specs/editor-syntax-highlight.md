# Especificação: Editor de Código com Syntax Highlight

## 🎯 Objetivo
Criar um editor de código na homepage do DevRoast com syntax highlight automático, similar ao editor do Ray.so, onde o usuário pode colar código e o sistema detecta a linguagem automaticamente e aplica as cores de syntax highlighting.

## 📚 Pesquisa de Opções

### Opção 1: Shiki (RECOMENDADO)
**Por que escolher:**
- ✅ Usa os mesmos TextMate grammars do VS Code
- ✅ Acurácia de 99%+ na detecção de sintaxe
- ✅ Usado por Vercel (Next.js docs), Astro, Nuxt Content
- ✅ Suporte a 100+ linguagens
- ✅ Suporte a temas do VS Code
- ✅ Sem runtime JavaScript (renderização estática)
- ✅ Zero dependências client-side

**Desvantagens:**
- ⚠️ Pacote maior (~500KB gzipped)
- ⚠️ Requer build-time rendering (não client-side puro)

**Documentação:** https://shiki.style/

### Opção 2: Highlight.js
**Por que escolher:**
- ✅ Auto-detection de linguagem
- ✅ 190+ linguagens suportadas
- ✅ Sem dependências
- ✅ Leve (~10KB gzipped)
- ⚠️ Menor acurácia que Shiki
- ⚠️ Temas menos sofisticados

### Opção 3: Prism.js
**Por que escolher:**
- ✅ Plugin ecosystem extenso
- ✅ Muito leve
- ⚠️ Detecção de linguagem limitada
- ⚠️ Precisa especificar linguagem manualmente

### Opção 4: Monaco Editor
**Por que escolher:**
- ✅ Editor completo (VS Code no browser)
- ✅ IntelliSense e autocomplete
- ✅ Syntax highlighting integrado
- ⚠️ Muito pesado (~2MB+)
- ⚠️ Overkill para nosso caso de uso

## 🏆 Conclusão: Shiki + CodeMirror

Para o nosso projeto, recomendo:

**Shiki** para syntax highlighting + **CodeMirror** para o editor

**Por quê essa combinação:**
1. **Shiki** fornece a melhor qualidade de syntax highlighting (igual ao VS Code)
2. **CodeMirror** fornece um editor leve com edição real-time
3. A integração Shiki + CodeMirror é bem documentada e comum

**Alternativa mais simples:** Usar apenas **Shiki** com um textarea editável e renderizar o highlight em tempo real.

## 📋 Especificação Técnica

### Componentes Necessários

#### 1. Editor de Código (CodeEditor)
- **Props:**
  - `value`: string - Código atual
  - `onChange`: (code: string) => void - Callback de mudança
  - `language`: string - Linguagem selecionada
  - `onLanguageChange`: (lang: string) => void - Callback de mudança de linguagem
  - `theme`: string - Tema (light/dark)
  - `autoDetect`: boolean - Auto-detectar linguagem

- **Funcionalidades:**
  - Editor editável com textarea + overlay de syntax highlight
  - Auto-detect de linguagem usando heurística
  - Dropdown para seleção manual de linguagem
  - Suporte a múltiplos temas
  - Números de linha

#### 2. Language Selector (LanguageSelector)
- Dropdown com linguagens disponíveis
- Busca/filtro de linguagens
- Auto-detect indicado no topo

#### 3. Theme Toggle (ThemeToggle)
- Alternar entre temas claros e escuros
- Usar temas do VS Code (ex: Monokai, Dracula, GitHub Dark)

### Detecção de Linguagem

**Abordagem:** Usar heurística + lista de keywords

**Exemplo de detecção:**
```javascript
function detectLanguage(code) {
  const patterns = {
    python: [/def\s+\w+/, /import\s+\w+/, /print\(/],
    javascript: [/function\s+\w+/, /const\s+/, /let\s+/, /import\s+.*from/],
    typescript: [/interface\s+\w+/, /type\s+\w+/, /:.*=>/],
    // ... mais linguagens
  };
  
  for (const [lang, regexes] of Object.entries(patterns)) {
    if (regexes.some(r => r.test(code))) {
      return lang;
    }
  }
  return 'plaintext';
}
```

**Bibliotecas para auto-detect:**
- `lang-detector` (51 stars, simples)
- `guesslang` (mais robusto, mas maior)
- Implementação customizada com heurística

### Implementação com Shiki

**Instalação:**
```bash
npm install shiki
npm install @shikijs/monaco # se usar Monaco
```

**Exemplo de uso:**
```typescript
import { createHighlighter } from 'shiki';

const highlighter = await createHighlighter({
  themes: ['github-dark', 'github-light'],
  langs: ['javascript', 'typescript', 'python'],
});

const html = highlighter.codeToHtml(code, {
  lang: language,
  theme: 'github-dark',
});
```

### Estrutura de Arquivos Proposta

```
src/components/ui/
├── code-editor/
│   ├── index.ts
│   ├── code-editor.tsx
│   ├── language-selector.tsx
│   └── theme-toggle.tsx
└── syntax-highlight/
    ├── index.ts
    ├── highlighter.ts
    └── languages.ts
```

### Features Específicas

1. **Auto-detect de Linguagem**
   - Detectar ao colar código
   - Atualizar se o usuário digitar código que corresponde a outra linguagem

2. **Suporte a Linguagens**
   - JavaScript/TypeScript
   - Python
   - Java
   - C/C++
   - Go
   - Rust
   - PHP
   - Ruby
   - SQL
   - HTML/CSS
   - E mais...

3. **Temas**
   - Monokai (escuro)
   - Dracula (escuro)
   - GitHub Dark
   - GitHub Light
   - Solarized Dark

4. **UI Elements**
   - Window controls (red, amber, green dots)
   - Nome do arquivo na header
   - Números de linha
   - Área editável

### Performance Considerations

- **Shiki** renderiza no build-time ou SSR
- **CodeMirror** é client-side apenas para edição
- Lazy loading de linguagens não usadas
- Debounce na detecção de linguagem

### Test Cases

1. ✅ Colar código e verificar syntax highlighting
2. ✅ Mudar linguagem manualmente
3. ✅ Testar múltiplos temas
4. ✅ Testar com código vazio
5. ✅ Testar com código muito longo
6. ✅ Testar auto-detect de linguagens comuns

## 📝 To-Dos

### [ ] 1. Pesquisa e Validação
- [ ] Criar POC (Proof of Concept) com Shiki
- [ ] Testar auto-detect de linguagem
- [ ] Avaliar performance com código grande
- [ ] Decidir se usar CodeMirror ou textarea + overlay

### [ ] 2. Componente CodeEditor
- [ ] Criar estrutura básica do componente
- [ ] Implementar syntax highlighting com Shiki
- [ ] Adicionar números de linha
- [ ] Criar dropdown de seleção de linguagem

### [ ] 3. Auto-detect de Linguagem
- [ ] Implementar heurística de detecção
- [ ] Criar lista de keywords por linguagem
- [ ] Testar acurácia da detecção
- [ ] Adicionar indicador de linguagem detectada

### [ ] 4. Temas e Estilos
- [ ] Integrar temas do VS Code
- [ ] Criar toggle light/dark mode
- [ ] Atualizar styles conforme design do Pencil
- [ ] Testar acessibilidade

### [ ] 5. Integração com Homepage
- [ ] Substituir textarea atual pelo CodeEditor
- [ ] Conectar com estado do código
- [ ] Manter compatibilidade com funcionalidade de roast
- [ ] Testar em dispositivos móveis

### [ ] 6. Otimizações
- [ ] Lazy loading de linguagens
- [ ] Debounce na detecção
- [ ] Cache de highlighter
- [ ] Testar performance com código grande

### [ ] 7. Testes
- [ ] Testes unitários para detecção de linguagem
- [ ] Testes de integração
- [ ] Testes de acessibilidade
- [ ] Cross-browser testing

## 🔧 Bibliotecas Recomendadas

### Principal Stack
- **Shiki** - Syntax highlighting
- **CodeMirror 6** - Editor de código (opcional)

### Suporte
- **lang-detector** - Detecção de linguagem (simples)
- **guesslang** - Detecção de linguagem mais robusta (maior)

## 📊 Comparativo de Opções

| Opção | Tamanho | Acurácia | Runtime | Temas | Setup |
|-------|---------|----------|---------|-------|-------|
| Shiki | ~500KB | 99%+ | Build-time | VS Code | Moderado |
| Highlight.js | ~10KB | 85% | Client-side | Próprios | Fácil |
| Prism.js | ~5KB | 80% | Client-side | Próprios | Fácil |
| Monaco | ~2MB | 100% | Client-side | VS Code | Complexo |

## 🎨 Design do Componente

```
┌─────────────────────────────────────────────────────────┐
│  window-controls  │  input.tsx  │  [JS ▼]              │
├─────────────────────────────────────────────────────────┤
│ 1 │ function hello() {                                 │
│ 2 │   console.log("Hello World");                     │
│ 3 │ }                                                  │
│   │                                                    │
│   │                                                    │
│   │                                                    │
│   │                                                    │
│   │                                                    │
│   │                                                    │
│   │                                                    │
│   │                                                    │
│   │                                                    │
│   │                                                    │
│   │                                                    │
│   │                                                    │
│   │                                                    │
└─────────────────────────────────────────────────────────┘
```

## 🔗 Referências

- [Shiki Documentation](https://shiki.style/)
- [Ray.so GitHub](https://github.com/raycast/ray-so)
- [CodeMirror 6](https://codemirror.net/6/)
- [VS Code TextMate Grammars](https://github.com/microsoft/vscode-textmate)
