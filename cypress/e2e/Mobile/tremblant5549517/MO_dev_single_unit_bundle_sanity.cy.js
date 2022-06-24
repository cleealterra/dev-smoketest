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

const oneBedroom = '1 Bedroom/1 Bathroom  - Sample Hotel'
const packageName = 'Test Package w AP components'
const baseuUrl = 'https://tremblant-sc10-dev.alterramtnco.dev/plan/hotels-condos/sommet-single?arrivaldate=08/09/2022&departuredate=08/12/2022&Adult=2&Child=0'

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

    // Cypress._.times(3, () => {

    it('C29817 Mobile - Book Lodge only', () => {

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

        // Verify the selected option is found on Review Add-Ons
        bundles.ReviewAddOns().should('include.text', 'Resort Lunch Voucher')
            .should('be.visible')

        // Add to Cart from Bundles
        bundles.AddToCart().click()
            cy.get('.mini-cart-container', {timeout: 30000}).should('be.visible')  

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

    it('C29815 cancel bundles pop up on Book Lodge only', () => {

        // Click on 'Book Lodge Only'
        //cy.get('.book-now').click({force: true})
        lodge.BookLodge().eq(0).click()

        // Wait for bundle to show 
        cy.get('.inntopia-bundles' , {timeout: 30000}).should('be.visible')

        // Click on 'Up' arrow to view 'Review Add-Ons'
        cart.ReviewUp().click()
            cy.get('.cancel', {timeout: 30000}).should('be.visible')

        // Click on 'Cancel and exit' from the bundles
        bundles.Cancel().click() 

        // Click to open mini cart
        cart.MiniCart().click()

        // Verify mini cart reads Empty Cart
        cart.EmptyCart().should('include.text', 'Empty Cart')

        // Verify verbiage on the mini cart when it's empty
        //cy.get('.empty-cart-details').should('include.text', "There's nothing in your cart.")
        cart.EmptyCartMsg().should('include.text', "There's nothing in your cart")
            //     cy.wait(2500).then(() => {
            //     cy.log('Mobile Open bundle -> cancel -> check mini cart and should be empty')
            // })    
    })

    it('C29816 cancel bundles pop up on Book This Package', () => {

        // Click on 'Packages' 
        //cy.get('.packages-button').click({force: true})
        lodge.Packages().click()

        // Click on 'Book This Package' 
        // cy.get('.button.default').eq(1).click()
        lodge.BookPackage().eq(1).click()

        // Wait for bundle to show 
        cy.get('.inntopia-bundles' , {timeout: 30000}).should('be.visible')

        // Click on 'Up' arrow to view 'Review Add-Ons'
        cart.ReviewUp().click()
            // cy.wait(1500)  

        // Click on 'Cancel and exit' from the bundles
        bundles.Cancel().click() 

        // Click to open mini cart
        cart.MiniCart().click()

        // Verify mini cart reads Empty Cart
        cart.EmptyCart().should('include.text', 'Empty Cart')

        // Verify verbiage on the mini cart when it's empty
        //cy.get('.empty-cart-details').should('include.text', "There's nothing in your cart.")
        cart.EmptyCartMsg().should('include.text', "There's nothing in your cart")
            //     cy.wait(2500).then(() => {
            //     cy.log('Mobile Open bundle -> cancel -> check mini cart and should be empty')
            // })    

    })

    it('C29818 Mobile - Book Package', () => {

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

        // Verify the selected option is found on Review Add-Ons
        bundles.ReviewAddOns().should('include.text', 'Resort Lunch Voucher')
            .should('be.visible')

        // Add to Cart from Bundles
        bundles.AddToCart().click()
            cy.wait(2000)

        // Mobile Down arrow on mini cart
        cy.get('.mini-cart-container', {timeout: 30000}).should('be.visible')  
        cart.MobileDownArrow().click()
        cy.get('.cart-item', {timeout: 30000}).should('be.visible')  

        //Verify mini cart bundles option in mini cart
        cart.Items().should('include.text', 'Resort Lunch Voucher')
            .should('include.text', oneBedroom)      
            .and('include.text', packageName)       
            .should('include.text', 'Package:')
            //     cy.wait(2500).then(() => {
            //     cy.log('Click on Book Package (with bundle) Test Complete')
            // })    

    })

    it('C29819 Mobile - Customize Package', () => {
        
        // Click on 'Packages' 
        lodge.Packages().click()
            // cy.wait(1500)

        // Wait for Customize Package to appear
        cy.get('.package-builder-icon', {timeout: 10000}).should('be.visible')

        // Click on the first available 'Customize Package'
        lodge.CustomizePackage().eq(0).click()

        //Verify by URL
        cy.url().should('not.eq', baseuUrl)
        cy.url().should('include', 'https://reservations.tremblant.ca/ecomm/Package/PackageBuilder/5549517/en-US')
        //     cy.wait(2500).then(() => {
        //     cy.log('Mobile Click on Customize Package Test Complete')
        // })   
        
    })

    it('C29864 able to add Book Lodge Only and Book This Package together ', () => {
        
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

        // Verify the selected option is found on Review Add-Ons
        bundles.ReviewAddOns().should('include.text', 'Resort Lunch Voucher')
            .should('be.visible')

        // Add to Cart from Bundles
        bundles.AddToCart().click()
            cy.wait(3500)

        // Mobile Down arrow on mini cart
        cy.get('.mini-cart-container', {timeout: 30000}).should('be.visible')  
        cart.MobileDownArrow().click()         
        // cart.Items({timeout: 10000}).should('be.visible')
        cy.get('.cart-item', {timeout: 30000}).should('be.visible')  

        // Verify mini cart 
        //cy.get('.cart-item').should('include.text', 'Resort Lunch Voucher')
        cart.Items().should('include.text', 'Resort Lunch Voucher')
            .should('include.text', oneBedroom)   
            
        //Click to close mini cart
        cart.MiniCart().click()            

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

        // Verify the selected option is found on Review Add-Ons
        bundles.ReviewAddOns().should('include.text', 'Resort Lunch Voucher')
            .should('be.visible')

        //Add to Cart from Bundles
        bundles.AddToCart().click()
           cy.wait(5000)

        // Mobile Down arrow on mini cart
        cy.get('.mini-cart-container', {timeout: 30000}).should('be.visible')  
        cart.MobileDownArrow().click()
        cy.get('.cart-item', {timeout: 30000}).should('be.visible')      

        //Verify mini cart bundles option in mini cart
        cart.Items().should('include.text', 'Resort Lunch Voucher')
            .and('include.text', oneBedroom)          
            .and('include.text', 'Package:')
            .and('include.text', 'Resort Lunch Voucher')
            .and('include.text', packageName)            
            //     cy.wait(2500).then(() => {
            //     cy.log('verified in mini cart')
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
                
        //Verify cart bundles option in mini cart
        cart.Items().should('include.text', 'Resort Lunch Voucher')
            .and('include.text', oneBedroom)          
            .and('include.text', 'Package:')
            .and('include.text', 'Resort Lunch Voucher')
            .and('include.text', packageName)            
            //     cy.wait(2500).then(() => {
            //     cy.log('verified in cart page')
            // })            

    })    

    it('C29863 shows correct mini cart icon number', () => {

        // Click on 'Book Lodge Only'
        lodge.BookLodge().eq(0).click()

        // Bundles pop up should be displayed
        cy.get('.inntopia-bundles' , {timeout: 60000}).should('be.visible')

        // Click on 'Resort Lunch Voucher'
        bundles.BundleOption().contains('Resort Lunch Voucher').click()

        // Click on 'Next Step'
        bundles.NextStep().eq(0).click()

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

    // }) //for repeat5

})
