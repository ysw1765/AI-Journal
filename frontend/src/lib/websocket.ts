const WS_BASE_URL =
  process.env.NEXT_PUBLIC_WS_BASE_URL ?? "ws://localhost:8000/api/v1";

export function buildChatWebSocketUrl(sessionId: string) {
  return `${WS_BASE_URL}/chat/sessions/${sessionId}/ws`;
}
