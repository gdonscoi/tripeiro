# Política de privacidade — publicação

Política preparada em 17/10/2026 para o primeiro lançamento do app Tripeiro. Responsável e contato público confirmados: Gerson Donscoi Junior / donscoijr@gmail.com.

- Português: `https://gdonscoi.github.io/tripeiro/privacidade.html`.
- Inglês: `https://gdonscoi.github.io/tripeiro/en/privacy.html`.
- HTML estático, sem JavaScript, login ou formulário. Usa o CSS e a marca já existentes. Os idiomas têm links recíprocos e não são redirecionados pelo idioma do navegador.
- O rodapé de cada página inicial aponta para a política no respectivo idioma.
- A distinção de backup aplica-se às versões do app que oferecem a política no menu: nuvem sem cópias de anexos, transferência direta com anexos no Android 12+. Sistemas anteriores podem usar as regras legadas e também excluir anexos da transferência.
- Retenção do Analytics confirmada pelo responsável: eventos e usuários 14 meses, renovação por novas atividades desativada. A política distingue dados agregados e os demais serviços.

## Validação antes do merge

- Revisão cruzada dos dois textos com o inventário do app, SDKs e decisões do responsável.
- Parser HTML verificou os links relativos, recursos e âncoras das duas políticas e das duas páginas iniciais; nenhum destino local ausente. Políticas sem scripts, formulários ou iframes.
- Servidor HTTP local respondeu 200. Política pt e troca para en verificadas no navegador; layout pt no desktop e en em 360 × 800, sem excesso horizontal.
- `git diff --check` passou.
- Não foi executado build de Android neste repositório de conteúdo; a integração do app tem validação própria.

## Depois do merge autorizado

Esperar a publicação do GitHub Pages e verificar HTTP 200, idioma, responsável/contato e navegação nas duas URLs públicas. Só depois liberar o link da política na versão distribuída do app. Até esse momento as URLs acima são destinos de publicação, não evidência de disponibilidade. Este PR não envia o app à Play nem preenche o formulário de Segurança dos dados.

## Atualização de 23/10/2026 — Tripeiro Plus e viagem compartilhada

Novas seções nas duas políticas: Tripeiro Plus (Google Play Billing e RevenueCat), viagem compartilhada e conta Google (Firebase Authentication, Cloud Firestore, convidado anônimo, Install Referrer, App Check com Play Integrity, Firebase Hosting) e exclusão da conta (no app, por e-mail e na página `https://travel-memory-6b1af.web.app/excluir-conta`). Retenção da viagem compartilhada e do estado da assinatura, e a seção de provedores, também mudaram. A frase "não existe conta Tripeiro" saiu. Base: `docs/lancamento-plus.md` e `docs/servidor-firebase.md` do repositório do app. Publicar antes de a versão com o Plus ir para a produção.
