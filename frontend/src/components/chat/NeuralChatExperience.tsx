import { Inter, Space_Grotesk } from "next/font/google";
import styles from "./NeuralChatExperience.module.css";

const bodyFont = Inter({
  subsets: ["latin"],
  variable: "--chat-font-body",
});

const headlineFont = Space_Grotesk({
  subsets: ["latin"],
  variable: "--chat-font-headline",
});

const railItems = [
  { label: "Journal", icon: JournalIcon, active: true },
  { label: "Archive", icon: ArchiveIcon, active: false },
  { label: "Insights", icon: InsightsIcon, active: false },
];

const previewImages = [
  {
    alt: "Gothic cathedral architecture at dusk",
    src: "https://lh3.googleusercontent.com/aida-public/AB6AXuAY4hqMHOwSHIXuuQkbIX2LO5NkmBgeD9SgUyEp09CYZOIK3yZbltI1ZM3dhuYtBMTm0kd6lM3Ry4-9awJbUX-SjUIG_qKmjP0jCA7DFr14D4DzPU7pAQqqVXxVQPgRN9FjxU-3gJGN62VNlZ59SbmBSlm7Qkfc8toNDvyWINQ4zztw4ePp0ORg37V32s8MxbArGhQlHuV_SscvHFl5NZeXAdo7NbeGjPz0rMd4E7Nw7agaplG3-_g-Byb4Rj1N6o8K40CFXVWYkmg",
  },
  {
    alt: "Atmospheric urban shadows",
    src: "https://lh3.googleusercontent.com/aida-public/AB6AXuDKdR2AaM_-0gUlNk4FV8MMaGYGxPaz4o5Xe_xC7FtEYx6X-9rJu9tMvoQA0M8Zax1IkQ00lUo7HD8MsKg3AegZaJQUox3LU877i-23stkKUamOIt264mL-nypzGxhYZuKw4eWfjFp39nOfBzMpq9XLgbiZDivXr7nW3arsBrSqFeDm010sGESppXWE6pVhxLZY7l3sw06Rbd-LSMiP1nVz3AKUfm60ztSQP2i4lMFs6InLO8G_KbcHoIPgCPIGUHLnX_wHq-qFg-E",
  },
];

export function NeuralChatExperience({ sessionId }: { sessionId: string }) {
  return (
    <div className={`${styles.scene} ${bodyFont.variable} ${headlineFont.variable}`}>
      <div className={styles.lightBleedOne} />
      <div className={styles.lightBleedTwo} />
      <div className={styles.lightLineRight} />
      <div className={styles.lightLineLeft} />

      <header className={styles.topBar}>
        <div className={styles.brandWrap}>
          <div className={styles.brandMark}>
            <NeuralIcon />
          </div>
          <div>
            <p className={styles.brandName}>The Ethereal Archive</p>
            <p className={styles.brandSubhead}>AI Neural Link</p>
          </div>
        </div>
        <div className={styles.topActions}>
          <button type="button" className={styles.iconButton} aria-label="Account">
            <UserIcon />
          </button>
          <button type="button" className={styles.iconButton} aria-label="Settings">
            <SettingsIcon />
          </button>
        </div>
      </header>

      <aside className={styles.sideRail}>
        <div className={styles.railBrand}>
          <div className={styles.railBadge}>
            <NeuralIcon />
          </div>
          <span className={styles.railLabel}>Neural</span>
        </div>

        <nav className={styles.railNav}>
          {railItems.map((item) => {
            const Icon = item.icon;

            return (
              <button
                key={item.label}
                type="button"
                className={`${styles.railItem} ${item.active ? styles.railItemActive : ""}`}
              >
                <Icon />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        <button type="button" className={styles.helpButton}>
          <HelpIcon />
          <span>Help</span>
        </button>
      </aside>

      <main className={styles.content}>
        <header className={styles.hero}>
          <p className={styles.heroKicker}>Synchronization Active</p>
          <h1 className={styles.heroTitle}>Nightfall Reflection</h1>
          <div className={styles.heroMeta}>
            <span>Session #{sessionId}</span>
            <span>11:42 PM</span>
          </div>
        </header>

        <section className={styles.timeline}>
          <div className={styles.aiRow}>
            <div className={styles.avatar}>
              <SparkleIcon />
            </div>
            <div className={styles.bubbleBlock}>
              <div className={`${styles.bubble} ${styles.aiBubble}`}>
                <p>
                  Welcome back, Chronicler. The stars are aligned for tonight&apos;s
                  session. How did your encounter with the city&apos;s architecture feel
                  today? I noticed your heart rate peaked near the cathedral.
                </p>
              </div>
              <span className={styles.bubbleMeta}>Neural Link • Processed</span>
            </div>
          </div>

          <div className={styles.userRow}>
            <div className={styles.bubbleBlock}>
              <div className={`${styles.bubble} ${styles.userBubble}`}>
                <p>
                  It was haunting. The shadows of the spires seemed to stretch
                  toward the future. I captured a fragment of that feeling.
                </p>
              </div>

              <div className={styles.previewRow}>
                {previewImages.map((image) => (
                  <div key={image.alt} className={styles.previewCard}>
                    <img src={image.src} alt={image.alt} className={styles.previewImage} />
                    <div className={styles.previewGlow} />
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className={styles.typingRow}>
            <span className={styles.typingDot} />
            <span>Archive is analyzing texture...</span>
          </div>
        </section>
      </main>

      <div className={styles.inputDock}>
        <div className={styles.inputLayout}>
          <div className={styles.inputBar}>
            <button type="button" className={styles.addButton} aria-label="Add attachment">
              <AddIcon />
            </button>
            <input
              type="text"
              className={styles.inputField}
              placeholder="Transcribe your thoughts into the archive..."
            />
            <button type="button" className={styles.sendButton} aria-label="Send message">
              <SendIcon />
            </button>
          </div>

          <button type="button" className={styles.endSessionButton}>
            End Session
          </button>
        </div>

        <footer className={styles.dockFooter}>
          <span>Celestial Archive v1.0.4 • Neural Link Active</span>
          <div className={styles.footerLinks}>
            <a href="#">Privacy Protocol</a>
            <a href="#">Data Encryption</a>
          </div>
        </footer>
      </div>
    </div>
  );
}

function NeuralIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="12" cy="12" r="4.2" fill="currentColor" opacity="0.85" />
      <path
        d="M12 2.5c2.7 0 4.8 2.2 4.8 4.9S14.7 12.3 12 12.3 7.2 10.1 7.2 7.4 9.3 2.5 12 2.5Zm0 9.2c2.7 0 4.8 2.2 4.8 4.9S14.7 21.5 12 21.5 7.2 19.3 7.2 16.6 9.3 11.7 12 11.7Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.3"
      />
    </svg>
  );
}

function UserIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="12" cy="8" r="3.3" fill="none" stroke="currentColor" strokeWidth="1.6" />
      <path
        d="M5.8 19.4c1.2-3 4-4.8 6.2-4.8s5 1.8 6.2 4.8"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}

function SettingsIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M12 8.7a3.3 3.3 0 1 0 0 6.6 3.3 3.3 0 0 0 0-6.6Zm8.1 3.3-.1-.7 1.6-1.2-1.8-3.1-1.9.6-.5-.4-.3-1.9H13.6L13 7.2l-.6.2-.4-.5L10.7 5H7.1l-.3 2-.6.3L4.3 6.6 2.5 9.7l1.6 1.1-.1.8-1.8 1.2 1.8 3.1 2-.6.5.4.3 1.9h3.5l.6-1.9.7-.2.4.5 1.3 1.6h3.6l.3-2 .6-.3 1.8.7 1.8-3.1-1.7-1.2Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function JournalIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M6 5.5h10.5a1.5 1.5 0 0 1 1.5 1.5v11.5H7.5A1.5 1.5 0 0 1 6 17V5.5Zm3.5 3.3h5M9.5 12h5M9.5 15.2h3.4"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ArchiveIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M4.5 7.2h15v10.3a1.5 1.5 0 0 1-1.5 1.5H6a1.5 1.5 0 0 1-1.5-1.5V7.2Zm2.2-2.7h10.6l1.2 2.7H5.5l1.2-2.7Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function InsightsIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M5.5 18.5V13m6.5 5.5V8.5m6.5 10V5.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

function HelpIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M9.8 9.2a2.7 2.7 0 1 1 4 2.4c-.9.5-1.8 1.1-1.8 2.4m0 3h.1M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function SparkleIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="m12 3 1.7 5.3L19 10l-5.3 1.7L12 17l-1.7-5.3L5 10l5.3-1.7L12 3Zm6.3 12.5.6 2 .6-2 2-.6-2-.6-.6-2-.6 2-2 .6 2 .6Z"
        fill="currentColor"
      />
    </svg>
  );
}

function AddIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M12 5.5v13M5.5 12h13"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
    </svg>
  );
}

function SendIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M4 11.8 19.5 4l-3.8 16-4.4-5-4.8-.7L4 11.8Zm7.3 3.2 4.2-6.3"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
