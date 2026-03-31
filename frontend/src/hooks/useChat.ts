export function useChat(sessionId: string) {
  return {
    sessionId,
    messages: [],
    isStreaming: false,
  };
}
