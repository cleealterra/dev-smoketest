/// <reference types="Cypress" />

import Lodge from "../../PageObjects/Lodge"
import Bundles from "../../PageObjects/Bundles"
import Cart from "../../PageObjects/Cart"
import Products from "../../PageObjects/Products"

Cypress.on('uncaught:exception', (err, runnable) => {
    // returning false here prevents Cypress from
    // failing the test
    return false
})

const lodge=new Lodge
const cart=new Cart
const bundles=new Bundles
const products=new Products

const oneBedroom = '1 Bedroom/1 Bathroom  - Sample Hotel'
const twoBedroom = "2 Bedroom"
const packageName = 'Test Package w AP components'


describe('Add Combinations', () => {

    // Cypress._.times(5, () => {

    it('C29973 single lodge (lodge only) + single lodge (package)', () => {
        
        cy.viewport('macbook-13')
        lodge.TRSingleUnitDev()
            // cy.wait(7500)

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
        lodge.BookLodge().eq(0).click({force: true})

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
        // cart.Items({timeout: 30000}).should('be.visible')  
        cy.get('.cart-item', {timeout: 30000}).should('be.visible')  

        // Verify mini cart 
        //cy.get('.cart-item').should('include.text', 'Resort Lunch Voucher')
        cart.Items().should('include.text', 'Resort Lunch Voucher')
            .should('include.text', oneBedroom)
            // cy.wait(2500).then(() => {
            //     cy.log('Single Unit Lodge Only')
            // })  
        
        //wait for next step
        cy.wait(1500)

        // ** now add package ** //

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
            .and('include.text', packageName)          
            .should('include.text', 'Package:')
            //     cy.wait(2500).then(() => {
            //     cy.log('single lodge (lodge only) + single lodge (package)')
            // })    

    })

    it('C29974 single unit (lodge only) + multi unit (lodge only)', () => {
        
        cy.viewport('macbook-13')
        lodge.TRSingleUnitDev()
            // cy.wait(7500)

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
        // cart.Items({timeout: 30000}).should('be.visible')  
        cy.get('.cart-item', {timeout: 30000}).should('be.visible')  

        // Verify mini cart 
        //cy.get('.cart-item').should('include.text', 'Resort Lunch Voucher')
        cart.Items().should('include.text', 'Resort Lunch Voucher')
            .should('include.text', oneBedroom)
            // cy.wait(2500).then(() => {
            //     cy.log('Single Unit Lodge Only')
            // })  

        //wait for next step
        cy.wait(1500)            
        
        // ** now add multiunit lodge (lodge only) ** //

        cy.viewport('macbook-13')
        lodge.TRMultiUnitDev()
    
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

        //STEP2 added July 5

        // click on No Thanks button
        bundles.NoThanks().eq(1).click()

        // Click on 'Next Step'
        bundles.NextStep().eq(1).click()                 

        // Add to Cart from Bundles
        bundles.AddToCart().click()
        cart.Items({timeout: 10000}).should('be.visible')

        // Verify mini cart 
        cart.Items().should('include.text', 'Resort Lunch Voucher')

        // Go to Cart Page
        cart.GoToCart().click()
        cart.Items({timeout: 10000}).should('be.visible')

        // Verify  cart 
        cart.Items().should('include.text', 'Resort Lunch Voucher')
        .should('include.text', oneBedroom)
        
    })    

    it('C29975 single unit (lodge only) + multi unit (package)', () => {
        
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

        // Click on 'Book Lodge Only'
        lodge.BookLodge().eq(0).click()

        // Bundles pop up should be visible
        cy.get('.inntopia-bundles', {timeout: 60000}).should('be.visible')

        // Click on 'Resort Lunch Voucher'
        bundles.BundleOption().contains('Resort Lunch Voucher').click()

        // Click on 'Next Step'
        bundles.NextStep().eq(0).click()
            cy.wait(1500)

        //STEP2 added July 5

        // click on No Thanks button
        bundles.NoThanks().eq(1).click()

        // Click on 'Next Step'
        bundles.NextStep().eq(1).click()     

        // Add to Cart from Bundles
        bundles.AddToCart().click()
        // cart.Items({timeout: 30000}).should('be.visible')  
        cy.get('.cart-item', {timeout: 30000}).should('be.visible')  

        // Verify mini cart 
        //cy.get('.cart-item').should('include.text', 'Resort Lunch Voucher')
        cart.Items().should('include.text', 'Resort Lunch Voucher')
            .should('include.text', oneBedroom)
            // cy.wait(2500).then(() => {
            //     cy.log('Single Unit Lodge Only')
            // })  

        //wait for next step
        cy.wait(1500)            
        
        // ** now add multiunit lodge (lodge only) ** //

        cy.viewport('macbook-13')
        lodge.TRMultiUnitDev()
    
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

        // Click on 'Packages' 
        lodge.Packages().click()

        // Click on 'Book This Package' 
        lodge.BookPackage().eq(1).click()
        //    cy.wait(1500)

        // lick on 'Resort Lunch Voucher'
        bundles.BundleOption().contains('Resort Lunch Voucher').click()

        // Verify the selected option is found on Review Add-Ons
        bundles.ReviewAddOns().should('include.text', 'Resort Lunch Voucher')

        // Click on 'Next Step'
        bundles.NextStep().eq(0).click()

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
            // cy.wait(3000)

        // Verify the product name is found on the mini cart
        cart.Items().should('include.text', 'Package:')
    
        // Verify mini cart bundles option in mini cart
        cart.Items().should('include.text', 'Resort Lunch Voucher')
            .and('include.text', packageName)
            .and('include.text', oneBedroom)

    })    

    it('C29979 Single Unit Lodge only + Multi Unit Lodge only + Product + verify in minicart/cart', () => {
        
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

        // Click on 'Book Lodge Only'
        lodge.BookLodge().eq(0).click()

        // Bundles pop up should be visible
        cy.get('.inntopia-bundles', {timeout: 60000}).should('be.visible')

        // Click on 'Resort Lunch Voucher'
        bundles.BundleOption().contains('Resort Lunch Voucher').click()

        // Click on 'Next Step'
        bundles.NextStep().eq(0).click()
            cy.wait(1500)

        //STEP2 added July 5

        // click on No Thanks button
        bundles.NoThanks().eq(1).click()

        // Click on 'Next Step'
        bundles.NextStep().eq(1).click()     

        // Add to Cart from Bundles
        bundles.AddToCart().click()
        // cart.Items({timeout: 30000}).should('be.visible')  
        cy.get('.cart-item', {timeout: 30000}).should('be.visible')  

        // Verify mini cart 
        //cy.get('.cart-item').should('include.text', 'Resort Lunch Voucher')
        cart.Items().should('include.text', 'Resort Lunch Voucher')
            .should('include.text', oneBedroom)
            // cy.wait(2500).then(() => {
            //     cy.log('Single Unit Lodge Only')
            // })  

        //wait for next step
        cy.wait(1500)
        
        // ** now add multi unit ** //

        // navigate to multi unit page
        lodge.TRMultiUnitDev()
        
        // wait for page to load
        cy.get('.availability-links', {timeout: 60000}).should('be.visible')

        // if Alert is opened, then close it
        cy.get('body').then(($ele) => {
            if ($ele.find('.alerts.unread-others.opened').length > 0) {
                cy.get('.alerts-toggle').click()
            // } else {
            //     //Do Something
            }
        })         

        // Click on '2 Bedroom' Availability Link
        lodge.AvailabilityRoomType().contains('2 Bedroom').click()
            // cy.wait(1500)

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
        cy.get('.cart-item', {timeout: 30000}).should('be.visible')  

        // Verify mini cart both 'single unit and multi unit' exist
        cart.Items().should('include.text', 'Resort Lunch Voucher')
            .should('include.text', oneBedroom)
            .should('include.text', 'LDG - Dining Voucher')
            .should('include.text', twoBedroom)
            
            //wait for next step
            cy.wait(1500)
            //     cy.wait(2500).then(() => {
            //     cy.log('Single Unit Package + Multi Unit Package')
            // })  


        // ** now add product ** //

        products.TRActivityDated()
            cy.wait(7500)

        // // cy.get('.loading-spinner').should('be.visible')
        cy.get('.loading-spinner').should('not.be.visible')
        //     cy.wait(500)  

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
            // cy.wait(1500)
        cy.get('.cart-item', {timeout: 30000}).should('be.visible')  

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

    it('C29980 Single Unit Package + Multi Unit Package + Product + verify in minicart/cart', () => {
        
        cy.viewport('macbook-13')
        lodge.TRSingleUnitDev()

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
            // cy.wait(1500)

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
        // cart.Items({timeout: 30000}).should('be.visible')  
        cy.get('.cart-item', {timeout: 30000}).should('be.visible')  

        // Verify mini cart 
        //cy.get('.cart-item').should('include.text', 'Resort Lunch Voucher')
        cart.Items().should('include.text', 'Resort Lunch Voucher')
            .should('include.text', oneBedroom)
            .should('include.text', 'Package:')
            // cy.wait(2500).then(() => {
            //     cy.log('Single Unit Package')
            // })  

        //wait for next step
        cy.wait(1500)

        // ** now add multi unit ** //

        // navigate to multi unit page
        lodge.TRMultiUnitDev()
        
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
    
        // Click on '2 Bedroom' Availability Link
        lodge.AvailabilityRoomType().contains('2 Bedroom').click()
        
        // Click on 'Packages' 
        lodge.Packages().click()

        // Click on 'Book This Package' 
        lodge.BookPackage().eq(1).click()
        //    cy.wait(1500)

        // Bundles pop up should be visible
        cy.get('.inntopia-bundles', {timeout: 60000}).should('be.visible')

        // Click on 'LDG - Dining Voucher'
        bundles.BundleOption().contains('LDG - Dining Voucher').click()

        // Click on 'Next Step'
        bundles.NextStep().eq(0).click()

        // Add to Cart from Bundles
        bundles.AddToCart().click()
        cy.get('.cart-item', {timeout: 30000}).should('be.visible')  

        // Verify cart both 'single unit and multi unit and product' exist in cart
        cart.Items().should('include.text', 'Resort Lunch Voucher')
            .should('include.text', oneBedroom)
            .should('include.text', 'LDG - Dining Voucher')
            .should('include.text', twoBedroom)
            .should('include.text', 'Package:')
                // cy.wait(2500).then(() => {
                //     cy.log('Single Unit Package + Multi Unit Package')
                // })

        //wait for next step
        cy.wait(1500)

        // ** now add product ** //

        products.TRActivityDated()
            cy.wait(7500)

        // // cy.get('.loading-spinner').should('be.visible')
        cy.get('.loading-spinner').should('not.be.visible')
        // cy.wait(500)    

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
         
        //Click on 'Damage Insurance' from Step 1
        bundles.BundleOption().contains('Damage Insurance').click()

        // Click on 'Next Step'
        bundles.NextStep().eq(0).click()
        
        // Add to Cart from Bundles
        bundles.AddToCart().click()
            // cy.wait(1500)
        cy.get('.cart-item', {timeout: 30000}).should('be.visible')  

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

    it('C29977 single unit (package) + multi unit (package)', () => {
        
        cy.viewport('macbook-13')
        lodge.TRSingleUnitDev()

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
            // cy.wait(1500)

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
        // cart.Items({timeout: 30000}).should('be.visible')  
        cy.get('.cart-item', {timeout: 30000}).should('be.visible')  

        // Verify mini cart 
        //cy.get('.cart-item').should('include.text', 'Resort Lunch Voucher')
        cart.Items().should('include.text', 'Resort Lunch Voucher')
            .should('include.text', oneBedroom)
            .should('include.text', 'Package:')
            // cy.wait(2500).then(() => {
            //     cy.log('Single Unit Package')
            // })  

        //wait for next step
        cy.wait(1500)            

        // ** now add multi unit ** //

        // navigate to multi unit page
        lodge.TRMultiUnitDev()
        
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
    
        // Click on '2 Bedroom' Availability Link
        lodge.AvailabilityRoomType().contains('2 Bedroom').click()
        
        // Click on 'Packages' 
        lodge.Packages().click()

        // Click on 'Book This Package' 
        lodge.BookPackage().eq(1).click()
        //    cy.wait(1500)

        // Bundles pop up should be visible
        cy.get('.inntopia-bundles', {timeout: 60000}).should('be.visible')

        // Click on 'LDG - Dining Voucher'
        bundles.BundleOption().contains('LDG - Dining Voucher').click()

        // Click on 'Next Step'
        bundles.NextStep().eq(0).click()

        // Add to Cart from Bundles
        bundles.AddToCart().click()
        cy.get('.cart-item', {timeout: 30000}).should('be.visible')  

        // Verify cart both 'single unit and multi unit and product' exist in cart
        cart.Items().should('include.text', 'Resort Lunch Voucher')
            .should('include.text', oneBedroom)
            .should('include.text', 'LDG - Dining Voucher')
            .should('include.text', twoBedroom)
            .should('include.text', 'Package:')
                // cy.wait(2500).then(() => {
                //     cy.log('Single Unit Package + Multi Unit Package')
                // })
    })

    // }) //repeat 5

})
