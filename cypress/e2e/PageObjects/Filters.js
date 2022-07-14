class Filters {

    LodgeName () {
        return cy.get('.filter-header')
    }

    MobileLodgeName() {
        return cy.get('.lodge-title')
    }

    CheckInOut() {
        return cy.get('.booking-section.dates')
    }

    Update() {
        return cy.get('.apply-button')
    }

    Guests() {
        return cy.get('.booking-section.guests')
    }

    RoomTotal() {
        return cy.get('.room-total')
    }

    PricePerNight() {
        return cy.get('.booking-section.price')
    }

    PricePerNightView() {
        return cy.get('.price-select-wrapper')
    }

    MoreFilters() {
        return cy.get('.booking-section.more-filters.filter')
    }

    NextMonthArrow() {
        // return cy.get('.datepicker__next').eq(1)
        return cy.get('.datepicker__next')
    }

    NextMonthText() {
        // return cy.get('.datepicker__month').eq(1)
        return cy.get('.datepicker__month')
    }
    
    //Sep 12 - check in date
    CheckIn() {
        return cy.get('button[data-day="1662962400000"]')
    }

    //Sep 19 - check out date
    CheckOut() {
        return cy.get('button[data-day="1663567200000"]')
    }

    DecCheckOut() {
        return cy.get('button[data-day="1671433200000"]')
    }

    May22() {
        return cy.get('button[data-day="1653199200000"]')
    }

    Plus() {
        return cy.get('.control.plus')
    }

    Minus() {
        return cy.get('.control.minus')
    }

    NumberUnitsAvail() {
        return cy.get('.tabs-head')
    }
    
    MoreFiltersClear() {
        return cy.get('.clear-filters-link')
    }

    ViewResults() {
        return cy.get('.button.update.filters-results')
    }

    ClearFilters() {
        return cy.get('.clear-filters')
    }

    FiltersNumberApplied() {
        return cy.get('.selected-value').eq(1)
    }

    Widget() {
        return cy.get('.filter-booking')
    }

    FilterItem() {
        return cy.get('.filter-item')
    }

    FilteredNumber() {
        return cy.get('.filter-type-checked-counter.shown')
    }

    ProductsDate() {
        return cy.get('.filter-column.filter-date.datepicker')
    }

    DatePicker() {
        return cy.get('.datepicker__wrapper')
    }

    MobileFilters() {
        return cy.get('.filter-header.accordion-title')
    }

    Filter() {
        return cy.get('.filter-type-header-text')
    }

    CheckAvailability() {
        return cy.get('.button.search')
    }
    
    GuestsText() {
        return cy.get('.count')
    }

}

export default Filters