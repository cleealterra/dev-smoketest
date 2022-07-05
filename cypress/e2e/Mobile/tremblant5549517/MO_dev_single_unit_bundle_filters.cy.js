/// <reference types="Cypress" />

import Bundles from "../../PageObjects/Bundles"
import Cart from "../../PageObjects/Cart"
import HomePage from "../../PageObjects/HomePage"
import Filters from "../../PageObjects/Filters"
import Lodge from "../../PageObjects/Lodge"



Cypress.on('uncaught:exception', (err, runnable) => {
    // returning false here prevents Cypress from
    // failing the test
    return false
})

// const uatsingle=new UatSingle
const lodge=new Lodge

const homepage = new HomePage
const filters=new Filters
const bundles=new Bundles
const cart=new Cart

const lodgeName = 'Test Single'
const oneBedroom = '1 Bedroom/1 Bathroom  - Sample Hotel'
const newDateUrl = 'https://tremblant-sc10-dev.alterramtnco.dev/plan/hotels-condos/sommet-single?arrivaldate=09/12/2022&departuredate=09/19/2022&Adult=2&Child=0'
const fourAdultThree = 'https://tremblant-sc10-dev.alterramtnco.dev/plan/hotels-condos/sommet-single?arrivaldate=08/09/2022&departuredate=08/12/2022&Adult=4&Child=3'
const baseuUrl = 'https://tremblant-sc10-dev.alterramtnco.dev/plan/hotels-condos/sommet-single?arrivaldate=08/09/2022&departuredate=08/12/2022&Adult=2&Child=0'

const totalNights = 'Total (3 nights):'
const newTotalNights = 'Total (7 nights):'
const totalPrice = '$300.00'
const newTotalPrice = '$700.00'

//Mobile - Inntopia Single Unit Filters

beforeEach(() => {

    cy.viewport('iphone-xr')
    lodge.TRSingleUnitDev()

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

    // Cypress._.times(3, () => {

    // break this into more test cases in Test Rail
    it('C29865 & C29868 Mobile Verify Name in Filter + Open all filters + Book Now (bundle)', () => {

        // Verify Name of the Lodge on the Filter
         filters.MobileLodgeName().should('include.text', lodgeName)

        // Open Check in/out filter
        filters.CheckInOut().click()

        // Verify 'update' button is enabled
        filters.Update().contains('Update').should('be.enabled')
            // cy.wait(2500)

        // Open 'Guests' filter 
        filters.Widget().contains('Guests:').click()

        // Verify 'update' button is enabled
        filters.Update().contains('Update').should('be.enabled')

        // 'Book Now' from the Widget
        // cy.get('.button.book-now').eq(0).click()
        lodge.BookLodge().eq(1).click()

        // Bundles pop up should be displayed
        cy.get('.inntopia-bundles' , {timeout: 60000}).should('be.visible')

        // Click on 'Resort Lunch Voucher'
        bundles.BundleOption().contains('Resort Lunch Voucher').click()

        // Verify the selected option is found on Review Add-Ons
        bundles.ReviewAddOns().should('include.text', 'Resort Lunch Voucher')

        // Click on 'Next Step'
        bundles.NextStep().eq(0).click()
            // cy.wait(1500)
            
        //STEP2 added July 5

        // click on No Thanks button
        bundles.NoThanks().eq(1).click()

        // Click on 'Next Step'
        bundles.NextStep().eq(1).click()    

        // Verify the selected option is found on Review Add-Ons
        bundles.ReviewAddOns().should('include.text', 'Resort Lunch Voucher')
            .should('be.visible')

        // Add to Cart from Bundles
        bundles.AddToCart().click()
            cy.wait(5000)

        // Mobile Down arrow on mini cart
        cy.get('.mini-cart-container', {timeout: 30000}).should('be.visible')  
        cart.MobileDownArrow().click()
        cy.get('.cart-item', {timeout: 30000}).should('be.visible')  

        // Verify mini cart 
        cart.Items().should('include.text', 'Resort Lunch Voucher')
            .should('include.text', oneBedroom)     

        // Go to Cart Page
        cart.GoToCart().click()
        cy.wait(3500)
        cy.get('.cart-item', {timeout: 30000}).should('be.visible')  
        
        // Verify  cart 
        cart.Items().should('include.text', 'Resort Lunch Voucher')
            .should('include.text', oneBedroom)   

        // Verify the product name is found on the mini cart
        //cy.get('.product-name').should('include.text', lodgeName)
        cart.MinicartProductName().should('include.text', '1 Bedroom/1 Bathroom  - Sample Hotel' )
            .should('include.text', oneBedroom)
            //     cy.wait(2500).then(() => {
            //     cy.log('Open all filters + Book Now (with bundles Test Complete')
            // })             
            
    })


    it('C29922 Mobile - cancel bundles pop up on Book Now', () => {

        // 'Book Now' from the Widget
       lodge.BookLodge().eq(1).click()

       // Bundles pop up should be displayed
       cy.get('.inntopia-bundles' , {timeout: 60000}).should('be.visible')

       cart.ReviewUp().click()
        //    cy.wait(1500)        

       // Click on 'Cancel and exit' from the bundles
       bundles.Cancel().click()
        //    cy.wait(1500)     

       // Click on 'mini cart' to open 
       cart.MiniCart().click()

       // Verify mini cart reads Emty Cart
       cart.EmptyCart().should('include.text', 'Empty Cart')

       // Verify verbiage on the mini cart when it's empty
       cart.EmptyCartMsg().should('include.text', "There's nothing in your cart")        
       
   })        

    // test rail C29680 https://alterramtnco.testrail.io/index.php?/cases/view/29680    
    it('C29866 Mobile - Change Check in/out dates', () => {

        // Open Check in/out filter
        // filters.Widget().contains('Check in/out:').click()
        filters.CheckInOut().click()

        // Click on '>' to go to month of May
        //cy.get('.datepicker__next').eq(0).click({force: true})
        filters.NextMonthArrow().eq(0).click()

        // Click on the date
        //cy.get('button[data-day="1650952800000"]').click()
        filters.CheckIn().click()

        // select future date
        //cy.get('button[data-dayå="1651212000000"]').click()
        filters.CheckOut().eq(0).click()
            cy.wait(1500)
        
        // Verify 'update' button is enabled
        filters.Update().contains('Update').click()
            .then(() => {
                cy.url().should('eq', newDateUrl)
            })    
        
    })

    // test rail C29681 https://alterramtnco.testrail.io/index.php?/cases/view/29681
    it('C29867 Mobile - Change Guests items', () => {

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
            .then(() => {
                cy.url().should('eq', baseuUrl)
            })
        
    })

    it('C29869 Mobile - Total nights and total price', () => {

        // cy.get('.room-total')
        filters.RoomTotal()
            .should('include.text', totalNights )
            .and('include.text', totalPrice)

        // Open Check in/out filter
        // filters.Widget().contains('Check in/out:').click()
        filters.CheckInOut().click()

        // Click on '>' to go to month of May
        //cy.get('.datepicker__next').eq(0).click({force: true})
        filters.NextMonthArrow().eq(0).click()

        // Click on May 26 - check in date
        //cy.get('button[data-day="1650952800000"]').click()
        filters.CheckIn().click()

        // Click on May 31 - check out date
        // cy.get('button[data-day="1653976800000"]').eq(0).click()
        filters.CheckOut().eq(0).click()
            // cy.wait(1500)
        
        // Verify 'update' button is enabled
        filters.Update().contains('Update').click()

        // verify the changes
        // cy.get('.room-total')
        filters.RoomTotal()
            .should('include.text', newTotalNights )
            .and('include.text', newTotalPrice )        
        
    })

    it('C29870 Mobile - Updating Results and spinning wheel Search for New Check in/out', () => {

        // Open Check in/out filter
        // filters.Widget().contains('Check in/out:').click()
        filters.CheckInOut().click()

        // Click on '>' to go to month of May
        //cy.get('.datepicker__next').eq(0).click({force: true})
        filters.NextMonthArrow().eq(0).click()

        // Click on the date
        //cy.get('button[data-day="1650952800000"]').click()
        filters.CheckIn().click()

        // select future date
        //cy.get('button[data-dayå="1651212000000"]').click()
        filters.CheckOut().eq(0).click()
            // cy.wait(1500)
        
        // Verify 'update' button is enabled
        filters.Update().contains('Update').click()

        // check for the text and the spinner during the search
        cy.get('.searching-text').should('include.text', 'Updating Results...')
        cy.get('.loading-spinner').should('exist')    

        
    })
    
    // }) //for repeat5

})
