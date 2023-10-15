import Navbar from "../component/Navbar";
import styles from "../assets/css/register.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock, faUser } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import Notifier from "../swal";
import API from "../API";

const RegisterScreen = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  return (
    <>
      <Navbar />
      <div className={styles.content}>
        <form
          className={styles.form}
          onSubmit={(e) => {
            e.preventDefault();
            API.register(username, password)
              .then((res) => {
                res.json().then((json) => {
                  if (res.ok) {
                    Notifier.fire({
                      title: "Success!",
                      text: json["message"],
                      heightAuto: false,
                    }).then(() => {
                      // Redirect
                      location.href = "/";
                    });
                  } else {
                    Notifier.fire({
                      title: "Error",
                      text: json["error"],
                      heightAuto: false,
                    });
                  }
                });
              })
              .catch((err) => {
                Notifier.fire({
                  title: "error!",
                  text: err.message || String(err),
                  heightAuto: false,
                });
              });
          }}
        >
          <h1>Register</h1>
          <div className={styles.inputContainer}>
            <p>Username</p>
            <div className={styles.inputInner}>
              <FontAwesomeIcon icon={faUser} color={"#939393"} />
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter your username"
              />
            </div>
          </div>
          <div className={styles.inputContainer}>
            <p>Password</p>
            <div className={styles.inputInner}>
              <FontAwesomeIcon icon={faLock} color={"#939393"} />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
              />
            </div>
          </div>
          <button className={styles.submitBtn}>Create Account</button>
        </form>
      </div>
    </>
  );
};

export default RegisterScreen;
