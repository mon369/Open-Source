const app = require("./app")
const HTTP_PORT = process.env.PORT || 8080;

app.listen(HTTP_PORT, () => {
    console.log("Running " + HTTP_PORT)
})

