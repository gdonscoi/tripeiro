# Formato do roteiro Tripeiro — `tripeiro-plan` versão 1

Referência do bloco que a IA entrega para a pessoa colar no Tripeiro (menu ⋮ → **Importar da IA**). O app confere tudo no celular, sem internet, mostra a viagem para revisão e só então cria **uma nova viagem**. Nenhuma viagem existente é alterada.

Este formato é independente do banco do app e do pacote dos PDFs do Tripeiro. Ele não tem IDs nem metadados internos: o app cria os IDs ao gravar.

## Como entregar

- Um único bloco de código ` ```json ` com um único objeto JSON completo. Texto antes ou depois do bloco é ignorado.
- Não divida o resultado em vários blocos: o app recusa mais de um bloco de código.
- JSON válido: aspas duplas, sem comentários, sem vírgula depois do último item.
- Datas em `AAAA-MM-DD`; horários em `HH:MM` (24 h); data e hora dos transportes em `AAAA-MM-DDTHH:MM`, horário local do bilhete, sem fuso.
- Informação desconhecida = **omitir o campo**. `null` e `""` também contam como ausentes; nunca preencha um valor só para não deixar vazio.
- Campos que o app não conhece, ou que o tipo do item não usa, fazem o app **recusar** o resultado (nada é descartado em silêncio). Informações extras vão para `notes`.

## Estrutura

```json
{
  "format": "tripeiro-plan",
  "version": 1,
  "trip": { ... },
  "transports": [ ... ],
  "stays": [ ... ],
  "itinerary": [ ... ],
  "contacts": [ ... ]
}
```

`format`, `version` e `trip` são obrigatórios. As listas são opcionais; a ordem de cada lista é a ordem que aparece no app.

### `trip` — a viagem

| Campo | Obrigatório | Regra |
|---|---|---|
| `name` | sim | Nome da viagem, até 200 caracteres. |
| `destination` | sim | Destino principal, até 200 caracteres. |
| `startDate` | não | `AAAA-MM-DD`. |
| `endDate` | não | `AAAA-MM-DD`, não anterior a `startDate`. |
| `notes` | não | Texto livre, até 10.000 caracteres. Links, e-mails e telefones no texto ficam clicáveis no app. |

### `transports` — trechos (até 100)

| Campo | Regra |
|---|---|
| `mode` | Obrigatório: `FLIGHT` (voo), `BUS` (ônibus), `TRAIN` (trem), `CAR` (carro), `BOAT` (barco) ou `OTHER` (outro). |
| `modeName` | Obrigatório **só** em `OTHER` (ex.: `"Transfer"`); proibido nos demais. |
| `origin`, `destination` | Obrigatórios, até 200 caracteres. |
| `departure`, `arrival` | Opcionais. `AAAA-MM-DDTHH:MM`. Só `CAR` aceita a data sem hora (`AAAA-MM-DD`). |
| `company` | Empresa (companhia aérea, viação…). Não usado em `CAR`. |
| `number` | Número do voo ou serviço. Não usado em `CAR`. |
| `seat` | Assento ou poltrona. Não usado em `CAR`. |
| `booking` | Localizador ou código da reserva. Não usado em `CAR`. Nunca invente. |
| `notes` | Texto livre. |

Carro: se não houver horário combinado, use só a data. **Nunca** preencha `00:00` para dizer "sem horário".

### `stays` — hospedagens (até 100)

| Campo | Regra |
|---|---|
| `name` | Obrigatório, até 200 caracteres. |
| `address` | Até 500 caracteres. |
| `checkIn`, `checkOut` | `AAAA-MM-DD`; `checkOut` não anterior a `checkIn`. |
| `booking` | Código da reserva, só se a pessoa informou. |
| `notes` | Texto livre. |
| `latitude`, `longitude` | Números, sempre juntos (latitude −90 a 90, longitude −180 a 180). Só se forem coordenadas conhecidas; um endereço não basta. |

### `itinerary` — atividades, notas e checklists (até 500)

| Campo | ACTIVITY | NOTE | CHECKLIST |
|---|---|---|---|
| `type` | obrigatório | obrigatório | obrigatório |
| `day` | opcional | opcional | opcional |
| `title` | **obrigatório**, até 200 | — | opcional, até 200 |
| `time` | opcional, `HH:MM` | — | — |
| `address` | opcional, até 500 | — | — |
| `notes` | opcional, até 10.000 | **obrigatório** (o texto da nota) | — |
| `latitude`, `longitude` | opcionais, juntos | — | — |
| `items` | — | — | **obrigatório**, 1 a 200 itens |

`—` = o campo não existe para o tipo e não pode ser enviado.

- `day`: `AAAA-MM-DD` dentro do período da viagem (`startDate` a `endDate`). Sem `day`, o item fica em "Sem dia definido". Itens com `day` exigem viagem com início e fim.
- A ordem dentro de cada dia segue a ordem da lista.
- Cada item de checklist: `{ "text": "...", "done": false }`; `text` obrigatório (até 200 caracteres), `done` opcional (padrão `false`).

### `contacts` — contatos e links (até 100)

| Campo | Regra |
|---|---|
| `kind` | Obrigatório: `LINK`, `PHONE` ou `EMAIL`. |
| `name` | Obrigatório, até 200 caracteres (ex.: "Recepção do hotel"). |
| `value` | Obrigatório. `LINK`: endereço web com domínio (`https://` é acrescentado se faltar). `PHONE`: pelo menos 8 dígitos, só números, `+`, espaços, parênteses e hífens; use o código do país (`+55…`). `EMAIL`: `nome@dominio.com`. |
| `notes` | Texto livre. |

Só inclua contatos que a pessoa forneceu ou que vieram de fonte que ela confirmou. Não invente telefones, e-mails ou links.

## Limites

Até 200.000 caracteres no texto colado e profundidade de JSON até 10. Listas: 100 transportes, 100 hospedagens, 500 itens de itinerário, 200 itens por checklist, 100 contatos.

## O que não vai para o app

- Anexos, imagens e arquivos da conversa.
- Preços, avaliações e outros dados sem campo próprio: se forem úteis, resuma em `notes`.

## Compatibilidade

| Formato | App Tripeiro |
|---|---|
| `tripeiro-plan` versão 1 (skill 1.0.0) | Tripeiro com o menu **Importar da IA**. |

Uma versão mais nova do formato é recusada por apps antigos, com a orientação de atualizar o app.

## Erros comuns

| O app diz | Causa provável | Correção |
|---|---|---|
| Resultado incompleto ou danificado | Bloco copiado pela metade, vírgula sobrando, comentário no JSON | Gerar e copiar o bloco inteiro de novo. |
| Mais de um bloco de código | Resultado dividido em partes | Entregar tudo em um único bloco. |
| Campo que o Tripeiro não conhece | Campo inventado (`price`, `rating`…) | Remover ou passar para `notes`. |
| Campo não usado por este tipo | `company` em `CAR`, `title` em `NOTE`, `modeName` fora de `OTHER` | Remover ou passar para `notes`. |
| Horário inválido ou ausente | Trecho que não é de carro só com a data | Informar a hora ou omitir `departure`/`arrival`. |
| Dia fora das datas da viagem | `day` antes do início, depois do fim ou viagem sem datas | Ajustar o dia, as datas da viagem ou omitir `day`. |
