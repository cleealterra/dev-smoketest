class Bundles {

    BundlePopUp() {
        return cy.get('.inntopia-bundles')
    }

    NextStep() {
        return cy.get('.next-step')
    }

    BundleOption() {
        return cy.get('.bundle-option')
    }

    ReviewAddOns() {
        return cy.get('.add-ons')
    }

    MoreOptions() {
        return cy.get('.more-options-button')
    }

    Cancel() {
        return cy.get('.cancel')
    }

    AddToCart() {
        return cy.get('.selected-container > .add-to-cart')
    }

    NoThanks() {
        return cy.get('.no-option')
    }

}

export default Bundles