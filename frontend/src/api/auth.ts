import { API_BASE_URL, JWT_TOKEN_STORAGE_KEY } from "@utils/constants";

const getAuthData = async () => {
  const jwtToken = localStorage.getItem(JWT_TOKEN_STORAGE_KEY);

  if (!jwtToken) {
    return;
  }

  const apiEndpoint = `${API_BASE_URL}auth`;
  const options = {
    method: "POST",
    headers: {
      Authorization: `Bearer ${jwtToken}`,
      "Content-Type": "application/json",
    },
  };

  const response = await fetch(apiEndpoint, options);
  const data: { username: string; roomId: string } = await response.json();

  return data;
};

export default getAuthData;
