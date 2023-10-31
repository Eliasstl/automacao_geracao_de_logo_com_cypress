const express = require("express");
const app = express();
const bodyParser = require("body-parser");

const gerarLogoControll = require("./routers/logo/gerarLogoControll");



const port = process.env.PORT || 3000;
//Estou dizendo para o Express usar o EJS com View Enine
app.set("view engine", "ejs");
app.use(express.static("public"));

//Body Parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/", gerarLogoControll);


//Porta
app.listen(port, () => {
  console.log("App Rodando!: " + port);
});
