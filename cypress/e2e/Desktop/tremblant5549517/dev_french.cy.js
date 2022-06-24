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
const filters=new Filters
const products=new Products

const oneBedroom = '1 Bedroom/1 Bathroom  - Sample Hotel'

describe('Single unit lodge with French', () => {

    // Cypress._.times(5, () => {

    // test rail C29719 https://alterramtnco.testrail.io/index.php?/cases/view/29719
    it('C29945 single unit -> switch to French language on the page -> add to cart', () => {

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
        
        // click on French to switch to French
        cy.get('.language-switcher').eq(1).click()   
            // cy.wait(2500)

        // Wait for page to load
        cy.get('.availability-links', {timeout: 60000}).should('be.visible')
        
        //Verify the Title of the page
        cy.url().should('eq', 'https://tremblant-sc10-dev.alterramtnco.dev/planifiez/hotels-condos/sommet-single?arrivaldate=08/09/2022&departuredate=08/12/2022&Adult=2&Child=0')

        // Click on 'Book Lodge Only'
        lodge.BookLodge().eq(0).click()
        // cy.wait(2000)

        // Bundles pop up should be visible
        bundles.BundlePopUp().should('be.visible')

    })

    // test rail C29719 https://alterramtnco.testrail.io/index.php?/cases/view/29719
    it('multi unit -> switch to French language on the page -> add to cart', () => {

        cy.viewport('macbook-13')
        cy.visit('https://tremblant-sc10-dev.alterramtnco.dev/plan/hotels-condos/sommet-multi?arrivaldate=08/16/2022&departuredate=08/23/2022&Adult=2&Child=0')
        
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
        
        // click on French to switch to French
        cy.get('.language-switcher').eq(1).click()   
            // cy.wait(2500)             

        // Wait for page to load
        cy.get('.availability-links', {timeout: 60000}).should('be.visible')
        
        //Verify the Title of the page
        cy.url().should('eq', 'https://tremblant-sc10-dev.alterramtnco.dev/planifiez/hotels-condos/sommet-multi?arrivaldate=08/16/2022&departuredate=08/23/2022&Adult=2&Child=0')

        // Click on 'Book Lodge Only'
        lodge.BookLodge().eq(0).click()
        // cy.wait(2000)

        // Bundles pop up should be visible
        bundles.BundlePopUp().should('be.visible')

    })    

    // test rail C29719 https://alterramtnco.testrail.io/index.php?/cases/view/29719
    it('activity page -> switch to French language on the page -> add to cart', () => {

        cy.viewport('macbook-13')
        cy.visit('https://tremblant-sc10-dev.alterramtnco.dev/plan/products?sc_lang=en#filters=start-date:2022-9-19')

        // if Alert is opened, then close it
        cy.get('body').then(($ele) => {
            if ($ele.find('.alerts.unread-others.opened').length > 0) {
                cy.get('.alerts-toggle').click()
            // } else {
            //     //Do Something
            }
        })       
        
        // click on French to switch to French
        cy.get('.language-switcher').eq(1).click() 
            // cy.wait(2500)            
        
        //Verify the Title of the page
        cy.url().should('eq', 'https://tremblant-sc10-dev.alterramtnco.dev/planifiez/products?sc_lang=fr-CA')

        // Click on 'Date' to open date picker
        filters.Filter().contains('Date', { matchCase: false }).click()
            .scrollIntoView()

        // Click on > to go to the next month
        filters.NextMonthArrow().eq(1).click()

        // Verify that the next month 'May' is displayed
        //cy.get('.datepicker__month').eq(1).should('include.text', 'April')
        // filters.NextMonthText().eq(0).should('include.text', NextMonthText)

        // click three times
        filters.NextMonthArrow().eq(1).click()
        filters.NextMonthArrow().eq(1).click()

        // Click on Sept 19 - check out date
        //cy.get('button[data-day="1651212000000"]').click()
        filters.CheckOut().eq(0).click()        

        // Click on 'Search' button
        filters.Update().click()
            // cy.wait(5000)    

        cy.get('.loading-spinner').should('be.visible')
        cy.get('.loading-spinner').should('not.be.visible')
            cy.wait(500)              
            
        // Click on fifth 'Add to Cart' button (5 Day - Junior Snowboard Package Rental)
        products.AddToCart().eq(4).click()

        // Bundles pop up should be visible
        cy.get('.inntopia-bundles', {timeout: 60000}).should('be.visible')

    })        

    // test rail C29719 https://alterramtnco.testrail.io/index.php?/cases/view/29719
    it('home page -> switch to French language on the page', () => {

        cy.viewport('macbook-13')
        cy.visit('https://tremblant-sc10-dev.alterramtnco.dev/')

        // if Alert is opened, then close it
        cy.get('body').then(($ele) => {
            if ($ele.find('.alerts.unread-others.opened').length > 0) {
                cy.get('.alerts-toggle').click()
            // } else {
            //     //Do Something
            }
        })     
        
        // click on French to switch to French
        cy.get('.language-switcher').eq(1).click()     
            // cy.wait(2500)

        //Verify the Title of the page
        cy.url().should('eq', 'https://tremblant-sc10-dev.alterramtnco.dev/?sc_lang=fr-CA')

    })  
    
    // test rail C29719 https://alterramtnco.testrail.io/index.php?/cases/view/29719
    it('lodge listing page -> switch to French language on the page', () => {

        cy.viewport('macbook-13')
        cy.visit('https://tremblant-sc10-dev.alterramtnco.dev/plan/hotels-condos?arrivaldate=09/12/2022&departuredate=09/19/2022&Adult=2&Child=0#_')

        // if Alert is opened, then close it
        cy.get('body').then(($ele) => {
            if ($ele.find('.alerts.unread-others.opened').length > 0) {
                cy.get('.alerts-toggle').click()
            // } else {
            //     //Do Something
            }
        })     
        
        // click on French to switch to French
        cy.get('.language-switcher').eq(1).click()     
            // cy.wait(2500)   

        //Verify the Title of the page
        cy.url().should('eq', 'https://tremblant-sc10-dev.alterramtnco.dev/planifiez/hotels-condos?arrivaldate=09/12/2022&departuredate=09/19/2022&Adult=2&Child=0#_')

    })     

    it('single unit to french then to cart', () => {
    
        cy.viewport('macbook-13')
        lodge.TRSingleUnitDev()

        // if Alert is opened, then close it
        cy.get('body').then(($ele) => {
            if ($ele.find('.alerts.unread-others.opened').length > 0) {
                cy.get('.alerts-toggle').click()
            // } else {
            //     //Do Something
            }
        })         

        // click on French to switch to French
        cy.get('.language-switcher').eq(1).click()

        // Wait for page to load
        cy.get('.availability-links', {timeout: 60000}).should('be.visible')

        // Click on 'Book Lodge Only'
        lodge.BookLodge().eq(0).click()

        // Bundles pop up should be visible
        cy.get('.inntopia-bundles', {timeout: 60000}).should('be.visible')

        // Click on 'Resort Lunch Voucher'
        bundles.BundleOption().contains('Resort Lunch Voucher').click()

        // Click on 'Next Step'
        bundles.NextStep().eq(0).click()
            // cy.wait(1500)

        // Add to Cart from Bundles
        bundles.AddToCart().click()
        // cart.Items({timeout: 30000}).should('be.visible')  
        cy.get('.cart-item', {timeout: 30000}).should('be.visible')  

        // Verify mini cart 
        //cy.get('.cart-item').should('include.text', 'Resort Lunch Voucher')
        cart.Items().should('include.text', 'Resort Lunch Voucher')
            .should('include.text', oneBedroom) 

        // Proceed to Checkout
        cart.GoToCart().click()

        cy.title().should('eq', 'Cart FR')    

    })        

    // }) //for repeat5    

})
