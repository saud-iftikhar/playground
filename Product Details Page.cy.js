describe('Testing the Product Details Page', () => {
  it('Visits the Dealo website', () => {
    // Visit the website
    cy.visit('https://dealo.com.pk/home/islamabad');

    // Normalize the trailing slash for comparison
    cy.url().should('include', '/home');
  });

   beforeEach(() => {
    // visit site before each test case 
      cy.visit('https://dealo.com.pk/home/islamabad');
    });

    it.only('verify the product details page', () => {
      // click on the first product under categories title 
     cy.get('.content_grey_side_icons > .row > :nth-child(1) > .online_store_grid_col').click()
     // verify the product detail url
     cy.url().should('eq', 'https://dealo.com.pk/deal/vop-217')
     // verify the product card
     cy.get('.premiu_deals_tab_col')
     // verify the product title and info
     cy.get('.deals_detail_right_content')
     // verify the related products on product detail page
     cy.get('.popular_deals_section_tabs')

    })


});
