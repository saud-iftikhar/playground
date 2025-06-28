describe('Testing the search functionality', () => {
  it('Visit the Dealo website', () => {
    // Visit the website
    cy.visit('https://dealo.com.pk/home/');
    // Check the current URL matches
    cy.url().should('eq', 'https://dealo.com.pk/home');
    // You can also check it contains a part of the URL
    cy.url().should('include', '/home');
  });

     beforeEach(() => {
      cy.visit('https://dealo.com.pk/home');
    });

  
    it('Verify the existance of Search Field', () => {
    // Verify the Search Field
    cy.get('.select-styled').should('be.visible');
  });


  it('Verify the Search product functionality by typing some keyword in search field', () => {
    // Click the Search City Text field
    cy.get('.select-styled').click()
  // Choose the islamabad city in dropdown menu  
  cy.get('[rel="https://dealo.com.pk/home/islamabad"]').click()
  // verify the islamabad city page url 
  cy.url().should('eq', 'https://dealo.com.pk/home/islamabad')

  // access the search option in the header
  cy.get('.header_search_etuter > .search_pop').click()

  // search a product by inputing product name
  cy.get('#search_id').click().type('Cafe Cheeno')
  cy.get('.submit_search_btn_ico > .fa-solid').click()
  cy.url().should('eq', 'https://dealo.com.pk/search')
  cy.get('.online_store_grid_col')
  });
  
});
