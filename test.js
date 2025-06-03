import React from 'react';
import { AgChartsReact } from 'ag-charts-react';

const WeeklyAttainmentChart = () => {
  const data = [
    { week: 'WW01', actual: 5807, offer: 117, attrition: 11, ytdAttrition: 11 },
    { week: 'WW02', actual: 5826, offer: 109, attrition: 18, ytdAttrition: 29 },
    { week: 'WW03', actual: 5786, offer: 94, attrition: 18, ytdAttrition: 47 },
    { week: 'WW04', actual: 5757, offer: 95, attrition: 5, ytdAttrition: 52 },
    { week: 'WW05', actual: 5768, offer: 90, attrition: 5, ytdAttrition: 57 },
    { week: 'WW06', actual: 5780, offer: 79, attrition: 9, ytdAttrition: 66 },
    { week: 'WW07', actual: 5783, offer: 73, attrition: 11, ytdAttrition: 77 },
    { week: 'WW08', actual: 5795, offer: 75, attrition: 5, ytdAttrition: 82 },
    { week: 'WW09', actual: 5793, offer: 66, attrition: 9, ytdAttrition: 91 },
    { week: 'WW10', actual: 5805, offer: 44, attrition: 11, ytdAttrition: 102 },
    { week: 'WW11', actual: 5809, offer: 32, attrition: 4, ytdAttrition: 106 },
    { week: 'WW12', actual: 5832, offer: 0, attrition: 5, ytdAttrition: 111 },
    { week: 'WW13', actual: 5852, offer: 144, attrition: 4, ytdAttrition: 115 },
    { week: 'WW14', actual: 5861, offer: 93, attrition: 11, ytdAttrition: 126 },
    { week: 'WW15', actual: 5870, offer: 205, attrition: 9, ytdAttrition: 135 },
    { week: 'WW16', actual: 5878, offer: 202, attrition: 2, ytdAttrition: 137 },
    { week: 'WW17', actual: 5897, offer: 182, attrition: 4, ytdAttrition: 141 },
    { week: 'WW18', actual: 5897, offer: 196, attrition: 5, ytdAttrition: 146 }
  ];

  const options1 = {
    data,
    background: { fill: '#000000' },
    title: {
      text: 'Weekly Actual HC - T&E',
      fontSize: 16,
      color: 'white',
    },
    annotations: {
      enabled: true,
      initialState: {
        annotations: [
          {
            type: 'line',
            start: { x: 'WW01', y: 5832 },
            end: { x: 'WW18', y: 5832 },
            stroke: 'orange',
            text: {
              label: 'Q1 : 5,832',
              color: 'orange',
              position: 'top',
              alignment: 'left',
            },
          },
          {
            type: 'line',
            start: { x: 'WW13', y: 6168 },
            end: { x: 'WW18', y: 6168 },
            stroke: 'orange',
            text: {
              label: 'Q2 : 6,168',
              color: 'orange',
              position: 'top',
              alignment: 'left',
            },
          }
        ]
      }
    },
    series: [
      {
        type: 'bar',
        xKey: 'week',
        yKey: 'actual',
        yName: 'Actual HC',
        stacked: true,
        fill: '#3C8DBC',
        label: {
          enabled: true,
          color: 'white'
        }
      },
      {
        type: 'bar',
        xKey: 'week',
        yKey: 'offer',
        yName: 'Offer by Start Date',
        stacked: true,
        fill: '#F39C12',
        label: {
          enabled: true,
          color: 'white'
        }
      }
    ],
    axes: [
      {
        type: 'category',
        position: 'bottom',
        label: {
          color: 'white',
        }
      },
      {
        type: 'number',
        position: 'left',
        label: {
          color: 'white'
        },
        title: {
          text: 'Headcount',
          color: 'white'
        },
        min: 5600
      }
    ],
    legend: {
      position: 'top',
      item: {
        label: {
          color: 'white'
        }
      }
    }
  };

  const options2 = {
    data,
    background: { fill: '#000000' },
    title: {
      text: 'Weekly Actual Attrition - T&E',
      fontSize: 16,
      color: 'white'
    },
    series: [
      {
        type: 'bar',
        xKey: 'week',
        yKey: 'attrition',
        yName: 'Weekly Actual Attrition',
        fill: '#F39C12',
        label: {
          enabled: true,
          color: 'white'
        }
      },
      {
        type: 'line',
        xKey: 'week',
        yKey: 'ytdAttrition',
        yName: 'Attrition YTD',
        stroke: 'blue',
        marker: {
          enabled: true,
          fill: 'blue',
          stroke: 'blue'
        },
        label: {
          enabled: false
        }
      }
    ],
    axes: [
      {
        type: 'category',
        position: 'bottom',
        label: {
          color: 'white'
        }
      },
      {
        type: 'number',
        position: 'left',
        label: {
          color: 'white'
        },
        title: {
          text: 'Attrition Count',
          color: 'white'
        },
        min: 0
      }
    ],
    legend: {
      position: 'top',
      item: {
        label: {
          color: 'white'
        }
      }
    }
  };

  return (
    <div className="w-full h-full p-4 bg-black space-y-10">
      <AgChartsReact options={options1} />
      <AgChartsReact options={options2} />
    </div>
  );
};

export default WeeklyAttainmentChart;