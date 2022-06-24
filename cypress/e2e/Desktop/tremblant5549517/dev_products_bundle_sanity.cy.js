/// <reference types="Cypress" />

import Bundles from "../../PageObjects/Bundles"
import Cart from "../../PageObjects/Cart"
import Products from "../../PageObjects/Products"
import Filters from "../../PageObjects/Filters"

Cypress.on('uncaught:exception', (err, runnable) => {
    // returning false here prevents Cypress from
    // failing the test
    return false
})

const bundles=new Bundles
const products=new Products
const cart=new Cart
const filters=new Filters

const FutureMonth = '8'  //this is for Sept
const productsFutureDate = 'https://tremblant-sc10-dev.alterramtnco.dev/plan/products#filters=start-date:2022-9-19'

beforeEach(() => {
    
    cy.viewport('macbook-13')
    products.TRActivityDated()
        // cy.wait(500)

    // // Close the Alert
    // homepage.Alert().click()        

    // // cy.get('.loading-spinner').should('be.visible')
    // cy.get('.loading-spinner').should('not.be.visible')
        cy.wait(3500)    
        cy.get('.loading-spinner', {timeout: 60000}).should('not.be.visible')

    // if Alert is opened, then close it
    cy.get('body').then(($ele) => {
        if ($ele.find('.alerts.unread-others.opened').length > 0) {
            cy.get('.alerts-toggle').click()
        // } else {
        //     //Do Something
        }
    })

})

describe('Add to cart', () => {

    // Cypress._.times(3, () => {

    it('C29758 Add To Cart with bundles', () => {
        
        // Click on fifth 'Add to Cart' button (5 Day - Junior Snowboard Package Rental)
        products.AddToCart().eq(4).click()

        // Bundles pop up should be visible
        cy.get('.inntopia-bundles', {timeout: 60000}).should('be.visible')

        // Verify 'Add To Cart' is disabled prior to completing Step 5
        bundles.AddToCart().should('be.disabled')

        //Bundles pop up
        //STEP1

        // Verify 'Next Step' button from Step 1 is not visible
        bundles.NextStep().eq(0).should('not.be.visible')

        //Click on 'Rental Pick up time - 10 am' from Step 1
        bundles.BundleOption().contains('Rental Pick up time - 10 am').click()
        
        // Verify 'Next Step' button is now visible
        bundles.NextStep().eq(0).should('be.visible')
        
        // Verify the selected option is found on Review Add-Ons
        bundles.ReviewAddOns().should('include.text', 'Rental Pick up time - 10 am')
            .should('be.visible')

        // Click on 'Next Step'
        bundles.NextStep().eq(0).click()

        // Prior to moving onto next step, verify Review Add-Ons
        bundles.ReviewAddOns().should('include.text', 'Rental Pick up time - 10 am')
            .should('be.visible')


        //STEP2

        //Click on 'Child Helmet - 5 days'
        bundles.BundleOption().contains('Child Helmet - 5 days').click()
        
        //Verify 'Next Step' button is now visible
        bundles.NextStep().eq(1).should('be.visible')

        //Verify the selected option is found on Review Add-Ons
        bundles.ReviewAddOns().should('include.text', 'Child Helmet - 5 days')
            .should('be.visible')
        
        //Click on 'Next Step'
        bundles.NextStep().eq(1).click()

        //Check Review Add-ons should include all items
        bundles.ReviewAddOns().should('include.text', 'Rental Pick up time - 10 am')
            .should('be.visible')
        bundles.ReviewAddOns().should('include.text', 'Child Helmet - 5 days')
            .should('be.visible')

        //STEP3

        //Click on 'Damage Insurance'
        bundles.BundleOption().contains('Damage Insurance').click()
        
        //Verify 'Next Step' button is now visible
        bundles.NextStep().eq(2).should('be.visible')

        //Verify the selected option is found on Review Add-Ons
        bundles.ReviewAddOns().should('include.text', 'Damage Insurance')
            .should('be.visible')

        //Click on 'Next Step'
        bundles.NextStep().eq(2).click()

        //Check Review Add-ons should include all items
        bundles.ReviewAddOns().should('include.text', 'Rental Pick up time - 10 am')
            .should('be.visible')
        bundles.ReviewAddOns().should('include.text', 'Child Helmet - 5 days')
            .should('be.visible')
        bundles.ReviewAddOns().should('include.text', 'Damage Insurance')
            .should('be.visible')

        // STEP4 MORE OPTIONS button

        // //Verify 'No Thanks' option is not visible
        // cy.get('.no-option.hide').should('not.be.visible')

        // //Verify 'More Options' there
        // //cy.get('.more-options-button').should('be.visible')
        // bundles.MoreOptions().should('be.visible').click()

        // // After clicking 'More Options', No Thanks option is now seen
        // cy.get('.no-option.hide').scrollIntoView().should('be.visible').click()

        //Click on 'Junior Lift Ticket - 1 day'
        bundles.BundleOption().contains('Junior Lift Ticket - 1 day').click()

        //Verify the selected option is found on Review Add-Ons
        bundles.ReviewAddOns().should('include.text', 'Junior Lift Ticket - 1 day')

        //Click on 'Junior Lift Ticket - 2 day'
        bundles.BundleOption().contains('Junior Lift Ticket - 2 day').click()

        //Verify the selected option is found on Review Add-Ons
        bundles.ReviewAddOns().should('include.text', 'Junior Lift Ticket - 2 day')


        // if 'more option' is there, then close it
        cy.get('body').then(($ele) => {
            if ($ele.find('.more-options-button').length > 0) {
                cy.get('.more-options-button').click()
            // } else {
            //     //Do Something
            }
        })

        //Click on 'Junior Lift Ticket - 3 day'
        bundles.BundleOption().contains('Junior Lift Ticket - 3 day').click()

        //Verify the selected option is found on Review Add-Ons
        bundles.ReviewAddOns().should('include.text', 'Junior Lift Ticket - 3 day')

        //Click on 'Next Step'
        bundles.NextStep().eq(3).click()

        //Check Review Add-ons should include all items
        bundles.ReviewAddOns().should('include.text', 'Rental Pick up time - 10 am')
            .should('be.visible')
        bundles.ReviewAddOns().should('include.text', 'Child Helmet - 5 days')
            .should('be.visible')
        bundles.ReviewAddOns().should('include.text', 'Damage Insurance')
            .should('be.visible')
        bundles.ReviewAddOns().should('include.text', 'Junior Lift Ticket - 1 day')
            .should('be.visible')
        bundles.ReviewAddOns().should('include.text', 'Junior Lift Ticket - 2 day')
            .should('be.visible')
        bundles.ReviewAddOns().should('include.text', 'Junior Lift Ticket - 3 day')
            .should('be.visible')

        // Verify 'Add To Cart' is disabled prior to completing Step 5
        bundles.AddToCart().should('be.disabled')

        //Step 5

        //Click on 'Resort Lunch Voucher'
        bundles.BundleOption().contains('Resort Lunch Voucher').click()

        //Verify the selected option is found on Review Add-Ons
        bundles.ReviewAddOns().should('include.text', 'Resort Lunch Voucher')

        //Click on 'Next Step'
        bundles.NextStep().eq(4).click()
            // cy.wait(1500)
        
        //Check Review Add-ons should include all items
        bundles.ReviewAddOns().should('include.text', 'Rental Pick up time - 10 am')
            .should('be.visible')
        bundles.ReviewAddOns().should('include.text', 'Child Helmet - 5 days')
            .should('be.visible')
        bundles.ReviewAddOns().should('include.text', 'Damage Insurance')
            .should('be.visible')
        bundles.ReviewAddOns().should('include.text', 'Junior Lift Ticket - 1 day')
            .should('be.visible')
        bundles.ReviewAddOns().should('include.text', 'Junior Lift Ticket - 2 day')
            .should('be.visible')
        bundles.ReviewAddOns().should('include.text', 'Junior Lift Ticket - 3 day')
            .should('be.visible')
        bundles.ReviewAddOns().should('include.text', 'Resort Lunch Voucher')
            .should('be.visible')
    
        //Add to Cart from Bundles
        bundles.AddToCart().click()
        cart.Items({timeout: 10000}).should('be.visible')
            // cy.wait(2000)


        //Verify mini cart 
        //cy.get('.cart-item').should('include.text', 'Junior Lift Ticket - 2 day')
        cart.Items().should('include.text', 'Junior Lift Ticket - 2 day')
                .should('be.visible')
            .should('include.text', 'Rental Pick up time - 10 am')
                .should('be.visible')
            .should('include.text', 'Child Helmet - 5 days')  
                .should('be.visible')
            .should('include.text', 'Junior Lift Ticket - 1 day')
                .should('be.visible')
            .should('include.text', 'Junior Lift Ticket - 2 day')
                .should('be.visible')
            .should('include.text', 'Junior Lift Ticket - 3 day')
                .should('be.visible')
            .should('include.text', 'Resort Lunch Voucher')
                .should('be.visible')

        //Go to Cart Page
        cart.GoToCart().click()
        cart.Items({timeout: 10000}).should('be.visible')

        // if Alert is opened, then close it
        cy.get('body').then(($ele) => {
            if ($ele.find('.alerts.unread-others.opened').length > 0) {
                cy.get('.alerts-toggle').click()
            // } else {
            //     //Do Something
            }
        })     

        //Verify the title is Cart
        cy.title().should('eq', 'Cart')
            cy.wait(1000)

        //Verify cart 
        //cy.get('.cart-item').should('include.text', 'Junior Lift Ticket - 2 day')
        cart.Items().should('include.text', 'Junior Lift Ticket - 2 day')
            .should('be.visible')
        .should('include.text', 'Rental Pick up time - 10 am')
            .should('be.visible')
        .should('include.text', 'Child Helmet - 5 days')  
            .should('be.visible')
        .should('include.text', 'Junior Lift Ticket - 1 day')
            .should('be.visible')
        .should('include.text', 'Junior Lift Ticket - 2 day')
            .should('be.visible')
        .should('include.text', 'Junior Lift Ticket - 3 day')
            .should('be.visible')
        .should('include.text', 'Resort Lunch Voucher')
            .should('be.visible')     

        // Proceed to Checkout
        cart.GoToCart().eq(1).click()

        // Verify the handoff to inntopia by checking the URL
        cy.url().should('eq', 'https://reservations.tremblant.ca/ecomm/Checkout/Customer/5549517')


    })

    it('C29759 cancel bundles pop up on Add To Cart', () => {

        // Click on fifth 'Add to Cart' button (5 Day - Junior Snowboard Package Rental)
        products.AddToCart().eq(4).click()
        // cy.wait(2000)

        // Bundles pop up should be visible
        cy.get('.inntopia-bundles', {timeout: 60000}).should('be.visible')

        // Click on 'Cancel and exit' from the bundles
        bundles.Cancel().click()
            // cy.wait(3000)

        // Click on 'mini cart' to open 
        cart.MiniCart().click()

        // Verify mini cart reads Emty Cart
        cart.EmptyCart().should('include.text', 'Empty Cart')

        // Verify verbiage on the mini cart when it's empty
        cart.EmptyCartMsg().should('include.text', "There's nothing in your cart")

    })

    it('C29761 able to click on more details button', () => {
        
        // Click on 'More Details' button    
        products.DetailsButton().eq(0).click()

        // Verify the button by checking the URL
        cy.title().should('eq', 'Adult Ski Lessons')

    })

    it('C29768 update the date', () => {
        
        // Verify the Calendar is not displayed
        filters.DatePicker().should('not.be.visible')

        // Click on 'Date' to open date picker
        filters.ProductsDate().scrollIntoView()
            .click()

        // Verify the Calendar is now displayed
        filters.DatePicker().should('be.visible')

        // Click on > to go to the next month
        filters.NextMonthArrow().eq(1).click()

        // Verify September has been chosen
        filters.NextMonthText().eq(0).should('have.value', FutureMonth) 

        // Click on May 29 - check out date
        filters.CheckOut().eq(0).click()

        // Visual check
        filters.ProductsDate().scrollIntoView()

        // Click on 'Search' button
        filters.Update().click()
        // cy.wait(10000)

        cy.get('.loading-spinner').should('be.visible')
        cy.get('.loading-spinner').should('not.be.visible')
            cy.wait(500)
    
        // Verify by URL
        cy.url().should('eq', productsFutureDate)

        // Click on fifth 'Add to Cart' button (5 Day - Junior Snowboard Package Rental)
        products.AddToCart().eq(4).click()
        // cy.wait(5000)

        // Bundles pop up should be visible
        cy.get('.inntopia-bundles', {timeout: 60000}).should('be.visible')

    })

    it('C29771 shows correct mini cart icon number', () => {
        
        // Click on fifth 'Add to Cart' button (1 Day - Junior Snowboard Package Rental)
        products.AddToCart().eq(0).click()
    
        // Bundles pop up should be visible
        cy.get('.inntopia-bundles', {timeout: 60000}).should('be.visible')

        //Bundles pop up
        //STEP1

        //Click on 'Resort Lunch Voucher' from Step 1
        bundles.BundleOption().contains('Resort Lunch Voucher').click()
        
        // Verify 'Next Step' button is now visible
        bundles.NextStep().eq(0).should('be.visible')
        
        // Verify the selected option is found on Review Add-Ons
        bundles.ReviewAddOns().should('include.text', 'Resort Lunch Voucher')
            .should('be.visible')

        // Click on 'Next Step'
        bundles.NextStep().eq(0).click()     
        
        // //STEP2

        // // click on No Thanks button
        // bundles.NoThanks().click()

        // // Click on 'Next Step'
        // bundles.NextStep().eq(1).click()    
        
        //Add to Cart from Bundles
        bundles.AddToCart().click()
        cart.Items({timeout: 10000}).should('be.visible')
            // cy.wait(2000)

        //Verify mini cart 
        cart.Items().should('include.text', 'Resort Lunch Voucher')
                .should('be.visible')

        // cy.get('.mini-cart-toggle-icon-number')
        cart.MiniCartNumber()
            .should('have.text', '2')   
            
        // click on Trash
        cart.Trash().click()   
            // cy.wait(3500)         

        // should be 0
        cart.MiniCartNumber()
        .should('have.text', '0')                       

        })   
    
    it('C29825 Updating Results and spinning wheel on a date search', () => {
        
        // Verify the Calendar is not displayed
        filters.DatePicker().should('not.be.visible')

        // Click on 'Date' to open date picker
        filters.ProductsDate().scrollIntoView()
            .click()

        // Verify the Calendar is now displayed
        filters.DatePicker().should('be.visible')

        // Click on > to go to the next month
        filters.NextMonthArrow().eq(1).click()
	
        // Verify September has been chosen
        filters.NextMonthText().eq(0).should('have.value', FutureMonth)  

        // Click on Sept 19 - check out date
        filters.CheckOut().eq(0).click()

        // Click on 'Search' button
        filters.Update().click()            

        // check for the text and the spinner during the search
        cy.get('.searching-text').should('include.text', 'Updating Results...')
        cy.get('.loading-spinner').should('exist')    

    })

    // // }) //for repeat5    

}) 
