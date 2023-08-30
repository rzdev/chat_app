import { API_BASE_URL } from "@utils/constants";

const login = async (username: string, roomId: string) => {
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

  const response = await fetch(apiEndpoint, options);
  const data: { jwt_token?: string; error?: string } = await response.json();

  return data;
};

export default login;
