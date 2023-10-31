/// <reference types="cypress" />
import "cypress-xpath";

describe("iniciando api para cadastrar cliente", () => {
  // rodar cypress open
  /*const nome ='Maria'
  const email='mariarec@gmail.com'
  const senha ="@admin"*/


  //rodar via api
  const nome =  Cypress.env("nome");
  const email =  Cypress.env("email");
  const senha =  Cypress.env("senha");

  context("cadastrar cliente", () => {
    it("cadastro", () => {
      cy.visit("https://www.logoai.com/");
      cy.xpath("//a[text()='LOGIN']").should("exist");
      cy.xpath("//a[text()='LOGIN']").click();
      cy.xpath("//a[text()='< REGISTER']")
        .should("exist")
        .should("be.visible")
        .click();

        // cadastrando os dados
        cy.xpath("(//*[@type='text'])[1]").should("exist").type(nome);
        cy.xpath("(//*[@type='email'])[1]").should('exist').type(email) 
        cy.xpath("(//*[@type='password'])[1]").should('exist').type(senha)
        cy.xpath("//span[text()='REGISTER']/..").click()
        
    });
  });
});
