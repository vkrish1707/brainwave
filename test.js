import React, { useState, useEffect } from 'react';
import { AgCharts } from 'ag-charts-react';

const HireTerminationScatterChart = ({ hireTermData }) => {
  const [totalCounts, setTotalCounts] = useState({ hires: 0, terminations: 0 });

  useEffect(() => {
    if (!hireTermData?.length) {
      setTotalCounts({ hires: 0, terminations: 0 });
      return;
    }

    const totals = hireTermData.reduce(
      (acc, item) => {
        acc.hires += item.hires || 0;
        acc.terminations += item.terminations || 0;
        return acc;
      },
      { hires: 0, terminations: 0 }
    );

    setTotalCounts(totals);
  }, [hireTermData]);

  return (
    <div>
      <h3>Total Hires: {totalCounts.hires}</h3>
      <h3>Total Terminations: {totalCounts.terminations}</h3>

      {/* Chart component goes here */}
      <AgCharts options={{ /* chart config */ }} />
    </div>
  );
};

export default HireTerminationScatterChart;