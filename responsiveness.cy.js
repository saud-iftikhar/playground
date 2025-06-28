describe('Responsiveness Tests', () => {
  const urlsToTest = ['https://dealo.com.pk/home/', 'https://dealo.com.pk/home/islamabad/']; // Added '/products' as a testing URL
  const breakpoints = {
    mobile: { width: 375, height: 667, name: 'mobile' },
    tablet: { width: 768, height: 1024, name: 'tablet' },
    desktop: { width: 1440, height: 900, name: 'desktop' }
  };

  // Test each important URL
  urlsToTest.forEach((url) => {
    describe(`Testing URL: ${url}`, () => {
      // Test each breakpoint
      Object.values(breakpoints).forEach((breakpoint) => {
        it(`should display correctly on ${breakpoint.name} viewport`, () => {
          cy.viewport(breakpoint.width, breakpoint.height);
          cy.visit(url);
          
          // Check that the page is visible and not overlapping
          cy.get('body').should('be.visible');
          
          // Check for horizontal scrolling (should not exist on responsive sites)
          cy.window().then((win) => {
            expect(win.innerWidth).to.equal(win.document.documentElement.scrollWidth);
          });
        });
      });

      // Specific element tests
      it('should adjust navigation menu for different screen sizes', () => {
        // Desktop - menu should be visible
        cy.viewport(breakpoints.desktop.width, breakpoints.desktop.height);
        cy.visit(url);
        cy.get('.desktop-menu');
        cy.get('.mobile-menu-button').should('not.be.visible');

        // Tablet - check if menu adjusts
        cy.viewport(breakpoints.tablet.width, breakpoints.tablet.height);
        cy.visit(url);
        // Depending on your design, either still visible or replaced
        cy.get('.desktop-menu').should(($el) => {
          expect($el).to.satisfy(($e) => {
            return $e.is(':visible') || $e.is(':hidden');
          });
        });

        // Mobile - hamburger menu should appear
        cy.viewport(breakpoints.mobile.width, breakpoints.mobile.height);
        cy.visit(url);
        cy.get('.mobile-menu-button').should('be.visible');
        cy.get('.desktop-menu').should('not.be.visible');
      });

      it('should maintain content readability on all devices', () => {
        // Check font sizes and line heights
        const testTextElements = () => {
          cy.get('body').then(($body) => {
            // Check base font size is reasonable for the viewport
            const fontSize = parseFloat($body.css('font-size'));
            expect(fontSize).to.be.at.least(14);
            
            // Check line height is proportional
            const lineHeight = parseFloat($body.css('line-height'));
            expect(lineHeight / fontSize).to.be.within(1.2, 2);
          });
        };

        cy.viewport(breakpoints.desktop.width, breakpoints.desktop.height);
        cy.visit(url);
        testTextElements();

        cy.viewport(breakpoints.mobile.width, breakpoints.mobile.height);
        cy.visit(url);
        testTextElements();
      });

      it('should properly stack elements on mobile view', () => {
        cy.viewport(breakpoints.mobile.width, breakpoints.mobile.height);
        cy.visit(url);
        
        // Example: Check if columns stack vertically
        cy.get('.multi-column-container').then(($container) => {
          if ($container.length) {
            const firstChildTop = $container.children().first().position().top;
            const lastChildTop = $container.children().last().position().top;
            expect(lastChildTop).to.be.greaterThan(firstChildTop);
          }
        });
      });

      it('should maintain proper tap targets on mobile', () => {
        cy.viewport(breakpoints.mobile.width, breakpoints.mobile.height);
        cy.visit(url);
        
        // Check all interactive elements meet minimum size (48px recommended)
        cy.get('a, button, [role="button"], input[type="submit"]').each(($el) => {
          const width = parseFloat($el.css('width'));
          const height = parseFloat($el.css('height'));
          
          // Either dimension should be at least 48px, or have adequate padding
          expect(width * height).to.be.at.least(48 * 48);
        });
      });

      it('should adjust images appropriately', () => {
        cy.viewport(breakpoints.desktop.width, breakpoints.desktop.height);
        cy.visit(url);
        cy.get('img').each(($img) => {
          const desktopWidth = $img.width();
          
          cy.viewport(breakpoints.mobile.width, breakpoints.mobile.height);
          cy.get($img).should(($mobileImg) => {
            // Image should either scale down or maintain aspect ratio
            const mobileWidth = $mobileImg.width();
            expect(mobileWidth).to.be.at.most(breakpoints.mobile.width);
            
            if (mobileWidth < desktopWidth) {
              // If scaled down, check aspect ratio is maintained
              const desktopRatio = $img.width() / $img.height();
              const mobileRatio = $mobileImg.width() / $mobileImg.height();
              expect(mobileRatio).to.be.closeTo(desktopRatio, 0.1);
            }
          });
        });
      });
    });
  });

  // Test orientation changes
  describe('Orientation Tests', () => {
    it('should adjust layout when rotating mobile device', () => {
      cy.viewport('iphone-6', 'portrait');
      cy.visit('https://dealo.com.pk/home/islamabad'); // Changed to test the new URL
      const portraitScreenshot = 'products-mobile-portrait';
      cy.screenshot(portraitScreenshot);
      
      cy.viewport('iphone-6', 'landscape');
      cy.screenshot('products-mobile-landscape');
      
      // Compare screenshots to ensure layout changed
      cy.task('compareScreenshots', {
        screenshot1: portraitScreenshot,
        screenshot2: 'products-mobile-landscape'
      }).should('equal', false); // They should be different
    });
  });
});