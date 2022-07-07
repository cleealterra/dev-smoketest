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

describe('Add to cart', () => {

    // Cypress._.times(3, () => {

    it('C31496 Add To Cart decimals on price and in bundles', () => {

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
        
        // Click on fifth 'Add to Cart' button (1 Day - Junior Snowboard Only Rental)
        products.AddToCart().eq(5).click()

        // Bundles pop up should be visible
        cy.get('.inntopia-bundles', {timeout: 60000}).should('be.visible')

        // Verify 'Add To Cart' is disabled prior to completing Step 5
        bundles.AddToCart().should('be.disabled')

        // Bundles pop up
        // STEP1

        // Verify 'Next Step' button from Step 1 is not visible
        bundles.NextStep().eq(0).should('not.be.visible')

        //Click on 'Rental Pick up time - 10 am' from Step 1
        bundles.BundleOption().contains('Child Helmet - 5 days').click()
        
        // Verify 'Next Step' button is now visible
        bundles.NextStep().eq(0).should('be.visible')
        
        // Verify the selected option is found on Review Add-Ons
        bundles.ReviewAddOns().should('include.text', 'Child Helmet - 5 days')
            .should('be.visible')

        // Click on 'Next Step'
        bundles.NextStep().eq(0).click()
    
        //Add to Cart from Bundles
        bundles.AddToCart().click()
        cart.Items({timeout: 10000}).should('be.visible')
            // cy.wait(2000)


        //Verify mini cart 
        //cy.get('.cart-item').should('include.text', 'Junior Lift Ticket - 2 day')

        //Verify mini cart 
        //cy.get('.cart-item').should('include.text', 'Junior Lift Ticket - 2 day')
        cart.Items().should('include.text', '1 Day - Junior Snowboard Only Rental')
                .should('be.visible')
                .and('include.text', 'Child Helmet - 5 days')

        //Verify the decimal in the mini cart 
        cart.ProductPrice().should('include.text', '$50.25')
        cy.get(':nth-child(1) > .sub-price').should('include.text', '$5.10')
            
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
        cart.Items().should('include.text', 'Child Helmet - 5 days')
                .should('be.visible')

        //Verify the decimal in the mini cart 
        cy.get(':nth-child(1) > .sub-price').should('include.text', '$5.10') 

        // Proceed to Checkout
        cart.GoToCart().eq(1).click()

        // Verify the handoff to inntopia by checking the URL
        cy.url().should('eq', 'https://reservations.tremblant.ca/ecomm/Checkout/Customer/5549517')

    })

    it('C31497 fr-ca Add To Cart decimals on price and in bundles', () => {
        
        cy.viewport('macbook-13')
        products.FRActivityDatedFrCa()
        // cy.visit('https://tremblant-sc10-dev.alterramtnco.dev/planifiez/products?sc_lang=fr-CA#filters=start-date:2022-8-9')

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

        // Click on fifth 'Add to Cart' button (1 Day - Junior Snowboard Only Rental)
        products.AddToCart().eq(5).click()

        // Bundles pop up should be visible
        cy.get('.inntopia-bundles', {timeout: 60000}).should('be.visible')

        // Verify 'Add To Cart' is disabled prior to completing Step 5
        bundles.AddToCart().should('be.disabled')

        // Bundles pop up
        // STEP1

        // Verify 'Next Step' button from Step 1 is not visible
        bundles.NextStep().eq(0).should('not.be.visible')

        //Click on 'Rental Pick up time - 10 am' from Step 1
        bundles.BundleOption().contains('Child Helmet - 5 days').click()
        
        // Verify 'Next Step' button is now visible
        bundles.NextStep().eq(0).should('be.visible')
        
        // Verify the selected option is found on Review Add-Ons
        bundles.ReviewAddOns().should('include.text', 'Child Helmet - 5 days')
            .should('be.visible')

        // Click on 'Next Step'
        bundles.NextStep().eq(0).click()
    
        //Add to Cart from Bundles
        bundles.AddToCart().click()
        cart.Items({timeout: 10000}).should('be.visible')
            // cy.wait(2000)

        //Verify mini cart 
        //cy.get('.cart-item').should('include.text', 'Junior Lift Ticket - 2 day')
        cart.Items().should('include.text', '1 Day - Junior Snowboard Only Rental')
                .should('be.visible')
                .and('include.text', 'Child Helmet - 5 days')

        //Verify the decimal in the mini cart 
        cy.get(':nth-child(1) > .sub-price').should('include.text', '5,10 $')
            
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

        //Verify cart 
        //cy.get('.cart-item').should('include.text', 'Junior Lift Ticket - 2 day')
        cart.Items().should('include.text', '1 Day - Junior Snowboard Only Rental')
                .should('be.visible')
                .and('include.text', 'Child Helmet - 5 days')

        //Verify the decimal in the mini cart 
        cy.get(':nth-child(1) > .sub-price').should('include.text', '5,10 $')

        // Proceed to Checkout
        cart.GoToCart().eq(1).click()

        // Verify the handoff to inntopia by checking the URL
        cy.url().should('eq', 'https://reservations.tremblant.ca/ecomm/Checkout/Customer/5549517/fr-CA')

    })

    it('C31498 en - able to add activity item with decimals (do not select bundle option with decimals) ', () => {

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
        
        // Click on fifth 'Add to Cart' button (1 Day - Junior Snowboard Only Rental)
        products.AddToCart().eq(5).click()

        // Bundles pop up should be visible
        cy.get('.inntopia-bundles', {timeout: 60000}).should('be.visible')

        // Verify 'Add To Cart' is disabled prior to completing Step 5
        bundles.AddToCart().should('be.disabled')

        // Bundles pop up
        // STEP1

        // Verify 'Next Step' button from Step 1 is not visible
        bundles.NextStep().eq(0).should('not.be.visible')

        // click on No Thanks button
        bundles.NoThanks().click()

        // Click on 'Next Step'
        bundles.NextStep().click()  
    
        //Add to Cart from Bundles
        bundles.AddToCart().click()
        cart.Items({timeout: 10000}).should('be.visible')
            // cy.wait(2000)

        //Verify mini cart 
        //cy.get('.cart-item').should('include.text', 'Junior Lift Ticket - 2 day')
        cart.Items().should('include.text', '1 Day - Junior Snowboard Only Rental')
                .should('be.visible')
        cart.ProductPrice().should('include.text', '$50.25')

        // //Verify the decimal in the mini cart 
        // cy.get(':nth-child(1) > .sub-price').should('include.text', '$5.10')
            
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
        cart.Items().should('include.text', '1 Day - Junior Snowboard Only Rental')
                .should('be.visible')
        cart.ProductPrice().should('include.text', '$50.25')

        // Proceed to Checkout
        cart.GoToCart().eq(1).click()

        // Verify the handoff to inntopia by checking the URL
        cy.url().should('eq', 'https://reservations.tremblant.ca/ecomm/Checkout/Customer/5549517')

    })

    it('C31501 fr-ca - able to add activity item with decimals (do not select bundle option with decimals)', () => {
        
        cy.viewport('macbook-13')
        products.FRActivityDatedFrCa()
        // cy.visit('https://tremblant-sc10-dev.alterramtnco.dev/planifiez/products?sc_lang=fr-CA#filters=start-date:2022-8-9')

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

        // Click on fifth 'Add to Cart' button (1 Day - Junior Snowboard Only Rental)
        products.AddToCart().eq(5).click()

        // Bundles pop up should be visible
        cy.get('.inntopia-bundles', {timeout: 60000}).should('be.visible')

        // Verify 'Add To Cart' is disabled prior to completing Step 5
        bundles.AddToCart().should('be.disabled')

        // Bundles pop up
        // STEP1

        // Verify 'Next Step' button from Step 1 is not visible
        bundles.NextStep().eq(0).should('not.be.visible')

        // //Click on 'Rental Pick up time - 10 am' from Step 1
        // bundles.BundleOption().contains('Child Helmet - 5 days').click()
        
        // // Verify 'Next Step' button is now visible
        // bundles.NextStep().eq(0).should('be.visible')
        
        // // Verify the selected option is found on Review Add-Ons
        // bundles.ReviewAddOns().should('include.text', 'Child Helmet - 5 days')
        //     .should('be.visible')

        // click on No Thanks button
        bundles.NoThanks().click()        

        // Click on 'Next Step'
        bundles.NextStep().eq(0).click()
    
        //Add to Cart from Bundles
        bundles.AddToCart().click()
        cart.Items({timeout: 10000}).should('be.visible')
            // cy.wait(2000)

        //Verify mini cart 
        //cy.get('.cart-item').should('include.text', 'Junior Lift Ticket - 2 day')
        cart.Items().should('include.text', '1 Day - Junior Snowboard Only Rental')
                .should('be.visible')

        cart.ProductPrice().should('include.text', '50,25 $')                

        // //Verify the decimal in the mini cart 
        // cy.get(':nth-child(1) > .sub-price').should('include.text', '5,10 $')
            
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

        //Verify cart 
        //cy.get('.cart-item').should('include.text', 'Junior Lift Ticket - 2 day')
        cart.Items().should('include.text', '1 Day - Junior Snowboard Only Rental')
                .should('be.visible')

        cart.ProductPrice().should('include.text', '50,25 $')     

        // Proceed to Checkout
        cart.GoToCart().eq(1).click()

        // Verify the handoff to inntopia by checking the URL
        cy.url().should('eq', 'https://reservations.tremblant.ca/ecomm/Checkout/Customer/5549517/fr-CA')

    })

    // // }) //for repeat5    

}) 
