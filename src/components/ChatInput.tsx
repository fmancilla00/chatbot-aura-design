
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send } from "lucide-react";

type ChatInputProps = {
  onSendMessage: (message: string) => void;
};

const ChatInput: React.FC<ChatInputProps> = ({ onSendMessage }) => {
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      onSendMessage(message);
      setMessage('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 border-t p-2 bg-background">
      <Input
        placeholder="Escribe un mensaje..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        className="flex-1 focus-visible:ring-0 focus-visible:ring-offset-0 border-0 shadow-none"
      />
      <Button 
        type="submit" 
        size="icon" 
        disabled={!message.trim()}
        className="bg-chat-user hover:bg-chat-user/90"
      >
        <Send className="h-4 w-4" />
      </Button>
    </form>
  );
};

export default ChatInput;
