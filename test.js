import React from 'react';
import { AgChartsReact } from 'ag-charts-react';

const FTEChartAg = () => {
  const options = {
    theme: 'ag-default-dark',
    background: { fill: '#000000' },
    title: {
      text: 'T&E 2025 AOP Attainment Summary – FTE HC',
      fontSize: 18,
      color: 'white',
    },
    subtitle: {
      text: 'Total FTE HC: 5897 | YTD Hire: 288 / YTD Attrition: 215',
      fontSize: 14,
      color: 'white',
    },
    data: [
      { week: 'W01', month: 'Jan', fteHC: 5000, hiring: 0, attrition: 0 },
      { week: 'W02', month: 'Jan', fteHC: 5100, hiring: 50, attrition: 20 },
      { week: 'W05', month: 'Feb', fteHC: 5300, hiring: 150, attrition: 50 },
      { week: 'W10', month: 'Mar', fteHC: 5897, hiring: 288, attrition: 215 },
      { week: 'W15', month: 'Apr', fteHC: 6093, hiring: 288, attrition: 215 },
      { week: 'W20', month: 'May', fteHC: 6180, hiring: 288, attrition: 215 },
      { week: 'W26', month: 'Jul', fteHC: 6206, hiring: 288, attrition: 215 },
    ],
    series: [
      {
        type: 'line',
        xKey: 'week',
        yKey: 'fteHC',
        yName: 'FTE HC',
        stroke: '#00BFFF',
        marker: { enabled: false },
        yAxisKey: 'leftAxis',
      },
      {
        type: 'line',
        xKey: 'week',
        yKey: 'hiring',
        yName: 'Gross Hiring',
        stroke: 'green',
        marker: { enabled: false },
        yAxisKey: 'rightAxis',
      },
      {
        type: 'line',
        xKey: 'week',
        yKey: 'attrition',
        yName: 'YTD Attrition',
        stroke: 'red',
        marker: { enabled: false },
        yAxisKey: 'rightAxis',
      },
    ],
    axes: [
      {
        type: 'category',
        position: 'bottom',
        title: {
          text: 'Week',
          enabled: true,
          color: 'white',
        },
        label: {
          color: 'white',
          rotation: -45,
        },
      },
      {
        type: 'number',
        position: 'left',
        keys: ['fteHC'],
        title: {
          text: 'FTE HC',
          enabled: true,
          color: 'white',
        },
        label: {
          color: 'white',
        },
      },
      {
        type: 'number',
        position: 'right',
        keys: ['hiring', 'attrition'],
        title: {
          text: 'Gross Hiring & YTD Attrition',
          enabled: true,
          color: 'white',
        },
        label: {
          color: 'white',
        },
      },
    ],
    annotations: [
      {
        type: 'line',
        y: 5832,
        stroke: 'orange',
        label: {
          text: 'Q1 AOP 5,832',
          position: 'topLeft',
          color: 'orange',
        },
      },
      {
        type: 'line',
        y: 6168,
        stroke: 'orange',
        label: {
          text: 'Q2 AOP 6,168',
          position: 'topLeft',
          color: 'orange',
        },
      },
      {
        type: 'line',
        y: 6377,
        stroke: 'orange',
        label: {
          text: 'Q3 AOP 6,377',
          position: 'topLeft',
          color: 'orange',
        },
      },
      {
        type: 'line',
        y: 6402,
        stroke: 'orange',
        label: {
          text: 'Q4 AOP 6,402',
          position: 'topLeft',
          color: 'orange',
        },
      },
    ],
    legend: {
      position: 'bottom',
      item: { label: { color: 'white' } },
    },
  };

  return (
    <div className="w-full h-[550px] p-4 bg-black">
      <AgChartsReact options={options} />
    </div>
  );
};

export default FTEChartAg;