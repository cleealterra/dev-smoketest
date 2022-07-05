/// <reference types="Cypress" />

import Lodge from "../../PageObjects/Lodge"
import Bundles from "../../PageObjects/Bundles"
import Cart from "../../PageObjects/Cart"
import HomePage from "../../PageObjects/HomePage"
import Products from "../../PageObjects/Products"
import Filters from "../../PageObjects/Filters"


Cypress.on('uncaught:exception', (err, runnable) => {
    // returning false here prevents Cypress from
    // failing the test
    return false
})

const lodge=new Lodge
const cart=new Cart
const bundles=new Bundles
const homepage = new HomePage
const products=new Products


const oneBedroom = '1 Bedroom/1 Bathroom  - Sample Hotel'
const twoBedroom = "2 Bedroom"


//Inntopia Single Unit Availability

// beforeEach(() => {
//     cy.viewport('macbook-13')
//     lodge.DevTRSingleUnit()

//     // Close the Alert
//     homepage.Alert().click()

// })

describe('Add Combinations', () => {

    // Cypress._.times(3, () => {

    it('Single Unit Lodge only + Multi Unit Lodge only + Product + verify in minicart/cart', () => {
        
        cy.viewport('iphone-xr')
        lodge.TRSingleUnitDev()
            // cy.wait(3000)

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

        // Click on 'Book Lodge Only'
        lodge.BookLodge().eq(0).click()

        // Bundles pop up should be visible
        cy.get('.inntopia-bundles', {timeout: 60000}).should('be.visible')

        // Click on 'Resort Lunch Voucher'
        bundles.BundleOption().contains('Resort Lunch Voucher').click()

        // Click on 'Next Step' 
        bundles.NextStep().eq(0).click()
            // cy.wait(1500)

        //STEP2 added July 5

        // click on No Thanks button
        bundles.NoThanks().eq(1).click()

        // Click on 'Next Step'
        bundles.NextStep().eq(1).click()                        

        // Add to Cart from Bundles
        bundles.AddToCart().click()
            cy.wait(2500)

        // Mobile Down arrow on mini cart
        cart.MobileDownArrow({timeout: 10000}).should('be.visible')  
            .click()
        cart.Items({timeout: 10000}).should('be.visible')   
        // cy.get('.cart-item', {timeout: 30000}).should('be.visible')  

        // Verify mini cart 
        //cy.get('.cart-item').should('include.text', 'Resort Lunch Voucher')
        cart.Items().should('include.text', 'Resort Lunch Voucher')
            .should('include.text', oneBedroom)
            // cy.wait(2500).then(() => {
            //     cy.log('Single Unit Lodge Only')
            // })  
        
        // ** now add multi unit ** //

        // navigate to multi unit page
        lodge.TRMultiUnitDev()
            // cy.wait(2500)

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

        //Click on '1 Bedroom' to open the drop down menu
        lodge.AvailabilityMobile().click()        
        
        //Click on '2 Bedroom' to switch 
        lodge.AvailabilityOption().contains(twoBedroom)
            .click()        

        // Click on 'Book Lodge Only'
        lodge.BookLodge().eq(0).click()

        // Bundles pop up should be visible
        cy.get('.inntopia-bundles', {timeout: 60000}).should('be.visible')

        // Click on 'LDG - Dining Voucher'
        bundles.BundleOption().contains('LDG - Dining Voucher').click()
            // cy.wait(1500)

        // Click on 'Next Step'
        bundles.NextStep().eq(0).click()
            // cy.wait(1500)

        // Add to Cart from Bundles
        bundles.AddToCart().click()
            cy.wait(2500)

        // Mobile Down arrow on mini cart
        cart.MobileDownArrow({timeout: 10000}).should('be.visible')  
            .click()
        cart.Items({timeout: 10000}).should('be.visible')  

        // Verify mini cart both 'single unit and multi unit' exist
        cart.Items().should('include.text', 'Resort Lunch Voucher')
            .should('include.text', oneBedroom)
            .should('include.text', 'LDG - Dining Voucher')
            .should('include.text', twoBedroom)
            //     cy.wait(2500).then(() => {
            //     cy.log('Single Unit Package + Multi Unit Package')
            // })  


        // ** now add product ** //

        products.TRActivityDated()
            cy.wait(5000)
            cy.get('.loading-spinner').should('not.be.visible')

        // if Alert is opened, then close it
        cy.get('body').then(($ele) => {
            if ($ele.find('.alerts.unread-others.opened').length > 0) {
                cy.get('.alerts-toggle').click()
            // } else {
            //     //Do Something
            }
        })            

        // Click on fifth 'Add to Cart' button (2 Day - Junior Snowboard Package Rental)
        products.AddToCart().eq(1).click()

        // Bundles pop up should be visible
        cy.get('.inntopia-bundles', {timeout: 60000}).should('be.visible')
         
        //Click on 'Damage Insurance' from Step 1
        bundles.BundleOption().contains('Damage Insurance').click()
            // cy.wait(1500)

        // Click on 'Next Step'
        bundles.NextStep().eq(0).click()
            // cy.wait(1500)
        
        // Add to Cart from Bundles
        bundles.AddToCart().click()
            cy.wait(3500)

        // Mobile Down arrow on mini cart
        cart.MobileDownArrow().click()
        cart.Items({timeout: 10000}).should('be.visible')            

        // Verify mini cart both 'single unit and multi unit and product' exist in cart
        cart.Items().should('include.text', 'Resort Lunch Voucher')
            .should('include.text', oneBedroom)
            .should('include.text', 'LDG - Dining Voucher')
            .should('include.text', twoBedroom)
            .should('include.text', '2 Day - Junior Snowboard Package Rental')
            .should('include.text', 'Damage Insurance')

        //Go to Cart Page
        cart.GoToCart().click()
        cy.get('.cart-item', {timeout: 30000}).should('be.visible')  

        // Verify cart both 'single unit and multi unit and product' exist in cart
        cart.Items().should('include.text', 'Resort Lunch Voucher')
            .should('include.text', oneBedroom)
            .should('include.text', 'LDG - Dining Voucher')
            .should('include.text', twoBedroom)
            .should('include.text', '2 Day - Junior Snowboard Package Rental')
            .should('include.text', 'Damage Insurance')
            //     cy.wait(2500).then(() => {
            //     cy.log('Single Unit Package + Multi Unit Package + Product')
            // })  

    })

    it('Single Unit Package + Multi Unit Package + Product + verify in minicart/cart', () => {
        
        cy.viewport('iphone-xr')
        lodge.TRSingleUnitDev()
            // cy.wait(2500)
        cy.get('.packages-button', {timeout: 30000}).should('be.visible')  

        // if Alert is opened, then close it
        cy.get('body').then(($ele) => {
            if ($ele.find('.alerts.unread-others.opened').length > 0) {
                cy.get('.alerts-toggle').click()
            // } else {
            //     //Do Something
            }
        })           

        // Click on 'Packages' 
        //cy.get('.packages-button').click({force: true})
        lodge.Packages().click()

        // Click on 'Book This Package' 
        // cy.get('.button.default').eq(1).click()
        lodge.BookPackage().eq(1).click()

        // Bundles pop up should be visible
        cy.get('.inntopia-bundles', {timeout: 60000}).should('be.visible')

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
            cy.wait(2500)

        // Mobile Down arrow on mini cart
        cart.MobileDownArrow().click()
        cart.Items({timeout: 10000}).should('be.visible')           

        // Verify mini cart 
        //cy.get('.cart-item').should('include.text', 'Resort Lunch Voucher')
        cart.Items().should('include.text', 'Resort Lunch Voucher')
            .should('include.text', oneBedroom)
            .should('include.text', 'Package:')
            // cy.wait(2500).then(() => {
            //     cy.log('Single Unit Package')
            // })  
        
        // // ** now add multi unit ** //

        // navigate to multi unit page
        lodge.TRMultiUnitDev()
            // cy.wait(2500)

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

        //Click on '1 Bedroom' to open the drop down menu
        lodge.AvailabilityMobile().click()        
        
        //Click on '2 Bedroom' to switch 
        lodge.AvailabilityOption().contains(twoBedroom)
            .click()        
        
        // Click on 'Packages' 
        lodge.Packages().click()

        // Click on 'Book This Package' 
        lodge.BookPackage().eq(1).click()

        // Bundles pop up should be visible
        cy.get('.inntopia-bundles', {timeout: 60000}).should('be.visible')

        // Click on 'LDG - Dining Voucher'
        bundles.BundleOption().contains('LDG - Dining Voucher').click()

        // Click on 'Next Step'
        bundles.NextStep().eq(0).click()

        // Add to Cart from Bundles
        bundles.AddToCart().click()
            cy.wait(3000)

        // Mobile Down arrow on mini cart
        cart.MobileDownArrow().click()
        cart.Items({timeout: 10000}).should('be.visible')         

        // Verify cart both 'single unit and multi unit and product' exist in cart
        cart.Items().should('include.text', 'Resort Lunch Voucher')
            .should('include.text', oneBedroom)
            .should('include.text', 'LDG - Dining Voucher')
            .should('include.text', twoBedroom)
            .should('include.text', 'Package:')
                // cy.wait(2500).then(() => {
                //     cy.log('Single Unit Package + Multi Unit Package')
                // })

        // // ** now add product ** //

        products.TRActivityDated()
            cy.wait(5000)
            cy.get('.loading-spinner').should('not.be.visible')      
            
        // if Alert is opened, then close it
        cy.get('body').then(($ele) => {
            if ($ele.find('.alerts.unread-others.opened').length > 0) {
                cy.get('.alerts-toggle').click()
            // } else {
            //     //Do Something
            }
        })            

        // Click on fifth 'Add to Cart' button (2 Day - Junior Snowboard Package Rental)
        products.AddToCart().eq(1).click()

        // Bundles pop up should be visible
        cy.get('.inntopia-bundles', {timeout: 60000}).should('be.visible')            
         
        //Click on 'Damage Insurance' from Step 1
        bundles.BundleOption().contains('Damage Insurance').click()

        // Click on 'Next Step'
        bundles.NextStep().eq(0).click()
        
        // Add to Cart from Bundles
        bundles.AddToCart().click()
            cy.wait(3500)

        // Mobile Down arrow on mini cart
        cart.MobileDownArrow().click()
        cart.Items({timeout: 10000}).should('be.visible')                     

        // Verify cart both 'single unit and multi unit and product' exist in cart
        cart.Items().should('include.text', 'Resort Lunch Voucher')
            .should('include.text', oneBedroom)
            .should('include.text', 'LDG - Dining Voucher')
            .should('include.text', twoBedroom)
            .should('include.text', 'Package:')
            .should('include.text', '2 Day - Junior Snowboard Package Rental')
            .should('include.text', 'Damage Insurance')

        //Go to Cart Page
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

        // Verify cart both 'single unit and multi unit and product' exist in cart
        cart.Items().should('include.text', 'Resort Lunch Voucher')
            .should('include.text', oneBedroom)
            .should('include.text', 'LDG - Dining Voucher')
            .should('include.text', twoBedroom)
            .should('include.text', 'Package:')
            .should('include.text', '2 Day - Junior Snowboard Package Rental')
            .should('include.text', 'Damage Insurance')
                // cy.wait(2500).then(() => {
                //     cy.log('Single Unit Package + Multi Unit Package + Product ')
                // })  

    })

    // }) //repeat 5

})
