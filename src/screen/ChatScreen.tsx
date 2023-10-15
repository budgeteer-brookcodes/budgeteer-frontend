import Navbar from "../component/Navbar";
import styles from "../assets/css/chat.module.css";
import { useEffect, useState } from "react";
import API from "../API";
import Notifier from "../swal";

const ChatScreen = () => {
  // const messages: any[] = [];
  const [conversationId, setConversationId] = useState(0);
  const [messages, setMessages] = useState<
    {
      key: string;
      user: boolean;
      message: string;
    }[]
  >([]);
  const [chatMsg, setChatMsg] = useState("");
  const [canChat, setCanChat] = useState(true);

  useEffect(() => {
    const controller = new AbortController();
    const msgId = Date.now() + Math.floor(Math.random() * 100).toString();
    const chat = (): Promise<Response> =>
      new Promise((resolve, reject) => {
        controller.signal.addEventListener("abort", () => {
          reject(new Error("Aborted"));
        });

        API.beginChat().then(resolve).catch(reject);
      });

    chat()
      .then(async (res) => {
        const json = await res.json();
        if (!res.ok) {
          throw new Error(json.error);
        }

        setConversationId(json.conversationId);
        setMessages((old) => [
          ...old,
          {
            key: msgId,
            user: false,
            message: json.response,
          },
        ]);
      })
      .catch((err) => {
        setCanChat(false);
        Notifier.fire({
          title: "Error",
          text: err["message"] || String(err),
          heightAuto: false,
        });
      });

    return () => {
      controller.abort();
      setMessages((old) => old.filter((msg) => msg.key != msgId));
    };
  }, []);
  return (
    <>
      <Navbar></Navbar>
      <div className={styles.content}>
        <div className={styles.chatContainer}>
          <div className={styles.chat}>
            {messages.map((msg) => {
              if (msg.user) {
                return (
                  <div key={msg.key} className={styles.userMessage}>
                    <p>You: {msg.message}</p>
                  </div>
                );
              } else {
                return (
                  <div key={msg.key} className={styles.botMessage}>
                    <p>Bot: {msg.message}</p>
                  </div>
                );
              }
            })}
          </div>

          <div className={styles.bottomBar}>
            <input
              placeholder="Enter your message here"
              value={chatMsg}
              onChange={(e) => setChatMsg(e.target.value)}
              disabled={!canChat}
            ></input>
            <button
              onClick={() => {
                if (!canChat) return;
                setMessages((old) => [
                  ...old,
                  {
                    key:
                      Date.now() + Math.floor(Math.random() * 100).toString(),
                    message: chatMsg,
                    user: true,
                  },
                ]);

                API.respond(conversationId, chatMsg)
                  .then(async (res) => {
                    const json = await res.json();
                    if (!res.ok) {
                      throw new Error(json.error);
                    }

                    if (json.finished) {
                      setCanChat(false);
                    }

                    setMessages((old) => [
                      ...old,
                      {
                        key:
                          Date.now() +
                          Math.floor(Math.random() * 100).toString(),
                        message: json.response,
                        user: false,
                      },
                    ]);
                  })
                  .catch((err) => {
                    Notifier.fire({
                      title: "Error",
                      text: err["message"] || String(err),
                      heightAuto: false,
                    });
                  });

                setChatMsg("");
              }}
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChatScreen;
