# Tripeiro — plan trips and prepare them for import

English translation of the Tripeiro skill 1.0.2, format `tripeiro-plan` version 1. [Português](https://github.com/gdonscoi/tripeiro/blob/main/skills/tripeiro/SKILL.md).

Tripeiro is a personal, offline Android app for organizing trips: transport legs, stays, daily itineraries (activities, notes and checklists) and contacts. The person talks with you to plan, then pastes your result into the app using **⋮ → Import from AI** or the **Plan with your AI → I have the result** card on the home screen. The app checks the block, shows a review and creates **a new trip**, which they can edit afterward.

You have no access to the app or the person’s account: the only transfer is the block they copy. Talk in the person’s language.

## Two paths

1. **Plan from scratch.** Ask only for missing, relevant information: destination, dates (or duration), travelers, pace and preferences, transport and stays already booked. Do not start a long questionnaire; propose and adjust.
2. **Use an existing conversation or itinerary.** Use what has already been discussed in this conversation or pasted by the person. Ask only about gaps that prevent a coherent result (for example, trip dates to distribute activities by day).

## Honesty rules

- **Never invent** booking references, reservation codes, flight numbers, seats, phone numbers, emails, links or coordinates. Include only what the person provided or confirmed; for addresses and coordinates, also use trustworthy sources verified as described below.
- Suggestions (sights, times, restaurants, routes) are suggestions: make that clear in the conversation and, when useful, in `notes` (for example, "Suggestion: check opening hours"). Do not present a suggestion as a confirmed booking.
- Whenever the format accepts `address`, `latitude` and `longitude` (stays and activities), research the place’s full address and coordinates using available search tools and trustworthy sources. Reuse supplied data and confirm that the address and coordinates match the correct establishment or point of interest; ask for clarification if ambiguous. Include the address in `address` and numeric coordinates in `latitude` and `longitude`, always together. Do not substitute the city center for the place. If you cannot verify data or cannot search, omit unverified fields and briefly disclose the limitation in the response; keep confirmed data. Do not add these fields to types that do not accept them.
- Times follow the ticket (local time, without a time zone). For a car without an agreed time, use only the date — never `00:00`.
- Data without a dedicated field (price, rating, attachment links from the conversation) is summarized in `notes` or left out. Attachments and images from the conversation are **not** transferred to the app; tell the person if they are relying on them.

## When the person asks for the result

Typical request: "Prepare this itinerary to import into Tripeiro using the skill."

1. Read [the format](formato-do-roteiro.md) and follow it exactly: fields, types, allowed values and what each type does **not** accept.
2. Build **one single** `json` code block with the complete object (`"format": "tripeiro-plan"`, `"version": 1`). See the [fictional example](exemplo-roteiro.json).
3. Before delivering, check:
   - Valid JSON, without comments or trailing commas; no fields outside the format.
   - Dates `YYYY-MM-DD`; transport `YYYY-MM-DDTHH:MM` (car may use date only); `endDate` ≥ `startDate`; `checkOut` ≥ `checkIn`.
   - `OTHER` has `modeName`; other modes do not. `CAR` has no `company`, `number`, `seat` or `booking`.
   - `NOTE` has only `type`, `day` and `notes`; `CHECKLIST` has `items` (≥ 1) and optionally `title` and `day`; `ACTIVITY` has `title`.
   - Every `day` is within `startDate`…`endDate` (and the trip has both dates).
   - Addresses and coordinates were researched for stays and activities; included data matches the correct place, coordinates come together and are within bounds, and any research limitations were disclosed.
   - Contacts have real, valid values (phone with ≥ 8 digits, preferably with `+country code`).
4. After the block, in one or two lines, say to copy the whole block and paste it into Tripeiro (**⋮ → Import from AI** or **Plan with your AI → I have the result** on the home screen), that every import creates a new trip and that **"You can change and fine-tune it whenever you like in the app."**

If the trip exceeds the format’s limits (for example, more than 500 items), explain and suggest splitting it into separate trips.

## If the app refuses the result

The app has a **Copy correction request** button, and the person may paste the request into the conversation. It includes the problem, location (for example, `Where: transports › 2 › departure · "Porto Alegre → Gramado"`, with lists counted from 1 and the item’s name) and a format hint. Fix **only** the reported problem and keep everything else. If the request says the app could not read the result, review the whole block: one single block, valid JSON and correct `"format"`/`"version"`. Always deliver the **complete** block again, never just the corrected excerpt, because the person replaces the old block with the new one in the app. The format’s "Common errors" table helps identify the cause.
