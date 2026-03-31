import { NeuralChatExperience } from "@/components/chat/NeuralChatExperience";

export default function ChatSessionPage({
  params,
}: {
  params: { sessionId: string };
}) {
  return <NeuralChatExperience sessionId={params.sessionId} />;
}
