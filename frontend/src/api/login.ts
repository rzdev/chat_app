import { API_BASE_URL } from "@utils/constants";

const login = async (
  username: string,
  roomId: string,
  callback: ({
    jwt_token,
    error,
  }: {
    jwt_token?: string;
    error?: string;
  }) => void
) => {
  if (!username || !roomId) {
    return;
  }

  const apiEndpoint = `${API_BASE_URL}login`;

  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, roomId }),
  };

  try {
    const response = await fetch(apiEndpoint, options);
    const data = await response.json();

    callback(data);
  } catch (error) {
    console.error("login_error", error);
  }
};

export default login;
