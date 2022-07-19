/// <reference types="Cypress" />

import Bundles from "../../PageObjects/Bundles"
import Cart from "../../PageObjects/Cart"
import HomePage from "../../PageObjects/HomePage"
import Products from "../../PageObjects/Products"
import Filters from "../../PageObjects/Filters"
import Lodge from "../../PageObjects/Lodge"


Cypress.on('uncaught:exception', (err, runnable) => {
    // returning false here prevents Cypress from
    // failing the test
    return false
})

const lodge=new Lodge
const filters=new Filters
const homepage = new HomePage

const lodgeName = 'Test Multi'
const newDateUrl = 'https://tremblant-sc10-dev.alterramtnco.dev/plan/hotels-condos/sommet-multi?arrivaldate=09/12/2022&departuredate=09/19/2022&Adult=2&Child=0'
const fourAdultThree = 'https://tremblant-sc10-dev.alterramtnco.dev/plan/hotels-condos/sommet-multi?arrivaldate=08/09/2022&departuredate=08/12/2022&Adult=4&Child=3'
const baseUrl = 'https://tremblant-sc10-dev.alterramtnco.dev/plan/hotels-condos/sommet-multi?arrivaldate=08/09/2022&departuredate=08/12/2022&Adult=2&Child=0'

const oneBedroom = "1 Bedroom"
const twoBedroom = "2 Bedroom"
const threeBedroom = "3 Bedroom"


beforeEach(() => {

    cy.viewport('iphone-xr')
    lodge.TRMultiUnitDev()

    //Wait for 'Packages' button to be visible (to page to load)
    // lodge.Packages( {timeout: 50000}).should('be.visible')
    cy.get('.availability-option', {timeout: 60000}).should('be.visible')


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

    // Cypress._.times(3, () => {

    it('C29900 Verify Name in Filter + Open all filters', () => {

        // Verify Name of the Lodge on the Filter
        filters.MobileLodgeName().should('include.text', lodgeName)
          
        // Open Check in/out filter
        filters.Widget().contains('Check in/out:').click()

        // Verify 'update' button is enabled
        filters.Update().contains('Update').should('be.enabled')

        // Open 'Guests' filter 
        filters.Widget().contains('Guests:').click()

        // Verify 'update' button is enabled
        filters.Update().contains('Update').should('be.enabled')

        // Open 'More Filter' 
        filters.MoreFilters().click()

        // Verify 'View Results' button is enabled
        filters.Update().contains('Results').should('be.visible')

    })

    it('C29901 Mobile - Change Check in/out dates', () => {

        //Open Check in/out filter
        filters.CheckInOut().click()

        //Click on '>' (twice on mobile) to go to month of May
        // filters.NextMonthArrow().eq(1).click({force: true})
        filters.NextMonthArrow().eq(0).click()

        //Click on May 26 - check in date
        filters.CheckIn().click()

        //Click on May 29 - check out date
        filters.CheckOut().eq(0).click()

        // Verify 'update' button by checking the URL
        filters.Update().contains('Update').click()
            .then(() => {
                cy.url().should('eq', newDateUrl)
            })
    })

    it('C29902 Mobile - Change Guests items ', () => {

        // Open 'Guests' filter 
        filters.Widget().contains('Guests:').click()
        
        // Add 2 more Adults
        filters.Plus().eq(0).dblclick()

        // Add 3 kids
        for(let n = 0; n < 3; n ++) {
            filters.Plus().eq(1).click()
        }

        // Verify 'update' button is enabled
        filters.CheckAvailability().eq(1).click()

        // Verify by URL 
        cy.url().should('eq', fourAdultThree)

        // Open 'Guests' filter 
        filters.Widget().contains('Guests:').click()

        // Subtract 2 adults
        filters.Minus().eq(0).dblclick()

        // Remove 3 kids
        for(let n = 0; n < 3; n ++) {
            filters.Minus().eq(1).click()
        }

        // Verify 'update' button is enabled
        filters.CheckAvailability().eq(1).click()

        // Verify by checking the URL
        cy.url().should('eq', baseUrl)
        
    })

    it('C29903 Mobile - able to select options from More Filters ', () => {

        // Verify by the name of the room
        lodge.RoomName().should('include.text', oneBedroom)

        // Open 'More Filters' 
        filters.MoreFilters().click()

        // Click on items 
        filters.FilterItem().eq(0).click()
        // cy.get('.filter-item[data-key="Cable television"]').click()
        // cy.get('.filter-item[data-key="Wireless internet connection"]').click()
        // cy.get('.filter-item[data-key="Full kitchen"]').click()

        //Verify the 'View Results' have the correct number 1
        filters.ViewResults().should('have.text', 'View Results (1)')      

        //Verify '2 applied' is displayed on the widget as well
        filters.FiltersNumberApplied().should('have.text', '1 Applied')    

        // click on View Results and visual check
        filters.ViewResults().click()
        cy.get('.room-name').eq(0).scrollIntoView({ offset: { top: -350, left: 0 } })    
    
        // Verify by the name of the room
        lodge.RoomName()
            .should('include.text', twoBedroom)        
        
    }) 

    it('C29904 Mobile - able to change Price per night from More Filters', () => {

        //Click on '2 Bedroom' to switch 
        lodge.AvailabilityOption().contains('1 Bedroom', { matchCase: false })
        lodge.AvailabilityOption().contains('2 Bedroom', { matchCase: false })
        lodge.AvailabilityOption().contains('3 Bedroom', { matchCase: false })

        // Open 'More Filters' 
        filters.MoreFilters().click()        

        //** I can move the slider, but can't update the result
        for(let n = 0; n < 115; n ++) {
            cy.get('.slider.max').eq(1).type('{leftarrow}').trigger('change')
            //filters.Plus().eq(1).click()
            // cy.get('.handle').eq(3).click()
        }

        // cy.get('.slider.max').click({ multiple: true })  
        cy.get('.slider.max').eq(1).click()

        // close 'More Filters' 
        filters.MoreFilters().click()
            // cy.wait(1000)            

        lodge.AvailabilityOption().contains('1 Bedroom', { matchCase: false }).click()

        lodge.AvailabilityOption().should('include.text', '1 Bedroom')
            .and('include.text', '2 Bedroom')
            .and('not.include.text', '3 Bedroom')             

    })

    it('C29905 Mobile - More Filters, clear filters button work ', () => {

        // Verify by the name of the room
        lodge.RoomName().should('include.text', oneBedroom)

        // Open 'More Filters' 
        filters.MoreFilters().click()

        // Click on items 
        filters.FilterItem().eq(0).click()

        // Verify by Text Change
        filters.ViewResults().should('have.text', 'View Results (1)')

        //Verify '1 applied' is displayed on the widget as well
        filters.FiltersNumberApplied().should('have.text', '1 Applied')   
        
        // click on View Results and visual check
        filters.ViewResults().click()   
        cy.get('.room-name').eq(0).scrollIntoView({ offset: { top: -350, left: 0 } })   
        
        // Verify by the name of the room
        lodge.RoomName()
            .should('include.text', twoBedroom)  
            
        // Open 'More Filters' 
        filters.MoreFilters().click()

        // 'Clear Filters' should clear results
        filters.MoreFiltersClear().click()  
        
        //Verify by Text Change
        filters.ViewResults().should('have.text', 'View Results (3)')        

    }) 
	
    it('C29906 Mobile - Updating Results and spinning wheel on a date search', () => {
        
        // Open Check in/out filter
        filters.CheckInOut().click()

        // Click on '>' to go to month of May
        filters.NextMonthArrow().eq(0).click()

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

    // C29738
    it('T132359 Price per night change', () => {
        
        lodge.AvailabilityOption().contains(oneBedroom) 
        lodge.AvailabilityOption().contains(twoBedroom) 
        lodge.AvailabilityOption().contains(threeBedroom) 

        // Open 'More Filter' 
        filters.MoreFilters().click()        

        //** I can move the slider, but can't update the result
        for(let n = 0; n < 115; n ++) {
            cy.get('.slider.max').eq(1).type('{leftarrow}').trigger('change')
            //filters.Plus().eq(1).click()
            // cy.get('.handle').eq(3).click()
        }

        // cy.get('.slider.max').click({ multiple: true })  
        cy.get('.slider.max').eq(1).click()
        
        // close 'More Filter' 
        filters.MoreFilters().click()          

        // Click on '1 Bedroom' to open the drop down menu
        lodge.AvailabilityMobile().click()
        
        lodge.AvailabilityOption().should('include.text', oneBedroom)
            .should('include.text', twoBedroom)
            .should('not.include.text', threeBedroom)

    })        

    // }) // repeat 5

})
