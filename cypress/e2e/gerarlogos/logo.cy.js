/// <reference types="cypress" />
import "cypress-xpath";
const fs = require("fs");

describe("iniciando api para gerar logo", () => {
  //rodar via open cypress
  /*const email = "testeeliasdatasales@gmail.com";
  const senha = "R3mixCl@nMorph3l";
  const nomelogo = "Malu kid";
  const slogan = "o cantinho do bebe";
  const atividade = 6;
  const cor = 3;
  const fonte = 4;*/

  //rodar via api
  const email = Cypress.env("email");
  const senha = Cypress.env("senha");
  const nomelogo = Cypress.env("nomelogo");
  const slogan = Cypress.env("slogan");
  const atividade = Cypress.env("atividade");
  const cor = Cypress.env("cor");
  const fonte = Cypress.env("fonte");

  context("gerar logo", () => {
    it("logo", () => {
      cy.visit("https://www.logoai.com/");
      cy.xpath("//a[text()='LOGIN']").should("exist");
      cy.xpath("//a[text()='LOGIN']").click();
      //realizar login na plataforma
      cy.xpath("//span[text()='LOGIN']/../../../..//input[@type='email']").type(
        email
      );
      cy.xpath(
        "//span[text()='LOGIN']/../../../..//input[@type='password']"
      ).type(senha);
      cy.xpath("//span[text()='LOGIN']").click();
      //acessar estudio para criar logo
      cy.xpath("//div[@class='left-wrapper']//a[text()='Logo Maker']").click();
      cy.xpath("//label[text()='Logo Name']/../input").type(nomelogo);
      cy.xpath("//label[text()='Slogan (Optional)']/../input")
        .should("exist")
        .should("be.visible") // espera que o elemento esteja visível
        .click({ force: true }) // clique no elemento para ativá-lo
        .clear() // limpa o conteúdo existente
        .type(slogan); // insere o novo texto
      cy.xpath("(//span[text()='Continue'])[1]/..")
        .should("be.visible")

        .click({ force: true });
      //Escolher atividade
     
    
      cy.xpath(
        "(//span[text()='Retail']/../../../div)[" + atividade + "]"
      ).click();

      //selecionar tabela de cores
      cy.xpath("(//strong)[" + cor + "]").click();
      cy.xpath("(//span[text()='Continue'])[1]/..")
        .should("be.visible")
        .click({ force: true });
      //selecionar fonte texto
      cy.scrollTo("top");

      cy.xpath("(//*[@alt='Modern']/../../../../div)[" + fonte + "]")
        .should("be.visible")
        .click();
      cy.scrollTo("top");
      cy.scrollTo("top");
      cy.xpath(" (//button[contains(.,'Generate')])[1]")
        .should("be.visible")
        .should("exist")
        .click({ force: true });
      cy.wait(5000);
      
       
          cy.xpath("(//*[@class='watermarklayer']/..)[1]")
            .should("be.visible")
            .invoke("prop", "outerHTML")
            .then((html) => {
              console.log(html);
              // Salva o arquivo "logo.html" na raiz do projeto Cypress com o código HTML retornado
              cy.writeFile("logos/logo.html", html);
            });   
            
            cy.xpath("(//span[text()='Buy'])[1]").click({force:true})
            cy.xpath("//*[@class='el-icon-close css-aq24ky']").should('be.visible').click({force:true})
           
    });
  });
});
