# Tripeiro · Guide and support

[Português](README.md) | English

A skill for planning trips with the AI you already use and importing the result as a new trip into **Tripeiro**, a personal Android app for organizing trips offline.

This is also the public support channel for the app and the skill. Start with the [usage and help page](https://gdonscoi.github.io/tripeiro/?lang=en).

| I want to… | Where to go |
|---|---|
| Install and use the skill | [Installation](https://gdonscoi.github.io/tripeiro/?lang=en#instalar) and [import into the app](https://gdonscoi.github.io/tripeiro/?lang=en#importar) |
| Report an app problem | [App form](https://github.com/gdonscoi/tripeiro/issues/new?template=01-bug-app.yml) |
| Report a skill or AI import problem | [Skill/AI form](https://github.com/gdonscoi/tripeiro/issues/new?template=02-bug-skill.yml) |
| Suggest an improvement | [Suggestion form](https://github.com/gdonscoi/tripeiro/issues/new?template=03-sugestao.yml) |
| Find help and follow a report | [Frequently asked questions](https://gdonscoi.github.io/tripeiro/?lang=en#perguntas) and [support guide](SUPPORT.en.md) |
| See skill updates | [History](#skill-history) |
| Report a vulnerability | [Private security channel](https://github.com/gdonscoi/tripeiro/security/advisories/new) and [guidance](SECURITY.en.md) |

**Submitting or commenting on reports requires a GitHub account. Issues and their attachments are public.** Use fictional data and hide personal information, tickets, booking references, reservations and documents. Do not send your whole trip or full AI conversation. Before opening an issue, search [existing reports](https://github.com/gdonscoi/tripeiro/issues?q=is%3Aissue).

See the [usage guide](https://gdonscoi.github.io/tripeiro/?lang=en) or [download skill 1.0.2](https://gdonscoi.github.io/tripeiro/downloads/tripeiro-skill-1.0.2.zip).

- The installable [`skills/tripeiro/`](skills/tripeiro/SKILL.md) follows the open [Agent Skills](https://agentskills.io/specification) standard. Its files are in Portuguese, and it instructs the AI to talk in your language. Read the [English skill documentation](docs/en/skill.md), [format reference](docs/en/formato-do-roteiro.md) and [fictional example](docs/en/exemplo-roteiro.json).

## Install

Download the ZIP and extract the `tripeiro` folder. In Claude Code, put it in `~/.claude/skills/` or a project’s `.claude/skills/`. In other tools compatible with Agent Skills, follow the tool’s installation instructions.

If your AI does not accept skills, [open the English instructions](https://gdonscoi.github.io/tripeiro/en/instrucoes.txt), copy the text and paste it at the start of the conversation or in a project’s instructions.

## How it works

1. Install the skill in your AI tool, or copy the instructions into the conversation.
2. Plan your trip by talking; a previously discussed itinerary works too.
3. Ask: “Prepare this itinerary to import into Tripeiro using the skill.”
4. Copy the block and paste it into Tripeiro (**Plan with your AI → I have the result** or **⋮ → Import from AI**), review and create the new trip.

The AI stays outside the app: no API, key or account connection. The app checks the result on your phone, always creates a new trip and does not receive conversation attachments. The page distributes the skill and gathers help links; it does not receive or store itineraries.

## Frequently asked questions

- **Do I need a GitHub account to use the skill?** No. Downloads and instructions are public; an account is required to submit or comment on GitHub reports. Your AI tool may have its own access requirements.
- **My AI does not accept skills.** Use the [copyable instructions](https://gdonscoi.github.io/tripeiro/en/instrucoes.txt).
- **The app refused the result.** Use the correction request copied from the app and paste the new complete block; see the [correction guidance](https://gdonscoi.github.io/tripeiro/?lang=en#problemas). If it persists, report it with fictional data using the skill/AI form.
- **How do I follow a fix?** On the public issue itself. The maintainer shares the fixed version or published change when delivered, as described in the [support guide](SUPPORT.en.md).

More answers on the [FAQ page](https://gdonscoi.github.io/tripeiro/?lang=en#perguntas). PR contributions are restricted to invited collaborators; see [CONTRIBUTING.md](CONTRIBUTING.md) and the [code of conduct](CODE_OF_CONDUCT.md).

## Versions

| Skill | Format | Tripeiro app |
|---|---|---|
| 1.0.0 to 1.0.2 | `tripeiro-plan` 1 | Version with “Import from AI” and the “Plan with your AI” card |

## Tool compatibility

Use a tool compatible with Agent Skills, such as Claude Code, or copy the instructions into your conversational AI. Installation depends on your chosen tool.

## License

[MIT](LICENSE). All example data is fictional.

## Skill history

- **1.0.2:** instructs the AI to research and verify full addresses and coordinates for stays and activities, include confirmed data and disclose research limitations.
- **1.0.1:** instructs the AI to use the correction request copied from the app (problem, location with item name and hint) and always return the complete block.
- **1.0.0:** first version.
