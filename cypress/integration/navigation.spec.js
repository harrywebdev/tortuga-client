/// <reference types="Cypress" />

context('Navigation', () => {
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

    it('has navigation', () => {
        cy.contains('.nav-tabs', 'Menu');
        cy.contains('.nav-tabs', 'Objednavka');
        cy.contains('.nav-tabs', 'Potvrzeni');
    });

    it('has the first tab active with the rest of navigation disabled due to empty cart', () => {
        cy.get('.nav-item.active').contains('a.nav-link', 'Menu');
        cy.get('.nav-item:nth-child(2)').contains('span.nav-link', 'Objednavka');
        cy.get('.nav-item:nth-child(3)').contains('span.nav-link', 'Potvrzeni');
    });

    it('updates navigation and number of cart items selected when cart is not empty', () => {
        // add to cart
        cy.get('.js-add-to-cart-button')
            .eq(0)
            .click();

        // add to cart
        cy.get('.js-add-to-cart-button')
            .eq(1)
            .click();

        cy.get('.nav-item.active').contains('a.nav-link', 'Menu');

        // Order tab is available
        cy.get('.nav-item:nth-child(2)').contains('a.nav-link', 'Objednavka');

        // Order tab has badge with number of items
        cy.get('.nav-item:nth-child(2)').contains('a.nav-link', '2');

        // Confirmation still unavailable
        cy.get('.nav-item:nth-child(3)').contains('span.nav-link', 'Potvrzeni');
    });
});
