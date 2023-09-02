import { useContext, useEffect, useState } from "react";
import { ChatContext } from "../store/chatContext";
import { BaseUrl, getRequest } from "../utils/services";

export const useFetchLastestMessage = (chat) => {
  const { newMessage, notification } = useContext(ChatContext);
  const [lastestMessage, setLastMessage] = useState(null);

  useEffect(() => {
    const getMessages = async () => {
      const response = await getRequest(`${BaseUrl}/messages/${chat._id}`);
      if (response.error) {
        console.log(response.error);
      }
      const lastMessage = response[response.length - 1];
      setLastMessage(lastMessage);
    };
    getMessages();
  }, [newMessage, notification]);
  return { lastestMessage };
};
