/* eslint-disable */
describe('Package information app', function () {
  beforeEach(function () {
    cy.visit('http://localhost:5000');
  });

  it('front page can be opened', function () {
    cy.contains('Package information');
  });

  it('first package can be clicked', function () {
    cy.contains('accountsservice').click();
    cy.contains('accountsservice');
    cy.contains('Dependencies:');
    cy.contains('Dependent packages:');
  });

  it('first package dependency can be clicked', function () {
    cy.contains('accountsservice').click();
    cy.contains('libc6').click();
  });

  it('back to index button works', function () {
    cy.contains('accountsservice').click();
    cy.contains('BACK TO INDEX').click();
    cy.contains('Package information');
  });
});
