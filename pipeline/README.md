# NewsFixd article and revenue pipeline

This is the editorial gate between outside inputs and the public site.

## Publishing flow

1. Add only an owned, licensed, or public-domain feed to `sources.json`.
2. Run `npm run pipeline:ingest`.
3. An editor verifies the author, facts, content rights, and image rights in `queue.json`.
4. Set each completed quality check to `true`.
5. Approve with `node pipeline/pipeline.mjs review ITEM_ID approve`.
6. Publish with `node pipeline/pipeline.mjs publish ITEM_ID`.

Publishing is blocked unless every editorial check passes and the source has a publishable rights status. Aggregated headlines may be used as reporting leads, but the pipeline must not republish full text or images without permission.

## Revenue flow

`monetization.json` is the inventory source of truth. It begins with four sellable products:

- Native feed sponsorship
- In-article advertising
- Newsletter primary sponsorship
- Local business spotlight

The first cash-flow target is direct local sponsorship because it does not require NewsBreak-scale traffic. Programmatic ads should be added only after traffic is large enough to avoid degrading the product for negligible revenue.

Use `npm run pipeline:report` to see the editorial queue and currently available inventory.
