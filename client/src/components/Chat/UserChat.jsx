/* eslint-disable react/prop-types */
import { useFetchRecipient } from "../../hooks/useFetchRecipient";
import { Stack } from "react-bootstrap";
import "./UserChat.css";
const UserChat = ({ chat, user }) => {
  const { recipient } = useFetchRecipient(chat, user);
  return (
    <Stack
      direction=""
      gap={3}
      className="align-items-center justify-between"
      role="button"
    >
      <div className="user-container">
        <div className="user-img">
          <img src="https://picsum.photos/200/300" alt="user" />
        </div>
        <div className="user">
          <div className="user-info">
            <div className="user-name">
              {recipient?.name} {recipient?.lastname}
            </div>
            <div className="user-message">Text Message</div>
          </div>
        </div>
        <div className="status-notificaion">
          <div className="status-date">12/12/2022</div>
          <div className="status-new__notification">2</div>
        </div>
        <div className="status-online"> </div>
      </div>
    </Stack>
  );
};

export default UserChat;