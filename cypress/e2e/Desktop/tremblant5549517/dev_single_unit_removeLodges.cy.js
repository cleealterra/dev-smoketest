/// <reference types="Cypress" />

import Lodge from "../../PageObjects/Lodge"
import Bundles from "../../PageObjects/Bundles"
import Cart from "../../PageObjects/Cart"

Cypress.on('uncaught:exception', (err, runnable) => {
    // returning false here prevents Cypress from
    // failing the test
    return false
})

const lodge=new Lodge
const cart=new Cart
const bundles=new Bundles

const oneBedroom = '1 Bedroom/1 Bathroom  - Sample Hotel'

// remove Single Unit minicart and cart 

beforeEach(() => {
    cy.viewport('macbook-13')
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

describe('Single unit and Trash icons', () => {

    // Cypress._.times(3, () => {

    it('C29704 able to delete Book Lodge Only from mini cart', () => {
        
        // Click on 'Book Lodge Only'
        lodge.BookLodge().eq(0).click()

        // Bundles pop up should be displayed
        cy.get('.inntopia-bundles' , {timeout: 60000}).should('be.visible')

        // Click on 'Resort Lunch Voucher'
        bundles.BundleOption().contains('Resort Lunch Voucher').click()

        // Verify the selected option is found on Review Add-Ons
        bundles.ReviewAddOns().should('include.text', 'Resort Lunch Voucher')

        // Click on 'Next Step'
        bundles.NextStep().eq(0).click()
            // cy.wait(1500)

        // Verify the selected option is found on Review Add-Ons
        bundles.ReviewAddOns().should('include.text', 'Resort Lunch Voucher')
            .should('be.visible')

        //STEP2 added July 5

        // click on No Thanks button
        bundles.NoThanks().eq(1).click()

        // Click on 'Next Step'
        bundles.NextStep().eq(1).click()               

        // Add to Cart from Bundles
        bundles.AddToCart().click()
            // cy.wait(3500)
        // cart.Items({timeout: 10000}).should('be.visible')
        cy.get('.cart-item', {timeout: 30000}).should('be.visible')  

        // Verify mini cart 
        //cy.get('.cart-item').should('include.text', 'Resort Lunch Voucher')
        cart.Items().should('include.text', 'Resort Lunch Voucher')
            .should('include.text', oneBedroom)

        // click on Trash
        cart.Trash().click()

        //Verify mini cart reads Emty Cart
        cy.get('.empty-cart', {timeout: 30000}).should('be.visible')
        cart.EmptyCart().should('include.text', 'Empty Cart')

        //Verify verbiage on the mini cart when it's empty
        cart.EmptyCartMsg().should('include.text', "There's nothing in your cart")


        // // Go to Cart Page
        // cart.GoToCart().click()
        // cy.get('.cart-item', {timeout: 30000}).should('be.visible')  

        // // Verify  cart 
        // //cy.get('.cart-item').should('include.text', 'Resort Lunch Voucher')
        // cart.Items().should('include.text', 'Resort Lunch Voucher')
        //     .should('include.text', oneBedroom)  
        //         cy.wait(2500).then(() => {
        //         cy.log('Single Unit Lodge Only Test Complete')
        //     })          

    })

    it('C29705 able to delete Book This Package from mini cart ', () => {
        
        // Click on 'Packages' 
        lodge.Packages().click()

        // Click on 'Book This Package' 
        lodge.BookPackage().eq(1).click()
            // cy.wait(1500)

        // Wait for the bundles to display
        cy.get('.inntopia-bundles', {timeout: 10000}).should('be.visible')

        // Click on 'Resort Lunch Voucher'
        bundles.BundleOption().contains('Resort Lunch Voucher').click()

        // Verify the selected option is found on Review Add-Ons
        bundles.ReviewAddOns().should('include.text', 'Resort Lunch Voucher')

        // Click on 'Next Step'
        bundles.NextStep().eq(0).click()
            // cy.wait(1500)

        // Verify the selected option is found on Review Add-Ons
        bundles.ReviewAddOns().should('include.text', 'Resort Lunch Voucher')
            .should('be.visible')

        //STEP2 added July 5

        // click on No Thanks button
        bundles.NoThanks().eq(1).click()

        // Click on 'Next Step'
        bundles.NextStep().eq(1).click()                       

        //Add to Cart from Bundles
        bundles.AddToCart().click()
        cy.get('.cart-item', {timeout: 30000}).should('be.visible')      

        //Verify mini cart bundles option in mini cart
        cart.Items().should('include.text', 'Resort Lunch Voucher')
            .should('include.text', oneBedroom)          
            .should('include.text', 'Package:')

        // click on Trash
        cart.Trash().click()

        //Verify mini cart reads Emty Cart
        cy.get('.empty-cart', {timeout: 30000}).should('be.visible')
        cart.EmptyCart().should('include.text', 'Empty Cart')

        //Verify verbiage on the mini cart when it's empty
        cart.EmptyCartMsg().should('include.text', "There's nothing in your cart")

    })

    it('C29714 able to delete Book Lodge Only from cart ', () => {
        
        // Click on 'Book Lodge Only'
        lodge.BookLodge().eq(0).click()

        // Bundles pop up should be displayed
        cy.get('.inntopia-bundles' , {timeout: 60000}).should('be.visible')

        // Click on 'Resort Lunch Voucher'
        bundles.BundleOption().contains('Resort Lunch Voucher').click()

        // Verify the selected option is found on Review Add-Ons
        bundles.ReviewAddOns().should('include.text', 'Resort Lunch Voucher')     

        // Click on 'Next Step'
        bundles.NextStep().eq(0).click()
            // cy.wait(1500)

        // Verify the selected option is found on Review Add-Ons
        bundles.ReviewAddOns().should('include.text', 'Resort Lunch Voucher')
            .should('be.visible')          
            
        //STEP2 added July 5

        // click on No Thanks button
        bundles.NoThanks().eq(1).click()

        // Click on 'Next Step'
        bundles.NextStep().eq(1).click()                       

        // Add to Cart from Bundles
        bundles.AddToCart().click()
            // cy.wait(3500)
        // cart.Items({timeout: 10000}).should('be.visible')
        cy.get('.cart-item', {timeout: 30000}).should('be.visible')  

        // Verify mini cart 
        //cy.get('.cart-item').should('include.text', 'Resort Lunch Voucher')
        cart.Items().should('include.text', 'Resort Lunch Voucher')
            .should('include.text', oneBedroom)

        // Go to Cart Page
        cart.GoToCart().click()
        cy.get('.cart-item', {timeout: 30000}).should('be.visible')  
            // cy.wait(1500)

        // if Alert is opened, then close it
        cy.get('body').then(($ele) => {
            if ($ele.find('.alerts.unread-others.opened').length > 0) {
                cy.get('.alerts-toggle').click()
            // } else {
            //     //Do Something
            }
        })            

        // Verify  cart 
        //cy.get('.cart-item').should('include.text', 'Resort Lunch Voucher')
        cart.Items().should('include.text', 'Resort Lunch Voucher')
            .should('include.text', oneBedroom)  
            cy.wait(500)
            //     cy.wait(2500).then(() => {
            //     cy.log('Single Unit Lodge Only Test Complete')
            // })          

        // click on Trash on the Cart page
        cart.Trash().eq(1, {timeout: 10000}).should('be.visible')
            .click()

        //Verify cart reads Emty Cart
        cy.get('.empty-cart', {timeout: 30000}).should('be.visible')
        cart.EmptyCart().should('include.text', 'Empty Cart')

        //Verify verbiage on the cart when it's empty
        cart.EmptyCartMsg().should('include.text', "There's nothing in your cart")

    })

    it('C29715 able to delete Book This Package from cart', () => {
        
        // Click on 'Packages' 
        //cy.get('.packages-button').click({force: true})
        lodge.Packages().click()

        // Click on 'Book This Package' 
        // cy.get('.button.default').eq(1).click()
        lodge.BookPackage().eq(1).click()
            // cy.wait(1500)

        // Wait for the bundles to display
        cy.get('.inntopia-bundles', {timeout: 10000}).should('be.visible')

        // Click on 'Resort Lunch Voucher'
        bundles.BundleOption().contains('Resort Lunch Voucher').click()

        // Verify the selected option is found on Review Add-Ons
        bundles.ReviewAddOns().should('include.text', 'Resort Lunch Voucher')

        // Click on 'Next Step'
        bundles.NextStep().eq(0).click()
            // cy.wait(1500)

        // Verify the selected option is found on Review Add-Ons
        bundles.ReviewAddOns().should('include.text', 'Resort Lunch Voucher')
            .should('be.visible')

        //STEP2 added July 5

        // click on No Thanks button
        bundles.NoThanks().eq(1).click()

        // Click on 'Next Step'
        bundles.NextStep().eq(1).click()                       

        //Add to Cart from Bundles
        bundles.AddToCart().click()
        cy.get('.cart-item', {timeout: 30000}).should('be.visible')      

        //Verify mini cart bundles option in mini cart
        cart.Items().should('include.text', 'Resort Lunch Voucher')
            .should('include.text', oneBedroom)          
            .should('include.text', 'Package:')
            //     cy.wait(2500).then(() => {
            //     cy.log('Book Package (with bundle) Test Complete')
            // })    

        // Go to Cart Page
        cart.GoToCart().click()
            // cy.wait(5500)
        cy.get('.cart-item', {timeout: 30000}).should('be.visible')  

        // if Alert is opened, then close it
        cy.get('body').then(($ele) => {
            if ($ele.find('.alerts.unread-others.opened').length > 0) {
                cy.get('.alerts-toggle').click()
            // } else {
            //     //Do Something
            }
        })        

        // Verify  cart 
        //cy.get('.cart-item').should('include.text', 'Resort Lunch Voucher')
        cart.Items().should('include.text', 'Resort Lunch Voucher')
            .should('include.text', oneBedroom)  
            cy.wait(500)
            //     cy.wait(2500).then(() => {
            //     cy.log('Single Unit Lodge Only Test Complete')
            // })                

        // click on Trash on the Cart page
        cart.Trash().eq(1, {timeout: 10000}).should('be.visible')
            .click()

        //Verify mini cart reads Emty Cart
        cy.get('.empty-cart', {timeout: 30000}).should('be.visible')
        cart.EmptyCart().should('include.text', 'Empty Cart')

        //Verify verbiage on the mini cart when it's empty
        cart.EmptyCartMsg().should('include.text', "There's nothing in your cart")

    })    

    // }) //for repeat5    

})
