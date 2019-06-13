import axios from "axios";

const getMessages = () => axios.get("/api/chat");
const sendMessage = message => axios.post("/api/chat", { message });
export const chatService = {
  getMessages,
  sendMessage
};
