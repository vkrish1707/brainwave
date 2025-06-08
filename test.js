// Updated logic for showing tab components with loading indicator
import React, { useState, useEffect } from 'react';
import CircularProgress from '@mui/material/CircularProgress'; // Assuming you're using MUI

function HrMetricsReportsPage() {
  const [reportsData, setReportsData] = useState({});
  const [activeTab, setActiveTab] = useState(0);
  const [inProgress, setInProgress] = useState(false);

  const tabComponents = [
    { name: 'AOP + Open Reqs Report', key: 'aopOpenReqsData', component: AopAndOpenReqsReport },
    { name: 'AOP + Open Reqs EOY Report', key: 'aopAndOpenReqsEOYData', component: AopAndOpenReqsEOYReport },
    { name: 'Attainment Summary Chart', key: 'attainmentSummaryChartData', component: AttainmentSummaryChart },
    { name: 'AOP Attainment Weekly Report', key: 'weeklyAttainmentSummary', component: WeeklyAttainmentSummary },
    { name: 'Functional Team Breakdown report', key: 'functionalSummary', component: FunctionalTeamBreakdownReport },
  ];

  const { component: ActiveComponent, key: activeKey } = tabComponents[activeTab];
  const activeData = reportsData[activeKey] || [];

  return (
    <div className="reports-container">
      <div className="tabs">
        {tabComponents.map((tab, index) => (
          <button
            key={tab.name}
            className={`tab-btn ${activeTab === index ? 'active' : ''}`}
            onClick={() => setActiveTab(index)}>
            {tab.name}
          </button>
        ))}
      </div>

      <div className="carousel">
        {inProgress ? (
          <CircularProgress />
        ) : activeData.length ? (
          <ActiveComponent
            data={activeData}
            pbaTargets={reportsData.pbaTargets || []}
            quarterData={reportsData.workWeekDetails?.currentQuarter || ''}
            workWeekDetails={reportsData.workWeekDetails || {}}
          />
        ) : (
          <div>Loading data...</div>
        )}
      </div>
    </div>
  );
}