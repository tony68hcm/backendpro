
require('dotenv').config()
const app = require("./src/app");
const PORT = process.env.PORT || 8080

const server = app.listen(PORT, () => {
    console.log(`backend start with ${PORT}`)
})

/*
process.on("SIGINT", () => {
    server.close(() => { console.log(`exit server express`)})
})
*/