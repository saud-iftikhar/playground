describe('Navigation Menu Tests', () => {
  const baseUrl = 'https://dealo.com.pk/'; 
  
  const menuLinks = [
    // Update hrefs to include baseUrl 
    { text: 'Home', href: `${baseUrl}/`, key: 'home' },
    { text: 'Categories', href: `${baseUrl}/categories`, key: 'categories' },
    { text: 'Cart', href: `${baseUrl}/cart`, key: 'cart' },
    { text: 'Login', href: `${baseUrl}/login`, key: 'login' },
    { text: 'About', href: `${baseUrl}/about`, key: 'about' } 
  ];

  const breakpoints = {
    mobile: { width: 375, height: 667, name: 'mobile' },
    tablet: { width: 768, height: 1024, name: 'tablet' },
    desktop: { width: 1440, height: 900, name: 'desktop' }
  };

  // Test navigation structure and links
  describe('Navigation Structure', () => {
    Object.values(breakpoints).forEach((breakpoint) => {
      it(`should display all menu items correctly on ${breakpoint.name}`, () => {
        cy.viewport(breakpoint.width, breakpoint.height);
        cy.visit(baseUrl); 
        
        if (breakpoint.name === 'mobile') {
          cy.get('[data-test="mobile-menu-button"]').should('be.visible').click();
          cy.get('[data-test="mobile-menu"]').should('be.visible');
        } else {
          cy.get('[data-test="desktop-menu"]').should('be.visible');
        }

        menuLinks.forEach((link) => {
          const selector = breakpoint.name === 'mobile' 
            ? `[data-test="mobile-menu"] a[href="${link.href}"]`
            : `[data-test="desktop-menu"] a[href="${link.href}"]`;
            
          cy.get(selector)
            .should('be.visible')
            .and('contain', link.text);
        });
      });
    });
  });

  // Test navigation functionality
  describe('Navigation Functionality', () => {
    menuLinks.forEach((link) => {
      it(`should correctly navigate to ${link.text} page from all devices`, () => {
        Object.values(breakpoints).forEach((breakpoint) => {
          cy.viewport(breakpoint.width, breakpoint.height);
          cy.visit(baseUrl);
          
          if (breakpoint.name === 'mobile') {
            cy.get('[data-test="mobile-menu-button"]').click();
            cy.get(`[data-test="mobile-menu"] a[href="${link.href}"]`).click();
          } else {
            cy.get(`[data-test="desktop-menu"] a[href="${link.href}"]`).click();
          }

          // Verify successful navigation
          cy.url().should('include', link.href.replace(baseUrl, ''));
          cy.get(`[data-test="${link.key}-page"]`).should('exist');
          
          cy.contains('h1', new RegExp(link.text, 'i')).should('exist');
          cy.document().should('have.property', 'readyState', 'complete');
        });
      });
    });
  });

  // Test active state styling
  describe('Active State Styling', () => {
    menuLinks.forEach((link) => {
      it(`should show active state for ${link.text} link when on that page`, () => {
        Object.values(breakpoints).forEach((breakpoint) => {
          cy.viewport(breakpoint.width, breakpoint.height);
          cy.visit(link.href); 
          
          if (breakpoint.name === 'mobile') {
            cy.get('[data-test="mobile-menu-button"]').click();
          }

          const selector = breakpoint.name === 'mobile'
            ? `[data-test="mobile-menu"] a[href="${link.href}"]`
            : `[data-test="desktop-menu"] a[href="${link.href}"]`;
            
          cy.get(selector)
            .should('have.class', 'active')
            .and('have.css', 'font-weight', '700')
            .and('have.css', 'color', 'rgb(59, 130, 246)');
        });
      });
    });
  });


});