const {expect, assert} = require('chai');
const chai = require('chai');
chai.should();
const logger = require('../../config/logger.config');
const user = require("../../data/credentials");
const { verifyCreatedBoardUrl } = require("../../utils/helpers");

describe('Login user tests', () => {
  before(async () => {
    await browser.url(user.loginPageUrl);
  })

  // ---Expect assertion---

  it('the user is on the Trello sign-in page', async () => {
    expect(await browser.getUrl()).to.include('/login');
    logger.info('The login page was opened ');
  });

  it('the user enters their email and clicks the \'Continue\' button', async () => {
    const emailInput = $('input[data-testid="username"]');
    const signUpButton = $('button[id="login-submit"]');

    await emailInput.setValue(user.email);
    await signUpButton.click();
    logger.info('The email was filled and continue button clicked');
  });

  it('the user should see the password field', async () => {
    const passwordInput = $('input[data-testid="password"]');

    await passwordInput.waitForDisplayed({
      timeout: 15000,
      timeoutMsg: 'Password field is not displayed'
    });

    await expect(await passwordInput.isDisplayed()).to.be.true;
    logger.info('The password was presented');
  })

  it('the user enters their password and clicks the \'Log in\' button', async () => {
    const passwordInput = $('input[data-testid="password"]');
    const signUpButton = $('button[id="login-submit"]');

    await passwordInput.waitForEnabled({timeout: 15000});
    await passwordInput.setValue(user.password);
    await signUpButton.click();
    logger.info('The password was filled and sign in button clicked');
  });

  it('the user should be redirected to their Trello home page', async () => {
    const expectedUrl = user.boardsPageUrl;
    let actualUrl = '';

    await browser.waitUntil(
      async () => {
        actualUrl = await browser.getUrl();
        return actualUrl === expectedUrl;
      },
      {
        timeout: 15000,
        timeoutMsg: 'The user was not redirected to the expected URL'
      });

    expect(actualUrl).to.equal(expectedUrl);
    logger.info('The user was logged in and redirected to boards page');
  });

  // ---Should assertion---

  it('should check that user on the correct page', async () => {
    const boardPageUrl = await browser.getUrl();
    boardPageUrl.should.include(`/${user.username}/boards`)
    logger.info('The user on the boards page');
  });

  it('the user should click create board button and see a create board options list', async () => {
    const createButton = $('//button[@data-testid="header-create-menu-button"]');
    const optionsList = $('//nav[@class="IfckxJ5PbpJuxT"]');

    await createButton.waitForDisplayed({
      timeout: 15000,
      timeoutMsg: 'Create button is not displayed within 15 seconds',
    });
    (await createButton.isDisplayed()).should.to.be.true;

    await createButton.click()
    logger.info('Create button was clicked');

    await optionsList.waitForDisplayed({
      timeout: 15000,
      timeoutMsg: 'Options list is not displayed within 15 seconds'
    });
    (await optionsList.isDisplayed()).should.to.be.true;

    logger.info('The board option list was presented');
  });

  it('The user should click on create board button and open create board menu', async () => {
    const createBoardButton = $('//button[@data-testid="header-create-board-button"]');
    const createBoardMenu = $('//div[@class="q2PzD_Dkq1FVX3 pt-0"]');

    await createBoardButton.waitForDisplayed({
      timeout: 15000,
      timeoutMsg: 'Create board button is not displayed within 15 seconds'
    });
    (await createBoardButton.isDisplayed()).should.to.be.true;

    await createBoardButton.click()
    logger.info('Create board button was clicked');

    await createBoardMenu.waitForDisplayed({
      timeout: 15000,
      timeoutMsg: 'Create board menu is not displayed within 15 seconds'
    });
    (await createBoardMenu.isDisplayed()).should.to.be.true;

    logger.info('Create board menu was presented');
  });

  it('user should enter board title and click create button', async () => {
    const boardTitleField = $('//input[@data-testid="create-board-title-input"]');
    const createButton = $('//button[@data-testid="create-board-submit-button"]');

    await boardTitleField.waitForDisplayed({
      timeout: 15000,
      timeoutMsg: 'Board title field is not displayed within 15 seconds'
    });
    (await boardTitleField.isDisplayed()).should.to.be.true;

    await boardTitleField.setValue(user.boardTitle);
    await createButton.click()

    logger.info('Title for board was entered and Create button clicked');
  });

  it('should be redirected to created board page', async () => {
    const {actualUrl, expectedUrl} = await verifyCreatedBoardUrl();
    actualUrl.should.equal(expectedUrl);
    logger.info(`Redirected to the correct board page: ${actualUrl}`);
  });

  // ---Assert assertion---

  it('should focus on the first board', async () => {
    const listItem = $('//div[@class="jv7QDCKI8FPToj"]//li[1]');

    await listItem.waitForDisplayed({
      timeout: 15000,
      timeoutMsg: 'List item is not displayed within 15 seconds'
    });

    assert.isTrue(await listItem.isDisplayed(), 'List item should be displayed');
    logger.info('List item is displayed');

    await listItem.click();
    logger.info('Focussed on list item');
  });

  it('should click selected board action button', async () => {
    const boardActionButton = $('//button[contains(@class, "tRO84OJZ6FM3qm")][1]');

    await boardActionButton.waitForDisplayed({
      timeout: 15000,
      timeoutMsg: 'Board action button is not displayed within 15 seconds'
    });

    assert.isTrue(await boardActionButton.isDisplayed(), 'Board action button should be displayed');
    logger.info('Board action button is displayed');

    await boardActionButton.click();
    logger.info('Action button was clicked');
  });

  it('should close selected board', async () => {
    const closeButton = $('//button[contains(@class, "V1zfUmYP2wm_jb")]');
    const closeBoardButton = $('//button[@data-testid="popover-close-board-confirm"]');

    await closeButton.waitForDisplayed({
      timeout: 15000,
      timeoutMsg: 'Close button is not displayed within 15 seconds',
    });

    assert.isTrue(await closeButton.isDisplayed(), 'Close button should be displayed');
    logger.info('Close button is displayed');

    await closeButton.click();
    logger.info('Close button was clicked');

    await closeBoardButton.waitForDisplayed({
      timeout: 15000,
      timeoutMsg: 'Close board button is not displayed within 15 seconds',
    });

    assert.isTrue(await closeBoardButton.isDisplayed(), 'Close board button should be displayed');
    logger.info('Close board button is displayed');

    await closeBoardButton.click();
    logger.info('Close board button was clicked and board was successfully closed');
  });
});
