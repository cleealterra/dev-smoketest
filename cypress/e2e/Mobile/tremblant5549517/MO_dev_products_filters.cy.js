/// <reference types="Cypress" />

import HomePage from "../../PageObjects/HomePage"
import Products from "../../PageObjects/Products"
import Filters from "../../PageObjects/Filters"

Cypress.on('uncaught:exception', (err, runnable) => {
    // returning false here prevents Cypress from
    // failing the test
    return false
})

const filters=new Filters
const products=new Products
const homepage = new HomePage
const FutureMonth = '8'  //this is for Sept

const productsAdult = 'https://tremblant-sc10-dev.alterramtnco.dev/plan/products#filters=filter1:Adult'
const productsAdultSki = 'https://tremblant-sc10-dev.alterramtnco.dev/plan/products#filters=filter1:Adult|filter2:Ski'
const productsAdultSkiGroup = 'https://tremblant-sc10-dev.alterramtnco.dev/plan/products#filters=filter1:Adult|filter2:Ski|filter3:Group'

const productsFutureDate = 'https://tremblant-sc10-dev.alterramtnco.dev/plan/products#filters=start-date:2022-9-19'
const productsClearFilter = 'https://tremblant-sc10-dev.alterramtnco.dev/plan/products#_'


//Products Page Mobile Filters

beforeEach(() => {

    cy.viewport('iphone-xr')
    products.TRActivityNoDate()
    cy.wait(3500)

    // if Alert is opened, then close it
    cy.get('body').then(($ele) => {
        if ($ele.find('.alerts.unread-others.opened').length > 0) {
            cy.get('.alerts-toggle').click()
        // } else {
        //     //Do Something
        }
    })
    
})

describe('Filters', () => {

    // Cypress._.times(3, () => {

    it('C29884 Mobile - search for a date (from a blank date)', () => {
    
        // Verify the Calendar is not displayed
        filters.DatePicker().should('not.be.visible')
            cy.scrollTo('center') 

        // Click on 'Filter Products' to open 
        // cy.get('.filter-header.accordion-title').click( {force: true} )
        filters.MobileFilters().click()
            .scrollIntoView() // Visual check

        // Verify the Calendar is now displayed
        filters.DatePicker().should('be.visible')

        // click on > to go to the next month
        // cy.get('.datepicker__next').eq(1).click()
        filters.NextMonthArrow().eq(0).click()
        filters.NextMonthArrow().eq(0).click()
        filters.NextMonthArrow().eq(0).click()

        // Verify September has been chosen
        filters.NextMonthText().eq(0).should('have.value', FutureMonth)   

        //Click on May 29 - check out date
        //cy.get('button[data-day="1651212000000"]').click()
        filters.CheckOut().eq(0).click()

        // Scroll 150px above  an element (for visual check)
        filters.MobileFilters().scrollIntoView( { offset: {bottom: 150, left: 0}})

        //Click on 'Search' button
        filters.Update().click()
        cy.wait(3000)

        //Verify by checking the URL
        cy.url().should('eq', productsFutureDate)

    })

    it('C29885 select filter items + search', () => {

        // Scroll 150px above an element (for visual check)
        filters.MobileFilters().scrollIntoView( { offset: {bottom: 150, left: 0}})

        // Click on 'Filter Products' to open 
        filters.MobileFilters().click()
        // cy.wait(1500)

        // Click on First Item (age -> adult)
        filters.FilterItem().contains('Adult').click()
        
        // Scroll 150px above an element (for visual check)
        filters.MobileFilters().scrollIntoView( { offset: {bottom: 150, left: 0}})

        // Verify above with '1' next to 'Age' 
        filters.FilteredNumber().should('have.text', '1')

        // Verify the link is updated with the filtered item
        cy.url().should('eq', productsAdult)

        // Select 'Ski' 
        filters.FilterItem().contains('Ski').click()

        // Verify above with '1' next to 'Age' 
        filters.FilteredNumber().eq(1).should('have.text', '1')

        //Verify the link is updated with the filtered item
        cy.url().should('eq', productsAdultSki)

        // Scroll 150px above an element (for visual check)
        filters.MobileFilters().scrollIntoView( { offset: {bottom: 150, left: 0}})

        // Select 'Group'
        filters.FilterItem().contains('Group').click()

        //Verify above with '1' next to 'Age' 
        filters.FilteredNumber().eq(2).should('have.text', '1')

        //Verify the link is updated with the filtered item
        cy.url().should('eq', productsAdultSkiGroup)

        // Scroll 150px above an element (for visual check)
        filters.MobileFilters().scrollIntoView( { offset: {bottom: 150, left: 0}})

        // Click on 'Search' button, should be searched with today's date + filters above
        filters.Update().click()

        // // Wait for all 'Add to Cart' buttons to show
        // cy.get('.add-to-cart*', {timeout: 25000}).should('be.visible')

        //Verify 'Search' by checking the URL
        cy.url().should('include', productsAdultSkiGroup)

    })

    it('C29886 Select filter items + clears all', () => {

        // Scroll 150px above an element (for visual check)
        filters.MobileFilters().scrollIntoView( { offset: {bottom: 150, left: 0}})

        // Click on 'Filter Products' to open 
        filters.MobileFilters().click()
        // cy.wait(1500)

        // Click on First Item (age -> adult)
        filters.FilterItem().contains('Adult').click()
        
        // Scroll 150px above an element (for visual check)
        filters.MobileFilters().scrollIntoView( { offset: {bottom: 150, left: 0}})

        // Select Ski
        filters.FilterItem().contains('Ski').click()

        // Scroll 150px above an element (for visual check)
        filters.MobileFilters().scrollIntoView( { offset: {bottom: 150, left: 0}})

        // Select Group
        filters.FilterItem().contains('Group').click()        

        // Verify the link is updated with the filtered item
        cy.url().should('eq', productsAdultSkiGroup)

        // Scroll 150px above an element (for visual check)
        filters.MobileFilters().scrollIntoView( { offset: {bottom: 150, left: 0}})

        // Click on 'Filter Products' to open 
        filters.MobileFilters().click()
            // cy.wait(1500)

        // Scroll 150px above an element (for visual check)
        filters.ClearFilters().scrollIntoView( { offset: {bottom: 150, left: 0}})

        // Verify the Calendar is not displayed
        filters.DatePicker().should('not.be.visible')

        // Verify 'Clear Filters' button is there
        filters.ClearFilters().should('be.visible')

        // Scroll 150px above an element (for visual check)
        filters.ClearFilters().scrollIntoView( { offset: {bottom: 150, left: 0}})              

        // Click on 'Clear Filters' button 
        filters.ClearFilters().click()

        // Verify 'Clear Filters' button is no longer there
        filters.ClearFilters().should('not.be.visible')

        // Verify URL 
        cy.url().should('eq',productsClearFilter)

    })

    it('Select Month from drop down + search', () => {

        // Scroll 150px above an element (for visual check)
        filters.MobileFilters().scrollIntoView( { offset: {bottom: 150, left: 0}})

        // Click on 'Filter Products' to open 
        filters.MobileFilters().click()
            // cy.wait(1500)

        // Change the month from  'April' to 'May'
        filters.NextMonthText().eq(0).select('September')

        // Verify September has been chosen
        filters.NextMonthText().eq(0).should('have.value', FutureMonth)

	
        // Scroll 150px above an element (for visual check)
        filters.MobileFilters().scrollIntoView( { offset: {bottom: 150, left: 0}})        

        // Click on May 29 - check out date
        filters.CheckOut().eq(0).click()

        // Scroll 150px above  an element (for visual check)
        filters.MobileFilters().scrollIntoView( { offset: {bottom: 150, left: 0}})
            // cy.wait(1500)

        // Click on 'Search' button
        filters.Update().click()
            // cy.wait(3000)

        // Verify by checking the URL
        cy.url().should('eq', productsFutureDate)

    })

    // }) //for repeat5

})
