import ChatContainer from "@/components/ChatContainer";
import { ChatLayout } from "@/layout/ChatLayout";
import { createFileRoute } from "@tanstack/react-router";
import { username } from "@/layout/ChatLayout";
import { HistoryService } from "@/services/history";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

export const Route = createFileRoute("/chat/$id")({
  component: RouteComponent,
});

function RouteComponent() {
  const { id } = Route.useParams();
  return (
    <ChatLayout>
      <ChatContainer chatId={id} />
    </ChatLayout>
  );
}
