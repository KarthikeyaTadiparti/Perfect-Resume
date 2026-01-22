const axios = require("axios");

const sendDiscordAlert = async (message) => {
    try {
        if (process.env.NODE_ENV !== "production") return;

        await axios.post(process.env.DISCORD_WEBHOOK_URL, {
            content: message,
        });
    } catch (error) {
        console.error("Discord alert failed:", error.message);
    }
};

const formatIST = () => {
  return new Date().toLocaleString("en-IN", {
    timeZone: "Asia/Kolkata",
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true
  });
};

module.exports = { sendDiscordAlert, formatIST };
