import { useEffect, useState } from "react";
import Navbar from "../component/Navbar";
import styles from "../assets/css/home.module.css";

const nouns = ["intuitive", "personal", "free", "simple"];

function HomeScreen() {
  const [currText, setCurrText] = useState<string>("");
  const [deleting, setDeleting] = useState(false);
  const [nounsIndex, setNounsIndex] = useState(0);
  useEffect(() => {
    let changeTimeout: number | undefined;
    const timeout = setTimeout(() => {
      if (deleting) {
        if (currText.length > 0) {
          setCurrText(currText.substring(0, currText.length - 1));
        } else {
          setDeleting(false);
          if (nounsIndex >= nouns.length - 1) {
            setNounsIndex(0);
          } else {
            setNounsIndex(nounsIndex + 1);
          }
        }

        return;
      }

      if (currText === nouns[nounsIndex]) {
        changeTimeout = setTimeout(() => setDeleting(true), 2500);
      } else {
        setCurrText((c) => c + nouns[nounsIndex].charAt(c.length));
      }
    }, 50);

    return () => {
      clearInterval(timeout);
      clearTimeout(changeTimeout);
    };
  }, [currText, deleting, nounsIndex]);

  return (
    <>
      <Navbar />
      <div className={styles.main}>
        <h1 className={styles.title}>
          {"Budgeting made "}
          <span className={styles.scrollingText}>{currText}</span>
        </h1>
        <p className={styles.sub}>
          Budgeteer is a friendly chatbot for your budgeting needs
        </p>
      </div>
    </>
  );
}

export default HomeScreen;
