const BlocklistList = ({ blocklists }) => {
  return (
    <div className="blocklist-list">
      {blocklists.map((b) => {
        return (
          <div className="blocklist-list__item" key={b.id}>
            <div>
              <div className="blocklist-list__name">{b.name}</div>
              <div className="blocklist-list__ips">{b.ips.join(', ')}</div>
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
  
  const nameRef = React.useRef(null)
  const ipsRef = React.useRef(null)
  
  const handleAddBlockList = (e) => {
    e.preventDefault();
    const name = nameRef.current.value.trim();
    const ips = ipsRef.current.value.split(',').map(ip => ip.trim()).filter(ip => ip);
    
    if(!name || ips.length == 0) return;
    
    const newBlockList = {
      id: Date.now(),
      name,
      ips
    }
    
    setBlockLists([...blockLists, newBlockList]);
    nameRef.current.value = "";
    ipsRef.current.value = "";
  };

  const handleDeleteBlockList = () => {
    setBlockLists(blockLists.filter((_, index) => index != indexToDelete));
  };

  return (
    <div className="content-container">
      <h2>Add new ip blocklist</h2>
      <form className="add-blocklist-form" onSubmit={handleAddBlockList}>
        <div className="form-field">
          <label className="form-field__label">Blocklist Name</label>
          <input
            id="name-input"
            className="form-field__input"
            placeholder="Blocklist Name..."
            name="name"
            type="text"
            ref={nameRef}
          />
        </div>
        <div className="form-field">
          <label className="form-field__label">Ips</label>
          <textarea 
            id="ips-input"
            placeholder="2.2.2.2, 3.3.3.3, 4.2.2.2"
            name="ips"
            className="form-field__input"
            ref={ipsRef}
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
      <BlocklistList blocklists={blockLists} onDelete= {handleDeleteBlockList}/>
    </div>
  );
};

ReactDOM.render(
  <App />,
  document.getElementById('app')
);
