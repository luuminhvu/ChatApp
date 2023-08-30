import { useContext, useState } from "react";
import { ChatContext } from "../../store/chatContext";
import { AuthContext } from "../../store/authContext";
import { useFetchRecipient } from "../../hooks/useFetchRecipient";
import { Stack } from "react-bootstrap";
import moment from "moment";
import InputEmoji from "react-input-emoji";

const ChatBox = () => {
  const { user } = useContext(AuthContext);
  const {
    currentChat,
    messages,
    messageLoading,
    // eslint-disable-next-line no-unused-vars
    messageError,
    sendTextMessage,
  } = useContext(ChatContext);
  const { recipient } = useFetchRecipient(currentChat, user);
  const [textMessage, setTextMessage] = useState("");
  console.log(messages);
  if (!recipient)
    return (
      <p style={{ textAlign: "center", width: "100%" }}>
        Select a chat to start messaging
      </p>
    );
  if (messageLoading)
    return <p style={{ textAlign: "center", width: "100%" }}>Loading...</p>;

  return (
    <Stack gap={3} className="chat-box">
      <div className="chat-box__header">
        <strong className="chat-box__header__name">{recipient.name}</strong>
      </div>
      <Stack gap={3} className="chat-box__messages">
        {messages && messages.length > 0 ? (
          messages.map((message, index) => (
            <Stack
              key={index}
              gap={3}
              className={`${
                message?.senderId === user._id
                  ? "chat-box__message__sender flex-grow-0 align-self-end"
                  : "chat-box__message__receiver align-self-start flex-grow-0"
              }`}
            >
              <span className="chat-box__message__text">{message.text}</span>
              <span className="chat-box__message__date">
                {moment(message.createdAt).calendar()}
              </span>
            </Stack>
          ))
        ) : (
          <p style={{ textAlign: "center", width: "100%" }}>No messages yet</p>
        )}
      </Stack>

      <Stack direction="horizontal" gap={3} className="chat-input flex-grow-0">
        <InputEmoji
          value={textMessage}
          onChange={setTextMessage}
          fontFamily="Segoe UI"
          borderColor="#126020"
        />
        <button
          className="send-btn"
          onClick={() =>
            sendTextMessage(textMessage, user, currentChat._id, sendTextMessage)
          }
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="28"
            height="28"
            fill="currentColor"
            className="bi bi-send-fill"
            viewBox="0 0 16 16"
          >
            <path d="M15.964.686a.5.5 0 0 0-.65-.65L.767 5.855H.766l-.452.18a.5.5 0 0 0-.082.887l.41.26.001.002 4.995 3.178 3.178 4.995.002.002.26.41a.5.5 0 0 0 .886-.083l6-15Zm-1.833 1.89L6.637 10.07l-.215-.338a.5.5 0 0 0-.154-.154l-.338-.215 7.494-7.494 1.178-.471-.47 1.178Z" />
          </svg>
        </button>
      </Stack>
    </Stack>
  );
};

export default ChatBox;
