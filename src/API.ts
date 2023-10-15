import CONFIG from "./config";

class API {
  public makeRequest() {}

  public static register(username: string, password: string) {
    return fetch(CONFIG.genUrl("/api/account/register"), {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ username, password }),
      credentials: "include",
    });
  }

  public static login(username: string, password: string) {
    return fetch(CONFIG.genUrl("/api/account/login"), {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ username, password }),
      credentials: "include",
    });
  }

  public static async isLoggedIn() {
    const res = await fetch(CONFIG.genUrl("/api/account/me"), {
      credentials: "include",
    });

    return res.ok;
  }

  public static async logout() {
    const res = await fetch(CONFIG.genUrl("/api/account/logout"), {
      method: "POST",
      credentials: "include",
    });

    return res.ok;
  }

  public static async beginChat() {
    return await fetch(CONFIG.genUrl("/api/chat/begin"), {
      method: "POST",
      credentials: "include",
    });
  }

  public static async respond(conversationId: number, message: string) {
    return await fetch(CONFIG.genUrl("/api/chat/response"), {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        message,
        conversationId,
      }),
    });
  }
}

export default API;
