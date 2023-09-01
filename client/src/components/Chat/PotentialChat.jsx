import { useContext } from "react";
import { ChatContext } from "../../store/chatContext";
import { AuthContext } from "../../store/authContext";

const PotentialChat = () => {
  const { potentialChats, createChat, onlineUsers } = useContext(ChatContext);
  const { user } = useContext(AuthContext);
  return (
    <>
      <div className="all-users">
        {potentialChats &&
          potentialChats.map((u, index) => {
            return (
              <div
                key={index}
                className="potentialchat"
                onClick={() => {
                  createChat(user._id, u._id);
                }}
              >
                <div className="potential-user__img">
                  <img src="https://picsum.photos/200/300" alt="user" />
                  <span
                    className={
                      onlineUsers?.some((user) => user.userId === u._id)
                        ? "potential-status__online"
                        : ""
                    }
                  >
                    {" "}
                  </span>
                </div>
                <div className="potentialchat__name">{u.name}</div>
              </div>
            );
          })}
      </div>
    </>
  );
};

export default PotentialChat;
