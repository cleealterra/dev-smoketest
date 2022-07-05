/// <reference types="Cypress" />

import Bundles from "../../PageObjects/Bundles"
import Cart from "../../PageObjects/Cart"
import HomePage from "../../PageObjects/HomePage"
import Lodge from "../../PageObjects/Lodge"


Cypress.on('uncaught:exception', (err, runnable) => {
    // returning false here prevents Cypress from
    // failing the test
    return false
})

const lodge=new Lodge
const cart=new Cart
const bundles=new Bundles
const homepage = new HomePage

const oneBedroom = '1 Bedroom/1 Bathroom  - Sample Hotel'

// Mobile - Inntopia Single Unit Availability

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

describe('Single Unit (with bundle) Lodge Only to mini cart, should be displayed on cart pag', () => {

    // Cypress._.times(5, () => {
        
        it('C29871 Mobile - able to delete Book Lodge Only from mini cart', () => {
        
            // Click on 'Book Lodge Only'
            lodge.BookLodge().eq(0).click()
    
            // Bundles pop up should be displayed
            cy.get('.inntopia-bundles' , {timeout: 60000}).should('be.visible')
    
            // Click on 'Resort Lunch Voucher'
            bundles.BundleOption().contains('Resort Lunch Voucher').click()
    
            // Click on 'Up' arrow to view 'Review Add-Ons'
            cart.ReviewUp().click()
                // cy.wait(1500)             
    
            // Verify the selected option is found on Review Add-Ons
            bundles.ReviewAddOns().should('include.text', 'Resort Lunch Voucher')
    
            cart.ReviewDown().click()                 
    
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
                cy.wait(3500)
    
            // Mobile Down arrow on mini cart
            cy.get('.mini-cart-container', {timeout: 30000}).should('be.visible')  
            cart.MobileDownArrow().click()
            cy.get('.cart-item', {timeout: 30000}).should('be.visible')  
    
            // Verify mini cart 
            //cy.get('.cart-item').should('include.text', 'Resort Lunch Voucher')
            cart.Items().should('include.text', 'Resort Lunch Voucher')
                .should('include.text', oneBedroom)
    
            // click on Trash on the Cart page
            cart.Trash({timeout: 10000}).should('be.visible')
                .click()
    
            //Verify mini cart reads Emty Cart
            cy.get('.empty-cart', {timeout: 30000}).should('be.visible')
            cart.EmptyCart().should('include.text', 'Empty Cart')
    
            //Verify verbiage on the mini cart when it's empty
            cart.EmptyCartMsg().should('include.text', "There's nothing in your cart")   
    
        })
    
        it('C29872 Mobile - able to delete Book This Package from mini cart ', () => {
            
            // Click on 'Packages' 
            lodge.Packages().click()
    
            // Click on 'Book This Package' 
            lodge.BookPackage().eq(1).click()
                // cy.wait(1500)
    
            // Wait for the bundles to display
            cy.get('.inntopia-bundles', {timeout: 10000}).should('be.visible')
    
            // Click on 'Resort Lunch Voucher'
            bundles.BundleOption().contains('Resort Lunch Voucher').click()
    
            // Click on 'Up' arrow to view 'Review Add-Ons'
            cart.ReviewUp().click()
                // cy.wait(1500)             
    
            // Verify the selected option is found on Review Add-Ons
            bundles.ReviewAddOns().should('include.text', 'Resort Lunch Voucher')

            cart.ReviewDown().click()              
    
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
                cy.wait(3500)
    
            // Mobile Down arrow on mini cart
            cy.get('.mini-cart-container', {timeout: 30000}).should('be.visible')  
            cart.MobileDownArrow().click()
            cy.get('.cart-item', {timeout: 30000}).should('be.visible')      
    
            //Verify mini cart bundles option in mini cart
            cart.Items().should('include.text', 'Resort Lunch Voucher')
                .should('include.text', oneBedroom)          
                .should('include.text', 'Package:')
    
            // click on Trash on the Cart page
            cart.Trash({timeout: 10000}).should('be.visible')
                .click()
    
            //Verify mini cart reads Emty Cart
            cy.get('.empty-cart', {timeout: 30000}).should('be.visible')
            cart.EmptyCart().should('include.text', 'Empty Cart')
    
            //Verify verbiage on the mini cart when it's empty
            cart.EmptyCartMsg().should('include.text', "There's nothing in your cart")
    
        })
    
        it('C29873 Mobile - able to delete Book Lodge Only from cart ', () => {
            
            // Click on 'Book Lodge Only'
            lodge.BookLodge().eq(0).click()
    
            // Bundles pop up should be displayed
            cy.get('.inntopia-bundles' , {timeout: 60000}).should('be.visible')
    
            // Click on 'Resort Lunch Voucher'
            bundles.BundleOption().contains('Resort Lunch Voucher').click()
    
            // Click on 'Up' arrow to view 'Review Add-Ons'
            cart.ReviewUp().click()
                // cy.wait(1500)                          
    
            // Verify the selected option is found on Review Add-Ons
            bundles.ReviewAddOns().should('include.text', 'Resort Lunch Voucher')

            cart.ReviewDown().click()              
    
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
                cy.wait(2000)

            // Mobile Down arrow on mini cart
            cy.get('.mini-cart-container', {timeout: 30000}).should('be.visible')  
            cart.MobileDownArrow().click()
            cart.Items({timeout: 10000}).should('be.visible') 
    
            // Verify mini cart 
            //cy.get('.cart-item').should('include.text', 'Resort Lunch Voucher')
            cart.Items().should('include.text', 'Resort Lunch Voucher')
                .should('include.text', oneBedroom)
    
            // Go to Cart Page
            cart.GoToCart().click()
            cy.get('.cart-item', {timeout: 30000}).should('be.visible')  
                cy.wait(2500)

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
    
        it('C29874 Mobile - able to delete Book This Package from cart', () => {
            
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
    
            // Click on 'Up' arrow to view 'Review Add-Ons'
            cart.ReviewUp().click()
                // cy.wait(1500)                    

            // Verify the selected option is found on Review Add-Ons
            bundles.ReviewAddOns().should('include.text', 'Resort Lunch Voucher')

            cart.ReviewDown().click()              
    
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
                cy.wait(2000)

            // Mobile Down arrow on mini cart
            cy.get('.mini-cart-container', {timeout: 30000}).should('be.visible')  
            cart.MobileDownArrow().click()
            cart.Items({timeout: 10000}).should('be.visible')  
    
            //Verify mini cart bundles option in mini cart
            cart.Items().should('include.text', 'Resort Lunch Voucher')
                .should('include.text', oneBedroom)          
                .should('include.text', 'Package:')
                //     cy.wait(2500).then(() => {
                //     cy.log('Book Package (with bundle) Test Complete')
                // })    
    
            // Go to Cart Page
            cart.GoToCart().click()
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
                cy.wait(1500)
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
