/// <reference types="Cypress" />

import Lodge from "../../PageObjects/Lodge"
import Bundles from "../../PageObjects/Bundles"
import Cart from "../../PageObjects/Cart"
import HomePage from "../../PageObjects/HomePage"

Cypress.on('uncaught:exception', (err, runnable) => {
    // returning false here prevents Cypress from
    // failing the test
    return false
})

const lodge=new Lodge
const cart=new Cart
const bundles=new Bundles
const homepage = new HomePage

const oneBedroom = "1 Bedroom"
const twoBedroom = "2 Bedroom"
const packageName = 'AP TEAM Test Lodging Supplier'

const baseuUrl = 'https://tremblant-sc10-dev.alterramtnco.dev/plan/hotels-condos/sommet-multi?arrivaldate=08/09/2022&departuredate=08/12/2022&Adult=2&Child=0'

beforeEach(() => {
    
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

})

describe('Multi Unit (with bundle) Lodge Only to mini cart, should be displayed on cart pag', () => {

    // Cypress._.times(5, () => {

    it('C29732 Book Lodge Only', () => {

        // Click on 'Book Lodge Only'
        lodge.BookLodge().eq(0).click({force: true})
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
          
    })

    // C29729 https://alterramtnco.testrail.io/index.php?/cases/view/29729
    it('Availability Link Click on 2 Bedroom and switch to 1 Bedroom tab -> Book Lodge -> Bundles open', () => {
        
        // 1,2,3 bedroom availability links should be available
        lodge.AvailabilityRoomType().should('include.text', '1 Bedroom')
            .and('include.text', '2 Bedroom')
            .and('include.text', '3 Bedroom')   

        // Click on '2 Bedroom' Availability Link
        lodge.AvailabilityRoomType().contains('2 Bedroom').click()

        // Verify by the name of the room
        lodge.RoomName().should('include.text', twoBedroom)

        // Click on 'Book Lodge Only'
        lodge.BookLodge().eq(0).click()
        //   cy.wait(2000)

        // Bundles pop up should be visible
        bundles.BundlePopUp().should('be.visible')

        //Click on 'Cancel and exit' from the bundles
        //cy.get('.cancel').click()
        bundles.Cancel().click()
            // cy.wait(3000)        

        // Click on '1 Bedroom' Tab
        lodge.RoomTab().eq(0).click()

        // Verify by the name of the room
        lodge.RoomName().should('include.text', oneBedroom)

        // Click on 'Book Lodge Only'
        lodge.BookLodge().eq(0).click()
        //   cy.wait(2000)

        // Bundles pop up should be visible
        bundles.BundlePopUp().should('be.visible')

    })
    
    it('C29741 Open bundle -> cancel -> check mini cart and should be empty', () => {

        // Click on 'Book Lodge Only'
        lodge.BookLodge().eq(0).click()
        // cy.wait(3000)

        // Verify the bundles pop up window is displayed
        bundles.BundlePopUp().should('be.visible')

        //Click on 'Cancel and exit' from the bundles
        //cy.get('.cancel').click()
        bundles.Cancel().click()
            // cy.wait(3000)

        //Click on 'mini cart' to open 
        cart.MiniCart().click()

        //Verify mini cart reads Emty Cart
        cart.EmptyCart().should('include.text', 'Empty Cart')

        //Verify verbiage on the mini cart when it's empty
        cart.EmptyCartMsg().should('include.text', "There's nothing in your cart")
            // cy.wait(3000)

    })

    // C29733
    it('C29733 Click on Book Package', () => {
        
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

    // C29734
    it('C29734 Click on Customize Package', () => {

        //Click on 'Packages' 
        lodge.Packages().click()

        //Click on the first available 'Customize Package'
        lodge.CustomizePackage().eq(0).click()
            // cy.wait(1500)

        //Verify by URL
        cy.url().should('not.eq', baseuUrl)
        cy.url().should('include', 'https://reservations.tremblant.ca/ecomm/Package/PackageBuilder/5549517/en-US')

    })

    it('2 Bedroom Tab + open bundles okay', () => {

        // Verify by the name of the room
        lodge.RoomName().should('include.text', oneBedroom)

                // // click on 3 bedroom tab use this way
                // cy.get('.tabs').contains('3 Bedroom').click()

        // Click on '2 Bedroom' Tab (from inntopia-multiunit-details inntopia-filters inntopia-packages)
        lodge.TwoBedroomTab().click()

        // Verify by the name of the room
        lodge.RoomName().should('include.text', twoBedroom)

        // Click on 'Book Lodge Only'
        lodge.BookLodge().eq(0).click({force: true})
            // cy.wait(2500)

        //Bundles pop up should be visible
        bundles.BundlePopUp().should('be.visible')

        //Click on 'Cancel and exit' from the bundles
        bundles.Cancel().click()

        //Click on 'Packages' 
        lodge.Packages().click()
        // cy.wait(1000)

        //Click on 'Book This Package' 
        lodge.BookPackage().eq(1).click()
        // cy.wait(1500)

        //Click on 'Cancel and exit' from the bundles
        bundles.Cancel().click()
        // cy.wait(3000)

        //Verify mini cart reads Emty Cart
        cart.EmptyCart().should('include.text', 'Empty Cart')

        //Verify verbiage on the mini cart when it's empty
        cart.EmptyCartMsg().should('include.text', "There's nothing in your cart")

    })

    it('C29742 cancel bundles pop up on Book This Package', () => {

        // Click on 'Packages' 
        lodge.Packages().click()

        // Click on 'Book This Package' 
        lodge.BookPackage().eq(1).click()
        //    cy.wait(1500)

        //Click on 'Cancel and exit' from the bundles
        bundles.Cancel().click()
        // cy.wait(3000)

        //Verify mini cart reads Emty Cart
        cart.EmptyCart().should('include.text', 'Empty Cart')

        //Verify verbiage on the mini cart when it's empty
        cart.EmptyCartMsg().should('include.text', "There's nothing in your cart")           

    })       

    it('C29748 shows correct mini cart icon number', () => {

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
            // cy.wait(3500)
        
        // cy.get('.mini-cart-toggle-icon-number')
        cart.MiniCartNumber()
            .should('have.text', '2')      
            
        // click on Trash
        cart.Trash().click()   
            cy.wait(1500)         

        // should be 0
        cart.MiniCartNumber()
        .should('have.text', '0')  
        
    })

    // }) //for repeat5

})
