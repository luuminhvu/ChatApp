/* eslint-disable react/prop-types */
import { useFetchRecipient } from "../../hooks/useFetchRecipient";
import { Stack } from "react-bootstrap";
import "./UserChat.css";
import { ChatContext } from "../../store/chatContext";
import { useContext } from "react";
import { unreadNotification } from "../../utils/unreadNotification";
import { useFetchLastestMessage } from "../../hooks/useFetchLastestMessage";
import moment from "moment";
const UserChat = ({ chat, user }) => {
  const { recipient } = useFetchRecipient(chat, user);

  const { onlineUsers, notification, markThisUserNotificationAsRead } =
    useContext(ChatContext);
  const unreadNotifications = unreadNotification(notification);
  const thisUserNotification = unreadNotifications?.filter(
    (n) => n?.senderId === recipient?._id
  );
  const isOnline = onlineUsers?.some((user) => user?.userId === recipient?._id);
  const { lastestMessage } = useFetchLastestMessage(chat);
  const truncateText = (text) => {
    let shortText = text?.substring(0, 20);
    if (text?.length > 20) {
      return shortText + "...";
    }
    return text;
  };
  return (
    <Stack
      direction=""
      gap={3}
      className="align-items-center justify-between"
      role="button"
      onClick={() => {
        if (thisUserNotification?.length > 0) {
          markThisUserNotificationAsRead(thisUserNotification, notification);
        }
      }}
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
            <div className="user-message">
              {truncateText(lastestMessage?.text)}
            </div>
          </div>
        </div>
        <div className="status-notificaion">
          <div className="status-date">
            {moment(lastestMessage?.createdAt).calendar()}
          </div>
          <div
            className={
              thisUserNotification?.length > 0 ? "status-new__notification" : ""
            }
          >
            {thisUserNotification?.length > 0
              ? thisUserNotification?.length
              : ""}
          </div>
        </div>
        <div className={isOnline ? "status-online" : ""}> </div>
      </div>
    </Stack>
  );
};

export default UserChat;
