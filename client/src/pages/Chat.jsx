import { useContext } from "react";
import { ChatContext } from "../store/chatContext";
import { Container, Stack } from "react-bootstrap";
import UserChat from "../components/Chat/UserChat";
import { AuthContext } from "../store/authContext";
import PotentialChat from "../components/Chat/PotentialChat";
import ChatBox from "../components/Chat/ChatBox";

const Chat = () => {
  const { user } = useContext(AuthContext);
  const { userChats, chatLoading, updateCurrentChat } = useContext(ChatContext);
  return (
    <>
      <Container>
        <PotentialChat />
        {userChats?.length < 1 ? null : (
          <Stack
            direction="horizontal"
            gap={3}
            className="align-items-start pe-3"
          >
            <Stack style={{ height: "85vh" }} className="flex-grow-0">
              {chatLoading && <p>Loading...</p>}
              {userChats?.map((chat, index) => {
                return (
                  <div key={index} onClick={() => updateCurrentChat(chat)}>
                    <UserChat chat={chat} user={user} />
                  </div>
                );
              })}
            </Stack>
            <ChatBox />
          </Stack>
        )}
      </Container>
    </>
  );
};

export default Chat;
