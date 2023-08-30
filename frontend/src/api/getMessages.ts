import { API_BASE_URL, JWT_TOKEN_STORAGE_KEY } from "@utils/constants";

const getMessages = async () => {
  const jwtToken = localStorage.getItem(JWT_TOKEN_STORAGE_KEY);

  if (!jwtToken) {
    return;
  }

  const apiEndpoint = `${API_BASE_URL}messages`;
  const options = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${jwtToken}`,
      "Content-Type": "application/json",
    },
  };

  const response = await fetch(apiEndpoint, options);
  const data = await response.json();

  return data;
};

export default getMessages;
