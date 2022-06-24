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

const lodge=new Lodge
const bundles=new Bundles
const cart=new Cart

const oneBedroom = "1 Bedroom"
const packageName = 'AP TEAM Test Lodging Supplier'


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

describe('remove Multi Unit bundles mini cart and cart', () => {

    // Cypress._.times(5, () => {

        it('C29907 Mobile - able to delete Book Lodge Only from mini cart', () => {

            // Click on 'Book Lodge Only'
            lodge.BookLodge().eq(0).click()
            // cy.wait(2000)
    
            // Bundles pop up should be visible
            bundles.BundlePopUp().should('be.visible')
    
            // Click on 'Resort Lunch Voucher'
            bundles.BundleOption().contains('Resort Lunch Voucher').click()
    
            // Verify the selected option is found on Review Add-Ons
            bundles.ReviewAddOns().should('include.text', 'Resort Lunch Voucher')
    
            // Click on 'Next Step'
            bundles.NextStep().eq(0).click()
    
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
    
            // click on Trash
            cart.Trash().click()
    
            //Verify mini cart reads Emty Cart
            cy.get('.empty-cart', {timeout: 30000}).should('be.visible')
            cart.EmptyCart().should('include.text', 'Empty Cart')
    
            //Verify verbiage on the mini cart when it's empty
            cart.EmptyCartMsg().should('include.text', "There's nothing in your cart")        
    
    
        })
    
        it('C29908 Mobile - able to delete Book This Package from mini cart', () => {

            // Click on 'Packages' 
            lodge.Packages().click()
    
            // Click on 'Book This Package' 
            lodge.BookPackage().eq(1).click()
            //    cy.wait(1500)

            // Bundles pop up should be visible
            bundles.BundlePopUp().should('be.visible')            
    
            // lick on 'Resort Lunch Voucher'
            bundles.BundleOption().contains('Resort Lunch Voucher').click()
    
            // Verify the selected option is found on Review Add-Ons
            bundles.ReviewAddOns().should('include.text', 'Resort Lunch Voucher')
    
            // Click on 'Next Step'
            bundles.NextStep().eq(0).click()
    
            // Verify the selected option is found on Review Add-Ons
            bundles.ReviewAddOns().should('include.text', 'Resort Lunch Voucher')
                .should('be.visible')
    
            // Add to Cart from Bundles
            bundles.AddToCart().click()
                cy.wait(3000)

            // Mobile Down arrow on mini cart
            cy.get('.mini-cart-container', {timeout: 30000}).should('be.visible')  
            cart.MobileDownArrow().click()
            cart.Items({timeout: 10000}).should('be.visible')              
    
            // click on Trash
            cart.Trash().click()
    
            //Verify mini cart reads Emty Cart
            cy.get('.empty-cart', {timeout: 30000}).should('be.visible')
            cart.EmptyCart().should('include.text', 'Empty Cart')
    
            //Verify verbiage on the mini cart when it's empty
            cart.EmptyCartMsg().should('include.text', "There's nothing in your cart")        
    
        })    
    
        it('C29909 Mobile - able to delete Book Lodge Only from cart', () => {

            // Click on 'Book Lodge Only'
            lodge.BookLodge().eq(0).click()
            // cy.wait(2000)
    
            // Bundles pop up should be visible
            bundles.BundlePopUp().should('be.visible')
    
            // Click on 'Resort Lunch Voucher'
            bundles.BundleOption().contains('Resort Lunch Voucher').click()
    
            // Verify the selected option is found on Review Add-Ons
            bundles.ReviewAddOns().should('include.text', 'Resort Lunch Voucher')
    
            // Click on 'Next Step'
            bundles.NextStep().eq(0).click()
    
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
            cart.Items().should('include.text', 'Resort Lunch Voucher')
    
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
        

    it('C29910 Mobile - able to delete Book This Package from cart ', () => {

        // Click on 'Packages' 
        lodge.Packages().click()

        // Click on 'Book This Package' 
        lodge.BookPackage().eq(1).click()
        //    cy.wait(1500)

        // Bundles pop up should be visible
        bundles.BundlePopUp().should('be.visible')        

        // lick on 'Resort Lunch Voucher'
        bundles.BundleOption().contains('Resort Lunch Voucher').click()

        // Verify the selected option is found on Review Add-Ons
        bundles.ReviewAddOns().should('include.text', 'Resort Lunch Voucher')

        // Click on 'Next Step'
        bundles.NextStep().eq(0).click()

        // Verify the selected option is found on Review Add-Ons
        bundles.ReviewAddOns().should('include.text', 'Resort Lunch Voucher')
            .should('be.visible')

        // Add to Cart from Bundles
        bundles.AddToCart().click()
            cy.wait(2500)

        // Mobile Down arrow on mini cart
        cy.get('.mini-cart-container', {timeout: 30000}).should('be.visible')  
        cart.MobileDownArrow().click()
        cart.Items({timeout: 10000}).should('be.visible')              

        // Verify the product name is found on the mini cart
        cart.Items().should('include.text', 'Package:')

        // Verify mini cart bundles option in mini cart
        cart.Items().should('include.text', 'Resort Lunch Voucher')
            .and('include.text', packageName)
            .and('include.text', oneBedroom)

        // Go to Cart Page
        cart.GoToCart().click()
        cy.get('.cart-item', {timeout: 30000}).should('be.visible')  

        // Verify  cart 
        //cy.get('.cart-item').should('include.text', 'Resort Lunch Voucher')
        cart.Items().should('include.text', 'Resort Lunch Voucher')
            .should('include.text', oneBedroom)  
            cy.wait(1500)

        // if Alert is opened, then close it
        cy.get('body').then(($ele) => {
            if ($ele.find('.alerts.unread-others.opened').length > 0) {
                cy.get('.alerts-toggle').click()
            // } else {
            //     //Do Something
            }
        })            

        // click on Trash on the Cart page
        cart.Trash().eq(1, {timeout: 10000}).should('be.visible')
            .click()

        //Verify cart reads Emty Cart
        cy.get('.empty-cart', {timeout: 30000}).should('be.visible')
        cart.EmptyCart().should('include.text', 'Empty Cart')

        //Verify verbiage on the cart when it's empty
        cart.EmptyCartMsg().should('include.text', "There's nothing in your cart")

    })      

    // }) // repeat 5

})
