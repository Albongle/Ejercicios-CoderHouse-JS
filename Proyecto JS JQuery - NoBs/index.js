const anuncios = require("./anuncios.js");
const express = require("express");
const cors = require("cors");
const corsOptions = { origin: "*", optionSucessStatus: 200 };
const app = express();
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cors(corsOptions));

app.get("/anuncios", function (req, res) {

  setTimeout(() => {
    res.send(anuncios);
  }, 2000);
  
  return;
});

app.get("[/]", (req, res)=> {
  res.send("Api Alejandro Bongioanni");

  return;
});

app.listen(3000, () => {
  console.log("Api en el puerto 3000");
});
