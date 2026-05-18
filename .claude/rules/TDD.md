# TDD Rules

## The rule

Write a failing test before writing or modifying implementation code. The test must fail for the right reason before implementation begins.

## Stack

- **Unit / component**: Vitest + Testing Library (`src/__tests__/`)
- **E2E**: Playwright (`e2e/`)

## Process

1. Write the test that describes the expected behavior
2. Confirm it fails (for the right reason, not a syntax error)
3. Write the minimum implementation to make it pass
4. Refactor if needed; tests must still pass

## Hard rules

- Never mark a task complete if tests are failing
- No `// @ts-ignore` or `// eslint-disable` to make tests pass — fix the underlying issue
- Do not write tests that only confirm what the code already does; tests must describe intended behavior
- Test files must be created or updated in the same commit as the feature they cover
- E2E tests for new user-facing flows are required, not optional

## What to test

- All new components get at least one rendering test and one interaction test
- All new utility functions get unit tests covering the happy path and at least one error case
- New pages get an E2E test covering the primary user flow
