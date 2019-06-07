/// <reference types="Cypress" />

context('Cart operations', () => {
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

    it('shows 0 total price and no Continue buttons with empty cart', () => {
        // no continue button
        cy.get('.js-continue-to-order').should('not.exist');

        // all subtotals say the same
        cy.get('.js-subtotal-amount').each(($el, index, $list) => {
            cy.wrap($el)
                .invoke('text')
                .then(text => {
                    expect(text.replace(/\u00a0/g, ' ')).equal('Celkem: 0 Kč');
                });
        });
    });

    it('can manipulate cart and give correct feedback to user', () => {
        // add to cart
        cy.get('.js-add-to-cart-button')
            .eq(0)
            .click();

        // all subtotals say the same
        cy.get('.js-subtotal-amount').each(($el, index, $list) => {
            cy.wrap($el)
                .invoke('text')
                .then(text => {
                    expect(text.replace(/\u00a0/g, ' ')).equal('Celkem: 150 Kč');
                });
        });

        // add to cart
        cy.get('.js-add-to-cart-button')
            .eq(1)
            .click();

        // all subtotals say the same
        cy.get('.js-subtotal-amount').each(($el, index, $list) => {
            cy.wrap($el)
                .invoke('text')
                .then(text => {
                    expect(text.replace(/\u00a0/g, ' ')).equal('Celkem: 310 Kč');
                });
        });

        // lines are selected
        cy.get('.variation-line')
            .eq(0)
            .should('have.class', 'variation-line--selected');
        cy.get('.variation-line')
            .eq(1)
            .should('have.class', 'variation-line--selected');
        cy.get('.variation-line')
            .eq(2)
            .should('not.have.class', 'variation-line--selected');

        // continue button appears
        cy.get('.js-continue-to-order').should('exist');
    });
});
