import { useContext } from "react";
import { ChatContext } from "../../store/chatContext";
import { AuthContext } from "../../store/authContext";
import { useFetchRecipient } from "../../hooks/useFetchRecipient";
import { Stack } from "react-bootstrap";
import moment from "moment";

const ChatBox = () => {
  const { user } = useContext(AuthContext);
  const { currentChat, messages, messageLoading, messageError } =
    useContext(ChatContext);
  const { recipient } = useFetchRecipient(currentChat, user);
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
        {messages?.map((message, index) => {
          <Stack key={index} gap={3} className="chat-box__message">
            <span className="chat-box__message__text">{message.text}</span>
            <span className="chat-box__message__date">
              {moment(message.createdAt).calendar()}
            </span>
          </Stack>;
        })}
      </Stack>
    </Stack>
  );
};

export default ChatBox;
