# Login Page Visual Refresh Design

Date: 2026-04-03
Topic: Frontend login page polish for AI Diary

## Summary

Refresh the login page so it feels consistent with AI Diary's warm, paper-like product aesthetic instead of the current blue, SaaS-style split layout. The new direction is "paper morning light": calm, soft, minimal, and distinctly diary-oriented.

This is a visual and copy update only. Authentication behavior, form structure, and navigation targets stay unchanged unless the existing implementation requires small presentational adjustments.

## Goals

- Make the login page visually match the rest of the product's warm editorial tone.
- Replace English copy with Chinese copy that feels soft and literary rather than promotional.
- Improve perceived polish on desktop and mobile without adding visual clutter.
- Keep the implementation isolated to the login experience component and its CSS module.

## Non-Goals

- No backend or authentication flow changes.
- No new login methods or field validation behavior.
- No refactor of shared global styling outside what is strictly needed for the login page.
- No redesign of non-login pages in this task.

## User Experience Direction

The page should feel like returning to a private writing space rather than entering an admin panel. The strongest memory should be a warm, quiet, cream-toned card floating in soft morning light.

### Visual Tone

- Warm neutral palette built from cream, parchment, light peach, muted terracotta, and soft brown.
- A single centered card layout instead of a two-column layout.
- Very light atmospheric background gradients with subtle paper-like texture or grain.
- Low-contrast surfaces and shadows that feel calm rather than glossy or futuristic.

### Copy Tone

Use Chinese throughout the page with a gentle, literary voice:

- Title: `回到属于你的记录空间`
- Subtitle: `把今天的心情、想法和片段，轻轻放回这里`
- Email placeholder: `请输入邮箱`
- Password placeholder: `请输入密码`
- Remember me: `记住我`
- Forgot password: `忘记密码？`
- Primary action: `登录`
- SSO action: `使用单点登录`
- Signup prompt: `还没有账号？立即注册`
- Divider label: `或`

## Layout and Components

### Page Layout

- Remove the current right-side pattern panel.
- Use a full-page background with soft radial and linear gradients.
- Center a narrower login card with generous vertical spacing.
- Keep the card readable within the first viewport on mobile.

### Login Card

- Use an off-white or cream surface instead of pure white.
- Add a soft border and restrained shadow stack.
- Keep a small brand mark at the top, but restyle it to match the warm palette.
- Preserve the existing form fields and utility row structure.

### Inputs and Buttons

- Inputs should use soft filled backgrounds, a thin warm border, and subtle inset depth.
- Focus states should glow with a warm amber or terracotta halo instead of blue.
- The primary button should use a warm clay/terracotta treatment aligned with the existing site accent family.
- Secondary actions should feel lighter and text-led rather than button-heavy.

## Motion and Interaction

- Add only restrained motion: page/card fade-in, slight upward settling, and gentle stagger for title and form.
- Keep hover and focus feedback subtle and fast.
- Preserve the show/hide password interaction exactly as it works now.
- Avoid decorative animation that could distract from the form.

## Responsive Behavior

- Desktop: centered single-card layout with balanced negative space.
- Tablet: maintain centered card while reducing decorative background intensity.
- Mobile: shrink padding, keep form controls full width, and ensure the title, inputs, and primary button fit comfortably without scrolling past visual decoration.

## Accessibility

- Maintain clear visual focus states for keyboard users.
- Keep sufficient contrast for text, placeholders, and actions.
- Preserve current semantic labels and screen-reader-only text.
- Avoid using texture or low contrast in ways that reduce readability.

## Technical Design

### Files in Scope

- `frontend/src/components/auth/LoginExperience.tsx`
- `frontend/src/components/auth/LoginExperience.module.css`

### Implementation Notes

- Keep logic changes to a minimum; the component state for password visibility remains as-is.
- Update visible copy in the TSX component to Chinese.
- Simplify markup if helpful for the new single-card composition, but do not change the functional controls.
- Implement the visual direction primarily through the CSS module.

## Data Flow and Error Handling

No data flow changes are required. The form will continue to prevent default submission in its current placeholder state. This redesign must not introduce new runtime behavior, new async flows, or changed error states.

## Testing and Verification

- Run targeted lint or build verification for the frontend after implementation.
- Verify the login page visually at desktop and mobile widths.
- Confirm Chinese copy renders correctly.
- Confirm password visibility toggle still works.
- Confirm the layout remains usable with keyboard focus.

## Acceptance Criteria

- The login page no longer uses the blue split-panel visual style.
- The page reads as warm, calm, and aligned with AI Diary's existing palette.
- All user-facing login copy on this page is Chinese.
- The page remains responsive and accessible.
- No login behavior regresses.
