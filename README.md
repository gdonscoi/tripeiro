# Tripeiro · Guia e suporte

Português | [English](README.en.md)

Skill para planejar viagens com a IA que você já usa e importar o resultado como uma nova viagem no **Tripeiro**, app Android pessoal para organizar viagens offline.

Este também é o canal público de suporte do aplicativo e da skill. Comece pela [página de uso e ajuda](https://gdonscoi.github.io/tripeiro/).

| Quero… | Onde encontrar |
|---|---|
| Instalar e usar a skill | [Instalação](https://gdonscoi.github.io/tripeiro/#instalar) e [importação no app](https://gdonscoi.github.io/tripeiro/#importar) |
| Relatar um problema no app | [Formulário do aplicativo](https://github.com/gdonscoi/tripeiro/issues/new?template=01-bug-app.yml) |
| Relatar um problema na skill ou importação da IA | [Formulário da skill/IA](https://github.com/gdonscoi/tripeiro/issues/new?template=02-bug-skill.yml) |
| Sugerir uma melhoria | [Formulário de sugestão](https://github.com/gdonscoi/tripeiro/issues/new?template=03-sugestao.yml) |
| Consultar ajuda e acompanhar um relato | [Perguntas frequentes](https://gdonscoi.github.io/tripeiro/#perguntas) e [guia de suporte](SUPPORT.md) |
| Ver novidades da skill | [Histórico](#histórico-da-skill) |
| Reportar uma vulnerabilidade | [Canal privado de segurança](https://github.com/gdonscoi/tripeiro/security/advisories/new) e [orientações](SECURITY.md) |

**Enviar ou comentar relatos exige conta no GitHub. As issues e seus anexos são públicos.** Use dados fictícios e oculte informações pessoais, bilhetes, localizadores, reservas e documentos. Não envie a viagem completa nem sua conversa inteira com a IA. Antes de abrir uma issue, procure nos [relatos existentes](https://github.com/gdonscoi/tripeiro/issues?q=is%3Aissue).

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

A IA fica fora do app: sem API, chave ou conta. O app confere o resultado no celular, cria sempre uma nova viagem e não recebe anexos da conversa. A página distribui a skill e reúne os links de ajuda; não recebe nem guarda roteiros.

## Perguntas frequentes

- **Preciso de conta no GitHub para usar a skill?** Não. Downloads e instruções são públicos; a conta é necessária para enviar ou comentar relatos no GitHub. A ferramenta de IA pode ter seus próprios requisitos de acesso.
- **Minha IA não aceita skills.** Use as [instruções copiáveis](https://gdonscoi.github.io/tripeiro/instrucoes.txt).
- **O app recusou o resultado.** Use o pedido de correção copiado do app e cole o novo bloco completo; veja as [orientações de correção](https://gdonscoi.github.io/tripeiro/#problemas). Se persistir, relate com dados fictícios no formulário da skill/IA.
- **Como acompanho uma correção?** Pela própria issue pública. O mantenedor informa a versão corrigida ou a alteração publicada quando houver entrega, conforme o [guia de suporte](SUPPORT.md).

Mais respostas na [página de perguntas frequentes](https://gdonscoi.github.io/tripeiro/#perguntas). Contribuições por PR estão restritas a colaboradores convidados; veja [CONTRIBUTING.md](CONTRIBUTING.md) e o [código de conduta](CODE_OF_CONDUCT.md).

## Versões

| Skill | Formato | App Tripeiro |
|---|---|---|
| 1.0.0 a 1.0.2 | `tripeiro-plan` 1 | Versão com “Importar da IA” e o card “Planeje com sua IA” |

## Compatibilidade com ferramentas

Use uma ferramenta compatível com Agent Skills, como o Claude Code, ou copie as instruções para a sua IA de conversa. A instalação depende da ferramenta escolhida.

## Licença

A [política de privacidade em português](docs/privacidade.html) e [em inglês](docs/en/privacy.html) descreve o aplicativo e este site. O processo de publicação e suas verificações estão em [docs/politica-publicacao.md](docs/politica-publicacao.md).

[MIT](LICENSE). Todos os dados de exemplo são fictícios.

## Histórico da skill

- **1.0.2:** orienta a pesquisar e verificar endereço completo e coordenadas de hospedagens e atividades, incluindo os dados confirmados e informando limitações de pesquisa.
- **1.0.1:** orienta a IA a usar o pedido de correção copiado do app (problema, local com o nome do item e dica) e a devolver sempre o bloco completo.
- **1.0.0:** primeira versão.
