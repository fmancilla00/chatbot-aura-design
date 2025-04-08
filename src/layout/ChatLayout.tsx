import React, { useState } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import ChatHistory from "@/components/ChatHistory";
import ChatContainer from "@/components/ChatContainer";
import { Button } from "@/components/ui/button";
import { MessageSquare } from "lucide-react";
import logoEcogas from "../assets/nuevo_logo_ecogas.svg";
import { useQuery } from "@tanstack/react-query";
import { HistoryService } from "@/services/history";
import { Outlet, useParams } from "@tanstack/react-router";

export const username = "admin";

export const ChatLayout = ({ children }) => {
  const { data: chatsData } = useQuery({
    queryKey: [username],
    queryFn: () => HistoryService.getAllByUser(username),
  });

  const chats = chatsData ? chatsData : [];

  const isMobile = useIsMobile();
  const [sidebarOpen, setSidebarOpen] = useState(!isMobile);
  const [activeChat, setActiveChat] = useState("1");

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="flex flex-col h-screen">
      <div className="p-4 border-b flex justify-center">
        <picture>
          <img src={logoEcogas} alt="Ecogas Logo" className="h-8" />
        </picture>
      </div>
      <div className="flex h-full w-full bg-background">
        {/* Sidebar */}
        {sidebarOpen && (
          <div className="w-full sm:w-80 max-w-80 flex-shrink-0 border-r bg-card">
            <ChatHistory
              chats={chats}
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

          {children}
        </div>
      </div>
    </div>
  );
};
