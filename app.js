
const express = require('express');
const app = express();
const parser = require('./parse.js');
var multer = require('multer');
const path = require("path");
const fs = require("fs");
const PATTERN = /[0-9]/g;

const storage = multer.diskStorage({
    destination: "./uploads",
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname));
    }
})

const upload = multer({ storage: storage });
app.get("/api/phonenumbers/parse/text/", (req, res) => {
    res.status(200).sendFile(path.join(__dirname, "views", "howto.html"))
})

app.get("/api/phonenumbers/parse/text/:phone", (req, res) => {
    let phoneNumber = req.params.phone.match(PATTERN);
    if (phoneNumber) {
        phoneNumber = phoneNumber.join("");
    }
    let phone = [];
    parser.parse(phoneNumber).then((formattedNumber) => {
        phone.push(formattedNumber);
        res.send(phone);
    }).catch((err) => {
        phone.push(err)
        res.send(phone);
    })
})

app.get("/api/phonenumbers/parse/file", (req, res) => {
    res.sendFile(__dirname + "/views/form.html");
})

app.post("/api/phonenumbers/parse/file", upload.single("parse"), (req, res) => {
    let filePathToRead = path.join(__dirname, "uploads", req.file.filename)
    var fileContent = fs.readFileSync(filePathToRead, "UTF8").match(/[^\r\n]+/g);
    console.log(fileContent);
    var filteredNumbers = [];
    if (fileContent) {
        for (line = 0; line < fileContent.length; line++) {
            let number = (fileContent[line].match(PATTERN));
            if (number) {
                number = number.join("");
                filteredNumbers.push(number);
            }
        }
        parser.parseFile(filteredNumbers).then((validPhones) => {
            //console.log(validPhones);
            res.send(validPhones);
        }).catch((err) => {
            res.send(err);
        })
    } else {
        res.status(404).send("Error: File is empty");
    }
    fs.unlinkSync(filePathToRead);
})


app.get("/", (req, res) => {
    res.sendFile(__dirname + "/views/index.html");
})

app.use("*", (req, res) => {
    res.status(301).redirect("/");
})

module.exports = app;
