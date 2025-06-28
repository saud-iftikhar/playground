describe('UI Element Alignment and Consistency Tests', () => {
  const urlsToTest = ['https://dealo.com.pk/home/', 'https://dealo.com.pk/home/islamabad/']; // Key pages to test
  const breakpoints = {
    mobile: { width: 375, height: 667, name: 'mobile' },
    tablet: { width: 768, height: 1024, name: 'tablet' },
    desktop: { width: 1440, height: 900, name: 'desktop' }
  };

  // Test each important URL
  urlsToTest.forEach((url) => {
    describe(`Testing URL: ${url}`, () => {
      // Test alignment and consistency across breakpoints
      Object.values(breakpoints).forEach((breakpoint) => {
        describe(`${breakpoint.name.toUpperCase()} Viewport`, () => {
          beforeEach(() => {
            cy.viewport(breakpoint.width, breakpoint.height);
            cy.visit(url);
          });

          it('should maintain consistent text alignment', () => {
            // Check all text containers have consistent alignment
            cy.get('h1, h2, h3, p').each(($el) => {
              const textAlign = $el.css('text-align');
              expect(textAlign).to.match(/^(left|center|right|justify)$/);
              
              // Verify alignment matches design system
              if ($el.is('h1, h2')) {
                expect(textAlign).to.equal('center');
              } else {
                expect(textAlign).to.equal('left');
              }
            });
          });

          it('should maintain consistent button styling', () => {
            cy.get('button, .btn, [type="button"], [type="submit"]').each(($btn) => {
              // Verify consistent padding
              const paddingX = parseFloat($btn.css('padding-left')) + parseFloat($btn.css('padding-right'));
              const paddingY = parseFloat($btn.css('padding-top')) + parseFloat($btn.css('padding-bottom'));
              
              expect(paddingX).to.be.within(24, 48);
              expect(paddingY).to.be.within(8, 16);
              
              // Verify consistent border radius
              expect($btn.css('border-radius')).to.equal('4px');
              
              // Verify consistent hover state
              if (breakpoint.name !== 'mobile') {
                cy.wrap($btn).trigger('mouseover');
                expect($btn).to.have.css('background-color').not.equal('rgba(0, 0, 0, 0)');
              }
            });
          });

          it('should maintain consistent spacing between elements', () => {
            // Test vertical rhythm
            cy.get('section').each(($section) => {
              const marginBottom = parseFloat($section.css('margin-bottom'));
              expect(marginBottom).to.equal(breakpoint.name === 'mobile' ? 32 : 64);
            });
            
            // Test consistent gutters
            cy.get('.container').then(($container) => {
              const paddingX = parseFloat($container.css('padding-left')) + parseFloat($container.css('padding-right'));
              const expectedPadding = breakpoint.name === 'mobile' ? 16 : 
                                    breakpoint.name === 'tablet' ? 24 : 32;
              expect(paddingX).to.equal(expectedPadding);
            });
          });

          it('should maintain image aspect ratios and alignment', () => {
            cy.get('img').each(($img) => {
              // Skip icons and logos
              if ($img.width() > 50) {
                const naturalWidth = $img.prop('naturalWidth');
                const naturalHeight = $img.prop('naturalHeight');
                const displayedRatio = $img.width() / $img.height();
                const naturalRatio = naturalWidth / naturalHeight;
                
                // Allow 5% tolerance for responsive adjustments
                expect(displayedRatio).to.be.closeTo(naturalRatio, naturalRatio * 0.05);
                
                // Check image alignment
                const parent = $img.parent();
                const parentTextAlign = parent.css('text-align');
                if (parentTextAlign === 'center') {
                  expect($img.css('margin-left')).to.equal($img.css('margin-right'));
                }
              }
            });
          });

          it('should maintain consistent form element styling', () => {
            if (url === '/contact') {
              cy.get('input, textarea, select').each(($input) => {
                // Consistent border
                expect($input.css('border-width')).to.equal('1px');
                expect($input.css('border-style')).to.equal('solid');
                
                // Consistent padding
                const paddingX = parseFloat($input.css('padding-left')) + parseFloat($input.css('padding-right'));
                const paddingY = parseFloat($input.css('padding-top')) + parseFloat($input.css('padding-bottom'));
                expect(paddingX).to.equal(12);
                expect(paddingY).to.equal(8);
              });
            }
          });
        });
      });

      // Cross-device consistency tests
      describe('Cross-Device Consistency', () => {
        it('should maintain consistent color scheme across devices', () => {
          const colorsToCheck = {
            primary: 'rgb(59, 130, 246)',
            secondary: 'rgb(107, 114, 128)',
            background: 'rgb(255, 255, 255)'
          };
          
          Object.values(breakpoints).forEach((breakpoint) => {
            cy.viewport(breakpoint.width, breakpoint.height);
            cy.visit(url);
            
            cy.get('.primary-button').should('have.css', 'background-color', colorsToCheck.primary);
            cy.get('body').should('have.css', 'background-color', colorsToCheck.background);
          });
        });

        it('should maintain consistent typography hierarchy', () => {
          const typographyStyles = {
            h1: { size: { mobile: 32, tablet: 40, desktop: 48 }, weight: 700 },
            h2: { size: { mobile: 24, tablet: 32, desktop: 36 }, weight: 600 },
            p: { size: { mobile: 16, tablet: 16, desktop: 18 }, weight: 400 }
          };
          
          Object.values(breakpoints).forEach((breakpoint) => {
            cy.viewport(breakpoint.width, breakpoint.height);
            cy.visit(url);
            
            Object.entries(typographyStyles).forEach(([selector, style]) => {
              cy.get(selector).first().then(($el) => {
                const fontSize = parseFloat($el.css('font-size'));
                const fontWeight = parseFloat($el.css('font-weight'));
                
                expect(fontSize).to.equal(style.size[breakpoint.name]);
                expect(fontWeight).to.equal(style.weight);
              });
            });
          });
        });
      });

      // Visual regression tests
      describe('Visual Regression', () => {
        it('should match reference design for key sections', () => {
          const sectionsToTest = ['header', '.hero', '.features', 'footer'];
          
          Object.values(breakpoints).forEach((breakpoint) => {
            cy.viewport(breakpoint.width, breakpoint.height);
            cy.visit(url);
            
            sectionsToTest.forEach((section) => {
              if (Cypress.$(section).length > 0) {
                cy.get(section).compareSnapshot(`${url.split('/').pop() || 'home'}-${breakpoint.name}-${section.replace(/[^a-z0-9]/gi, '')}`);
              }
            });
          });
        });
      });
    });
  });
});