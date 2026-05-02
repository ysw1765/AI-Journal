import { MemoryUniverseExperience } from "@/components/chat/MemoryUniverseExperience";

export function NeuralChatExperience({ sessionId }: { sessionId: string }) {
  return <MemoryUniverseExperience mode="session" sessionId={sessionId} />;
}
