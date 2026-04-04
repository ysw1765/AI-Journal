import { NeuralChatExperience } from "@/components/chat/NeuralChatExperience";

type ChatSessionPageProps = {
  params: Promise<{ sessionId: string }>;
};

export default async function ChatSessionPage({
  params,
}: ChatSessionPageProps) {
  const { sessionId } = await params;

  return <NeuralChatExperience sessionId={sessionId} />;
}
