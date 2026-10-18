# Copilot instructions

## Communication with the user

- Respond to the user in English by default. This applies to explanations and
  recommendations, not user-facing application text.

## 1. User-facing language

### Should

- Write anything shown to users in Portuguese by default, matching the project's
  existing Portuguese (Portugal) wording and conventions. For example, use
  "Iniciar sessão" for a sign-in heading.
- Translate the intent of a request into Portuguese unless the user explicitly
  asks for exact wording in another language. For example, a request for a
  button labelled "Continue with Google" should produce "Continuar com Google".
- Keep source identifiers, API values, and other non-user-facing text in the
  language and format required by the code.

### Should not

- Leave new interface labels, error messages, placeholders, or notifications in
  English just because the request used English wording. For example, do not
  label a button "Continue with Apple" by default.
- Translate text the user explicitly asked to remain verbatim, such as a
  quoted product name or exact label.

## 2. Single responsibility principle

### Should

- Give each component or function one coherent responsibility. For example,
  keep credential form state and submission in `LoginCredentialsForm`, and let
  `LoginOptions` compose the credential and social sign-in sections.
- Extract a component when a piece of UI or behavior has a distinct purpose,
  meaningful complexity, or a likely reuse. For example, a form with validation
  and submission logic is a good component boundary.
- Keep route components focused on route-specific behavior and composing the
  page's major parts.

### Should not

- Split trivial markup into extra components without a clear benefit. For
  example, a one-line wrapper around a single `Text` element does not need its
  own component or file.
- Put unrelated responsibilities into one component. For example, avoid
  combining page layout, credential submission, and OAuth token handling in a
  single route component.
- Apply the principle mechanically: avoid abstractions and files that make a
  simple feature harder to follow.

## 3. Hooks and providers

### Should

- Put reusable hooks in `app/_hooks/`, following the `use-*.ts` or `use-*.tsx`
  naming convention as needed. For example, `app/_hooks/use-ripple.ts`
  encapsulates the ripple interaction.
- Put feature-specific hooks alongside that feature. For example, test hooks
  belong under `app/test/hooks/`, while question-management hooks belong under
  `app/questions/[[...studyId]]/hooks/`.
- Give each hook one clear purpose. For example, keep a ripple-effect hook
  focused on ripple behavior; if Google and Apple sign-in are extracted into
  hooks, give each provider its own focused hook.
- When a hook makes requests and the fetched data needs to be retained or
  shared across a feature, generally let a feature provider own that data and
  expose it through a focused consumer hook. For example,
  `ManageFetchedQuestionsProvider` stores question search results and exposes
  them to feature hooks and components.
- Follow existing context-provider patterns, such as
  `app/test/providers/test-manager.tsx` for shared test state.

### Should not

- Combine unrelated behavior into one hook. For example, avoid a single hook
  that handles Google sign-in, Apple sign-in, and ripple effects.
- Put every hook in `app/_hooks/`; keep a hook local to its feature when it is
  only used there.
- Automatically introduce a provider for a one-off request whose result is
  used only by one component. Use a provider when shared or persistent feature
  state warrants it.

## 4. Shared variables and global styles

### Should

- Prefer existing theme variables, Tailwind theme utilities, and global styles
  for colors, spacing, typography, borders, and other design tokens. For
  example, use `text-primary` or `bg-primary` when those theme colors fit.
- Reuse shared components and styles, such as `Button`, `Input`, and `Divider`,
  instead of recreating their behavior locally.
- If a reusable design value is missing, check existing conventions before
  introducing a new token or global style.

### Should not

- Hardcode a color or repeated design value when an existing token already
  expresses it. For example, do not use a hex color in a component instead of
  the matching theme utility.
- Duplicate global styles in individual components or add a new global token
  for a one-off value without a reusable need.

## 5. Preserve existing code and behavior

### Should

- Make focused changes that directly implement the request, preserving
  unrelated behavior and existing conventions.
- Inspect how a shared component is used before changing it. For example, if a
  login layout needs a divider, use the existing `Divider` orientations where
  possible.
- Ask before making a subjective or broad change that is not necessary to the
  requested outcome.

### Should not

- Change unrelated code just because a different style or implementation seems
  preferable. For example, do not redesign `Divider` while rearranging the
  login page unless the request requires that change.
- Refactor, rename, or restyle neighboring features without a direct
  connection to the task.
- Treat a requested change as permission to alter the rest of the page or
  shared design system.

## 6. Validation after changes

- After making code changes, run `yarn build` and resolve any build failures
  caused by the changes.
- After every code change, always run the full E2E suite with `yarn test:e2e`
  before considering the task complete. If it cannot be run, explain the blocker
  and do not report the E2E checks as passing.
- Run the additional project checks listed below when they are configured:
  - [Add future checks here, for example `yarn test`]
