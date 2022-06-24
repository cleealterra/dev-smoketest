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

const bundles=new Bundles
const products=new Products
const cart=new Cart
const filters=new Filters
const homepage = new HomePage

const NextMonthText = 'May'
const productsFutureDate = 'https://tremblant-dev.alterramtnco.dev/plan/products#filters=start-date:2022-5-29'

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

    // Cypress._.times(5, () => {

    it('C29970 mobile Per Itinerary Bundles', () => {

        // Click on fifth 'Add to Cart' button (5 Day - Junior Snowboard Package Rental)
        products.AddToCart().eq(1).click()
        // cy.wait(2000)

        // Bundles pop up should be visible
        cy.get('.inntopia-bundles', {timeout: 60000}).should('be.visible')

        cart.ReviewUp().click()        

        // Verify 'Add To Cart' is disabled prior to completing Step 5
        bundles.AddToCart().should('be.disabled')        

        // Verify 'Next Step' button from Step 1 is not visible
        bundles.NextStep().eq(0).should('not.be.visible')

        //Click on 'Rental Pick up time - 10 am' from Step 1
        bundles.BundleOption().contains('F&F Adult Lift Ticket').click()        

        // Verify 'Next Step' button is now visible
        bundles.NextStep().eq(0).should('be.visible')
        
        // Verify the selected option is found on Review Add-Ons
        bundles.ReviewAddOns().should('include.text', 'F&F Adult Lift Ticket')
            .should('be.visible')        

        // Click on 'Next Step'
        bundles.NextStep().eq(0).click()        
        
        //Add to Cart from Bundles
        bundles.AddToCart().click()
            cy.wait(1500)

        // Mobile Down arrow on mini cart
        cy.get('.mini-cart-container', {timeout: 30000}).should('be.visible')  
        cart.MobileDownArrow().click()
        cart.Items({timeout: 10000}).should('be.visible')   

        //Verify mini cart 
        //cy.get('.cart-item').should('include.text', 'Junior Lift Ticket - 2 day')
        cart.Items().should('include.text', 'F&F Adult Lift Ticket')
                .should('be.visible')
                .should('include.text', '2 Day - Junior Snowboard Package Rental')
                .should('be.visible')   
                
        //Click on 'mini cart' to open 
        cart.MiniCart().click()                  

        // Click on fifth 'Add to Cart' button (5 Day - Junior Snowboard Package Rental)
        products.AddToCart().eq(1).click()
            // cy.wait(2000)

        // Mobile Down arrow on mini cart
        cy.get('.mini-cart-container', {timeout: 30000}).should('be.visible')  
        cart.MobileDownArrow().click()
        cart.Items({timeout: 10000}).should('be.visible')               
        
        //Verify mini cart 
        //cy.get('.cart-item').should('include.text', 'Junior Lift Ticket - 2 day')
        cart.Items().eq(0)
                .should('include.text', 'F&F Adult Lift Ticket')
                .should('be.visible')
                .should('include.text', '2 Day - Junior Snowboard Package Rental')
                .should('be.visible')        
        cart.Items().eq(1)
                .should('include.text', 'F&F Adult Lift Ticket')
                .should('be.visible')
                .should('include.text', '2 Day - Junior Snowboard Package Rental')
                .should('be.visible')            

    })

    it('C29971 mobile Per itinerary Optional Bundles with selection', () => {

        // Click on fifth 'Add to Cart' button (5 Day - Junior Snowboard Package Rental)
        products.AddToCart().eq(2).click()
        // cy.wait(2000)

        // Bundles pop up should be visible
        cy.get('.inntopia-bundles', {timeout: 60000}).should('be.visible')

        cart.ReviewUp().click()               

        // Verify 'Add To Cart' is disabled prior to completing Step 5
        bundles.AddToCart().should('be.disabled')        

        // Verify 'Next Step' button from Step 1 is not visible
        bundles.NextStep().eq(0).should('not.be.visible')

        //Click on 'Rental Pick up time - 10 am' from Step 1
        bundles.BundleOption().contains('Resort Lunch Voucher').click()        

        // Verify 'Next Step' button is now visible
        bundles.NextStep().eq(0).should('be.visible')
        
        // Verify the selected option is found on Review Add-Ons
        bundles.ReviewAddOns().should('include.text', 'Resort Lunch Voucher')
            .should('be.visible')        

        // Click on 'Next Step'
        bundles.NextStep().eq(0).click()        
        
        //Add to Cart from Bundles
        bundles.AddToCart().click()
            cy.wait(2000)

        // Mobile Down arrow on mini cart
        cy.get('.mini-cart-container', {timeout: 30000}).should('be.visible')  
        cart.MobileDownArrow().click()
        cart.Items({timeout: 10000}).should('be.visible')           

        //Verify mini cart 
        //cy.get('.cart-item').should('include.text', 'Junior Lift Ticket - 2 day')
        cart.Items().should('include.text', 'Resort Lunch Voucher')
                .should('be.visible')
                .should('include.text', '3 Day - Junior Snowboard Package Rental')
                .should('be.visible')       
                
        //Click on 'mini cart' to close 
        cart.MiniCart().click()                

        // Click on fifth 'Add to Cart' button (5 Day - Junior Snowboard Package Rental)
        products.AddToCart().eq(2).click()
            // cy.wait(4500)

        // Mobile Down arrow on mini cart
        cy.get('.mini-cart-container', {timeout: 30000}).should('be.visible')  
        cart.MobileDownArrow().click()
        cart.Items({timeout: 10000}).should('be.visible')               
        
        //Verify mini cart 
        //cy.get('.cart-item').should('include.text', 'Junior Lift Ticket - 2 day')
        cart.Items().eq(0)
            .should('include.text', 'Resort Lunch Voucher')
            .should('be.visible')
            .should('include.text', '3 Day - Junior Snowboard Package Rental')
            .should('be.visible')        
        cart.Items().eq(1)
            .should('include.text', '3 Day - Junior Snowboard Package Rental')
            .should('be.visible')
            .should('not.include.text', 'Resort Lunch Voucher')

    })

    it('C29972 mobile - Per itinerary Optional Bundles with no selection', () => {

        // Click on fifth 'Add to Cart' button (5 Day - Junior Snowboard Package Rental)
        products.AddToCart().eq(2).click()
        // cy.wait(2000)

        // Bundles pop up should be visible
        cy.get('.inntopia-bundles', {timeout: 60000}).should('be.visible')

        // Verify 'Add To Cart' is disabled prior to completing Step 5
        bundles.AddToCart().should('be.disabled')        

        cart.ReviewUp().click()        

        // Verify 'Next Step' button from Step 1 is not visible
        bundles.NextStep().eq(0).should('not.be.visible')

        // click on No Thanks button 
        bundles.NoThanks().click()

        // Click on 'Next Step'
        bundles.NextStep().eq(0).click()        
        
        //Add to Cart from Bundles
        bundles.AddToCart().click()
            cy.wait(2000)    
            
        // Mobile Down arrow on mini cart
        cy.get('.mini-cart-container', {timeout: 30000}).should('be.visible')  
        cart.MobileDownArrow().click()
        cart.Items({timeout: 10000}).should('be.visible')              

        //Verify mini cart 
        //cy.get('.cart-item').should('include.text', 'Junior Lift Ticket - 2 day')
        cart.Items().should('include.text', '3 Day - Junior Snowboard Package Rental')
                .should('be.visible')                 

        //Click on 'mini cart' to close 
        cart.MiniCart().click()                   

        // Click on fifth 'Add to Cart' button (5 Day - Junior Snowboard Package Rental)
        products.AddToCart().eq(2).click()
        //   cy.wait(2000)
        
        // Bundles pop up should be visible
        cy.get('.inntopia-bundles', {timeout: 60000}).should('be.visible')
        
    })

    // }) //for repeat5    

}) 
