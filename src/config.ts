const CONFIG = {
  BACKEND_URL: ["localhost", "127.0.0.1"].includes(location.hostname)
    ? "http://127.0.0.1:8000"
    : "https://budgeteer.tk",
  genUrl: (path: string) => {
    if (!path.startsWith("/")) {
      throw new Error("Path must start with /");
    }
    return `${CONFIG.BACKEND_URL}${path}`;
  },
};

export default CONFIG;
