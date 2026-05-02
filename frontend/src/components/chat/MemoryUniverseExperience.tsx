"use client";

import { Noto_Sans_SC } from "next/font/google";
import { useRouter } from "next/navigation";
import { useEffect, useId, useRef, useState, type ChangeEvent } from "react";
import { apiFetch } from "@/lib/api";
import styles from "./MemoryUniverseExperience.module.css";

const bodyFont = Noto_Sans_SC({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--memory-font-body",
});

type MemoryUniverseExperienceProps = {
  mode: "home" | "session";
  sessionId?: string;
};

type Phase = "idle" | "awakening" | "active";

type ChatMessage = {
  id: string;
  role: "assistant" | "user";
  body: string;
  meta: string;
};

type ArchiveShard = {
  id: string;
  title: string;
  note: string;
  stamp: string;
  tone: string;
};

type ImageUploadResponse = {
  image_id: string;
  image_url: string;
  mime_type: string;
  size_bytes: number;
};

type CreateChatSessionResponse = {
  session_id: string;
  status: string;
};

const baseMessages: ChatMessage[] = [
  {
    id: "assistant-1",
    role: "assistant",
    body:
      "Memory Universe is awake. Upload a fragment, and I will turn its atmosphere into a diary thread you can keep talking to.",
    meta: "Archive guide",
  },
  {
    id: "user-1",
    role: "user",
    body:
      "I want to keep the feeling, not just the image. Hold onto the fog, the silence, and the strange warmth around it.",
    meta: "Memory seed",
  },
  {
    id: "assistant-2",
    role: "assistant",
    body:
      "I will preserve the temperature of the moment. Once your photo arrives, the archive will open nearby like a small constellation.",
    meta: "Listening",
  },
];

const archiveShards: ArchiveShard[] = [
  {
    id: "shard-1",
    title: "Twilight Stairwell",
    note: "A hallway that felt older than the building itself.",
    stamp: "04.21",
    tone: "Liminal blue",
  },
  {
    id: "shard-2",
    title: "Pink Meadow Echo",
    note: "Soft wind, distant laughter, and static in the sky.",
    stamp: "04.17",
    tone: "Pastel bloom",
  },
  {
    id: "shard-3",
    title: "Cathedral Pulse",
    note: "Stone shadows stretching like a promise toward tomorrow.",
    stamp: "04.09",
    tone: "Silver dusk",
  },
  {
    id: "shard-4",
    title: "Window Between Rooms",
    note: "A quiet frame where yesterday kept waiting.",
    stamp: "03.29",
    tone: "Grain white",
  },
];

const previewMessages: ChatMessage[] = [
  {
    id: "preview-1",
    role: "assistant",
    body: "这张照片里的空气感很明显，像是刚下过雨后的傍晚，整个场景有一点安静的回音。",
    meta: "AI 助手",
  },
  {
    id: "preview-2",
    role: "user",
    body: "对，我当时最想记住的不是画面本身，而是那个很短暂的、突然慢下来的感觉。",
    meta: "你的记录",
  },
  {
    id: "preview-3",
    role: "assistant",
    body: "我可以把它整理成一篇日记，并保留这段对话，让之后每次回看都还能接着聊下去。",
    meta: "归档建议",
  },
];

const previewThreads = [
  {
    id: "thread-1",
    title: "黄昏走廊",
    snippet: "像刚下过雨后的傍晚",
    time: "刚刚",
    active: true,
  },
  {
    id: "thread-2",
    title: "草地回声",
    snippet: "风很轻，天空很空",
    time: "昨天",
    active: false,
  },
  {
    id: "thread-3",
    title: "窗边安静时刻",
    snippet: "想把当时的气味也记下来",
    time: "周一",
    active: false,
  },
];

export function MemoryUniverseExperience({
  mode,
  sessionId,
}: MemoryUniverseExperienceProps) {
  const router = useRouter();
  const inputId = useId();
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [phase, setPhase] = useState<Phase>(mode === "session" ? "active" : "idle");
  const [selectedImageUrl, setSelectedImageUrl] = useState<string | null>(null);
  const [selectedImageName, setSelectedImageName] = useState<string | null>(null);
  const [isCreatingSession, setIsCreatingSession] = useState(false);

  useEffect(() => {
    if (mode === "session") {
      setPhase("active");
    }
  }, [mode]);

  useEffect(() => {
    if (phase !== "awakening") {
      return;
    }

    const timer = window.setTimeout(() => {
      setPhase("active");
    }, 900);

    return () => window.clearTimeout(timer);
  }, [phase]);

  useEffect(() => {
    return () => {
      if (selectedImageUrl) {
        URL.revokeObjectURL(selectedImageUrl);
      }
    };
  }, [selectedImageUrl]);

  const chatMessages = !selectedImageName
    ? baseMessages
    : [
        ...baseMessages,
        {
          id: "assistant-3",
          role: "assistant" as const,
          body: `I can feel a new fragment arriving from ${selectedImageName}. The room around it is already bending into focus.`,
          meta: "Portal sync",
        },
      ];

  const isHome = mode === "home";
  const isIdle = phase === "idle";
  const sessionLabel = sessionId ? `Session #${sessionId}` : "Open memory field";

  const navigateToNewChat = async (file?: File) => {
    if (isCreatingSession) {
      return;
    }

    setIsCreatingSession(true);

    try {
      let imageId: string | undefined;

      if (file) {
        const formData = new FormData();
        formData.append("file", file);

        const uploadResponse = await apiFetch<ImageUploadResponse>("/uploads/images", {
          method: "POST",
          body: formData,
        });

        imageId = uploadResponse.image_id;
      }

      if (!imageId) {
        fileInputRef.current?.click();
        return;
      }

      const sessionResponse = await apiFetch<CreateChatSessionResponse>("/chat/sessions", {
        method: "POST",
        body: JSON.stringify({
          image_id: imageId,
          title: file ? file.name.replace(/\.[^.]+$/, "") : undefined,
        }),
      });

      router.push(`/chat/${sessionResponse.session_id}`);
    } catch (error) {
      console.error("Failed to create chat session:", error);
    } finally {
      setIsCreatingSession(false);
    }
  };

  const handleImageChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    setSelectedImageUrl((currentUrl) => {
      if (currentUrl) {
        URL.revokeObjectURL(currentUrl);
      }

      return URL.createObjectURL(file);
    });
    setSelectedImageName(file.name);
    setPhase("awakening");
    await navigateToNewChat(file);
  };

  return (
    <div
      className={[
        styles.scene,
        bodyFont.variable,
        phase === "active" ? styles.sceneActive : "",
        phase === "awakening" ? styles.sceneAwakening : "",
        isHome && isIdle ? styles.sceneHomeIdle : "",
      ].join(" ")}
    >
      <div className={styles.skyGradient} aria-hidden="true" />
      <div className={styles.corridorGlow} aria-hidden="true" />
      <div className={styles.meadowMist} aria-hidden="true" />
      <div className={styles.lightColumnLeft} aria-hidden="true" />
      <div className={styles.lightColumnRight} aria-hidden="true" />
      <div className={styles.grainOverlay} aria-hidden="true" />

      <header className={styles.topBar}>
        <div className={styles.brandLockup}>
          <div className={styles.brandMark} aria-hidden="true">
            <MemoryGlyph />
          </div>
          <div>
            <p className={styles.brandKicker}>AI Diary</p>
            <h1 className={styles.brandTitle}>Memory Universe</h1>
          </div>
        </div>

        <div className={styles.topActions}>
          <button type="button" className={styles.ghostButton}>
            {sessionLabel}
          </button>
          <button type="button" className={styles.ghostButton}>
            {isHome ? "首页入口" : "会话视图"}
          </button>
        </div>
      </header>

      <main className={styles.mainLayout}>
        <section className={styles.heroColumn}>
          <div className={styles.heroCopy}>
            <p className={styles.eyebrow}>轻量记录空间</p>
            <h2 className={styles.heroTitle}>上传一张照片，继续把这一刻聊下去。</h2>
            <p className={styles.heroText}>
              用更安静、更清爽的方式整理照片、感受和对话，让日记像聊天一样自然。
            </p>
          </div>

          <div className={`${styles.portalLayer} ${isIdle ? styles.portalLayerCentered : ""}`}>
            <div className={styles.portalCore}>
              <span className={styles.portalOrbit} aria-hidden="true" />
              <span className={styles.portalOrbitSecondary} aria-hidden="true" />
              <span className={styles.portalShardOne} aria-hidden="true" />
              <span className={styles.portalShardTwo} aria-hidden="true" />
              <span className={styles.portalShardThree} aria-hidden="true" />
              <span className={styles.portalStickerTop} aria-hidden="true">
                photo
              </span>
              <span className={styles.portalStickerSide} aria-hidden="true">
                diary
              </span>
              <span className={styles.portalPolaroid} aria-hidden="true">
                <span className={styles.portalPolaroidFrame}>
                  <span className={styles.portalPolaroidImage} />
                  <span className={styles.portalPolaroidCaption}>memory</span>
                </span>
              </span>
              <span className={styles.portalSparkOne} aria-hidden="true" />
              <span className={styles.portalSparkTwo} aria-hidden="true" />
              <div className={styles.portalGlass}>
                <div className={styles.portalLabelGroup}>
                  <span className={styles.portalLabel}>Memory Portal</span>
                  <span className={styles.portalSubLabel}>
                    {selectedImageName ?? "选择一张照片，开始新的记录"}
                  </span>
                </div>
              </div>
            </div>

            {isHome ? (
              <div className={styles.portalActions}>
                <label htmlFor={inputId} className={styles.uploadButton}>
                  上传照片
                </label>
                <input
                  id={inputId}
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  className={styles.fileInput}
                  onChange={handleImageChange}
                />
                <div className={styles.quickActions}>
                  <button type="button" className={styles.secondaryButton}>
                    查看归档
                  </button>
                  <button
                    type="button"
                    className={styles.secondaryButton}
                    onClick={() => navigateToNewChat()}
                    disabled={isCreatingSession}
                  >
                    {isCreatingSession ? "创建中..." : selectedImageName ? "开始对话" : "选择照片后开始"}
                  </button>
                </div>
                <p className={styles.portalHint}>上传后会在当前页面直接展开聊天和记录归档。</p>
              </div>
            ) : null}
          </div>
        </section>

        <section className={styles.experienceGrid}>
          <article className={styles.chatShell}>
            <div className={styles.panelHeader}>
              <div>
                <p className={styles.panelKicker}>当前对话</p>
                <h3 className={styles.panelTitle}>照片记忆对话</h3>
              </div>
              <button type="button" className={styles.statusButton}>
                <span className={styles.statusDot} />
                {phase === "active" ? "已同步" : "等待上传"}
              </button>
            </div>

            <div className={styles.messages}>
              {chatMessages.map((message) => (
                <div
                  key={message.id}
                  className={`${styles.messageRow} ${
                    message.role === "user" ? styles.messageRowUser : ""
                  }`}
                >
                  <div
                    className={`${styles.messageBubble} ${
                      message.role === "user" ? styles.messageBubbleUser : styles.messageBubbleAssistant
                    }`}
                  >
                    <p>{message.body}</p>
                    <span>{message.meta}</span>
                  </div>
                </div>
              ))}

              {selectedImageUrl ? (
                <button type="button" className={styles.memoryPreview}>
                  <div className={styles.memoryPreviewGlow} aria-hidden="true" />
                  <img
                    src={selectedImageUrl}
                    alt={selectedImageName ?? "Uploaded memory"}
                    className={styles.memoryPreviewImage}
                  />
                </button>
              ) : (
                <div className={styles.memoryPlaceholder}>
                  <PhotoGlyph />
                  <p>上传后的照片会显示在这里，作为这次对话的记忆入口。</p>
                </div>
              )}
            </div>

            <div className={styles.inputDock}>
              <button type="button" className={styles.iconControl} aria-label="Attach memory">
                <PlusGlyph />
              </button>
              <input
                type="text"
                className={styles.chatInput}
                placeholder="写下这张照片里的情绪、场景或当时的想法..."
              />
              <button type="button" className={styles.sendButton}>
                发送
              </button>
            </div>
          </article>

          <aside className={styles.archiveShell}>
            <div className={styles.panelHeader}>
              <div>
                <p className={styles.panelKicker}>历史归档</p>
                <h3 className={styles.panelTitle}>记忆卡片</h3>
              </div>
              <button type="button" className={styles.archiveButton}>
                {archiveShards.length} 条记录
              </button>
            </div>

            <div className={styles.shardField}>
              {archiveShards.map((shard, index) => (
                <button
                  key={shard.id}
                  type="button"
                  className={styles.shardCard}
                  style={{ animationDelay: `${index * 0.7}s` }}
                >
                  <span className={styles.shardStamp}>{shard.stamp}</span>
                  <h4>{shard.title}</h4>
                  <p>{shard.note}</p>
                  <span className={styles.shardTone}>{shard.tone}</span>
                </button>
              ))}
            </div>
          </aside>
        </section>

        {isHome ? (
          <section className={styles.scrollPreviewSection}>
            <div className={styles.previewShell}>
              <div className={styles.previewWindow}>
                <div className={styles.previewToolbar}>
                  <div className={styles.previewToolbarDots}>
                    <span className={styles.previewDot} />
                    <span className={styles.previewDot} />
                    <span className={styles.previewDot} />
                  </div>
                  <span className={styles.previewToolbarTitle}>Memory Universe · 对话示例</span>
                </div>

                <div className={styles.previewLayout}>
                  <aside className={styles.previewSidebar}>
                    <div className={styles.previewSidebarHeader}>
                      <div className={styles.previewSidebarAvatar}>MU</div>
                      <div>
                        <p className={styles.previewSidebarTitle}>最近会话</p>
                        <span className={styles.previewSidebarMeta}>3 条记录</span>
                      </div>
                    </div>

                    <div className={styles.previewThreadList}>
                      {previewThreads.map((thread) => (
                        <button
                          key={thread.id}
                          type="button"
                          className={`${styles.previewThreadItem} ${
                            thread.active ? styles.previewThreadItemActive : ""
                          }`}
                        >
                          <div className={styles.previewThreadTop}>
                            <strong>{thread.title}</strong>
                            <span>{thread.time}</span>
                          </div>
                          <p>{thread.snippet}</p>
                        </button>
                      ))}
                    </div>
                  </aside>

                  <section className={styles.previewConversation}>
                    <div className={styles.previewConversationHeader}>
                      <div>
                        <p className={styles.previewConversationTitle}>黄昏走廊</p>
                        <span className={styles.previewConversationMeta}>由一张照片展开的持续对话</span>
                      </div>
                      <button type="button" className={styles.previewConversationButton}>
                        继续记录
                      </button>
                    </div>

                    <div className={styles.previewCanvas}>
                      {previewMessages.map((message) => (
                        <div
                          key={message.id}
                          className={`${styles.previewMessageRow} ${
                            message.role === "user" ? styles.previewMessageRowUser : ""
                          }`}
                        >
                          <div
                            className={`${styles.previewMessageBubble} ${
                              message.role === "user"
                                ? styles.previewMessageBubbleUser
                                : styles.previewMessageBubbleAssistant
                            }`}
                          >
                            <p>{message.body}</p>
                            <span>{message.meta}</span>
                          </div>
                        </div>
                      ))}

                      <div className={styles.previewImageCard}>
                        <div className={styles.previewImageGlow} aria-hidden="true" />
                        <div className={styles.previewImageMock} />
                      </div>
                    </div>

                    <div className={styles.previewComposer}>
                      <span className={styles.previewComposerHint}>记录这张照片里的情绪与细节…</span>
                      <button type="button" className={styles.previewSendButton}>
                        发送
                      </button>
                    </div>
                  </section>
                </div>
              </div>
            </div>
          </section>
        ) : null}
      </main>
    </div>
  );
}

function MemoryGlyph() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="12" cy="12" r="3.5" fill="currentColor" opacity="0.85" />
      <path
        d="M12 2.75c4.9 0 8.9 4 8.9 8.9s-4 8.9-8.9 8.9-8.9-4-8.9-8.9 4-8.9 8.9-8.9Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.1"
      />
      <path
        d="M4.5 12h15M12 4.5c2.2 2.2 3.4 4.7 3.4 7.5S14.2 17.3 12 19.5C9.8 17.3 8.6 14.8 8.6 12S9.8 6.7 12 4.5Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.1"
      />
    </svg>
  );
}

function PlusGlyph() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M12 5v14M5 12h14"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}

function PhotoGlyph() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M4.5 6.5h15v11h-15zm3 2.5h.01M8 15l3.2-3.4 2.7 2.5 2-1.9 2.1 2.8"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
