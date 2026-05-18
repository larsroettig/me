# Planning Rules — Interview Before You Code

## When plan mode is required

Enter plan mode for any task that is not a typo fix, single-line change, or copy update. If in doubt, use plan mode.

## The interview protocol

Before writing a plan, ask the user these four questions. Do not skip any, do not assume answers:

1. **Goal**: What is the goal? What does done look like concretely?
2. **Constraints**: What must not change or break? Are there things to avoid?
3. **Reuse**: Is there existing code, component, or pattern that should be reused? Where does it live?
4. **Edge cases**: What edge cases or failure states matter for this task?

Wait for answers before drafting the plan. If an answer is unclear, ask a follow-up rather than guessing.

## The plan

Write the plan as a numbered list of steps. Each step must include:
- What will be done
- How to verify it worked

Get explicit approval before writing any code.

## Scope changes

If the scope grows during implementation, stop. Update the plan. Get re-approval. Do not silently extend scope, even if the extension seems obviously correct.

## Specialist-persona review gates

Before any PR or publish, run these three review passes in separate conversations, in order:

**Security audit**
> You are an Apple platform security engineer. Audit this code for vulnerabilities. List findings with severity (Critical / High / Medium / Low) and file:line. Do not fix anything.

**Code review**
> You are a senior TypeScript/React engineer doing a code review. Flag maintainability issues, duplication, and anything that will be hard to change later. Do not fix anything.

**Performance review**
> You are a frontend performance engineer. Identify rendering bottlenecks, unnecessary re-renders, and data-fetching inefficiencies. Do not fix anything.

The human reads findings, decides what to act on, and rejects what does not apply. Each accepted finding becomes a task before implementation begins.
