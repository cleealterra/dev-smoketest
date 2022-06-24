class HomePage {

    //"Lessons" Widget using 'test product' with bundles
    StrattonHome() {
        cy.visit('https://stratton-dev.alterramtnco.dev/')
    }

    sc10StrattonHome() {
        cy.visit('https://stratton-sc10-uat-content.alterramtnco.dev/')
    }
	
    StrattonUatHome() {
        cy.visit('https://stratton-uat-content.alterramtnco.dev/')
    }

    Alert() {
        return cy.get('.alerts-toggle')
    }

    Lessons() {
        return cy.get('[data-value="Lessons"]')
    }

    Rentals() {
        return cy.get('[data-value="Rentals"]')
    }

    Find() {
        return cy.get('.button.default.button-cta.default-button.submit')
    }

    HeroLodgeCheckIn() {
        return cy.get('.booking-option.date-selector.checkin-date')
    }

    //26th 
    LodgeCheckInDate() {
        return cy.get('[data-pika-day="12"]')
    }

    //30th 
    LodgeCheckOutDate() {
        return cy.get('[data-pika-day="10"]')
    }

    // sept 12
    ProductFutureDate() {
        return cy.get('button[data-day="1662962400000"]')
    }

    HeroLodgeNextMonth() {
        return cy.get('.pika-next')
    }

    HeroFilterLabel() {
        return cy.get('.booking-option-label')
    }

    HeroFilterPlus() {
        return cy.get('.control.plus')
    }

    HeroFilterMinus() {
        return cy.get('.control.minus')
    }

    HeroWidgetWrapper() {
        return cy.get('.hero-booking-widget-wrapper-v2')
    }

    MobileAdults() {
        return cy.get("[aria-label='adults']")
    }

    MobileKids() {
        return cy.get('[aria-label="kids"]')
    }



}

export default HomePage