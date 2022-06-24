/// <reference types="Cypress" />

import Bundles from "../../PageObjects/Bundles"
import Cart from "../../PageObjects/Cart"
import HomePage from "../../PageObjects/HomePage"
import Products from "../../PageObjects/Products"


Cypress.on('uncaught:exception', (err, runnable) => {
    // returning false here prevents Cypress from
    // failing the test
    return false
})

const bundles=new Bundles
const products=new Products
const cart=new Cart
const homepage = new HomePage

beforeEach(() => {
    
    cy.viewport('macbook-13')
    products.TRActivityDetailDated()

    // // cy.get('.loading-spinner').should('be.visible')
    // cy.get('.loading-spinner').should('not.be.visible')
        cy.wait(2500)    

    // if Alert is opened, then close it
    cy.get('body').then(($ele) => {
        if ($ele.find('.alerts.unread-others.opened').length > 0) {
            cy.get('.alerts-toggle').click()
        // } else {
        //     //Do Something
        }
    }) 

})

describe('delete products from minicart and cart', () => {

    // Cypress._.times(5, () => {

    it('C29777 able to delete Products from mini cart', () => {
        
        // Click on fifth 'Add to Cart' button (1 Day - Junior Snowboard Package Rental)
        products.AddToCart().eq(0).click({force: true})
    
        // Bundles pop up should be visible
        cy.get('.inntopia-bundles', {timeout: 60000}).should('be.visible')

        // Verify 'Add To Cart' is disabled prior to completing Step 5
        bundles.AddToCart().should('be.disabled')        

        //Bundles pop up
        //STEP1

        //Click on 'Junior Lift Ticket - 2 days' from Step 1
        bundles.BundleOption().contains('Resort Lunch Voucher').click()
        
        // Verify 'Next Step' button is now visible
        bundles.NextStep().eq(0).should('be.visible')
        
        // Verify the selected option is found on Review Add-Ons
        bundles.ReviewAddOns().should('include.text', 'Resort Lunch Voucher')
            .should('be.visible')

        // Click on 'Next Step'
        bundles.NextStep().eq(0).click()     

        // Prior to moving onto next step, verify Review Add-Ons
        bundles.ReviewAddOns().should('include.text', 'Resort Lunch Voucher')
            .should('be.visible')        
        
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
        //cy.get('.cart-item').should('include.text', 'Junior Lift Ticket - 2 day')
        cart.Items().should('include.text', 'Resort Lunch Voucher')
                .should('be.visible')

        // click on Trash on the Cart page
        cart.Trash({timeout: 10000}).should('be.visible')
            .click()    

        //Verify mini cart reads Emty Cart
        cy.get('.empty-cart', {timeout: 30000}).should('be.visible')
        cart.EmptyCart().should('include.text', 'Empty Cart')

        //Verify verbiage on the mini cart when it's empty
        cart.EmptyCartMsg().should('include.text', "There's nothing in your cart")                   

        })    

    it('C29778 able to delete Products from cart', () => {
        
        // Click on fifth 'Add to Cart' button (1 Day - Junior Snowboard Package Rental)
        products.AddToCart().eq(0).click({force: true})
    
        // Bundles pop up should be visible
        cy.get('.inntopia-bundles', {timeout: 60000}).should('be.visible')

        // Verify 'Add To Cart' is disabled prior to completing Step 5
        bundles.AddToCart().should('be.disabled')        

        //Bundles pop up
        //STEP1

        //Click on 'Junior Lift Ticket - 2 days' from Step 1
        bundles.BundleOption().contains('Resort Lunch Voucher').click()
        
        // Verify 'Next Step' button is now visible
        bundles.NextStep().eq(0).should('be.visible')
        
        // Verify the selected option is found on Review Add-Ons
        bundles.ReviewAddOns().should('include.text', 'Resort Lunch Voucher')
            .should('be.visible')

        // Click on 'Next Step'
        bundles.NextStep().eq(0).click()     

        // Prior to moving onto next step, verify Review Add-Ons
        bundles.ReviewAddOns().should('include.text', 'Resort Lunch Voucher')
            .should('be.visible')        
        
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
        //cy.get('.cart-item').should('include.text', 'Junior Lift Ticket - 2 day')
        cart.Items().should('include.text', 'Resort Lunch Voucher')
                .should('be.visible')

        // Go to Cart Page
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

        // Verify  cart 
        cart.Items().should('include.text', 'Resort Lunch Voucher')
            .should('be.visible')
            cy.wait(1500)

        // click on Trash on the Cart page
        cart.Trash().eq(1, {timeout: 10000}).should('be.visible')
            .click()

        //Verify cart reads Emty Cart
        cy.get('.empty-cart', {timeout: 30000}).should('be.visible')
        cart.EmptyCart().should('include.text', 'Empty Cart')

        //Verify verbiage on the cart when it's empty
        cart.EmptyCartMsg().should('include.text', "There's nothing in your cart")        

        })        

    // }) //for repeat5    

}) 
