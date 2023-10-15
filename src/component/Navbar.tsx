import { Link } from "react-router-dom";
import styles from "../assets/css/navbar.module.css";
import { useEffect, useState } from "react";
import API from "../API";

const Navbar = () => {
  const [loggedIn, setLoggedIn] = useState<boolean | undefined>(undefined);
  useEffect(() => {
    API.isLoggedIn().then((loggedIn) => {
      setLoggedIn(loggedIn);
    });
  }, []);
  return (
    <div className={styles.navbar}>
      <Link to="/">Budgeteer</Link>
      <div className={styles.btns}>
        {loggedIn === undefined ? (
          <></>
        ) : loggedIn ? (
          <>
            <Link to="/chat">Chat</Link>
            <Link to="/logout">Log out</Link>
          </>
        ) : (
          <>
            <Link to="/register">Sign Up</Link>
            <Link to="/login">Log In</Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
