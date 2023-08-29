import { API_BASE_URL, JWT_TOKEN_STORAGE_KEY } from "@utils/constants";

const getAuthData = async (
  callback: ({ username, roomId }: { username: string; roomId: string }) => void
) => {
  if (
    !window.localStorage ||
    window.localStorage.getItem(JWT_TOKEN_STORAGE_KEY) === null
  ) {
    return;
  }

  const jwtToken = window.localStorage.getItem(JWT_TOKEN_STORAGE_KEY);
  const apiEndpoint = `${API_BASE_URL}auth`;

  const options = {
    method: "POST",
    headers: {
      Authorization: `Bearer ${jwtToken}`,
      "Content-Type": "application/json",
    },
  };

  try {
    const response = await fetch(apiEndpoint, options);
    const data = await response.json();

    if (data.username && data.roomId) {
      callback(data);
    } else {
      console.error("auth_error", data);
    }
  } catch (error) {
    console.error("auth_error", error);
  }
};

export default getAuthData;
