import { useEffect } from "react";
import API from "../API";

const LogoutScreen = () => {
  useEffect(() => {
    API.logout().then(() => {
      location.href = "/";
    });
  }, []);
  return <p>You are being logged out...</p>;
};

export default LogoutScreen;
