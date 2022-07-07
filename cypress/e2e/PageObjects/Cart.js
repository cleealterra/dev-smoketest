class Cart {

    MinicartProductName() {
        return cy.get('.product-name')
    }

    Items() { 
        return cy.get('.cart-item')
    }

    GoToCart() {
        return cy.get('.view-cart-button')
    }

    MiniCart() {
        return cy.get('.mini-cart')
    }

    MiniCartNumber() {
        return cy.get('.mini-cart-toggle-icon-number')
    }    

    ReviewUp() {
        return cy.get('.up')
    }

    ReviewDown() {
        return cy.get('.down')
    }

    MobileDownArrow() {
        return cy.get('.order-summary-toggle').eq(0)
    }

    EmptyCart() {
        return cy.get('.empty-cart')
    }

    EmptyCartMsg() {
        return cy.get('.empty-cart-details')
    }

    CustomizeNow() {
        return cy.get('.customize-now')
    }

    DesktopCustomizeNowLink() {
        return cy.get('.inverted.d-mobile-none')
    }

    MobileCustomizeNowLink() {
        return cy.get('.d-desk-tablet-none')
    }

    Upsells() {
        return cy.get('.upsells')
    }

    AddUpsellTickets() {
        return cy.get('.inverted.btn-add-to-itinerary')
    }

    UpsellStartDate() {
        return cy.get('.form-item.start-date')
    }

    UpsellNumberOfDays() {
        return cy.get('.form-item.number-of-days')
    }

    UpsellAges() {
        return cy.get('.form-item.people')
    }

    UpsellAgesDropdown() {
        return cy.get('.people-selector-wrapper')
    }

    UpsellNumberOfDaysDropdown() {
        return cy.get('.number-of-days-wrapper')
    }

    UpsellSelectorContainer() {
        return cy.get('.selector-container')
    }

    ItemAges() {
        return cy.get('.ages')
    }

    ItemPrice() {
        return cy.get('.price')
    }

    UpsellsSearchResult() {
        return cy.get('.message')
    }

    Trash() {
        return cy.get('.fal.fa-trash-alt')
    }

    PageHeader() {
        return cy.get('.page-header')
    }    

    ProductPrice() {
        return cy.get('.product-price')
    }

}

export default Cart