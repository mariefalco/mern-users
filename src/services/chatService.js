import axios from "axios";

const getMessages = () => axios.get("/api/chat");

export const chatService = {
  getMessages
};
