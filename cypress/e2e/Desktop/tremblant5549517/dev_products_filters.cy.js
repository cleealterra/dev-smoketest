/// <reference types="Cypress" />

import HomePage from "../../PageObjects/HomePage"
import Products from "../../PageObjects/Products"
import Filters from "../../PageObjects/Filters"


Cypress.on('uncaught:exception', (err, runnable) => {
    // returning false here prevents Cypress from
    // failing the test
    return false
})

const products=new Products
const filters=new Filters
const FutureMonth = '8'  //this is for Sept
const homepage = new HomePage

const productsFutureDate = 'https://tremblant-sc10-dev.alterramtnco.dev/plan/products#filters=start-date:2022-9-19'
const productsClearFilter = 'https://tremblant-sc10-dev.alterramtnco.dev/plan/products#_'

beforeEach(() => {
    
    cy.viewport('macbook-13')
    products.TRActivityNoDate()
        // cy.wait(500)

    // // Close the Alert
    // homepage.Alert().click()        

    // // cy.get('.loading-spinner').should('be.visible')
    // cy.get('.loading-spinner').should('not.be.visible')
        cy.wait(3500)    
        cy.get('.loading-spinner', {timeout: 60000}).should('not.be.visible')

    // if Alert is opened, then close it
    cy.get('body').then(($ele) => {
        if ($ele.find('.alerts.unread-others.opened').length > 0) {
            cy.get('.alerts-toggle').click()
        // } else {
        //     //Do Something
        }
    })
  
})

describe('Products filters', () => {

    // Cypress._.times(5, () => {

    it('C29772 search for a date (from a blank date)', () => {
        
        // Verify the Calendar is not displayed
        filters.DatePicker().should('not.be.visible')

        // Click on 'Date' to open date picker
        filters.Filter().contains('Date', { matchCase: false }).click()
            .scrollIntoView()

        // Click on > to go to the next month
        filters.NextMonthArrow().eq(1).click()

        // Verify that the next month 'May' is displayed
        //cy.get('.datepicker__month').eq(1).should('include.text', 'April')
        // filters.NextMonthText().eq(0).should('include.text', NextMonthText)

        // click three times
        // filters.NextMonthArrow().eq(1).click()
        filters.NextMonthArrow().eq(1).click()
	
        // Verify September has been chosen
        filters.NextMonthText().eq(0).should('have.value', FutureMonth)     
        
        // Click on Sept 19 - check out date
        //cy.get('button[data-day="1651212000000"]').click()
        filters.CheckOut().eq(0).click()

        // Visual Check
        filters.Filter().contains('Date', { matchCase: false }).scrollIntoView()

        // Click on 'Search' button
        filters.Update().click()
            // cy.wait(5000)

        // view 'Book Lodge' 
        cy.get('.filters-v2.accordion').scrollIntoView( { offset: {top: -550, left: 0}})        

        // Verify by checking the URL
        cy.url().should('eq', productsFutureDate)
            // cy.wait(2500).then(() => {
            // cy.log('Search Date')
        // })  

    })

    it('C29773 able to select age filter and clear filter', () => {

        // Click on 'Date' to open date picker
        filters.Filter().contains('Age').click()

        // Click on First Item
        // cy.get('[data-key="Peewee 3 to 4"]').click()
        filters.FilterItem().eq(0).click()

        //Verify above with '1' next to 'Age' 
        // cy.get('.filter-type-checked-counter.shown').should('have.text', '1')
        filters.FilteredNumber().should('have.text', '1')
            cy.scrollTo('center') 

        //Verify 'Clear Filters' button is there
        //cy.get('.clear-filters').should('be.visible')
        filters.ClearFilters().should('be.visible')

        // Click on 'Clear Filters' button 
        filters.ClearFilters().click()
            cy.scrollTo('center')

        //Verify 'Clear Filters' button is no longer there
        filters.ClearFilters().should('not.be.visible')

        // Verify 'Clear Filter' worked by checking the URL
        cy.url().should('eq', productsClearFilter)

    })

    it('Category filter, select option, clear filters', () => {

        // Click on 'Date' to open date picker
        filters.Filter().contains('Category').click()
            cy.scrollTo('center')

        // Click on 'Snowboard' option
        // cy.get('[data-key="Snowboard"').click()
        filters.FilterItem().contains('Snowboard').click()

        // Verify above with '1' next to 'Age' 
        filters.FilteredNumber().should('have.text', '1')
            cy.scrollTo('center')

        // Verify 'Clear Filters' button is there
        //cy.get('.clear-filters').should('be.visible')
        filters.ClearFilters().should('be.visible')

        // Click on 'Clear Filters' button 
        filters.ClearFilters().click()
            cy.scrollTo('center')

        // Verify 'Clear Filters' button is no longer there
        filters.ClearFilters().should('not.be.visible')

        // Verify 'Clear Filter' worked by checking the URL
        cy.url().should('eq', productsClearFilter)

    })

    it('Type of equipment filter, select option, clear filters', () => {
        
        // Verify 'Clear Filters' button is not there at start
        //cy.get('.clear-filters').should('be.visible')
            cy.scrollTo('center')
        filters.ClearFilters().should('not.be.visible')

        // Click on 'Date' to open date picker
        filters.Filter().contains('Type').click()

        // Click on 'Group' option
        filters.FilterItem().contains('Group').click()

        // Verify above with '1' next to 'Age' 
        filters.FilteredNumber().should('have.text', '1')

        // Verify 'Clear Filters' button is there
        //cy.get('.clear-filters').should('be.visible')
        filters.ClearFilters().should('be.visible')

        // Click on 'Clear Filters' button 
        filters.ClearFilters().click()

        // Verify 'Clear Filters' button is no longer there
        filters.ClearFilters().should('not.be.visible')
            cy.scrollTo('center')

        // Verify 'Clear Filter' worked by checking the URL
        cy.url().should('eq', productsClearFilter)

    })
    
    // }) //for repeat5    

}) 

