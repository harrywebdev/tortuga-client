/// <reference types="Cypress" />

context('Landing page UI', () => {
    beforeEach(() => {
        cy.server();
        cy.route('GET', '/api/categories', 'fixture:categories.json');
        cy.route('GET', '/api/products*', 'fixture:products.json');

        cy.visit('/', {
            onBeforeLoad: win => {
                win.sessionStorage.clear();
            },
        });
    });

    it('opens a landing page with navigation and categorised products', () => {
        cy.contains('.nav-tabs', 'Menu');
        cy.contains('.nav-tabs', 'Objednavka');
        cy.contains('.nav-tabs', 'Potvrzeni');

        cy.get('.product-list');
        cy.get('.product-card')
            .its('length')
            .should('be.equal', 8);
    });
});
