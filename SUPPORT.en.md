# Tripeiro support

[Português](SUPPORT.md) | English

This repository is the public channel for problems and suggestions about the **Tripeiro** app, the skill and AI itinerary imports.

To install and use the skill, start with the [usage guide](https://gdonscoi.github.io/tripeiro/?lang=en). Submitting or commenting on an issue requires a GitHub account. **Issues and attachments are public.**

## Report a problem or suggest an improvement

First, search [open and closed issues](https://github.com/gdonscoi/tripeiro/issues?q=is%3Aissue). If you find the same problem or idea, comment there with anything you can add.

If there is no matching report yet, [choose a form](https://github.com/gdonscoi/tripeiro/issues/new/choose):

| Form | When to use it |
|---|---|
| App problem (Problema no aplicativo) | Something does not work as expected in Tripeiro. |
| Skill or AI import problem (Problema na skill ou importação da IA) | Download, installation, instructions, itinerary generation or import difficulties. |
| Suggest an improvement (Sugerir uma melhoria) | A need or idea for the app, skill or documentation. |

Include versions and environment, steps to reproduce, what you expected and what happened. If you do not know a version, say so. Error messages help; screenshots are optional. You do not need programming knowledge to report a problem.

If the report fits more than one form, choose the best match. The maintainer adjusts labels during triage; you do not need to open two issues.

## Personal data

Use fictional examples. Before publishing text or screenshots, hide traveler names, tickets, booking references, reservation codes, documents, personal contacts and real trip information. Do not send a full trip export or your entire AI conversation.

If you discover you published sensitive information, edit the report to remove it and use GitHub’s reporting tools when applicable. Do not repeat the content in comments. Editing does not guarantee removal from history, notifications or existing copies.

Suspected security flaws or product data exposure go to the [private vulnerability channel](https://github.com/gdonscoi/tripeiro/security/advisories/new), following the [security policy](SECURITY.en.md).

## Following progress

Support follows this process:

1. You submit a public report with fictional data.
2. The maintainer triages it and may request clarification on the issue.
3. When necessary, a development task is created in the app’s private repository. The public issue remains your place to follow progress.
4. After a fix, the maintainer shares the fixed version or, for documentation and the page, the published change. If possible, confirm whether it resolved your problem.

Subscribe to the issue to follow replies. Private code and inaccessible private links are not exposed. Reports are not automatically copied to the private repository or automatically closed for inactivity.

Suggestions are evaluated against product scope. There is no guaranteed response or implementation deadline. Duplicate reports may be closed with a link to the main issue; reports requiring clarification receive `needs-info`.

## Triage labels

| Label | Meaning |
|---|---|
| `bug` | Report of unexpected behavior; may still be under investigation. |
| `enhancement` | Improvement suggestion. |
| `needs-triage` | Awaiting initial review. |
| `needs-info` | The maintainer requested additional information. |
| `confirmed` | The maintainer reproduced or confirmed the problem. |
| `duplicate` | A main issue already exists for this report. |
| `app` | Tripeiro app. |
| `skill` | Skill, instructions or AI import. |
| `documentation` | Documentation or help page. |

The maintainer manages labels. Removing `needs-triage` means initial triage is complete, without promising implementation. After receiving requested information, the maintainer reevaluates `needs-info`. Closure states the reason or the delivered version/change.

See also the [contribution guidance](CONTRIBUTING.md) and [code of conduct](CODE_OF_CONDUCT.md).
