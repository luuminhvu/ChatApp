/* eslint-disable react/prop-types */
import { createContext, useCallback, useEffect, useState } from "react";
import { BaseUrl, getRequest, postRequest } from "../utils/services";
import { io } from "socket.io-client";
export const ChatContext = createContext();

export const ChatContextProvider = ({ children, user }) => {
  const [userChats, setUserChats] = useState(null);
  const [chatLoading, setChatLoading] = useState(false);
  const [chatError, setChatError] = useState(null);
  const [potentialChats, setPotentialChats] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState(null);
  const [messageLoading, setMessageLoading] = useState(false);
  const [messageError, setMessageError] = useState(null);
  // eslint-disable-next-line no-unused-vars
  const [sendTextMessageError, setSendTextMessageError] = useState(null);
  // eslint-disable-next-line no-unused-vars
  const [newMessage, setNewMessage] = useState(null);
  // eslint-disable-next-line no-unused-vars
  const [socket, setSocket] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);

  useEffect(() => {
    const newSocket = io("http://localhost:3000");
    setSocket(newSocket);
    return () => newSocket.disconnect();
  }, [user]);
  useEffect(() => {
    if (socket === null) return;
    socket.emit("addNewUser", user?._id);
    socket.on("getOnlineUsers", (res) => {
      setOnlineUsers(res);
    });
    return () => socket.off("getOnlineUsers");
  }, [socket]);
  //sendMessage
  useEffect(() => {
    if (socket === null) return;
    const recipientId = currentChat?.members?.find((m) => m !== user?._id);
    socket.emit("sendMessage", { ...newMessage, recipientId });
  }, [newMessage, socket, currentChat, user]);
  //receiveMessage
  useEffect(() => {
    if (socket === null) return;
    socket.on("getMessage", (res) => {
      if (currentChat?._id !== res.chatId) {
        return console.log("Wrong chat");
      }
      setMessages((prev) => [...prev, res]);
    });
  }, [socket, currentChat]);

  useEffect(() => {
    const getUsers = async () => {
      const response = await getRequest(`${BaseUrl}/users`);
      if (response.error) {
        return console.log(response.error);
      }
      const pChats = response.filter((u) => {
        let isChatCreated = false;
        if (user._id === u._id) {
          return false;
        }
        if (userChats) {
          isChatCreated = userChats?.some((c) => {
            return c.member[0]._id === u._id || c.member[1]._id === u._id;
          });
        }
        return !isChatCreated;
      });
      setPotentialChats(pChats);
    };
    getUsers();
  }, [userChats, user]);

  useEffect(() => {
    const getUsersChat = async () => {
      setChatLoading(true);
      if (user?._id) {
        await getRequest(`${BaseUrl}/chats/${user?._id}`)
          .then((data) => {
            setChatLoading(false);
            setChatError(null);
            setUserChats(data);
          })
          .catch((err) => {
            setChatLoading(false);
            setChatError(err.message);
          });
      }
    };
    getUsersChat();
  }, [user]);
  useEffect(() => {
    const getMessages = async () => {
      setMessageLoading(true);
      setMessageError(null);
      const response = await getRequest(
        `${BaseUrl}/messages/${currentChat._id}`
      );
      if (response.error) {
        setMessageLoading(false);
        return setMessageError(response.error);
      }
      setMessages(response);
      setMessageLoading(false);
    };
    getMessages();
  }, [currentChat]);
  const sendTextMessage = useCallback(
    async (textMessage, sender, currentChatId, setTextMessage) => {
      if (!textMessage) return console.log("No message to send");
      const response = await postRequest(`${BaseUrl}/messages`, {
        chatId: currentChatId,
        senderId: sender._id,
        text: textMessage,
      });
      if (response.error) {
        return setSendTextMessageError(response.error);
      }
      setNewMessage(response);
      setMessages((prev) => [...prev, response]);
      setTextMessage("");
    },
    []
  );
  const createChat = useCallback(async (firstId, secondId) => {
    const response = await postRequest(`${BaseUrl}/chats`, {
      firstId,
      secondId,
    });
    if (response.error) {
      return console.log(response.error);
    }
    setUserChats((prev) => {
      return [...prev, response];
    });
  }, []);
  const updateCurrentChat = useCallback((chat) => {
    setCurrentChat(chat);
  }, []);
  return (
    <ChatContext.Provider
      value={{
        userChats,
        chatLoading,
        chatError,
        potentialChats,
        createChat,
        updateCurrentChat,
        currentChat,
        messages,
        messageLoading,
        messageError,
        sendTextMessage,
        onlineUsers,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};
