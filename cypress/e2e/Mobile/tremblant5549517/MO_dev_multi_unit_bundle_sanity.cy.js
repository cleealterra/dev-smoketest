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

// const uatsingle=new UatSingle
const lodge=new Lodge
const cart=new Cart
const bundles=new Bundles
const homepage = new HomePage

const oneBedroom = "1 Bedroom"
const twoBedroom = "2 Bedroom"

const baseuUrl = 'https://tremblant-sc10-dev.alterramtnco.dev/plan/hotels-condos/sommet-multi?arrivaldate=08/09/2022&departuredate=08/12/2022&Adult=2&Child=0'

// mobile multi unit bundle sanity

beforeEach(() => {

    cy.viewport('iphone-xr')
    lodge.TRMultiUnitDev()

    //Wait for 'Packages' button to be visible (to page to load)
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

describe('Multi Unit (with bundle)', () => {

    // Cypress._.times(5, () => {

        it('C29894 Mobile - Book Lodge Only ', () => {

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
                // cy.wait(2500)   
    
            // Mobile Down arrow on mini cart
            cy.get('.mini-cart-container', {timeout: 30000}).should('be.visible')  
            cart.MobileDownArrow().click()
            cy.get('.cart-item', {timeout: 30000}).should('be.visible')  
    
            // Verify mini cart 
            cart.Items().should('include.text', 'Resort Lunch Voucher')
                .should('include.text', oneBedroom)     
    
            // Go to Cart Page
            cart.GoToCart().click()
            // cy.wait(3500)
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
            cart.Items().should('include.text', 'Resort Lunch Voucher')
                .should('include.text', oneBedroom)    
                //     cy.wait(2500).then(() => {
                //     cy.log('Mobile - Single Unit Lodge Only Test Complete')
                // })  
              
        })
    
    it('C29895 Mobile - cancel bundles pop up on Book Lodge only', () => {
        
        // Click on 'Book Lodge Only'
        lodge.BookLodge().eq(0).click()
            // cy.wait(3000)
        
        // Wait for bundle to show 
        cy.get('.inntopia-bundles' , {timeout: 30000}).should('be.visible')

        // Click on 'Up' arrow to view 'Review Add-Ons'
        cart.ReviewUp().click()
            // cy.wait(1500)

        // Click on 'Cancel and exit' from the bundles
        bundles.Cancel().click()
            // cy.wait(1500)

        // Click to open mini cart
        cart.MiniCart().click()

        // Verify mini cart reads Empty Cart
        cart.EmptyCart().should('include.text', 'Empty Cart')

        // Verify verbiage on the mini cart when it's empty
        cart.EmptyCartMsg().should('include.text', "There's nothing in your cart")
        //     cy.wait(2500).then(() => {
        //     cy.log('Mobile Open bundle -> cancel -> check mini cart and should be empty')
        // })  

    })

    it('C29896 Mobile - Book Package', () => {

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
            // cy.wait(3500)

        // Mobile Down arrow on mini cart
        cy.get('.mini-cart-container', {timeout: 30000}).should('be.visible')  
        cart.MobileDownArrow().click()
        cy.get('.cart-item', {timeout: 30000}).should('be.visible')  

        //Verify mini cart bundles option in mini cart
        cart.Items().should('include.text', 'Resort Lunch Voucher')
            .should('include.text', oneBedroom)          
            .should('include.text', 'Package:')
            //     cy.wait(2500).then(() => {
            //     cy.log('Click on Book Package (with bundle) Test Complete')
            // })    

    })

    it('C29897 Mobile - Customize Package', () => {
        
        // Click on 'Packages' 
        lodge.Packages().click()

        // Wait for Customize Package to appear
        cy.get('.package-builder-icon', {timeout: 10000}).should('be.visible')

        // //Click on the first available 'Customize Package'
        lodge.CustomizePackage().eq(0).click()

        //Verify by URL and Test Runner shows 'Test Complete' if a
        cy.url().should('not.eq', baseuUrl)
        //     cy.wait(2500).then(() => {
        //     cy.log('Click on Customize Package Test Complete')
        // })   
        
    })

    it('C29898 Change Number of Bedrooms and make sure bundles open on lodge only and book package', () => {

        //Click on '1 Bedroom' to open the drop down menu
        lodge.AvailabilityMobile().click()

        //Click on '2 Bedroom' to switch 
        lodge.AvailabilityOption().contains(twoBedroom)
            .click()

        //Verify by the name of the room
        lodge.RoomName().should('include.text', twoBedroom)
        
        // Click on 'Book Lodge Only'
        lodge.BookLodge().eq(0).click()

        // Wait for bundle to show 
        cy.get('.inntopia-bundles' , {timeout: 30000}).should('be.visible')

        //Click on 'Up' arrow to view 'Review Add-Ons'
        cart.ReviewUp().click()
        //    cy.wait(1500) 

        //Click on 'Cancel and exit' from the bundles
        bundles.Cancel().click()
            cy.wait(1500)  

        //Click to open mini cart
        cart.MiniCart().click()
            // cy.wait(1500) 

        //Verify mini cart reads Empty Cart
        cart.EmptyCart().should('include.text', 'Empty Cart')

        //Click to close mini cart
        cart.MiniCart().click()
            cy.wait(1500) 

        //Click on 'Packages' 
        lodge.Packages().click()
            // cy.wait(1500)

        //Click on 'Book This Package' 
        lodge.BookPackage().eq(1).click()
            // cy.wait(1500)

        //Bundles pop up should be visible
        bundles.BundlePopUp().should('be.visible')

        //Click on 'Up' arrow to view 'Review Add-Ons'
        cart.ReviewUp().click()
            // cy.wait(1500)

        //Click on 'Cancel and exit' from the bundles
        bundles.Cancel().click()
            cy.wait(3000)

        //Verify mini cart reads Empty Cart
        cart.EmptyCart().should('include.text', 'Empty Cart')
            // cy.wait(1500)

        //Click on '2 Bedroom' to open the drop down menu
        // cy.get('.availability-button').click({force: true})
        lodge.AvailabilityMobile().click()

        //Click on '1 Bedroom' to switch 
        // cy.get('button.availability-option').contains(oneBedroom)
        lodge.AvailabilityOption().contains(oneBedroom)
            .click()            

        //Verify by the name of the room
        lodge.RoomName().should('include.text', oneBedroom)

        //Bundle should still open after changing tabs
        lodge.BookLodge().eq(0).click()

        // Wait for bundle to show 
        cy.get('.inntopia-bundles' , {timeout: 30000}).should('be.visible')

        //Bundles pop up should be visible
        bundles.BundlePopUp().should('be.visible')

        //Click on 'Up' arrow to view 'Review Add-Ons'
        cart.ReviewUp().click()
            // cy.wait(1500) 

        //Click on 'Cancel and exit' from the bundles
        bundles.Cancel().click()
            // cy.wait(3000)

        //Click to open mini cart
        cart.MiniCart().click()

        //Verify mini cart reads Empty Cart
        cart.EmptyCart().should('include.text', 'Empty Cart')
        //     cy.wait(2500).then(() => {
        //     cy.log('Change Number of Bedrooms and make sure bundles open on lodge only and book package')
        // })   
        
    })

    it('C29899 Mobile - shows correct mini cart icon number', () => {
        // Click on 'Book Lodge Only'
        lodge.BookLodge().eq(0).click()

        // Bundles pop up should be displayed
        cy.get('.inntopia-bundles' , {timeout: 60000}).should('be.visible')

        // Click on 'Resort Lunch Voucher'
        bundles.BundleOption().contains('Resort Lunch Voucher').click()

        // Click on 'Next Step'
        bundles.NextStep().eq(0).click()

        //STEP2 added July 5

        // click on No Thanks button
        bundles.NoThanks().eq(1).click()

        // Click on 'Next Step'
        bundles.NextStep().eq(1).click()            

        // Add to Cart from Bundles
        bundles.AddToCart().click()
            cy.wait(3500)
        
        // cy.get('.mini-cart-toggle-icon-number')
        cart.MiniCartNumber()
            .should('have.text', '2')    
              
        cart.MobileDownArrow().click()      
            
        // click on Trash
        cart.Trash().click()  
            cy.wait(1500)

        // should be 0
        cart.MiniCartNumber()
        .should('have.text', '0')  
        
    })

    // }) // repeat 5

})
