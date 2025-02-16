const mongoose = require("mongoose");

async function main() {
    await mongoose.connect(process.env.MONGODB_URL);
    // console.log(process.env.MONGODB_URL);
}
main()
    .then(() => console.log("DB connected successfully"))
    .catch((err) => console.log(err));

    