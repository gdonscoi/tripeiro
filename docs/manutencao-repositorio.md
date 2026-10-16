# Manutenção e proteções do repositório público

Configurações da fatia [#5](https://github.com/gdonscoi/tripeiro/issues/5), do [plano de suporte público](suporte-publico.md). Este documento é para mantenedores; formulários e guias de suporte serão entregues na #6.

## Publicação e checks

A fonte da skill é `skills/tripeiro`. Para atualizar os arquivos publicados:

```powershell
pwsh -NoProfile -File scripts/build.ps1
python scripts/verify.py
python -m unittest discover -s scripts -p test_verify.py -v
```

Requisitos locais: Python 3 e PowerShell (`pwsh`, preferido, ou Windows PowerShell). O CI usa os runtimes já disponíveis no runner `windows-latest`, sem bibliotecas Python externas.

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

O ruleset `Protecao da main` será ativado somente após confirmar uma execução bem-sucedida do novo check no GitHub. O estado efetivamente aplicado será registrado neste documento antes da entrega do PR.

Configuração aprovada do ruleset: alvo `refs/heads/main`; PR obrigatório, zero aprovações obrigatórias enquanto houver um único mantenedor, conversas resolvidas e check `Integridade da publicacao` do GitHub Actions aprovado, com branch atualizada. Exclusão e force push bloqueados. Nenhum ator terá bypass permanente. O proprietário continua podendo editar configurações administrativas; isso não constitui permissão para contornar o fluxo normal de PR.

## Verificação e limites

Os testes de regressão usam cópias temporárias e simulam instruções ou exemplos desatualizados, JSON inválido, versão de formato incompatível, entradas ausentes, alteradas ou repetidas no ZIP e variações inofensivas de metadados/fim de linha. Não alteram os arquivos publicados reais.

As permissões de usuário externo são verificadas pelas configurações, sem conta externa para teste de abertura de issue/PR. Não são enviados force push nem exclusões de teste à main. Após o merge autorizado, conferir o workflow na main e o deploy do Pages; o conteúdo visual da página não é alterado nesta fatia.

Referências: [restrição de PRs](https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/enabling-features-for-your-repository/disabling-pull-requests), [rulesets](https://docs.github.com/en/rest/repos/rules), [segurança do Actions](https://docs.github.com/en/actions/reference/security/secure-use) e [relato privado de vulnerabilidades](https://docs.github.com/en/code-security/how-tos/report-and-fix-vulnerabilities/configure-vulnerability-reporting).
