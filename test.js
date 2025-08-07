const puppeteer = require('puppeteer');
const { expect } = require('chai');

describe('Blocklist Management Application', () => {
  let browser;
  let page;
  let nameInputField;
  let ipsInputField;
  let submitButton;

  it('should load the page for simple test', async () => {
    browser = await puppeteer.launch({
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
      ],
    });
    page = await browser.newPage();
    await page.goto(`${process.env.FRONTEND_PREVIEW_URL}index.html`, { waitUntil: 'load' });
  }).timeout(5000);

  it('should find elements simple test', async () => {
    nameInputField = await page.$('#name-input');
    ipsInputField = await page.$('#ips-input');
    submitButton = await page.$('#blocklist-submit');
  
    expect(!!nameInputField).to.be.true;
    expect(!!ipsInputField).to.be.true;
    expect(!!submitButton).to.be.true;
  }).timeout(1000);
  
  it('should display ips comma separted in blocklist list', async () => {
    await expectBlocklistsToBe([
      { name: 'First Blocklist', ips: ["1.1.1.1", "2.2.2.2", "3.3.3.3"] }, 
    ]);
  }).timeout(1000);
  
  it('should not submit empty form', async () => {
    await submitButton.click();

    await expectBlocklistsToBe([
      { name: 'First Blocklist', ips: ["1.1.1.1", "2.2.2.2", "3.3.3.3"] }, 
    ]);
  }).timeout(1000);

  it('should add 2 blocklists', async () => {
    await nameInputField.type('My Blocklist 1');
    await ipsInputField.type('1.2.3.4, 5.6.7.8');
    await submitButton.click();
    await nameInputField.type('My Blocklist 2');
    await ipsInputField.type('2.3.4.5, 6.7.8.9');
    await submitButton.click();

    await expectBlocklistsToBe([
      { name: 'First Blocklist', ips: ["1.1.1.1", "2.2.2.2", "3.3.3.3"] }, 
      { name: 'My Blocklist 1', ips: ["1.2.3.4", "5.6.7.8"] }, 
      { name: 'My Blocklist 2', ips: ['2.3.4.5', '6.7.8.9'] }, 
    ]);
  }).timeout(1000);

  it('should delete "First Blocklist"', async () => {
    const firstBlocklistDeleteButton = await page.$('.blocklist-list__delete-btn');
    await firstBlocklistDeleteButton.click();
    
    await expectBlocklistsToBe([
      { name: 'My Blocklist 1', ips: ["1.2.3.4", "5.6.7.8"] }, 
      { name: 'My Blocklist 2', ips: ['2.3.4.5', '6.7.8.9'] }, 
    ]);
  }).timeout(1000);

  it('should add "My Blocklist 3" and delete "My Blocklist 2"', async () => {
    // Add "My Blocklist 3"
    await nameInputField.type('My Blocklist 3');
    await ipsInputField.type('3.4.5.6, 7.8.9.0');
    await submitButton.click();

    // Delete "My Blocklist 2"
    const myBlocklist2DeleteButton = (await page.$$('.blocklist-list__delete-btn'))[1];
    await myBlocklist2DeleteButton.click();

    await expectBlocklistsToBe([
      { name: 'My Blocklist 1', ips: ["1.2.3.4", "5.6.7.8"] }, 
      { name: 'My Blocklist 3', ips: ['3.4.5.6', '7.8.9.0'] }, 
    ]);
  }).timeout(1000);

  it('should delete all blocklists', async () => {
    // Find all delete buttons
    const blocklistDeleteButtons = await page.$$('.blocklist-list__delete-btn');
    await blocklistDeleteButtons[0].click();
    await blocklistDeleteButtons[1].click();

    await expectBlocklistListToBeEmpty();
  }).timeout(1000);

  it('should add 4 quotes with duplicated names', async () => {
    // Add "My Blocklist"
    await nameInputField.type('My Blocklist');
    await ipsInputField.type('4.5.6.7, 8.9.0.1, 1.1.1.1');
    await submitButton.click();

    // Add "My Blocklist"
    await nameInputField.type('My Blocklist');
    await ipsInputField.type('4.5.6.7, 8.9.0.1, 2.1.1.1');
    await submitButton.click();
    
        // Add "My Blocklist"
    await nameInputField.type('My Blocklist');
    await ipsInputField.type('4.5.6.7, 8.9.0.1, 3.1.1.1');
    await submitButton.click();

    // Add "My Blocklist"
    await nameInputField.type('My Blocklist');
    await ipsInputField.type('4.5.6.7, 8.9.0.1, 4.1.1.1');
    await submitButton.click();
    
    await expectBlocklistsToBe([
      { name: 'My Blocklist', ips: ["4.5.6.7", "8.9.0.1", "1.1.1.1"] },
      { name: 'My Blocklist', ips: ["4.5.6.7", "8.9.0.1", "2.1.1.1"] },
      { name: 'My Blocklist', ips: ["4.5.6.7", "8.9.0.1", "3.1.1.1"] },
      { name: 'My Blocklist', ips: ["4.5.6.7", "8.9.0.1", "4.1.1.1"] },
    ]);
  }).timeout(2000);

  it('should delete second "My Blocklist"', async () => {
    // Find all delete buttons
    const blocklistDeleteButtons = await page.$$('.blocklist-list__delete-btn');

    // Delete second "My Blocklist"
    await blocklistDeleteButtons[1].click();
  
    await expectBlocklistsToBe([
      { name: 'My Blocklist', ips: ["4.5.6.7", "8.9.0.1", "1.1.1.1"] },
      { name: 'My Blocklist', ips: ["4.5.6.7", "8.9.0.1", "3.1.1.1"] },
      { name: 'My Blocklist', ips: ["4.5.6.7", "8.9.0.1", "4.1.1.1"] },
    ]);
  }).timeout(1000);

  it('should delete last blocklist', async () => {
    // Find all delete buttons
    const blocklistDeleteButtons = await page.$$('.blocklist-list__delete-btn');

    // Delete last "My Blocklist"
    await blocklistDeleteButtons[2].click();

    await expectBlocklistsToBe([
      { name: 'My Blocklist', ips: ["4.5.6.7", "8.9.0.1", "1.1.1.1"] },
      { name: 'My Blocklist', ips: ["4.5.6.7", "8.9.0.1", "3.1.1.1"] },
    ]);
  }).timeout(1000);

  const expectBlocklistsToBe = async (expected) => {
    const blockListsNamesText = await page.$$eval('.blocklist-list__item .blocklist-list__name', (nodes) => {
      return nodes.map((n) => n.innerHTML);
    });
    
    const blocklistsIpsText = await page.$$eval('.blocklist-list__item .blocklist-list__ips', (nodes) => {
      return nodes.map((n) => n.innerHTML);
    });
    
    const mergedValues = blockListsNamesText.map((name, i) => {
      return {
        name,
        ips: blocklistsIpsText[i],
      }
    });
    
    const formattedExpected = expected.map(e => ({
      ...e,
      ips: e.ips.join(", ")
    }))
    
    expect(mergedValues).to.be.deep.equal(formattedExpected);
  };

  const expectBlocklistListToBeEmpty = async () => expectBlocklistsToBe([]);

  after(() => {
    browser.close();
  });
});
