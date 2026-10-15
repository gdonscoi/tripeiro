# Tripeiro · Planeje com sua IA

Skill para planejar viagens com a IA que você já usa e importar o resultado como uma nova viagem no **Tripeiro**, app Android pessoal para organizar viagens offline.

Página: https://gdonscoi.github.io/tripeiro/

- [`skills/tripeiro/`](skills/tripeiro/SKILL.md): a skill no padrão aberto [Agent Skills](https://agentskills.io/specification), com a [referência do formato `tripeiro-plan`](skills/tripeiro/references/formato-do-roteiro.md) e um [exemplo fictício](skills/tripeiro/assets/exemplo-roteiro.json).
- [`docs/`](docs/): a página publicada pelo GitHub Pages, o ZIP versionado e as instruções copiáveis.
- [`scripts/build.ps1`](scripts/build.ps1): gera `docs/downloads/tripeiro-skill-<versão>.zip`, `docs/instrucoes.txt` e `docs/exemplo-roteiro.json` a partir de `skills/tripeiro`.

## Como funciona

1. Instale a skill na sua ferramenta de IA, ou copie as instruções para a conversa.
2. Planeje a viagem conversando; um roteiro já discutido também serve.
3. Peça: “Prepare este roteiro para importar no Tripeiro usando a skill.”
4. Copie o bloco e cole no Tripeiro (**Planeje com sua IA → Já tenho o resultado** ou **⋮ → Importar da IA**), revise e crie a nova viagem.

A IA fica fora do app: sem API, chave ou conta. O app confere o resultado no celular, cria sempre uma nova viagem e não recebe anexos da conversa. A página só distribui a skill; não recebe nem guarda roteiros.

## Versões

| Skill | Formato | App Tripeiro |
|---|---|---|
| 1.0.0 | `tripeiro-plan` 1 | Versão com “Importar da IA” e o card “Planeje com sua IA” |

A fonte da skill é mantida junto com o app, que testa o exemplo e as regras do formato; este repositório publica cópias versionadas. Para publicar uma versão nova: atualizar `skills/tripeiro` (incluindo `metadata.version` no `SKILL.md`), rodar `powershell -ExecutionPolicy Bypass -File scripts\build.ps1` e atualizar a versão na página e nesta tabela.

## Ferramentas verificadas

- Claude (Opus 5.5) no Claude Code, seguindo a skill numa conversa fictícia; o resultado foi aceito pelo leitor do app num teste automatizado.

Outras ferramentas ainda não foram verificadas. Não há instalador universal: cada ferramenta tem o seu jeito de instalar skills.

## Licença

[MIT](LICENSE). Todos os dados de exemplo são fictícios.
