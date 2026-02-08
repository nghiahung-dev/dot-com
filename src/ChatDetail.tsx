import { useParams } from "react-router";

const ChatDetail = () => {
  const params = useParams();

  return (
    <div>
      <h1>Chat Detail </h1>
      <p>Chat ID: {params.chatId}</p>
    </div>
  );
}

export default ChatDetail;