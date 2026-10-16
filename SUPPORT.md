# Suporte do Tripeiro

Este repositório é o canal público para problemas e sugestões sobre o aplicativo **Tripeiro**, a skill e a importação de roteiros da IA.

Para instalar e usar a skill, comece pelo [guia de uso](https://gdonscoi.github.io/tripeiro/). Para enviar ou comentar em uma issue, é necessário ter uma conta no GitHub. **Issues e seus anexos são públicos.**

## Relatar um problema ou sugerir uma melhoria

Primeiro, procure nas [issues abertas e fechadas](https://github.com/gdonscoi/tripeiro/issues?q=is%3Aissue). Se encontrar o mesmo problema ou ideia, comente nessa issue com o que puder acrescentar.

Se ainda não houver um relato correspondente, [escolha um formulário](https://github.com/gdonscoi/tripeiro/issues/new/choose):

| Formulário | Quando usar |
|---|---|
| Problema no aplicativo | Algo não funciona como esperado no Tripeiro. |
| Problema na skill ou importação da IA | Dificuldades com download, instalação, instruções, geração do roteiro ou importação no app. |
| Sugerir uma melhoria | Uma necessidade ou ideia para o app, a skill ou a documentação. |

Inclua as versões e o ambiente, os passos para reproduzir, o que esperava e o que aconteceu. Se não souber uma versão, diga que não sabe. Mensagens de erro ajudam; capturas de tela são opcionais. Não precisa saber programar para relatar um problema.

Se o relato se encaixar em mais de um formulário, escolha o que melhor descreve a situação. O mantenedor ajustará as labels durante a triagem; não é necessário abrir duas issues.

## Cuidados com dados pessoais

Use exemplos fictícios. Antes de publicar textos ou capturas, oculte nomes de viajantes, bilhetes, localizadores, códigos de reserva, documentos, contatos pessoais e informações da sua viagem real. Não envie uma exportação completa da viagem nem sua conversa inteira com a IA.

Se descobrir que publicou algo sensível, edite o relato para removê-lo e use os recursos de denúncia do GitHub quando aplicável. Não repita o conteúdo em comentários. Editar um relato não garante a remoção das informações de históricos, notificações ou cópias já feitas.

Suspeitas de falha de segurança ou exposição de dados do produto devem ir para o [canal privado de vulnerabilidades](https://github.com/gdonscoi/tripeiro/security/advisories/new), conforme a [política de segurança](SECURITY.md).

## Como acompanhar

O atendimento segue este fluxo:

1. Você envia um relato público com dados fictícios.
2. O mantenedor faz a triagem e pode pedir esclarecimentos na própria issue.
3. Quando necessário, cria uma tarefa de desenvolvimento no repositório privado do aplicativo. A issue pública continua sendo seu ponto de acompanhamento.
4. Depois da correção, informa na issue a versão corrigida ou, para documentação e página, a alteração publicada. Se você puder, confirme se resolveu.

Use a opção de inscrição da issue para acompanhar respostas. Não são expostos código ou links privados inacessíveis ao usuário. Não há cópia automática dos relatos para o repositório privado nem fechamento automático por inatividade.

Uma sugestão será avaliada conforme o escopo do produto. Não há prazo de resposta ou implementação garantido. Relatos repetidos podem ser encerrados com o link da issue principal; relatos que precisam de esclarecimentos recebem a label `needs-info`.

## Labels usadas na triagem

| Label | Significado |
|---|---|
| `bug` | Relato de algo que não funcionou como esperado; ainda pode estar em investigação. |
| `enhancement` | Sugestão de melhoria. |
| `needs-triage` | Aguarda análise inicial. |
| `needs-info` | O mantenedor pediu informações adicionais. |
| `confirmed` | O problema foi reproduzido ou confirmado pelo mantenedor. |
| `duplicate` | Já existe uma issue principal para o mesmo relato. |
| `app` | Aplicativo Tripeiro. |
| `skill` | Skill, instruções ou importação da IA. |
| `documentation` | Documentação ou página de ajuda. |

As labels são organizadas pelo mantenedor. Remover `needs-triage` indica que a triagem inicial foi feita, sem prometer implementação. Ao receber as informações solicitadas, o mantenedor reavalia `needs-info`. O encerramento informa o motivo ou a versão/alteração entregue.

Leia também as [orientações para contribuições](CONTRIBUTING.md) e o [código de conduta](CODE_OF_CONDUCT.md).
