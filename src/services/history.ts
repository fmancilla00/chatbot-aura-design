const BASE_URL = "/history";
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

export const HistoryService = {
  getAllByUser: async (username: string): Promise<ConversationDto[]> => {
    return await apiClient.get(`${BASE_URL}/conversations/${username}`);
  },

  getById: async (id: string): Promise<MessageDto[]> => {
    return await apiClient.get(`${BASE_URL}/conversation/${id}`);
  },

  delete: async (id: number): Promise<void> => {
    return await apiClient.delete(`${BASE_URL}/conversations/${id}`);
  },
};
