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


const cart=new Cart
const products=new Products
const homepage = new HomePage
const bundles=new Bundles
const filters=new Filters

const FutureMonth = '8'  //this is for Sept
const productsDetailsFutureDate = 'https://tremblant-sc10-dev.alterramtnco.dev/plan/products/adult-ski-lessons#filters=start-date:2022-9-19'

//Products Page with Bundles - Mobile Sanity test

beforeEach(() => {

    cy.viewport('iphone-xr')
    products.TRActivityDetailDated()
        cy.wait(5000)

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

        it('C29888 Mobile - Add To Cart from Details page ', () => {
    
        // Click on fifth 'Add to Cart' button (5 Day - Junior Snowboard Package Rental)
        products.AddToCart().eq(4).click()
            // cy.wait(1500)

        // Bundles pop up should be visible
        cy.get('.inntopia-bundles', {timeout: 60000}).should('be.visible')

        cart.ReviewUp().click()

        // Verify 'Add To Cart' is disabled prior to completing Step 5
        bundles.AddToCart().should('be.disabled')

        cart.ReviewDown().click()

        //STEP1

        // Verify 'Next Step' button from Step 1 is not visible
        bundles.NextStep().eq(0).should('not.be.visible')

        // Click on 'Rental Pick up time - 10 am' from Step 1
        bundles.BundleOption().contains('Rental Pick up time - 10 am').click()
        
        // Verify 'Next Step' button is now visible
        bundles.NextStep().eq(0).should('be.visible')

        cart.ReviewUp().click()
        
        // Verify 'Add To Cart' is disabled prior to completing Step 5
        bundles.AddToCart().should('be.disabled')
        
        //Verify the selected option is found on Review Add-Ons
        bundles.ReviewAddOns().should('include.text', 'Rental Pick up time - 10 am')
            .should('be.visible')    

        cart.ReviewDown().click()

        // Click on 'Next Step'
        bundles.NextStep().eq(0).click()


        // STEP2

        // Click on 'Child Helmet - 5 days'
        bundles.BundleOption().contains('Child Helmet - 5 days').click()
        
        // Verify 'Next Step' button is now visible
        bundles.NextStep().eq(1).should('be.visible')

        // Verify the selected option is found on Review Add-Ons
        bundles.ReviewAddOns().should('include.text', 'Child Helmet - 5 days')

        //Click on 'Next Step'
        bundles.NextStep().eq(1).click()

        cart.ReviewUp().click()

        // Verify 'Add To Cart' is disabled prior to completing Step 5
        bundles.AddToCart().should('be.disabled')

        //Check Review Add-ons should include all items
        bundles.ReviewAddOns().should('include.text', 'Rental Pick up time - 10 am')
            .should('be.visible')    
        bundles.ReviewAddOns().should('include.text', 'Child Helmet - 5 days')
            .should('be.visible')    

        cart.ReviewDown().click()

        // STEP3

        // Click on 'Damage Insurance'
        bundles.BundleOption().contains('Damage Insurance').click()
        
        // Verify 'Next Step' button is now visible
        bundles.NextStep().eq(2).should('be.visible')

        // Verify the selected option is found on Review Add-Ons
        bundles.ReviewAddOns().should('include.text', 'Damage Insurance')

        // Click on 'Next Step'
        bundles.NextStep().eq(2).click()

        cart.ReviewUp().click()

        // Verify 'Add To Cart' is disabled prior to completing Step 5
        bundles.AddToCart().should('be.disabled')

        // Check Review Add-ons should include all items
        bundles.ReviewAddOns().should('include.text', 'Rental Pick up time - 10 am')
            .should('be.visible')    
        bundles.ReviewAddOns().should('include.text', 'Child Helmet - 5 days')
            .should('be.visible')    
        bundles.ReviewAddOns().should('include.text', 'Damage Insurance')
            .should('be.visible')    

        cart.ReviewDown().click()

        //STEP4 MORE OPTIONS button

        // //Verify 'No Thanks' option is not visible
        // cy.get('.no-option.hide').should('not.be.visible')

        // //Verify 'More Options' there
        // //cy.get('.more-options-button').should('be.visible')
        // bundles.MoreOptions().should('be.visible').click()

        // // // After clicking 'More Options', No Thanks option is now seen
        // // cy.get('.no-option.hide').scrollIntoView().should('be.visible').click()

        //Click on 'Junior Lift Ticket - 1 day'
        bundles.BundleOption().contains('Junior Lift Ticket - 1 day').click()

        //Click on 'Junior Lift Ticket - 2 day'
        bundles.BundleOption().contains('Junior Lift Ticket - 2 day').click()

        //Click on 'Junior Lift Ticket - 3 day'
        bundles.BundleOption().contains('Junior Lift Ticket - 3 day').click()

        //Click on 'Next Step'
        bundles.NextStep().eq(3).click()
            // cy.wait(1500)

        cart.ReviewUp().click()
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

        cart.ReviewDown().click()
            // cy.wait(1500)

        // Step 5

        // Click on 'Resort Lunch Voucher'
        bundles.BundleOption().contains('Resort Lunch Voucher').click()
            // cy.wait(1500)

        // Verify the selected option is found on Review Add-Ons
        bundles.ReviewAddOns().should('include.text', 'Resort Lunch Voucher')

        // Click on 'Next Step'
        bundles.NextStep().eq(4).click()
        // cy.wait(3500)
        
        // Check Review Add-ons should include all items
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
    
        // Add to Cart from Bundles
        bundles.AddToCart().click()
            cy.wait(1500)

        // Mobile Down arrow on mini cart
        cy.get('.mini-cart-container', {timeout: 30000}).should('be.visible')  
        cart.MobileDownArrow().click()
        cart.Items({timeout: 10000}).should('be.visible')

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
        // Go to Cart Page
        cart.GoToCart().click()
        cart.Items({timeout: 10000}).should('be.visible')
            cy.wait(1500)


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

        //Verify  cart 
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

        it('C29889 Mobile - cancel bundles pop up on Add To Cart from Details Page', () => {
    
            // Click on fifth 'Add to Cart' button (5 Day - Junior Snowboard Package Rental)
            products.AddToCart().eq(4).click()
            // cy.wait(3500)

            // Bundles pop up should be visible
            cy.get('.inntopia-bundles', {timeout: 60000}).should('be.visible')

            cart.ReviewUp().click()
                // cy.wait(1500)
    
            // Click on 'Cancel and exit' from the bundles
            bundles.Cancel().click()
            //   cy.wait(3000)
    
            //Click on 'mini cart' to open 
            cart.MiniCart().click()
    
            // Verify mini cart reads Emty Cart
            cart.EmptyCart().should('include.text', 'Empty Cart')
    
            // Verify verbiage on the mini cart when it's empty
            cart.EmptyCartMsg().should('include.text', "There's nothing in your cart")
            //     cy.wait(2500).then(() => {
            //     cy.log('Mobile Open bundle -> cancel -> check mini cart and should be empty')
            // })   
    
        })
        
        it('C29890 Mobile - update the date from Details Page ', () => {
        
            // Verify the Calendar is not displayed
            filters.DatePicker().should('not.be.visible')
                cy.scrollTo('center') 

            // Click on 'Filter Products' to open 
            filters.MobileFilters().click()
                .scrollIntoView() // Visual check

            // Verify the Calendar is now displayed
            filters.DatePicker().should('be.visible')
    
            // Click on > to go to the next month
            filters.NextMonthArrow().eq(0).click()

            // Verify September has been chosen
            filters.NextMonthText().eq(0).should('have.value', FutureMonth) 
    
            // Click on May 29 - check out date
            //cy.get('button[data-day="1651212000000"]').click()
            filters.CheckOut().eq(0).click()

            // Scroll 150px above  an element (for visual check)
            filters.MobileFilters().scrollIntoView( { offset: {bottom: 150, left: 0}})

            // Click on 'Search' button
            filters.Update().click()
                cy.wait(2500)
        
            // Verify by URL
            cy.url().should('eq', productsDetailsFutureDate)

            // Click on fifth 'Add to Cart' button (5 Day - Junior Snowboard Package Rental)
            products.AddToCart().eq(4).click()
                // cy.wait(5000)
    
            // Bundles pop up should be visible
            cy.get('.inntopia-bundles', {timeout: 60000}).should('be.visible')
    
        })

        it('C29891 Mobile - shows correct mini cart icon number from Details Page', () => {
        
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
            cart.ReviewUp().click()            
            
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
            
            // Add to Cart from Bundles
            bundles.AddToCart().click()
                cy.wait(2500)

            // Mobile Down arrow on mini cart
            cy.get('.mini-cart-container', {timeout: 30000}).should('be.visible')  
            cart.MobileDownArrow().click()
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
    
        it('C29892 Mobile - Updating Results and spinning wheel on a date search from Details Page', () => {
        
            // Verify the Calendar is not displayed
            filters.DatePicker().should('not.be.visible')
    
            // click to open
            filters.MobileFilters().click()
                .scrollIntoView() // Visual check
    
            // Verify the Calendar is now displayed
            filters.DatePicker().should('be.visible')
    
            // Click on > to go to the next month
            filters.NextMonthArrow().eq(0).click()
    
            // Verify September has been chosen
            filters.NextMonthText().eq(0).should('have.value', FutureMonth)        
    
            //Sep 19 - check out date
            filters.CheckOut().eq(0).click()

            // Click on 'Search' button
            filters.Update().click()      
    
            // check for the text and the spinner during the search
            cy.get('.searching-text').should('include.text', 'Updating Results...')
            cy.get('.loading-spinner').should('exist')    
    
        })
    
        it('C29893 Mobile - able to delete Products from mini cart from Details Page', () => {

            // Click on fifth 'Add to Cart' button (1 Day - Junior Snowboard Package Rental)
            products.AddToCart().eq(0).click()
        
            // Bundles pop up should be visible
            cy.get('.inntopia-bundles', {timeout: 60000}).should('be.visible')
    
            //Bundles pop up
            //STEP1
    
            //Click on 'Junior Lift Ticket - 2 days' from Step 1
            bundles.BundleOption().contains('Resort Lunch Voucher').click()
            
            // Verify 'Next Step' button is now visible
            bundles.NextStep().eq(0).should('be.visible')
            
            cart.ReviewUp().click()
                // cy.wait(1500)
            
            // Verify the selected option is found on Review Add-Ons
            bundles.ReviewAddOns().should('include.text', 'Resort Lunch Voucher')
                .should('be.visible')
    
            // Click on 'Next  Step'
            bundles.NextStep().eq(0).click()    
            
            // //STEP2
    
            // // click on No Thanks button
            // bundles.NoThanks().click()
    
            // // Click on 'Next Step'
            // bundles.NextStep().eq(1).click()    
            
            // Add to Cart from Bundles
            bundles.AddToCart().click()
                cy.wait(1500)

            // Mobile Down arrow on mini cart
            cy.get('.mini-cart-container', {timeout: 30000}).should('be.visible')  
            cart.MobileDownArrow().click()
            cart.Items({timeout: 10000}).should('be.visible')           
    
            //Verify mini cart
            //cy.get('.cart-item').should('include.text', 'Junior Lift Ticket - 2 day')
            cart.Items().should('include.text', 'Resort Lunch Voucher')
                    .should('be.visible')
    
            // click on Trash
            cart.Trash().click()
    
            //Verify mini cart reads Emty Cart
            cy.get('.empty-cart', {timeout: 30000}).should('be.visible')
            cart.EmptyCart().should('include.text', 'Empty Cart')
    
            //Verify verbiage on the mini cart when it's empty
            cart.EmptyCartMsg().should('include.text', "There's nothing in your cart")                  
    
        })          

        it('C29778 Mobile - able to delete Products from cart (from Details Page)', () => {

            // Click on fifth 'Add to Cart' button (1 Day - Junior Snowboard Package Rental)
            products.AddToCart().eq(0).click()
        
            // Bundles pop up should be visible
            cy.get('.inntopia-bundles', {timeout: 60000}).should('be.visible')
    
            //Bundles pop up
            //STEP1
    
            //Click on 'Junior Lift Ticket - 2 days' from Step 1
            bundles.BundleOption().contains('Resort Lunch Voucher').click()
            
            // Verify 'Next Step' button is now visible
            bundles.NextStep().eq(0).should('be.visible')
            
            cart.ReviewUp().click()
                // cy.wait(1500)
            
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
            
            // Add to Cart from Bundles
            bundles.AddToCart().click()
                cy.wait(1500)

            // Mobile Down arrow on mini cart
            cy.get('.mini-cart-container', {timeout: 30000}).should('be.visible')  
            cart.MobileDownArrow().click()
            cart.Items({timeout: 10000}).should('be.visible')         
    
            //Verify mini cart
            //cy.get('.cart-item').should('include.text', 'Junior Lift Ticket - 2 day')
            cart.Items().should('include.text', 'Resort Lunch Voucher')
                    .should('be.visible')
    
            // Go to Cart Page
            cart.GoToCart().click()
            cy.get('.cart-item', {timeout: 30000}).should('be.visible')  
                cy.wait(1500)    
                
            // if Alert is opened, then close it
            cy.get('body').then(($ele) => {
                if ($ele.find('.alerts.unread-others.opened').length > 0) {
                    cy.get('.alerts-toggle').click()
                // } else {
                //     //Do Something
                }
            })                
    
            // Verify mini cart
            cart.Items().should('include.text', 'Resort Lunch Voucher')
                    .should('be.visible')          
    
            // click on Trash on the Cart page
            cart.Trash().eq(1, {timeout: 10000}).should('be.visible')
                .click()
    
            //Verify cart reads Emty Cart
            cy.get('.empty-cart', {timeout: 30000}).should('be.visible')
            cart.EmptyCart().should('include.text', 'Empty Cart')
    
            //Verify verbiage on the cart when it's empty
            cart.EmptyCartMsg().should('include.text', "There's nothing in your cart")
            
            // this can be compared to https://inntopia.travel/ecomm/shop/activities/5549517/en-US/?startdate=2022-04-21&adultcount=1&childCount=0&productsupercategoryId=6
    
        })  
    

    // }) //for repeat5

})
