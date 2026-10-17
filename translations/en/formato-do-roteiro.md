# Tripeiro itinerary format — `tripeiro-plan` version 1

Reference for the block the AI gives the person to paste into Tripeiro (⋮ menu → **Import from AI**). The app checks everything on the phone, offline, shows the trip for review and only then creates **a new trip**. No existing trip is changed.

This format is independent of the app’s database and Tripeiro PDF package. It has no IDs or internal metadata: the app creates IDs when saving.

## How to deliver

- One single `json` code block containing one complete JSON object. Text before or after the block is ignored.
- Do not split the result across blocks: the app refuses more than one code block.
- Valid JSON: double quotes, no comments, no comma after the last item.
- Dates as `YYYY-MM-DD`; times as `HH:MM` (24-hour); transport date and time as `YYYY-MM-DDTHH:MM`, using the ticket’s local time without a time zone.
- Unknown information = **omit the field**. `null` and `""` also count as absent; never fill a value just to avoid leaving it empty.
- Fields the app does not know, or that the item type does not use, cause the app to **refuse** the result (nothing is silently discarded). Extra information goes in `notes`.

## Structure

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

`format`, `version` and `trip` are required. Lists are optional; each list’s order is the order displayed in the app.

### `trip` — the trip

| Field | Required | Rule |
|---|---|---|
| `name` | yes | Trip name, up to 200 characters. |
| `destination` | yes | Main destination, up to 200 characters. |
| `startDate` | no | `YYYY-MM-DD`. |
| `endDate` | no | `YYYY-MM-DD`, not before `startDate`. |
| `notes` | no | Free text, up to 10,000 characters. Links, emails and phone numbers in the text become tappable in the app. |

### `transports` — transport legs (up to 100)

| Field | Rule |
|---|---|
| `mode` | Required: `FLIGHT`, `BUS`, `TRAIN`, `CAR`, `BOAT` or `OTHER`. |
| `modeName` | Required **only** for `OTHER` (for example, `"Transfer"`); forbidden for other modes. |
| `origin`, `destination` | Required, up to 200 characters. |
| `departure`, `arrival` | Optional. `YYYY-MM-DDTHH:MM`. Only `CAR` accepts a date without time (`YYYY-MM-DD`). |
| `company` | Carrier (airline, bus company…). Not used for `CAR`. |
| `number` | Flight or service number. Not used for `CAR`. |
| `seat` | Seat. Not used for `CAR`. |
| `booking` | Booking reference or reservation code. Not used for `CAR`. Never invent it. |
| `notes` | Free text. |

Car: if no time has been agreed, use only the date. **Never** use `00:00` to mean "no time".

### `stays` — accommodation (up to 100)

| Field | Rule |
|---|---|
| `name` | Required, up to 200 characters. |
| `address` | Up to 500 characters. |
| `checkIn`, `checkOut` | `YYYY-MM-DD`; `checkOut` not before `checkIn`. |
| `booking` | Reservation code, only if provided by the person. |
| `notes` | Free text. |
| `latitude`, `longitude` | Numbers, always together (latitude −90 to 90, longitude −180 to 180). Research and verify the place’s coordinates as instructed by the skill; a written address does not replace this numeric pair. |

### `itinerary` — activities, notes and checklists (up to 500)

| Field | ACTIVITY | NOTE | CHECKLIST |
|---|---|---|---|
| `type` | required | required | required |
| `day` | optional | optional | optional |
| `title` | **required**, up to 200 | — | optional, up to 200 |
| `time` | optional, `HH:MM` | — | — |
| `address` | optional, up to 500 | — | — |
| `notes` | optional, up to 10,000 | **required** (the note’s text) | — |
| `latitude`, `longitude` | optional, together | — | — |
| `items` | — | — | **required**, 1 to 200 items |

`—` = the field does not exist for this type and must not be sent.

- `day`: `YYYY-MM-DD` within the trip period (`startDate` to `endDate`). Without `day`, the item appears under "No day set". Items with `day` require a trip with start and end dates.
- For stays and activities, research and verify the full address (`address`) and numeric `latitude`/`longitude` pair as instructed by the skill. These are separate fields: include verified data and omit what cannot be confirmed. Latitude −90 to 90 and longitude −180 to 180, always together.
- Order within each day follows list order.
- Each checklist item: `{ "text": "...", "done": false }`; `text` required (up to 200 characters), `done` optional (default `false`).

### `contacts` — contacts and links (up to 100)

| Field | Rule |
|---|---|
| `kind` | Required: `LINK`, `PHONE` or `EMAIL`. |
| `name` | Required, up to 200 characters (for example, "Hotel reception"). |
| `value` | Required. `LINK`: web address with a domain (`https://` is added if absent). `PHONE`: at least 8 digits; only digits, `+`, spaces, parentheses and hyphens; use the country code (`+55…`). `EMAIL`: `name@domain.com`. |
| `notes` | Free text. |

Only include contacts provided by the person or from a source they confirmed. Do not invent phone numbers, emails or links.

## Limits

Up to 200,000 characters in pasted text and JSON depth up to 10. Lists: 100 transport legs, 100 stays, 500 itinerary items, 200 items per checklist, 100 contacts.

## What does not go into the app

- Attachments, images and files from the conversation.
- Prices, ratings and other data without a dedicated field: if useful, summarize in `notes`.

## Compatibility

| Format | Tripeiro app |
|---|---|
| `tripeiro-plan` version 1 (skill 1.0.0 to 1.0.2) | Tripeiro with the **Import from AI** menu. |

A newer format version is refused by older apps, with guidance to update the app.

## Common errors

| The app says | Likely cause | Correction |
|---|---|---|
| Incomplete or damaged result | Partially copied block, trailing comma, JSON comment | Generate and copy the whole block again. |
| More than one code block | Result split into parts | Deliver everything in one block. |
| Field Tripeiro does not know | Invented field (`price`, `rating`…) | Remove or move to `notes`. |
| Field not used by this type | `company` in `CAR`, `title` in `NOTE`, `modeName` outside `OTHER` | Remove or move to `notes`. |
| Invalid or missing time | A non-car leg with only a date | Provide the time or omit `departure`/`arrival`. |
| Day outside trip dates | `day` before start, after end, or trip without dates | Adjust the day, trip dates or omit `day`. |
