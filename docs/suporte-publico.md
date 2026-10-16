# Suporte público e proteção do repositório

Plano e divisão em três entregas aprovados em 16/10/2026. Repositório: `gdonscoi/tripeiro`.

## Objetivo e decisões

Transformar o repositório público na central de suporte do aplicativo e da skill, com ajuda, relatos de problemas e sugestões. A implementação Android continua no repositório privado `gdonscoi/travel_memory`.

- Issues públicas; Pull Requests restritos a colaboradores.
- Alterações de conteúdo somente por PR, em branch `codex/` e worktree exclusiva por fatia. Merge manual autorizado pelo mantenedor.
- Não exigir aprovação de um segundo mantenedor enquanto o projeto tiver um único mantenedor; autores não podem aprovar os próprios PRs.
- Não copiar automaticamente dados entre os repositórios, nem encerrar relatos por inatividade.
- Orientar usuários a ocultar informações pessoais e usar exemplos fictícios. Não solicitar exportação completa da viagem por padrão.

## Backlog e ordem

Épico: [#4 — Suporte público e proteção do repositório](https://github.com/gdonscoi/tripeiro/issues/4).

- [x] [#5 — Proteções do repositório](https://github.com/gdonscoi/tripeiro/issues/5).
- [ ] [#6 — Formulários e processo de suporte](https://github.com/gdonscoi/tripeiro/issues/6), depende da #5.
- [ ] [#7 — Entrada pública de ajuda](https://github.com/gdonscoi/tripeiro/issues/7), depende da #6.

Ordem aprovada: proteção, atendimento e entrada pública de ajuda. A fatia #5 foi entregue no PR #9 em 16/10/2026, com merge confirmado, workflow da main aprovado e Pages publicado. A #6 foi iniciada com autorização do usuário na branch `codex/6-formularios-suporte`; aguarda merge autorizado e conferência dos formulários publicados. A #7 ainda não começou. O checklist acima será marcado após o merge confirmado de cada entrega e suas verificações posteriores.

O funcionamento dos checks, as configurações administrativas e os limites de validação estão em [Manutenção e proteções do repositório público](manutencao-repositorio.md). Os formulários e documentos da segunda fatia estão implementados no [PR #10](https://github.com/gdonscoi/tripeiro/pull/10) e orientam o atendimento público conforme [SUPPORT.md](../SUPPORT.md); sua disponibilização depende do merge da #6 e da conferência posterior no GitHub.

## 1. Proteções do repositório

### Valor para o usuário

Proteger os arquivos e a página que distribuem a skill, mantendo os relatos públicos disponíveis.

### Escopo

- Restringir PRs a colaboradores, mantendo Issues públicas.
- Publicar checks de integridade dos exemplos, empacotamento da skill e consistência dos arquivos gerados, aproveitando `scripts/build.ps1`.
- Considerar o conteúdo do ZIP na comparação; metadados de compactação não devem causar divergências artificiais.
- Após publicar e confirmar os checks, ativar ruleset na `main`: exigir PR, checks aprovados e resolução das conversas; bloquear force push e exclusão.
- Configurar squash como método de merge e manter merge automático desabilitado.
- Não exigir aprovação de um segundo mantenedor. Manter bypass mínimo e documentar qualquer exceção administrativa, sem abrir um caminho habitual de push direto.
- Preservar secret scanning, push protection, token padrão de leitura e bloqueio de aprovação de PR por workflows. Usar permissões mínimas e ações confiáveis fixadas por SHA nos workflows criados.
- Habilitar o relato privado de vulnerabilidades e documentar o estado das configurações administrativas.

### Critérios de aceite

- [x] Usuários externos podem abrir issues, mas não PRs.
- [x] Alterações comuns na main exigem PR, checks aprovados e conversas resolvidas.
- [x] Force push e exclusão da main estão bloqueados; exceções administrativas estão explícitas.
- [x] Exemplos e arquivos publicados inconsistentes são detectados; a fonte atual passa nos checks.
- [x] Squash está disponível como único método e merge automático permanece desabilitado.
- [x] Relato privado de vulnerabilidades está habilitado e as proteções existentes foram preservadas.

### Testes e limitações

Executar os checks na worktree e no GitHub Actions; usar alterações temporárias controladas para verificar detecção de inconsistências. Consultar as configurações pela API e/ou interface. Se não houver uma conta externa para testar permissões, registrar que o acesso externo foi conferido apenas pelas configurações. Não testar proteções enviando operações destrutivas à main.

### Fora desta fatia

Formulários, novos guias de atendimento, alterações visuais da página e testes Android.

## 2. Formulários e processo de suporte

### Valor para o usuário

Relatar problemas e sugestões com orientação clara e informações úteis para investigação.

### Escopo

- Criar formulários para bug do app, problema na skill/importação da IA e sugestão de melhoria.
- Bugs: versão, ambiente, área afetada, passos, resultado esperado e observado, frequência e captura opcional. Na skill: ferramenta de IA, versão da skill e mensagem de erro da importação, quando houver.
- Orientar a ocultar dados pessoais, bilhetes, localizadores e documentos e a usar exemplos fictícios.
- Retirar issue em branco do seletor para usuários externos e encaminhar segurança ao canal privado.
- Criar labels de tipo, área e triagem: `bug`, `enhancement`, `needs-triage`, `needs-info`, `confirmed`, `duplicate`, `app`, `skill` e `documentation`, reutilizando as existentes.
- Criar `SUPPORT.md`, `CONTRIBUTING.md`, `SECURITY.md` e código de conduta curto.
- Documentar: relato público → triagem → tarefa privada quando necessária → correção → resposta pública com a versão corrigida, sem expor código ou links privados inacessíveis.

### Critérios de aceite

- [ ] Os três formulários aparecem no seletor e coletam as informações necessárias ao respectivo relato.
- [ ] Issue em branco não aparece para usuários externos; o mantenedor pode manter a opção administrativa.
- [ ] Os formulários e guias orientam sobre dados pessoais e não exigem exportação completa de viagem.
- [ ] O canal privado de segurança está acessível pelo encaminhamento publicado.
- [ ] Labels e documentos explicam o atendimento, as contribuições e o acompanhamento da solução.
- [ ] Não há cópia automática entre repositórios nem fechamento por inatividade.

### Testes e limitações

Revisar YAML, campos obrigatórios, links, labels e texto; executar `git diff --check`. Conferir o seletor e os formulários no GitHub após o merge, registrando essa validação como pendente enquanto os arquivos não estiverem na branch padrão. Não publicar relatos fictícios como se fossem bugs reais.

### Fora desta fatia

Discussions, canal sem conta GitHub, automação de triagem e alterações no aplicativo.

## 3. Entrada pública de ajuda

### Valor para o usuário

Encontrar instalação, ajuda e formas de relatar problemas sem conhecer a organização do repositório.

### Escopo

- Atualizar README e página existente com acessos para instalação e uso da skill, problemas, sugestões, perguntas frequentes, histórico da skill e relatos privados de segurança.
- Preservar conteúdo útil e downloads existentes.
- Informar que abrir issues exige conta no GitHub e que os relatos são públicos.
- Não publicar histórico do app sem versões confirmadas.

### Critérios de aceite

- [ ] README e página permitem chegar aos canais corretos de ajuda, problemas, sugestões e segurança.
- [ ] Links e downloads existentes continuam funcionando.
- [ ] A página permanece utilizável no celular.
- [ ] A exigência de conta GitHub e a visibilidade pública dos relatos estão claras.
- [ ] FAQ e histórico publicado refletem informações confirmadas, sem inventar versões do app.

### Testes e limitações

Revisar texto e links, executar `git diff --check`, inspecionar a página em largura de celular e conferir a publicação do Pages após o merge. Não é necessário build Android.

### Fora desta fatia

Redesign completo da página, Discussions, atendimento sem GitHub e botão de suporte dentro do app.

## Definição de pronto de cada fatia

Escopo e critérios implementados, verificações adequadas executadas e resultados e limitações registrados; documentação atualizada no mesmo PR. Uma issue, worktree e branch por fatia. PR para main com `Closes`, link do épico e validação de cada critério. Nenhum merge automático. Marcar a entrega concluída somente após confirmar o merge e a validação posterior aplicável; então atualizar issue/épico e limpar apenas a worktree e as branches da tarefa, preservando trabalho pendente.

## Fora do plano inicial

Discussions; atendimento sem conta GitHub; alterações no app, incluindo botão de suporte; coleta automática de logs; contribuições por PR de usuários externos. Não introduzir novas dependências nem atualizar ferramentas sem necessidade discutida no escopo.

## Situação inicial observada

Em 16/10/2026: Issues habilitadas e sem issues abertas; Discussions desabilitado; sem `.github` e sem proteção da main; secret scanning e push protection habilitados; relato privado de vulnerabilidades desabilitado. Actions permite ações de qualquer origem, com token padrão de leitura e sem aprovação de PR por workflow. Pages publica `/docs` da main. Este registro não significa que as configurações propostas já foram aplicadas.
