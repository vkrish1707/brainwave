<div className="tabs">
  <div className="tab-buttons">
    {tabComponents.map((tab, index) => (
      <button
        key={tab.name}
        className={`tab-btn ${activeTab === index ? 'active' : ''}`}
        onClick={() => setActiveTab(index)}
      >
        {tab.name}
      </button>
    ))}
  </div>

  <select className="hc-dropdown" value={selectedHeadcount} onChange={handleHeadcountChange}>
    <option value="HC_REG">HC_REG</option>
    <option value="HC_COO">HC_COO</option>
    <option value="HC_OTHER">HC_OTHER</option>
  </select>
</div>

.tabs {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  margin-bottom: 10px;
}

.tab-buttons {
  display: flex;
  gap: 10px;
}

.hc-dropdown {
  padding: 6px 12px;
  border-radius: 6px;
  border: 1px solid #ccc;
  font-weight: 500;
  background: #fff;
  cursor: pointer;
}