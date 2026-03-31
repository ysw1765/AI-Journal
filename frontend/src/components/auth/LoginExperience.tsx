"use client";

import Link from "next/link";
import { useState } from "react";
import { Plus_Jakarta_Sans, Sora } from "next/font/google";
import styles from "./LoginExperience.module.css";

const bodyFont = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--login-font-body",
});

const headlineFont = Sora({
  subsets: ["latin"],
  variable: "--login-font-headline",
});

const patternCells = Array.from({ length: 18 }, (_, index) => index);

export function LoginExperience() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className={`${styles.scene} ${bodyFont.variable} ${headlineFont.variable}`}>
      <div className={styles.backdropGlow} />
      <section className={styles.shell}>
        <div className={styles.formPane}>
          <div className={styles.brandBadge} aria-hidden="true">
            <span>ai</span>
          </div>

          <div className={styles.copyBlock}>
            <h1 className={styles.title}>Welcome back!</h1>
            <p className={styles.subtitle}>
              Don&apos;t have an account yet?{" "}
              <Link href="#" className={styles.inlineLink}>
                Sign up now
              </Link>
            </p>
          </div>

          <form className={styles.form} onSubmit={(event) => event.preventDefault()}>
            <label className={styles.field}>
              <span className={styles.srOnly}>Email address</span>
              <input
                type="email"
                placeholder="Email address"
                autoComplete="email"
                className={styles.input}
              />
            </label>

            <label className={`${styles.field} ${styles.passwordField}`}>
              <span className={styles.srOnly}>Password</span>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                autoComplete="current-password"
                className={styles.input}
              />
              <button
                type="button"
                aria-label={showPassword ? "Hide password" : "Show password"}
                className={styles.eyeButton}
                onClick={() => setShowPassword((value) => !value)}
              >
                {showPassword ? <EyeOffIcon /> : <EyeIcon />}
              </button>
            </label>

            <div className={styles.utilityRow}>
              <label className={styles.checkboxLabel}>
                <input type="checkbox" className={styles.checkbox} />
                <span>Remember me</span>
              </label>

              <Link href="#" className={styles.inlineLink}>
                Forgot password?
              </Link>
            </div>

            <button type="submit" className={styles.primaryButton}>
              Log in
            </button>
          </form>

          <div className={styles.divider}>
            <span />
            <strong>OR</strong>
            <span />
          </div>

          <button type="button" className={styles.secondaryButton}>
            Log in with SSO
          </button>
        </div>

        <div className={styles.patternPane} aria-hidden="true">
          <div className={styles.patternGrid}>
            {patternCells.map((cell) => (
              <div key={cell} className={styles.patternCell} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

function EyeIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M2.7 12s3.5-6.2 9.3-6.2S21.3 12 21.3 12 17.8 18.2 12 18.2 2.7 12 2.7 12Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="12" cy="12" r="3" fill="none" stroke="currentColor" strokeWidth="1.7" />
    </svg>
  );
}

function EyeOffIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M3 3.7 21 20.3M9.7 9.9A3 3 0 0 0 14 14M6.5 7.1C4.2 8.9 2.8 12 2.8 12s3.5 6.2 9.2 6.2c2 0 3.8-.8 5.3-1.8M17.7 14.7c1.9-1.6 3.5-4.7 3.5-4.7S17.7 3.8 12 3.8c-1.7 0-3.2.4-4.5 1"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
