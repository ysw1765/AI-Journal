# Login Page Minimal Dawn Background Design

Date: 2026-04-10
Topic: Minimal login page refinement with dynamic dawn background for AI Diary

## Summary

Refine the existing login page into a more minimal, higher-end composition. The current warm aurora treatment is directionally correct, but the page still contains too many small words, tags, and helper phrases competing for attention. The new direction is a quieter "dawn breathing" layout: fewer words, stronger typography, softer input surfaces, and a restrained animated mesh background that carries more of the emotional tone.

This is still a login-page-only refinement. The current auth behavior, API submission, token handling, and post-login redirect remain intact. The page should feel more premium through subtraction rather than additional decoration.

## Goals

- Reduce visual and verbal clutter so the page feels intentional and high-end.
- Center the experience around a single large emotional headline: `记录，如此简单`.
- Keep a warm burnt-orange and creamy-beige palette while making the background feel more alive and atmospheric.
- Introduce a very subtle animated mesh gradient background with a misty morning-light quality.
- Preserve the existing login functionality and keep the redesign isolated to the login component and CSS module.

## Non-Goals

- No backend auth changes.
- No changes to API paths, request payloads, token storage, or redirect targets.
- No introduction of new auth options beyond the existing visual affordances.
- No redesign of non-login routes outside the shared effect that `/` and `/login` both render the same login component.

## User Experience Direction

The page should feel like the cover of a quiet notebook at dawn rather than a feature-rich product panel. It should be emotionally warm but verbally sparse. The strongest memory should come from the moving light, soft materials, and the single statement in the center, not from stacked labels or decorative chips.

### Visual Tone

- Minimal editorial composition with generous negative space.
- Burnt orange, creamy beige, and soft ivory as the primary palette.
- A faint blush-violet tint only where light bands overlap; it should read as an atmospheric side effect, not a dominant color.
- Fine grain texture across the background to avoid flatness and add a premium matte finish.
- Thin, translucent surfaces instead of a heavy card-block feel.

### Copy Tone

Use only the essential text:

- Main title: `记录，如此简单`
- Optional poetic line: omit in this version
- Email placeholder: `请输入邮箱`
- Password placeholder: `请输入密码`
- Remember me: `记住我`
- Forgot password: `忘记密码？`
- Primary action: `登录`
- Secondary actions: `注册`, `单点登录`

Remove all non-essential descriptive microcopy and decorative labels, including:

- `晨光`
- `私密`
- `灵感`
- `晨光模式`
- `私密登录`
- any status-style pill or mood-chip treatment

## Layout and Components

### Overall Layout

- Keep the left-top calendar icon and micro logo presence, but reduce it to a quiet brand marker.
- Remove the current top-right status pill.
- Use a vertically centered composition with a small top brand area, a dominant middle headline, and a compact lower action zone.
- Make the page feel closer to a cover layout than to a boxed SaaS sign-in card.

### Headline Area

- Use one large, high-contrast headline: `记录，如此简单`.
- Do not include the current subtitle or chip row.
- Preserve enough spacing between the headline and the form so the page still breathes.

### Form Area

- Keep the account and password fields plus the existing login submission logic.
- Increase input corner radius.
- Lower input background saturation and keep the surface milky, soft, and matte.
- Keep `记住我` and `忘记密码？`, but visually demote them with smaller size, weaker contrast, and less spacing emphasis.
- Keep the primary button orange, but add a very weak gloss gradient so it feels polished rather than flat.

### Bottom Actions

- Move `注册` and `单点登录` to the lowest section of the composition.
- Desktop: allow either side-by-side placement or a stacked arrangement if spacing looks cleaner.
- Mobile: stack vertically if needed.
- Lower the visual weight and opacity so they read as optional paths, not competing calls to action.

## Dynamic Background

### Background Direction

- Create an abstract animated background built from softly flowing mesh gradients.
- Use broad light bands rather than obvious circular blobs.
- Primary movement should resemble silk or diffused smoke, not neon aurora or visible particles.

### Color Composition

- Main colors: burnt orange and creamy beige.
- Supporting light: warm ivory and pale gold.
- Overlap tint: very faint powder pink to dusty violet, only in transition zones.
- Keep the overall frame bright and warm rather than dark or dramatic.

### Motion Behavior

- Motion should be extremely restrained and slow, with long cycles around 24s to 36s.
- The effect should feel like breathing or shifting dawn light, not like objects moving across the screen.
- Add a fine grain layer on top, static or nearly static, so the page feels tactile.
- Keep `prefers-reduced-motion` support by falling back to a static but visually rich version of the same background.

## Interaction Details

### Password Visibility Button

- Do not show the eye icon when the password field is empty.
- Only reveal the show/hide password control after the user has typed at least one character.
- The reveal should feel subtle, such as a soft fade-in, and should not shift layout.

### Login State

- Preserve the current loading, error, token storage, and redirect behavior.
- Disabled states should continue to look polished and readable.

## Responsive Behavior

- Desktop: preserve generous negative space and let the animated background do more of the emotional work.
- Tablet: tighten spacing but keep the composition centered and calm.
- Mobile: reduce decorative intensity, keep the brand marker compact, and ensure the headline, fields, and primary button fit comfortably within the first screen.

## Accessibility

- Maintain strong contrast for the main headline and essential actions.
- Keep input focus states visible and warm-toned.
- Ensure the animated background never reduces text legibility.
- Preserve keyboard accessibility and existing semantic form labeling.
- Keep reduced-motion support.

## Technical Design

### Files in Scope

- `frontend/src/components/auth/LoginExperience.tsx`
- `frontend/src/components/auth/LoginExperience.module.css`

### Implementation Notes

- Keep the current login submission logic in place.
- Simplify the TSX structure by removing non-essential copy blocks, chips, and status treatments.
- Track password input value so the eye icon can render only after content exists.
- Drive most of the redesign through CSS, especially the animated dawn mesh background and the lighter surface treatment.
- Preserve the fact that both `/` and `/login` render the same component.

## Testing and Verification

- Run frontend build verification after implementation.
- Confirm the page still submits login requests successfully.
- Confirm the password eye icon is absent on an empty password field and appears after typing.
- Check desktop and mobile rendering for spacing and legibility.
- Confirm reduced-motion mode removes the background animation without degrading the composition.

## Acceptance Criteria

- The page uses only essential copy and no longer shows scattered mood/status words.
- The main headline is `记录，如此简单`.
- The background feels like a soft, high-end dawn mesh with restrained motion.
- The page remains warm, minimal, and premium rather than decorative or busy.
- `记住我` and `忘记密码？` remain available but visually secondary.
- `注册` and `单点登录` move to a low-emphasis bottom area.
- The eye icon is hidden until the password field contains text.
- Existing login functionality does not regress.
