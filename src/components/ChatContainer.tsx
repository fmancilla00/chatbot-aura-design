import React, { useState, useRef, useEffect } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card } from "@/components/ui/card";
import ChatMessage from "./ChatMessage";
import ChatInput from "./ChatInput";
import logoEcogas from "../assets/nuevo_logo_ecogas.svg";
import { username } from "@/layout/ChatLayout";
import { HistoryService, MessageDto } from "@/services/history";
import { queryOptions, useQuery } from "@tanstack/react-query";
import { ChatService } from "@/services/chat";
import { PromptRequest, useChatStream } from "@/hooks/use-message-stream";

type ChatContainerProps = {
  chatId?: string;
};

const accionEnCurso = {
  DB: <div>Accediendo a BD</div>,
  AF: <div>Analisis financiero</div>,
};

const ChatContainer: React.FC<ChatContainerProps> = ({ chatId }) => {
  const [messages, setMessages] = useState<MessageDto[]>([]);
  const [status, setStatus] = useState("");

  const scrollAreaRef = useRef<HTMLDivElement>(null);

  const { data: messagesData } = useQuery({
    queryKey: [username, chatId],
    queryFn: () => HistoryService.getById(chatId),
  });
  useEffect(() => {
    if (messagesData) {
      setMessages(messagesData);
    }
  }, [messagesData]);

  useEffect(() => {
    if (scrollAreaRef.current) {
      const scrollContainer = scrollAreaRef.current.querySelector(
        "[data-radix-scroll-area-viewport]"
      );
      if (scrollContainer) {
        scrollContainer.scrollTop = scrollContainer.scrollHeight;
      }
    }
  }, [messages]);

  const { data, error, isLoading, sendMessage } = useChatStream();

  useEffect(() => {
    if (!isLoading && data.length > 0) {
      const responseText = data[data.length - 2].payload;
      const response: MessageDto = {
        content: responseText,
        type: "ai",
      };
      setStatus(null);
      setMessages((prev) => [...prev, response]);
    }
    if (isLoading && data.length > 0) {
      const { type, payload } = data[data.length - 1];
      if (type == "adv") {
        setStatus(payload);
      }
    }
  }, [isLoading, data]);

  const handleSendMessage = (content: string) => {
    const newMessage: MessageDto = {
      content,
      type: "human",
    };

    setMessages((prev) => [...prev, newMessage]);

    // Todo: Peticion
    const body: PromptRequest = {
      prompt: content,
      username: username,
      conversation_id: chatId,
    };
    sendMessage(body);
  };

  return (
    <Card className="flex flex-col h-full rounded-none border-0 shadow-none">
      <ScrollArea ref={scrollAreaRef} className="flex-1 p-4">
        <div className="space-y-4">
          {messages.map((message) => (
            <ChatMessage
              key={`${chatId}-${Date.now()}-${Math.random()}`}
              content={message.content}
              isUser={message.type == "human"}
            />
          ))}
          <div>{status && accionEnCurso[status]}</div>
        </div>
      </ScrollArea>
      <ChatInput onSendMessage={handleSendMessage} />
    </Card>
  );
};

export default ChatContainer;
