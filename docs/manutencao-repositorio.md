# Manutenção e proteções do repositório público

Configurações da fatia [#5](https://github.com/gdonscoi/tripeiro/issues/5) e operação do suporte da [#6](https://github.com/gdonscoi/tripeiro/issues/6), do [plano de suporte público](suporte-publico.md). Este documento é para mantenedores. Os guias públicos ficam em [SUPPORT.md](../SUPPORT.md), [CONTRIBUTING.md](../CONTRIBUTING.md), [SECURITY.md](../SECURITY.md) e [CODE_OF_CONDUCT.md](../CODE_OF_CONDUCT.md).

## Publicação e checks

A fonte da skill é `skills/tripeiro`. Para atualizar os arquivos publicados:

```powershell
pwsh -NoProfile -File scripts/build.ps1
python scripts/verify.py
python -m unittest discover -s scripts -p test_verify.py -v
```

Requisitos locais: Python 3 e PowerShell 7 (`pwsh`). O CI usa os runtimes já disponíveis no runner `windows-latest`, sem bibliotecas Python externas. O verificador usa PowerShell 7 também localmente para manter a leitura de scripts UTF-8 consistente com o CI.

`verify.py` executa o gerador em um diretório temporário exclusivo, sem alterar `docs/`, e confere:

- JSON válido nos exemplos da fonte e da publicação, sem campos duplicados nem constantes como NaN.
- Identificador e versão do formato, nome e destino da viagem e tipo das listas principais.
- Correspondência de `docs/instrucoes.txt` e `docs/exemplo-roteiro.json` com a geração atual.
- Conteúdo e conjunto de entradas do ZIP da versão atual; rejeita entradas duplicadas e caminhos inesperados.

Datas internas, compressão e ordem de entradas do ZIP não precisam coincidir. Em arquivos de texto, CRLF/LF e BOM UTF-8 não causam divergência. Outros conteúdos continuam significativos. ZIPs históricos permanecem preservados e não são regenerados pelo check.

O check público valida integridade da distribuição e a estrutura básica dos exemplos. As regras completas de importação, datas e persistência continuam verificadas pelos testes do aplicativo no repositório privado.

O workflow `Publicacao da skill` executa o job `Integridade da publicacao` em PRs para main, pushes na main e branches `codex/**`. Não há filtro por arquivo: PRs documentais também precisam produzir o check obrigatório. O checkout usa SHA fixo oficial, sem persistir credenciais; o token tem somente `contents: read`. Não usa `pull_request_target` nem segredos.

## Configurações administrativas

Aplicadas em 16/10/2026 e consultadas novamente pela API:

| Configuração | Estado |
|---|---|
| Issues | Públicas e habilitadas |
| Criação de PR | `COLLABORATORS_ONLY`; recurso de PR permanece habilitado |
| Métodos de merge | Somente squash |
| Merge automático | Desabilitado |
| Relatos privados de vulnerabilidades | Habilitados |
| Secret scanning / push protection | Habilitados, preservados |
| Token padrão do Actions | Leitura |
| Aprovação de PR por workflows | Desabilitada |

O ruleset [Protecao da main](https://github.com/gdonscoi/tripeiro/rules/25249332) está ativo. Foi criado somente após confirmar execuções bem-sucedidas do novo workflow em [push](https://github.com/gdonscoi/tripeiro/actions/runs/38922175871) e [PR](https://github.com/gdonscoi/tripeiro/actions/runs/38922190220).

Configuração aplicada e conferida pela API de regras efetivas da main: alvo `refs/heads/main`; PR obrigatório, zero aprovações obrigatórias enquanto houver um único mantenedor, conversas resolvidas e check `Integridade da publicacao` do GitHub Actions (integração `15368`) aprovado, com branch atualizada. Exclusão e force push bloqueados. A lista de bypass está vazia, inclusive para o mantenedor (`current_user_can_bypass: never`). O proprietário continua podendo editar configurações administrativas; isso não constitui permissão para contornar o fluxo normal de PR.

## Verificação e limites

Os testes de regressão usam cópias temporárias e simulam instruções ou exemplos desatualizados, JSON inválido, versão de formato incompatível, entradas ausentes, alteradas ou repetidas no ZIP e variações inofensivas de metadados/fim de linha. Não alteram os arquivos publicados reais.

Verificação local e oito testes de regressão passaram; o mesmo verificador e os oito testes passaram no GitHub Actions. As configurações de merge, política de PRs, regras efetivas da main, canal de vulnerabilidades e proteções preservadas foram consultadas novamente pela API.

As permissões de usuário externo são verificadas pelas configurações, sem conta externa para teste de abertura de issue/PR. Não são enviados force push nem exclusões de teste à main. Após o merge do PR #9, o [workflow da main](https://github.com/gdonscoi/tripeiro/actions/runs/38922803969) e o [deploy do Pages](https://github.com/gdonscoi/tripeiro/actions/runs/38922804469) passaram. Testes Android não se aplicam.

## Formulários e operação do suporte

Os três formulários ficam em `.github/ISSUE_TEMPLATE/`: `01-bug-app.yml`, `02-bug-skill.yml` e `03-sugestao.yml`. O `config.yml` desabilita a opção em branco para usuários externos e oferece links para ajuda e relatos privados de segurança. Mantenedores ainda podem ver a opção administrativa de issue em branco; isso é comportamento do GitHub.

As labels `needs-triage`, `needs-info`, `confirmed`, `app` e `skill` foram criadas e conferidas pela API em 16/10/2026. `bug`, `enhancement`, `duplicate` e `documentation` existentes foram preservadas. Os formulários usam labels fixas de tipo/área quando aplicáveis; escolhas em dropdown não alteram labels automaticamente. O mantenedor pode ajustar a área durante a triagem, seguindo [SUPPORT.md](../SUPPORT.md).

Não há workflow de cópia de relatos, triagem ou fechamento por inatividade. As issues públicas acompanham o atendimento; quando uma tarefa privada for necessária, o mantenedor mantém a resposta pública sem expor código, conteúdo pessoal ou links inacessíveis.

Antes do merge da #6: revisar YAML, IDs, tipos de campo, campos obrigatórios, opções, labels e links locais; executar `git diff --check` e o check obrigatório de publicação. Não abrir bugs fictícios como se fossem relatos reais. O parser usado na revisão local não é dependência do projeto.

Revisão local em 16/10/2026: YAML carregado com PyYAML 6.0.3 temporário, estrutura e IDs conferidos (9 campos no formulário do app, 11 no da skill e 4 no de sugestões), campos obrigatórios e capturas opcionais conferidos, opções sem duplicatas e links locais dos seis documentos válidos. O seletor configura `blank_issues_enabled: false` e os dois encaminhamentos. O verificador da publicação passou sem alterar a skill nem os downloads.

Após o merge autorizado da #6: conferir o seletor e os três formulários renderizados, a ausência da opção em branco para visitantes externos, os links de suporte e segurança e o workflow da main. A abertura efetiva por usuário externo depende de conta externa e deve ser registrada como não testada se ela não estiver disponível. O GitHub só disponibiliza os formulários da branch padrão; essa conferência permanece pendente enquanto o PR não tiver sido mesclado.

Referências: [restrição de PRs](https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/enabling-features-for-your-repository/disabling-pull-requests), [rulesets](https://docs.github.com/en/rest/repos/rules), [segurança do Actions](https://docs.github.com/en/actions/reference/security/secure-use) e [relato privado de vulnerabilidades](https://docs.github.com/en/code-security/how-tos/report-and-fix-vulnerabilities/configure-vulnerability-reporting).
