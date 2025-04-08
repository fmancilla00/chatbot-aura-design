import React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { MessageSquare } from "lucide-react";
import { Separator } from "./ui/separator";
import { ConversationDto } from "@/services/history";
import { Link } from "@tanstack/react-router";

type ChatHistoryItem = {
  id: string;
  name: string;
  preview: string;
  timestamp: string;
  unread?: boolean;
};

type ChatHistoryProps = {
  chats: ConversationDto[];
  activeChat?: string;
  onSelectChat: (id: string) => void;
  className?: string;
};

const ChatHistory: React.FC<ChatHistoryProps> = ({
  chats,
  activeChat,
  onSelectChat,
  className,
}) => {
  return (
    <div className={cn("flex flex-col h-full border-r", className)}>
      <ScrollArea className="flex-1">
        <div className="p-2 space-y-2">
          {chats.map((chat) => (
            <>
              <Button
                key={chat.id + chat.created_at}
                variant="ghost"
                className={cn(
                  "w-full justify-start px-3 py-2 h-auto rounded-lg",
                  activeChat === chat.id && "bg-accent"
                )}
                onClick={() => onSelectChat(chat.id)}
              >
                <Link to={`/chat/${chat.id}`}>
                  <div className="flex gap-3 items-center">
                    <div className="bg-primary/10 rounded-full p-2">
                      <MessageSquare className="h-5 w-5 text-primary" />
                    </div>
                    <div className="text-left truncate">
                      <div className="font-medium truncate">{chat.title}</div>
                    </div>
                  </div>
                </Link>
              </Button>
              <Separator />
            </>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};

export default ChatHistory;
