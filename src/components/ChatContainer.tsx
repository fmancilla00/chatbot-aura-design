
import React, { useState, useRef, useEffect } from 'react';
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card } from "@/components/ui/card";
import ChatMessage from './ChatMessage';
import ChatInput from './ChatInput';

// Define message type
type Message = {
  id: string;
  content: string;
  isUser: boolean;
  timestamp: string;
};

type ChatContainerProps = {
  chatId?: string;
};

const ChatContainer: React.FC<ChatContainerProps> = ({ chatId }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: '¡Hola! ¿En qué puedo ayudarte hoy?',
      isUser: false,
      timestamp: '12:01'
    }
  ]);

  const scrollAreaRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom whenever messages change
  useEffect(() => {
    if (scrollAreaRef.current) {
      const scrollContainer = scrollAreaRef.current.querySelector('[data-radix-scroll-area-viewport]');
      if (scrollContainer) {
        scrollContainer.scrollTop = scrollContainer.scrollHeight;
      }
    }
  }, [messages]);

  const handleSendMessage = (content: string) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      content,
      isUser: true,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    
    setMessages(prev => [...prev, newMessage]);
    
    // Simulate assistant response
    setTimeout(() => {
      const response: Message = {
        id: (Date.now() + 1).toString(),
        content: "Esta es una respuesta automática de ejemplo. En una implementación real, aquí podría integrarse una API externa o un modelo de lenguaje.",
        isUser: false,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, response]);
    }, 1000);
  };

  return (
    <Card className="flex flex-col h-full rounded-none border-0 shadow-none">
      <div className="p-4 border-b">
        <h2 className="font-semibold">Chat Actual</h2>
      </div>
      <ScrollArea ref={scrollAreaRef} className="flex-1 p-4">
        <div className="space-y-4">
          {messages.map(message => (
            <ChatMessage
              key={message.id}
              content={message.content}
              isUser={message.isUser}
              timestamp={message.timestamp}
            />
          ))}
        </div>
      </ScrollArea>
      <ChatInput onSendMessage={handleSendMessage} />
    </Card>
  );
};

export default ChatContainer;
