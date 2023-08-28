import { useEffect, useState } from "react";
import { BaseUrl, getRequest } from "../utils/services";
export const useFetchRecipient = (chat, user) => {
  const [recipient, setRecipient] = useState(null);
  const [error, setError] = useState(null);
  const recipientId = chat?.members.find((member) => member !== user._id);
  useEffect(() => {
    const getUser = async () => {
      if (!recipientId) return null;
      const response = await getRequest(`${BaseUrl}/users/find/${recipientId}`);
      if (response.error) {
        return setError(response.error);
      }
      setRecipient(response);
    };
    getUser();
  }, [recipientId]);
  return { recipient, error };
};
