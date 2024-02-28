import axios from "axios";
import { toast } from "react-toastify";
import apiUrl from "../apiUrl";

export const handleLogin = async (email, password, rememberMe, setUser) => {
  try {
    if (!email || !password) {
      toast("Email or password can't be empty!");
      return;
    }
    const options = {
      method: "post",
      url: `${apiUrl}/api/login`,
      data: {
        email,
        password,
      },
    };
    const result = await axios(options);
    setUser({
      isLoggedIn: true,
      userData: {
        enail: result.data.userInfo.userEmail,
        userId: result.data.userInfo.userId,
      },
    });

    const userData = {
      userInfo: result.data.userInfo,
      token: result.data.token,
    };
    localStorage.setItem("user", JSON.stringify(userData));

    return true;
  } catch (err) {
    toast(err.response.data.message);
    return false;
  }
};

export const handleSignUp = async (email, password, setUser) => {
  try {
    if (!email || !password) {
      toast("Email or password can't be empty!");
      return;
    }
    const options = {
      method: "post",
      url: `${apiUrl}/api/register`,
      data: {
        email,
        password,
      },
    };
    const result = await axios(options);
    setUser({
      isLoggedIn: true,
      userData: {
        enail: result.data.userInfo.userEmail,
        userId: result.data.userInfo.userId,
      },
    });
    const userData = {
      userInfo: result.data.userInfo,
      token: result.data.token,
    };
    localStorage.setItem("user", JSON.stringify(userData));

    return true;
  } catch (err) {
    toast(err.response.data.message);
    return false;
  }
};
