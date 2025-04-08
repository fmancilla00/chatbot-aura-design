import { useState, useCallback } from "react";

export interface PromptRequest {
  prompt: string;
  username: string;
  conversation_id?: string;
  use_markdown?: boolean;
}

interface StreamMessage {
  type: string;
  payload: string;
}

export function useChatStream() {
  // El estado data ahora es un arreglo de mensajes
  const [data, setData] = useState<StreamMessage[]>([]);
  const [error, setError] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const sendMessage = useCallback(async (body: PromptRequest) => {
    setData([]);
    setError(null);
    setIsLoading(true);

    // Configuración de autenticación y URL
    const password = import.meta.env.VITE_BACKEND_SECRET;
    const user = "admin";
    const basicAuth = btoa(`${user}:${password}`);
    const url = `${import.meta.env.VITE_NEXT_PUBLIC_API_URL}/chat/stream/send_message`;

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Basic ${basicAuth}`,
        },
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        throw new Error("Error en la petición");
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let done = false;
      let buffer = "";

      while (!done) {
        const { done: readerDone, value } = await reader.read();
        done = readerDone;
        if (value) {
          // Decodificamos el chunk y lo agregamos al buffer
          buffer += decoder.decode(value, { stream: true });
          // Separamos el buffer en líneas usando el salto de línea
          const lines = buffer.split("\n");
          // La última línea puede estar incompleta, la dejamos en el buffer
          buffer = lines.pop() ?? "";

          for (const line of lines) {
            if (!line.trim()) continue;
            try {
              const parsed: StreamMessage = JSON.parse(line);
              setData((prev) => [...prev, parsed]);

              // Si el mensaje es de tipo "end", finalizamos la carga
              if (parsed.type === "end") {
                setIsLoading(false);
                return; // Salimos del loop y finalizamos la función
              }
            } catch (err) {
              console.error("Error al parsear JSON:", err);
            }
          }
        }
      }
    } catch (err) {
      setError(err);
    } finally {
      // En caso de error o finalizar la lectura, se actualiza el estado de carga
      setIsLoading(false);
    }
  }, []);

  return { data, error, isLoading, sendMessage };
}
