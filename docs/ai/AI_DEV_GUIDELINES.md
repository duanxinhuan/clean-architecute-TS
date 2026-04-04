# AI Development Guidelines

Purpose
- These notes are for automated agents and developers working with the codebase. ALWAYS read this file and the linked tooling & conventions docs before making changes.

Required reading order
1. docs/ai/CODING_CONVENTIONS.md — coding style, architecture & safety rules
2. docs/ai/TOOL_USAGE.md — how to run, build, test, and migrate safely
3. docs/ai/AI_DEV_GUIDELINES.md — this file: process & behavioural rules

Rules for automated editing
- Read all three docs before proposing or applying changes.
- Make the smallest change that accomplishes the task. Prefer focused diffs.
- Do not modify public API behavior (routes, DTOs, response shapes) without explicit user approval.
- If a database schema change is required: propose migration SQL and update Prisma schema; do not apply ad-hoc DB changes.
- Always run linting and relevant tests locally before committing.

Change process
- Create a branch for non-trivial work and open a PR describing intent, tests, and rollout steps.
- Add a short changelog entry in the PR description for user review.
- Annotate any generated files or debug artifacts with a clear comment and cleanup instructions.

When uncertain
- Ask the human reviewer for clarification instead of guessing large cross-cutting changes.
