/// <reference types="Cypress" />

import Bundles from "../../PageObjects/Bundles"
import Cart from "../../PageObjects/Cart"
import Products from "../../PageObjects/Products"
import Filters from "../../PageObjects/Filters"
import Lodge from "../../PageObjects/Lodge"

Cypress.on('uncaught:exception', (err, runnable) => {
    // returning false here prevents Cypress from
    // failing the test
    return false
})

const bundles=new Bundles
const products=new Products
const cart=new Cart
const filters=new Filters
const lodge=new Lodge

const FutureMonth = '8'  //this is for Sept
const productsFutureDate = 'https://tremblant-sc10-dev.alterramtnco.dev/plan/products#filters=start-date:2022-9-19'

// Using locationID : 2683080 Lodge de la Montagne for Test Multi and Test Single

describe('Add to cart', () => {

    // Cypress._.times(3, () => {

    // it('C31502 en - able to add single lodge with price that includes decimals', () => {

    //     cy.viewport('macbook-13')
    //     cy.visit('https://tremblant-sc10-dev.alterramtnco.dev/plan/hotels-condos/sommet-single?arrivaldate=02/07/2023&departuredate=02/14/2023&Adult=2&Child=0')
    //     // lodge.TRSingleUnitDev()
    //         // cy.wait(500)      
    
    //     // Wait for page to load
    //     cy.get('.availability-links', {timeout: 60000}).should('be.visible')
    
    //     // if Alert is opened, then close it
    //     cy.get('body').then(($ele) => {
    //         if ($ele.find('.alerts.unread-others.opened').length > 0) {
    //             cy.get('.alerts-toggle').click()
    //         // } else {
    //         //     //Do Something
    //         }
    //     })    
        
    //     // Click on 'Book Lodge Only'
    //     lodge.BookLodge().eq(0).click()

    //     // Bundles pop up should be displayed
    //     cy.get('.inntopia-bundles' , {timeout: 60000}).should('be.visible')        

    //     // click on No Thanks button
    //     bundles.NoThanks().click()

    //     // Click on 'Next Step'
    //     bundles.NextStep().click()    
    
    //     //Add to Cart from Bundles
    //     bundles.AddToCart().click()
    //     cart.Items({timeout: 10000}).should('be.visible')
    //         // cy.wait(2000)

    //     //Verify mini cart 
    //     //cy.get('.cart-item').should('include.text', 'Junior Lift Ticket - 2 day')
    //     cart.Items().should('include.text', 'Lodge de la Montagne -  Hotel Room - Queen - Sofa bed')
    //             .should('be.visible')
    //             // .and('include.text', 'Child Helmet - 5 days')
            
    //     //Go to Cart Page
    //     cart.GoToCart().click()
    //     cart.Items({timeout: 10000}).should('be.visible')

    //     // if Alert is opened, then close it
    //     cy.get('body').then(($ele) => {
    //         if ($ele.find('.alerts.unread-others.opened').length > 0) {
    //             cy.get('.alerts-toggle').click()
    //         // } else {
    //         //     //Do Something
    //         }
    //     })     

    //     //Verify the title is Cart
    //     cy.title().should('eq', 'Cart')
    //         cy.wait(1000)

    //     //Verify cart 
    //     //cy.get('.cart-item').should('include.text', 'Junior Lift Ticket - 2 day')
    //     cart.Items().should('include.text', 'Lodge de la Montagne -  Hotel Room - Queen - Sofa bed')
    //             .should('be.visible')            

    // })
    
    it('C31503 fr-ca - able to add single lodge with price that includes decimals', () => {

        cy.viewport('macbook-13')
        cy.visit('https://tremblant-sc10-dev.alterramtnco.dev/planifiez/hotels-condos/sommet-single?arrivaldate=02/07/2023&departuredate=02/14/2023&Adult=2&Child=0')
        // lodge.TRSingleUnitDev()
            // cy.wait(500)      
    
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

        // Bundles pop up should be displayed
        cy.get('.inntopia-bundles' , {timeout: 60000}).should('be.visible')        

        // click on No Thanks button
        bundles.NoThanks().click()

        // Click on 'Next Step'
        bundles.NextStep().click()    
    
        //Add to Cart from Bundles
        bundles.AddToCart().click()
        cart.Items({timeout: 10000}).should('be.visible')
            // cy.wait(2000)

        //Verify mini cart 
        //cy.get('.cart-item').should('include.text', 'Junior Lift Ticket - 2 day')
        cart.Items().should('include.text', 'Lodge de la Montagne -  Hotel Room - Queen - Sofa bed')
                .should('be.visible')
                // .and('include.text', 'Child Helmet - 5 days')
            
        //Go to Cart Page
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

        //Verify the title is Cart
        cy.title().should('eq', 'Cart')
            cy.wait(1000)

        //Verify cart 
        //cy.get('.cart-item').should('include.text', 'Junior Lift Ticket - 2 day')
        cart.Items().should('include.text', 'Lodge de la Montagne -  Hotel Room - Queen - Sofa bed')
                .should('be.visible')            

    })    

    // // }) //for repeat5    

}) 
