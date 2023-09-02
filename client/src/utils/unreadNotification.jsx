export const unreadNotification = (notification) => {
  return notification?.filter((n) => n?.isRead === false);
};
