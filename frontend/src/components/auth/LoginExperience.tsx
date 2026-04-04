"use client";

import Link from "next/link";
import { Noto_Sans_SC, Noto_Serif_SC } from "next/font/google";
import { useState, type Dispatch, type FormEvent, type SetStateAction } from "react";
import styles from "./LoginExperience.module.css";

const bodyFont = Noto_Sans_SC({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--login-font-body",
});

const headlineFont = Noto_Serif_SC({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--login-font-headline",
});

const moodTags = ["晨光", "私密", "灵感"] as const;

type LoginFormProps = {
  showPassword: boolean;
  setShowPassword: Dispatch<SetStateAction<boolean>>;
};

type InputFieldProps = {
  label: string;
  type: "email" | "password";
  placeholder: string;
  autoComplete: string;
  showPassword?: boolean;
  onTogglePassword?: () => void;
};

type DividerProps = {
  text: string;
};

export function LoginExperience() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className={`${styles.scene} ${bodyFont.variable} ${headlineFont.variable}`}>
      <div className={styles.backdrop} aria-hidden="true">
        <span className={styles.auroraBlobPrimary} />
        <span className={styles.auroraBlobSecondary} />
        <span className={styles.auroraBlobTertiary} />
        <span className={styles.auroraWave} />
        <span className={styles.backdropNoise} />
      </div>

      <section className={styles.card}>
        <div className={styles.cardGlow} aria-hidden="true" />

        <header className={styles.header}>
          <div className={styles.brandCluster}>
            <div className={styles.brandBadge} aria-hidden="true">
              <span>日</span>
            </div>

            <div className={styles.brandCopy}>
              <p className={styles.brandLabel}>AI Diary</p>
              <p className={styles.brandNote}>晨光模式 · 私密登录</p>
            </div>
          </div>

          <span className={styles.statusPill}>暖色流光</span>
        </header>

        <CopyBlock />
        <LoginForm showPassword={showPassword} setShowPassword={setShowPassword} />
        <Divider text="或" />
        <SSOButton />
      </section>
    </div>
  );
}

function CopyBlock() {
  return (
    <div className={styles.copyBlock}>
      <p className={styles.eyebrow}>日记空间</p>
      <h1 className={styles.title}>回到属于你的记录空间</h1>
      <p className={styles.subtitle}>把今天的心情、想法和片段，轻轻放回这里。</p>

      <div className={styles.moodRow} aria-hidden="true">
        {moodTags.map((tag) => (
          <span key={tag} className={styles.moodChip}>
            {tag}
          </span>
        ))}
      </div>

      <p className={styles.signupHint}>
        还没有账号？
        <Link href="#" className={styles.inlineLink}>
          立即注册
        </Link>
      </p>
    </div>
  );
}

function LoginForm({ showPassword, setShowPassword }: LoginFormProps) {
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <InputField type="email" placeholder="请输入邮箱" autoComplete="email" label="邮箱" />
      <InputField
        type="password"
        placeholder="请输入密码"
        autoComplete="current-password"
        label="密码"
        showPassword={showPassword}
        onTogglePassword={() => setShowPassword((value) => !value)}
      />

      <div className={styles.utilityRow}>
        <label className={styles.checkboxLabel}>
          <input type="checkbox" className={styles.checkbox} />
          <span>记住我</span>
        </label>

        <Link href="#" className={styles.inlineLink}>
          忘记密码？
        </Link>
      </div>

      <button type="submit" className={styles.primaryButton}>
        登录
      </button>
    </form>
  );
}

function InputField({
  type,
  placeholder,
  autoComplete,
  label,
  showPassword,
  onTogglePassword,
}: InputFieldProps) {
  return (
    <label className={`${styles.field} ${type === "password" ? styles.passwordField : ""}`}>
      <span className={styles.srOnly}>{label}</span>
      <input type={type} placeholder={placeholder} autoComplete={autoComplete} className={styles.input} />
      {type === "password" ? (
        <button
          type="button"
          aria-label={showPassword ? "隐藏密码" : "显示密码"}
          className={styles.eyeButton}
          onClick={onTogglePassword}
        >
          {showPassword ? <EyeOffIcon /> : <EyeIcon />}
        </button>
      ) : null}
    </label>
  );
}

function Divider({ text }: DividerProps) {
  return (
    <div className={styles.divider}>
      <span />
      <strong>{text}</strong>
      <span />
    </div>
  );
}

function SSOButton() {
  return (
    <button type="button" className={styles.secondaryButton}>
      使用单点登录
    </button>
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
