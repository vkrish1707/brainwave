import React, { useState } from 'react';
import EbvpHeader from './EbvpHeader';
import AopAndOpenReqsReport from './AopAndOpenReqsReport';
import OtherComponent from './OtherComponent'; // You can add more

const tabComponents = [
  { name: 'Open Reqs Report', component: AopAndOpenReqsReport },
  { name: 'Other Chart', component: OtherComponent },
  // Add more components here
];

function HrMetricsReportsPage() {
  const [activeTab, setActiveTab] = useState(0);
  const [aopAndOpenReqsData, setAopAndOpenReqsData] = useState([]);
  const [ebvpFilter, setEbvpFilter] = useState({ ebvpField: '', ebvpValue: '' });

  const handleEBVPChange = (dropDown, value) => {
    if (dropDown === 'workWeek') {
      fetchData(value);
    } else {
      setEbvpFilter({ ebvpField: dropDown, ebvpValue: value });
    }
  };

  const ActiveComponent = tabComponents[activeTab].component;

  return (
    <div className="reports-container">
      <EbvpHeader onEBVPChange={handleEBVPChange} />

      <div className="tabs">
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

      <div className="carousel">
        <ActiveComponent
          data={aopAndOpenReqsData}
          ebvpField={ebvpFilter.ebvpField}
          ebvpValue={ebvpFilter.ebvpValue}
        />
      </div>
    </div>
  );
}

export default HrMetricsReportsPage;
.reports-container {
  padding: 1rem;
  font-family: 'Segoe UI', sans-serif;
}

.tabs {
  display: flex;
  gap: 10px;
  margin-bottom: 10px;
  flex-wrap: wrap;
}

.tab-btn {
  padding: 8px 16px;
  background: #f0f0f0;
  border: 1px solid #ddd;
  cursor: pointer;
  border-radius: 6px;
  font-weight: 500;
  transition: 0.2s;
}

.tab-btn.active {
  background: #007bff;
  color: white;
  border-color: #007bff;
}

.tab-btn:hover {
  background: #e2e6ea;
}

.carousel {
  border: 1px solid #ccc;
  padding: 12px;
  border-radius: 8px;
  background: white;
  box-shadow: 0 2px 4px rgba(0,0,0,0.08);
}
