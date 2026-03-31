import { EndChatButton } from "@/components/chat/EndChatButton";
import { MessageInput } from "@/components/chat/MessageInput";
import { MessageList } from "@/components/chat/MessageList";

export function ChatWindow({ sessionId }: { sessionId: string }) {
  return (
    <div className="stack">
      <p className="muted">当前会话：{sessionId}</p>
      <MessageList />
      <MessageInput />
      <EndChatButton />
    </div>
  );
}
