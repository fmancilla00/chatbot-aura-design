const BASE_URL = "/chat/stream";
import apiClient from "./api";

interface PromptRequest {
  prompt: string;
  username: string;
  conversation_id?: string; // opcional
  use_markdown?: boolean; // opcional con valor por defecto false
}

export interface ConversationDto {
  id: string;
  title: string;
  created_at: string; // ISO 8601 format (podés usar Date si lo parseás)
}

export interface MessageDto {
  content: string;
  type: "human" | "ai";
}

export const ChatService = {
  sendMessage: async (body: PromptRequest): Promise<ConversationDto[]> => {
    return await apiClient.post(`${BASE_URL}/send_message`, body);
  },
};
