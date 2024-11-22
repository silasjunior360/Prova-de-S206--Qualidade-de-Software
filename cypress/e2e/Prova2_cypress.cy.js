describe('Testando o Cadastro de Computadores', () => {

  it('Deve cadastrar um computador com sucesso', () => {
    Colocar_Dado_Computador()
  
    cy.get('.primary').click(); 
    cy.get('.alert-message')
      .invoke('text')
      .then((text) => {
        const normalizedText = text.replace(/\s+/g, ' ').trim();
        expect(normalizedText).to.include(`Done ! Computer Peraphone has been created`);})

  });

  it('Cadastrar um computador sem nome ', () => {
    Colocar_Dado_Computador()

    cy.get('#name').clear() 
    cy.get('.primary').click(); 
    cy.get('.error').should('contain.text', 'Computer name'); 
  });

  it('Cadastrar um computador com datas inválidas ', () => {
    Colocar_Dado_Computador()
    cy.get('#discontinued').clear()
    cy.get('#discontinued').type('2023-01-01'); 
    cy.get('.primary').click(); 
    cy.get('.error').should('contain.text', 'Discontinued date'); 
  });
  it('Editar um computador existente ', () => {
    cy.visit('https://computer-database.gatling.io/computers');
    cy.get('tbody > :nth-child(1) > :nth-child(1) > a').click();
    cy.get('#name').clear() 
    cy.get('#name').type("ACER")
    cy.get('#introduced').type('2001-01-01'); 
    cy.get('#discontinued').type('2030-03-03'); 
    cy.get('.primary').click(); 
    cy.get('.alert-message')
      .invoke('text')
      .then((text) => {
        const normalizedText = text.replace(/\s+/g, ' ').trim();
        expect(normalizedText).to.include(`Done ! Computer ACER has been updated`);})
  });

});
function Colocar_Dado_Computador() {
  
  cy.visit('https://computer-database.gatling.io/computers');
  cy.get('#add').click()
  cy.get('#name').type('Peraphone'); 
  cy.get('#introduced').type('2024-01-01'); 
  cy.get('#discontinued').type('2025-01-01'); 
  cy.get('#company').select('Apple Inc.'); 


}
