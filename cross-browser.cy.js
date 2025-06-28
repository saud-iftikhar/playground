describe('Dealo.com.pk Cross-Browser Tests', () => {
  const testPages = [
    '/',
    '/categories',
    '/deal/vop-217', // replace with actual product
    '/cart',
    '/login'
  ]

  testPages.forEach((page) => {
    it(`should load ${page} correctly`, () => {
      cy.get('body').should('be.visible')
      
    })
  })

 


})