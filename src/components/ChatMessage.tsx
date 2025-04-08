
import React from 'react';
import { cn } from "@/lib/utils";
import { Avatar } from "@/components/ui/avatar";
import { User, MessageSquare } from "lucide-react";

type ChatMessageProps = {
  content: string;
  isUser: boolean;
  timestamp?: string;
};

const ChatMessage: React.FC<ChatMessageProps> = ({ content, isUser, timestamp }) => {
  return (
    <div
      className={cn(
        "flex gap-3 max-w-[80%] animate-fade-in mb-4",
        isUser ? "ml-auto" : "mr-auto"
      )}
    >
      {!isUser && (
        <Avatar className="h-8 w-8 bg-primary text-primary-foreground">
          <MessageSquare className="h-4 w-4" />
        </Avatar>
      )}

      <div
        className={cn(
          "rounded-2xl p-4",
          isUser
            ? "bg-chat-user text-white"
            : "bg-chat-assistant text-gray-800"
        )}
      >
        <p className="whitespace-pre-wrap break-words">{content}</p>
        {timestamp && (
          <p className={cn("text-xs mt-1", isUser ? "text-white/70" : "text-gray-500")}>
            {timestamp}
          </p>
        )}
      </div>

      {isUser && (
        <Avatar className="h-8 w-8 bg-chat-user text-white">
          <User className="h-4 w-4" />
        </Avatar>
      )}
    </div>
  );
};

export default ChatMessage;
