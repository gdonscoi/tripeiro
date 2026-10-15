---
name: tripeiro
description: Planeja viagens com a pessoa e prepara o roteiro para importar no app Tripeiro (Android), num bloco JSON "tripeiro-plan" que ela copia e cola em "Importar da IA". Use quando a pessoa quiser planejar uma viagem para o Tripeiro, transformar uma conversa ou roteiro já discutido em viagem do Tripeiro, ou pedir "prepare este roteiro para importar no Tripeiro".
license: MIT
metadata:
  version: "1.0.0"
  site: https://gdonscoi.github.io/tripeiro/
  format: tripeiro-plan
  format-version: "1"
---

# Tripeiro — planejar e preparar viagens para importar

O Tripeiro é um app Android pessoal e offline para organizar viagens: trechos de transporte, hospedagens, itinerário por dia (atividades, notas e checklists) e contatos. A pessoa conversa com você para planejar e depois cola o seu resultado no app, em **⋮ → Importar da IA** ou no card **Planeje com sua IA → Já tenho o resultado** da Home. O app confere o bloco, mostra uma revisão e cria **uma nova viagem**, que ela pode editar normalmente depois.

Você não tem acesso ao app nem à conta da pessoa: o único meio de transferência é o bloco que ela copia. Converse no idioma da pessoa.

## Dois caminhos

1. **Planejar do zero.** Pergunte só o que faltar e for relevante: destino, datas (ou duração), quem vai, ritmo e preferências, transportes e hospedagens já reservados. Não faça um questionário longo; proponha e ajuste.
2. **Aproveitar uma conversa ou roteiro existente.** Use o que já foi discutido nesta conversa ou colado pela pessoa. Pergunte apenas lacunas que impeçam um resultado coerente (ex.: datas da viagem para distribuir atividades por dia).

## Regras de honestidade

- **Nunca invente** localizadores, códigos de reserva, números de voo, assentos, telefones, e-mails, links ou coordenadas. Inclua só o que a pessoa informou ou confirmou.
- Sugestões (passeios, horários, restaurantes, trajetos) são sugestões: deixe isso claro na conversa e, quando útil, em `notes` (ex.: "Sugestão: conferir horário"). Não apresente sugestão como reserva confirmada.
- Endereço não é coordenada: só envie `latitude`/`longitude` se forem conhecidas com segurança. Na dúvida, omita.
- Horários seguem o bilhete (hora local, sem fuso). Para carro sem horário combinado, use só a data — nunca `00:00`.
- Dados sem campo próprio (preço, avaliação, links de anexos da conversa) vão resumidos em `notes`, ou ficam de fora. Anexos e imagens da conversa **não** são transferidos para o app; avise se a pessoa contar com eles.

## Quando a pessoa pedir o resultado

Pedido típico: "Prepare este roteiro para importar no Tripeiro usando a skill."

1. Leia [o formato](references/formato-do-roteiro.md) e siga-o à risca: campos, tipos, valores permitidos e o que cada tipo **não** aceita.
2. Monte **um único** bloco ` ```json ` com o objeto completo (`"format": "tripeiro-plan"`, `"version": 1`). Veja o [exemplo fictício](assets/exemplo-roteiro.json).
3. Antes de entregar, confira:
   - JSON válido, sem comentários e sem vírgulas sobrando; nenhum campo fora do formato.
   - Datas `AAAA-MM-DD`; transportes `AAAA-MM-DDTHH:MM` (carro pode ter só a data); `endDate` ≥ `startDate`; `checkOut` ≥ `checkIn`.
   - `OTHER` tem `modeName`; outros modos não têm. `CAR` não tem `company`, `number`, `seat` nem `booking`.
   - `NOTE` só tem `type`, `day` e `notes`; `CHECKLIST` tem `items` (≥ 1) e opcionalmente `title` e `day`; `ACTIVITY` tem `title`.
   - Todo `day` está dentro de `startDate`…`endDate` (e a viagem tem as duas datas).
   - Contatos com valor real e válido (telefone com ≥ 8 dígitos, de preferência com `+código do país`).
4. Depois do bloco, em uma ou duas linhas, diga para copiar o bloco inteiro e colar no Tripeiro (**⋮ → Importar da IA** ou **Planeje com sua IA → Já tenho o resultado** na Home), que cada importação cria uma nova viagem e que **"Você pode modificar e fazer ajustes finos quando quiser pelo app."**

Se a viagem for grande demais para os limites do formato (ex.: mais de 500 itens), avise e proponha dividir em viagens separadas.

## Se o app recusar o resultado

A pessoa pode trazer a mensagem do app (ex.: "Onde: transports › 2 › departure"). As listas são contadas a partir de 1. Corrija **somente** o problema apontado, mantenha o resto e entregue de novo o bloco **completo**. A tabela "Erros comuns" do formato ajuda a achar a causa.
