import { API_BASE_URL, JWT_TOKEN_STORAGE_KEY } from "@utils/constants";

const login = async (
  username: string,
  roomId: string,
  callback: () => void
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

    if (data.jwt_token) {
      //store jwt token in localstorage, so that if the user do a browser refresh, it will still keep the session
      if (window.localStorage) {
        window.localStorage.setItem(JWT_TOKEN_STORAGE_KEY, data.jwt_token);
      }
      callback();
    } else {
      console.error("login_error", data);
    }
  } catch (error) {
    console.error("login_error", error);
  }
};

export default login;
