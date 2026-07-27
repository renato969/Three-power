# Treino Diário — Três Poderes

App de treino mental diário: cronômetro, avaliação por IA, seleção adaptativa, geração de questões novas, ranking e controle de sessão.

## Estrutura

```
wrangler.jsonc      configuração do Worker
src/index.js        Worker: rota /api/claude + serve os arquivos
public/index.html   o app inteiro
```

## Deploy no Cloudflare Workers

O projeto já está conectado ao repositório com o comando `npx wrangler deploy`. Basta ter estes três arquivos na raiz e o build passa.

**Falta um passo obrigatório:** a variável de ambiente com a chave da API. Sem ela o app funciona, mas sem correção automática das respostas livres.

No painel do Worker, vá em **Configurações → Variáveis e segredos** e adicione:

| Nome | Tipo | Valor |
|---|---|---|
| `ANTHROPIC_API_KEY` | Secret | sua chave criada em `console.anthropic.com` |
| `CLAUDE_MODEL` | Texto (opcional) | `claude-sonnet-5` ou `claude-haiku-4-5-20251001` para gastar menos |

Depois de salvar, rode o deploy de novo para a variável valer.

## Se o build falhar

O erro anterior aconteceu porque não havia `wrangler.jsonc` na raiz do repositório. O `wrangler deploy` não sabia o que publicar. Com este arquivo presente, resolve.

Confira também nas configurações de build:
- Comando da build: vazio
- Comando de implantação: `npx wrangler deploy`
- Diretório raiz: `/`

## Funcionamento sem a chave

O app não quebra. Múltipla escolha corrige sozinha, resposta livre cai na avaliação manual dos três botões, e o selo no topo mostra "IA off". Só a geração de questões novas fica indisponível.

## Backup do progresso

O histórico fica no navegador. Em **Progresso → Diagnóstico → Backup do progresso** dá para exportar e importar um JSON. Faça isso de vez em quando, principalmente antes de trocar de aparelho.

## Rodando local

```bash
npm install wrangler --save-dev
npx wrangler dev
```

Para a chave funcionar localmente, crie um arquivo `.dev.vars` na raiz com:

```
ANTHROPIC_API_KEY=sua-chave-aqui
```

Nunca faça commit desse arquivo.
