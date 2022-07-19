/// <reference types="Cypress" />

import Lodge from "../../PageObjects/Lodge"
import Filters from "../../PageObjects/Filters"


Cypress.on('uncaught:exception', (err, runnable) => {
    // returning false here prevents Cypress from
    // failing the test
    return false
})

const lodge=new Lodge
const filters=new Filters

const lodgeName = 'Test Multi'
const newDateUrl = 'https://tremblant-sc10-dev.alterramtnco.dev/plan/hotels-condos/sommet-multi?arrivaldate=09/12/2022&departuredate=09/19/2022&Adult=2&Child=0'
const fourAdultThree = 'https://tremblant-sc10-dev.alterramtnco.dev/plan/hotels-condos/sommet-multi?arrivaldate=08/09/2022&departuredate=08/12/2022&Adult=4&Child=3'
const baseUrl = 'https://tremblant-sc10-dev.alterramtnco.dev/plan/hotels-condos/sommet-multi?arrivaldate=08/09/2022&departuredate=08/12/2022&Adult=2&Child=0'

beforeEach(() => {
    cy.viewport('macbook-13')
    lodge.TRMultiUnitDev()

    // Wait for page to load
    cy.get('.availability-links', {timeout: 60000}).should('be.visible')

    // if Alert is opened, then close it
    cy.get('body').then(($ele) => {
        if ($ele.find('.alerts.unread-others.opened').length > 0) {
            cy.get('.alerts-toggle').click()
        // } else {
        //     //Do Something
        }
    }) 
    
})

describe('Filters', () => {

    // Cypress._.times(5, () => {
 
    it('C29735 Open all filters', () => {

        // Verify Lodge Name on the filter
        filters.LodgeName().eq(0).should('include.text', lodgeName)

        // Open Check in/out filter
        filters.CheckInOut().click()

        // Verify 'update' button is enabled
        // filters.Update().contains('Update').should('be.enabled')
        filters.CheckAvailability().eq(0).should('be.enabled')

        // Open 'Guests' filter 
        filters.Guests().click()    

        // Verify 'update' button is enabled
        // filters.Update().contains('Update').should('be.enabled')
        filters.CheckAvailability().eq(1).should('be.enabled')
        
        // Open 'Price per night' filter 
        filters.PricePerNight().click()

        // Verify the price range slider did open
        filters.PricePerNightView().should('be.visible')

        // Open 'More Filter' 
        filters.MoreFilters().click()

        // Verify 'View Results' button is enabled
        filters.Update().contains('Results').should('be.visible')

    })

    // C29736
    it('C29736 Search for New Check in/out', () => {
        
        // Open Check in/out filter
        filters.CheckInOut().click()

        // Click on '>' to go to month of May
        filters.NextMonthArrow().eq(1).click()


        // Click on May 26 - check in date
        filters.CheckIn().click()

        // Click on May 29 - check out date
        filters.CheckOut().eq(0).click()
        
        // Verify 'update' button is enabled
        filters.CheckAvailability().eq(0).click()
            .then(() => {
                cy.url().should('eq', newDateUrl)
            })    
            // cy.wait(3500)

        // cy.get('.searching-text').should('include.text', 'Updating Results...')
        // cy.get('.loading-spinner').should('exist')

    })

    // C29737
    it('C29737 Guests filter', () => {
        
        // Open 'Guests' filter 
        // filters.Widget().contains('Guests:').click()
        filters.Guests().click()
        
        // Add 2 more Adults
        filters.Plus().eq(0).dblclick()

        //to add 3 kids
        for(let n = 0; n < 3; n ++) {
            filters.Plus().eq(1).click()
        }

        // Verify 'update' button is enabled
        filters.CheckAvailability().eq(1).click()
            .then(() => {
                cy.url().should('eq', fourAdultThree)
            })    

        // Open 'Guests' filter 
        filters.Widget().contains('Guests:').click()

        // Subtract 2 adults
        filters.Minus().eq(0).dblclick()

        // Remove 3 kids
        for(let n = 0; n < 3; n ++) {
            filters.Minus().eq(1).click()
        }

        // Click on Update and verify by URL
        filters.CheckAvailability().eq(1).click()
            .then(() => {
                cy.url().should('eq', baseUrl)
            })        

    })

    // C29738
    it('C29738 Price per night change', () => {
        
        lodge.AvailabilityRoomType().should('include.text', '1 Bedroom')
            .and('include.text', '2 Bedroom')
            .and('include.text', '3 Bedroom')        

        //Open 'Price per night' filter 
        filters.Widget().contains('Price per night:').click()

        //** I can move the slider, but can't update the result
        for(let n = 0; n < 115; n ++) {
            cy.get('.slider.max').eq(0).type('{leftarrow}').trigger('change')
            //filters.Plus().eq(1).click()
            // cy.get('.handle').eq(3).click()
        }

        // cy.get('.slider.max').click({ multiple: true })  
        cy.get('.slider.max').eq(0).click()

        lodge.AvailabilityRoomType().should('include.text', '1 Bedroom')
            .and('include.text', '2 Bedroom')
            .and('not.include.text', '3 Bedroom')         

    })

    // C29739
    it('C29739 More Filters', () => {

        // Open 'More Filters' 
        filters.MoreFilters().click()

        lodge.AvailabilityRoomType().should('include.text', '1 Bedroom')
            .and('include.text', '2 Bedroom')
            .and('include.text', '3 Bedroom')

        // Click on items 
        filters.FilterItem().eq(0).click()
        // cy.get('.filter-item[data-key="Cable television"]').click()
        // cy.get('.filter-item[data-key="Wireless internet connection"]').click()
        // cy.get('.filter-item[data-key="Full kitchen"]').click()
        
        // Verify that now only '1 Unit Available' is seen
        filters.NumberUnitsAvail().should('include.text', '1 Unit Available')

        //Verify the 'View Results' have the correct number 1
        filters.ViewResults().should('have.text', 'View Results (1)')

        //Verify '1 applied' is displayed on the widget as well
        filters.FiltersNumberApplied().should('have.text', '1 Applied')

        // verify only '2 Bedroom' availability link is available 
        lodge.AvailabilityRoomType().should('not.include.text', '1 Bedroom')
            .should('not.include.text', '3 Bedroom')
            .and('include.text', '2 Bedroom')

    }) 

    // C29740
    it('C29740 More Filters, clear filters button work', () => {
        
        lodge.AvailabilityRoomType().should('include.text', '1 Bedroom')
            .and('include.text', '2 Bedroom')
            .and('include.text', '3 Bedroom')

        //Open 'More Filters' 
        filters.MoreFilters().click()

        //Click on items 
        filters.FilterItem().eq(0).click()
        // cy.get('.filter-item[data-key="Cable television"]').click()
        // cy.get('.filter-item[data-key="Wireless internet connection"]').click()
        // cy.get('.filter-item[data-key="Full kitchen"]').click()

        //'Clear Filters' should clear results
        filters.MoreFiltersClear().click()

        // Verify that now only '3 Units Available' is seen
        filters.NumberUnitsAvail().should('include.text', '3 Units Available')

        lodge.AvailabilityRoomType().should('include.text', '1 Bedroom')
            .and('include.text', '2 Bedroom')
            .and('include.text', '3 Bedroom')        
    }) 

    // C29821	
    it('C29821 Updating Results and spinning wheel on a date search', () => {
        
        // Open Check in/out filter
        filters.CheckInOut().click()

        // Click on '>' to go to month of May
        filters.NextMonthArrow().eq(1).click()


        // Click on May 26 - check in date
        filters.CheckIn().click()

        // Click on May 29 - check out date
        filters.CheckOut().eq(0).click()
        
        // Verify 'update' button is enabled
        filters.CheckAvailability().eq(0).click()

        // check for the text and the spinner during the search
        cy.get('.searching-text').should('include.text', 'Updating Results...')
        cy.get('.loading-spinner').should('exist')

    })    

    // // }) //for repeat5    
    
}) 
