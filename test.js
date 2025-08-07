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


************************CSS*******************************
  :root {
    --color-main-base: #635DFF;
    --color-main-darker: #564ED1;
    --color-danger-base: #D03C38;
    --color-danger-darker: #841E2A;
    --color-text-primary: #1E212A;
    --color-text-secondary: #65676E;
    --color-neutral-light: #C9CACE;
}

.content-container {
  margin: 20px;
}

.content-container h2 {
    font-family: sans-serif;
}

.add-quote-form {
    margin-bottom: 30px;
}

.blocklist-list .blocklist-list__item {
    list-style: none;
    font-family: sans-serif;
    margin-bottom: 10px;
    border: 1px solid rgb(230, 230, 230);
    border-radius: 5px;
    padding: 5px 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.content-container .blocklist-list .blocklist-list__ips {
  font-size: 14px;
  font-style: italic;
}

.content-container .blocklist-list .blocklist-list__name {
  font-size: 18px;
  margin-bottom: 8px;
  font-weight: 600;
}

.content-container .blocklist-list .blocklist-list__delete-btn {
    font-size: 14px;
    color: white;
    border-radius: 5px;
    padding: 5px 20px;
    border: 1px solid var(--color-danger-base);
    background-color: var(--color-danger-base);
    margin-left: 10px;
}

.btn {
  cursor: pointer;
  font-size: 14px;
  color: var(--color-text-primary);
  border-radius: 5px;
  padding: 5px 20px;
  border: 1px solid var(--color-neutral-light);
  background-color: var(--color-neutral-light);
}

.btn.btn--primary {
  color: #fff;
  border-color: var(--color-main-base);
  background-color: var(--color-main-base);
}

.btn.btn--primary:hover {
  border-color: var(--color-main-darker);
  background-color: var(--color-main-darker);
}

.btn.btn--danger {
  color: #fff;
  border-color: var(--color-danger-base);
  background-color: var(--color-danger-base);
}

.btn.btn--danger:hover {
  border-color: var(--color-danger-darker);
  background-color: var(--color-danger-darker);
}

.form-field {
  margin-bottom: 16px;
}

.form-field .form-field__label {
  display: block;
  color: var(--color-text-primary);
  font-weight: 500;
  margin-bottom: 8px;
  font-family: sans-serif;
  font-size: 14px;
}

.form-field .form-field__input {
  width: 100%;
  font-family: Inter, sans-serif;
  border-radius: 5px;
  border: 1px solid var(--color-neutral-light);
  text-shadow: none;
  background: transparent;
  padding: 8px 16px;
  font-size: 14px;
  line-height: 24px;
  color: var(--color-text-primary);
  transition: box-shadow 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,border-color 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,border-width 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
}

.form-field .form-field__input:focus {
  box-shadow: rgb(99 93 255 / 25%) 0px 0px 0px 0.25em;
  border-color: var(--color-main-base);
}

.form-field .form-field__helper-text {
  font-family: Inter, sans-serif;
  font-size: 12px;
  color: var(--color-text-secondary);
  margin: 8px 0 0;
  padding: 0;
}
************************main.jsx**********************************
const BlocklistList = ({ blocklists }) => {
  return (
    <div className="blocklist-list">
      {blocklists.map((b) => {
        return (
          <div className="blocklist-list__item" key={b.id}>
            <div>
              <div className="blocklist-list__name">{b.name}</div>
              <div className="blocklist-list__ips">{b.ips}</div>
            </div>
            <button className="btn btn--danger blocklist-list__delete-btn">
              Delete
            </button>
          </div>
        )
      })}
    </div>
  );
}

const App = () => {
  const [blockLists, setBlockLists] = React.useState([
    {
      id: 1,
      name: "First Blocklist",
      ips: ["1.1.1.1", "2.2.2.2", "3.3.3.3"]
    }
  ]);
  
  const handleAddBlockList = () => {
    // Write your code here
  };

  const handleDeleteBlockList = () => {
    // Write your code here
  };

  return (
    <div className="content-container">
      <h2>Add new ip blocklist</h2>
      <form className="add-blocklist-form">
        <div className="form-field">
          <label className="form-field__label">Blocklist Name</label>
          <input
            id="name-input"
            className="form-field__input"
            placeholder="Blocklist Name..."
            name="name"
            type="text"
          />
        </div>
        <div className="form-field">
          <label className="form-field__label">Ips</label>
          <textarea 
            id="ips-input"
            placeholder="2.2.2.2, 3.3.3.3, 4.2.2.2"
            name="ips"
            className="form-field__input"
          />
          <p id="ips-input-helpertext" className="form-field__helper-text">
            Comma-separated list of ips to add to the blocklist.
          </p>
        </div>
        
        <div>
          <button 
            id="blocklist-submit" 
            className="btn btn--primary"
          >
            Add blocklist
          </button>
        </div>
      </form>

      <h2>Your blocklists</h2>
      <BlocklistList blocklists={blockLists} />
    </div>
  );
};

ReactDOM.render(
  <App />,
  document.getElementById('app')
);

