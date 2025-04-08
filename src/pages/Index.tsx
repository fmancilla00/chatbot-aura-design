
import React, { useState } from 'react';
import { useIsMobile } from "@/hooks/use-mobile";
import ChatHistory from '@/components/ChatHistory';
import ChatContainer from '@/components/ChatContainer';
import { Button } from '@/components/ui/button';
import { MessageSquare } from 'lucide-react';

// Mock data
const mockChats = [
  {
    id: '1',
    name: 'Chat General',
    preview: '¡Hola! ¿En qué puedo ayudarte hoy?',
    timestamp: '12:01',
  },
  {
    id: '2',
    name: 'Soporte Técnico',
    preview: 'Estamos revisando tu caso...',
    timestamp: '11:30',
  },
  {
    id: '3',
    name: 'Ventas',
    preview: '¿Tienes alguna otra pregunta sobre nuestros planes?',
    timestamp: 'Ayer',
  },
];

const Index = () => {
  const isMobile = useIsMobile();
  const [sidebarOpen, setSidebarOpen] = useState(!isMobile);
  const [activeChat, setActiveChat] = useState('1');

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="flex h-screen w-full bg-background">
      {/* Sidebar */}
      {sidebarOpen && (
        <div className="w-full sm:w-80 max-w-80 flex-shrink-0 border-r bg-card">
          <ChatHistory
            chats={mockChats}
            activeChat={activeChat}
            onSelectChat={setActiveChat}
          />
        </div>
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col relative overflow-hidden">
        {/* Mobile sidebar toggle */}
        {isMobile && (
          <Button 
            variant="ghost" 
            size="icon" 
            className="absolute top-2 left-2 z-10"
            onClick={toggleSidebar}
          >
            <MessageSquare className="h-5 w-5" />
          </Button>
        )}
        
        <ChatContainer chatId={activeChat} />
      </div>
    </div>
  );
};

export default Index;
