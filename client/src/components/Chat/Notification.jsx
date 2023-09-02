/* eslint-disable no-unused-vars */
import { useContext, useState } from "react";
import { ChatContext } from "../../store/chatContext";
import { AuthContext } from "../../store/authContext";
import { unreadNotification } from "../../utils/unreadNotification";
import moment from "moment";

const Notification = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useContext(AuthContext);
  const {
    notification,
    userChats,
    allUsers,
    markAllNotificationAsRead,
    markNotificationAsRead,
  } = useContext(ChatContext);
  const unreadNotifications = unreadNotification(notification);
  const modifiedNotifications = unreadNotifications.map((n) => {
    const sender = allUsers?.find((u) => u._id === n.senderId);
    return { ...n, senderName: sender?.name };
  });
  return (
    <div className="notification">
      <div className="notification-icon" onClick={() => setIsOpen(!isOpen)}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          fill="currentColor"
          className="bi bi-chat-dots"
          viewBox="0 0 16 16"
        >
          <path d="M5 8a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm4 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 1a1 1 0 1 0 0-2 1 1 0 0 0 0 2z" />
          <path d="m2.165 15.803.02-.004c1.83-.363 2.948-.842 3.468-1.105A9.06 9.06 0 0 0 8 15c4.418 0 8-3.134 8-7s-3.582-7-8-7-8 3.134-8 7c0 1.76.743 3.37 1.97 4.6a10.437 10.437 0 0 1-.524 2.318l-.003.011a10.722 10.722 0 0 1-.244.637c-.079.186.074.394.273.362a21.673 21.673 0 0 0 .693-.125zm.8-3.108a1 1 0 0 0-.287-.801C1.618 10.83 1 9.468 1 8c0-3.192 3.004-6 7-6s7 2.808 7 6c0 3.193-3.004 6-7 6a8.06 8.06 0 0 1-2.088-.272 1 1 0 0 0-.711.074c-.387.196-1.24.57-2.634.893a10.97 10.97 0 0 0 .398-2z" />
        </svg>
        {unreadNotifications?.length === 0 ? null : (
          <div className="notification-icon__badge">
            <span>{unreadNotifications?.length}</span>
          </div>
        )}
      </div>
      {isOpen && (
        <div className="notification-box">
          <div className="notification-box__header">
            <div className="notification-box__header__title">Notifications</div>
            <div
              className="notification-mark"
              onClick={() => markAllNotificationAsRead(notification)}
            >
              Mark all as read
            </div>
          </div>
          {modifiedNotifications.length === 0 ? (
            <span className="notification-box__empty">
              No new notifications
            </span>
          ) : (
            modifiedNotifications.map((n, index) => (
              <div
                key={index}
                className={
                  n.isRead
                    ? "notification-box__item"
                    : "notification-box__item notification-box__item--unread"
                }
                // onClick={() => {
                //   markNotificationAsRead(n, userChats, user, notification);
                //   setIsOpen(false);
                // }}
              >
                <span className="notification-box__item__text">
                  You just send a message to {n.senderName}
                </span>
                <span className="notification-box__item__date">
                  {moment(n.createdAt).calendar()}
                </span>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default Notification;
