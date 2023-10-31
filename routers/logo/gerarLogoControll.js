const cypress = require("cypress");
const glob = require("glob");
const { convert } = require("convert-svg-to-png");
const express = require("express");
const router = express.Router();
const path = require("path");
const fs = require("fs");


router.post("/gerarlogo/", (req, res) => {
  const { email, senha, logo, slogan } = req.body;
  const cor =1, fonte =2, atividade =3;

  glob("./cypress/e2e/**/logo.cy.js", (err, files) => {
    if (err) {
      return res.json({ Error: err });
    }

    let enviarResposta = false;

    Promise.all(
      files.map((file) => {
        return cypress
          .run({
            spec: file,
            env: {
              email: email,
              senha: senha,
              nomelogo: logo,
              slogan: slogan,
              atividade: atividade,
              cor: cor,
              fonte: fonte,
            },
            video: false, // desativa a geração de vídeos de relatório
          })
          .then((results) => {
            console.log("result: " + results.totalPassed);
            if (results.totalPassed === 1) {
              enviarResposta = true; // atualiza a variável auxiliar
            }
          })
          .catch((err) => {
            console.error(err);
            return res.json({ Error: err });
          });
      })
    ).then(async () => {
      if (enviarResposta) {
        const arquivo = path.join(__dirname, "../../logos", "logo.html");

        // Lê o conteúdo do arquivo HTML
        const htmlContent = fs.readFileSync(arquivo, "utf-8");

        // Extrai o conteúdo do SVG do arquivo HTML
        const svgRegex = /<svg.*<\/svg>/s;
        const svgContent = htmlContent.match(svgRegex)[0];

        const pngBuffer = await convert(svgContent, {
          width: 1200, // Largura da imagem em pixels
          height: 900, // Altura da imagem em pixels
        });

        const pngName = `${logo}.png`;
        const pngPath = path.join(__dirname, "../../logos", pngName);
        fs.writeFileSync(pngPath, pngBuffer);

        // Exclui o arquivo HTML
        fs.unlinkSync(arquivo);

        return res.writeHead(200, {
          'Content-Type': 'image/png',
          'Content-Length': pngBuffer.length
        }).end(pngBuffer);
      } else {
        return res.json({ msg: "Falha ao gerar o logo" });
      }
    });
  });
});



router.post("/cadastarcliente/", (req, res) => {
  const {nome, email,senha } = req.body;
  
  console.log("NOME: "+nome)
  console.log("EMAIL: " + email);
  console.log("LOGO: " + senha);
 
  glob("./cypress/e2e/**/cadastro.cy.js", (err, files) => {
    if (err) {
      return res.json({ Error: err });
    }
    Promise.all(
      files.map((file) => {
        return cypress
          .run({
            spec: file,
            env: {
              nome:nome,
              email: email,
              senha: senha,
             
            },
            video: false, // desativa a geração de vídeos de relatório
          })
          .then((results) => {
            if (results.totalPassed === 1) {
              return res.json({ msg: "cadastrado" });
            }
          })
          .catch((err) => {
            return res.json({ msg: "falha" });
          });
      })
    )

  });
});




module.exports = router;
