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

module.exports = sendDiscordAlert;
