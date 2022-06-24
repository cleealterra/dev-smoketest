class Products {

    StartPage () {
        cy.visit('https://tremblant-uat-content.alterramtnco.dev/plan/rentals/UAT1')
        //Inntopia Sales ID : 5549517 UAT1 Inntopia ID : 15409319 Product IDs : 31,32,43,44,33,29,30 second set : 21,22,23
    }

    Filter() {
        return cy.get('.filter-type-header-text')
    }

    NextMonthText() {
        return cy.get('.datepicker__month').eq(1)
    }

    DatedPage() {
        cy.visit('https://tremblant-uat-content.alterramtnco.dev/plan/rentals/UAT1#filters=start-date:2022-3-21')
        //Inntopia Sales ID : 5549517 UAT1 Inntopia ID : 15409319 Product IDs : 31,32,43,44,33,29,30 second set : 21,22,23
    }

    //Products Folder Inntopia ID : 15409319 Super Category ID : 6 Product IDs: 31,32,43,44,33
    DevStartPage() {
        cy.visit('https://solitudemountain-dev.alterramtnco.dev/plan-your-trip/products')
    }

    sc10TrProdNoDate() {
        cy.visit('https://tremblant-sc10-uat-content.alterramtnco.dev/plan/rentals/UAT6')
    }

    UatTrProdNoDate() {
        cy.visit('https://tremblant-sc10-uat-content.alterramtnco.dev/plan/rentals/UAT1')
    }
    
    DevTrNoDate() {
        cy.visit('https://tremblant-dev.alterramtnco.dev/plan/products')
    }

    DevTrProductsDated() {
        cy.visit('https://tremblant-dev.alterramtnco.dev/plan/products#filters=start-date:2022-8-09')
    }

    TRActivityDated() {
        cy.visit('https://tremblant-sc10-dev.alterramtnco.dev/plan/products#filters=start-date:2022-8-9')
    }

    sc10TrProdDated() {
        cy.visit('https://tremblant-sc10-uat-content.alterramtnco.dev/plan/rentals/UAT6#filters=start-date:2022-8-9')
    }    

    TRActivityNoDate() {
        cy.visit('https://tremblant-sc10-dev.alterramtnco.dev/plan/products')
    }

    DevTrProductsDetailsDated() {
        cy.visit('https://tremblant-dev.alterramtnco.dev/plan/products/adult-ski-lessons#filters=start-date:2022-8-09')
    }

    TRActivityDetailDated() {
        cy.visit('https://tremblant-sc10-dev.alterramtnco.dev/plan/products/adult-ski-lessons#filters=start-date:2022-8-9')
    }

    DevDatedPage() {
        cy.visit('https://solitudemountain-dev.alterramtnco.dev/plan-your-trip/products#filters=start-date:2022-4-21')
    }
    
    sc10TrProdDetailsDated() {
        cy.visit('https://tremblant-sc10-uat-content.alterramtnco.dev/plan/rentals/uat6/junior-complete-snowboard-set#filters=start-date:2022-8-9')    
    }

    //Products Folder Inntopia ID : 15409319 Super Category ID : 6 Product IDs: 31,32,43,44,33
    DevDetailPage() {
        cy.visit('https://solitudemountain-dev.alterramtnco.dev/plan-your-trip/products/junior-snowboard-package-rental#filters=start-date:2022-4-21')
    }

    DetailPage() {
        cy.visit('https://tremblant-uat-content.alterramtnco.dev/plan/rentals/uat1/junior-complete-snowboard-set#filters=start-date:2022-4-21')
        //Inntopia Sales ID : 5549517 UAT1 Inntopia ID : 15409319 Product IDs : 31,32,43,44,33,29,30 second set : 21,22,23
    }

    DetailsButton() {
        return cy.get('.button.default')
    }

    AddToCart() {
        return cy.get('.add-to-cart')
    }

}

export default Products