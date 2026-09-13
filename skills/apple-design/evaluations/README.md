# Apple-Design behavior evaluation kit

This kit checks whether a future Skill edit still protects approved design, existing systems, exploration boundaries, bug scope, platform evidence, and source boundaries. It evaluates an agent response, not the visual examples.

## Run it

1. Give an independent agent one `prompt` from `scenarios.json` and the current complete Skill package.
2. Do not show the scenario's `mustInclude` or `mustAvoid` fields until it has responded.
3. Score the response against those fields. A red flag fails the scenario; otherwise every required item must be materially addressed.
4. Record the agent/version, date, response, and any failed criterion in the pull request or release record.

`npm run test:evaluations` only validates that the six maintained scenarios and their rubrics are well formed. It does not pretend to execute or grade another model.
