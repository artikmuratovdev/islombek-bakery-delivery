import { SERVER_URL } from "@/constants";
import io from "socket.io-client";

// Socket connection - autoConnect: false (faqat kerak bo'lganda ulanadi)
export const socket = io(SERVER_URL, {
  autoConnect: false, // Doimiy ulanishni o'chirish
  reconnection: false, // Avtomatik qayta ulanishni o'chirish
});
