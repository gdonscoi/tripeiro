# Tripeiro · Planeje com sua IA

Skill para planejar viagens com a IA que você já usa e importar o resultado como uma nova viagem no **Tripeiro**, app Android pessoal para organizar viagens offline.

Veja o [guia de uso](https://gdonscoi.github.io/tripeiro/) ou [baixe a skill 1.0.2](https://gdonscoi.github.io/tripeiro/downloads/tripeiro-skill-1.0.2.zip).

- [`skills/tripeiro/`](skills/tripeiro/SKILL.md): a skill no padrão aberto [Agent Skills](https://agentskills.io/specification), com a [referência do formato `tripeiro-plan`](skills/tripeiro/references/formato-do-roteiro.md) e um [exemplo fictício](skills/tripeiro/assets/exemplo-roteiro.json).

## Instalar

Baixe o ZIP e extraia a pasta `tripeiro`. No Claude Code, coloque essa pasta em `~/.claude/skills/` ou em `.claude/skills/` de um projeto. Em outras ferramentas compatíveis com Agent Skills, siga as instruções de instalação da ferramenta.

Se a sua IA não aceitar skills, [abra as instruções](https://gdonscoi.github.io/tripeiro/instrucoes.txt), copie o texto e cole no início da conversa ou nas instruções de um projeto.

## Como funciona

1. Instale a skill na sua ferramenta de IA, ou copie as instruções para a conversa.
2. Planeje a viagem conversando; um roteiro já discutido também serve.
3. Peça: “Prepare este roteiro para importar no Tripeiro usando a skill.”
4. Copie o bloco e cole no Tripeiro (**Planeje com sua IA → Já tenho o resultado** ou **⋮ → Importar da IA**), revise e crie a nova viagem.

A IA fica fora do app: sem API, chave ou conta. O app confere o resultado no celular, cria sempre uma nova viagem e não recebe anexos da conversa. A página só distribui a skill; não recebe nem guarda roteiros.

## Versões

| Skill | Formato | App Tripeiro |
|---|---|---|
| 1.0.0 a 1.0.2 | `tripeiro-plan` 1 | Versão com “Importar da IA” e o card “Planeje com sua IA” |

## Compatibilidade com ferramentas

Use uma ferramenta compatível com Agent Skills, como o Claude Code, ou copie as instruções para a sua IA de conversa. A instalação depende da ferramenta escolhida.

## Licença

[MIT](LICENSE). Todos os dados de exemplo são fictícios.

## Histórico

- **1.0.2:** orienta a pesquisar e verificar endereço completo e coordenadas de hospedagens e atividades, incluindo os dados confirmados e informando limitações de pesquisa.
- **1.0.1:** orienta a IA a usar o pedido de correção copiado do app (problema, local com o nome do item e dica) e a devolver sempre o bloco completo.
- **1.0.0:** primeira versão.
