import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ReferenceLine,
  ResponsiveContainer,
  Label
} from 'recharts';

const data = [
  { week: 'W01', month: 'Jan', fteHC: 5000, hiring: 100, attrition: 50 },
  { week: 'W02', month: 'Jan', fteHC: 5200, hiring: 200, attrition: 75 },
  { week: 'W03', month: 'Jan', fteHC: 5400, hiring: 300, attrition: 100 },
  { week: 'W10', month: 'Mar', fteHC: 5897, hiring: 288, attrition: 215 },
  { week: 'W15', month: 'Apr', fteHC: 6093, hiring: 288, attrition: 215 },
  { week: 'W20', month: 'May', fteHC: 6180, hiring: 288, attrition: 215 },
  { week: 'W26', month: 'Jul', fteHC: 6206, hiring: 288, attrition: 215 },
];

const AOPs = [
  { quarter: 'Q1', aop: 5832, color: 'orange' },
  { quarter: 'Q2', aop: 6168, color: 'orange' },
  { quarter: 'Q3', aop: 6377, color: 'orange' },
  { quarter: 'Q4', aop: 6402, color: 'orange' },
];

export default function FTEChart() {
  return (
    <div className="w-full h-[500px] p-4 bg-black">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={data}
          margin={{ top: 20, right: 60, left: 60, bottom: 60 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="week" tick={{ fill: 'white' }}>
            <Label value="Week" offset={-40} position="insideBottom" fill="white" />
          </XAxis>
          <YAxis yAxisId="left" tick={{ fill: 'white' }} domain={[5000, 7000]}>
            <Label
              angle={-90}
              position="insideLeft"
              style={{ textAnchor: 'middle', fill: 'white' }}
            >
              FTE HC
            </Label>
          </YAxis>
          <YAxis yAxisId="right" orientation="right" tick={{ fill: 'white' }} domain={[0, 1000]}>
            <Label
              angle={-90}
              position="insideRight"
              style={{ textAnchor: 'middle', fill: 'green' }}
            >
              Gross Hiring & YTD Attrition
            </Label>
          </YAxis>

          <Tooltip />
          <Legend verticalAlign="top" height={36} wrapperStyle={{ color: 'white' }} />

          {/* Quarter Reference Lines */}
          {AOPs.map((q, index) => (
            <ReferenceLine
              key={q.quarter}
              y={q.aop}
              yAxisId="left"
              stroke={q.color}
              label={{
                value: `${q.quarter} AOP ${q.aop}`,
                fill: 'orange',
                position: 'insideTopLeft',
              }}
            />
          ))}

          {/* Blue FTE Line */}
          <Line
            yAxisId="left"
            type="monotone"
            dataKey="fteHC"
            stroke="#00BFFF"
            strokeWidth={3}
            dot={false}
            name="FTE HC"
          />

          {/* Green Hiring Line */}
          <Line
            yAxisId="right"
            type="monotone"
            dataKey="hiring"
            stroke="green"
            strokeWidth={2}
            name="Gross Hiring"
          />

          {/* Red Attrition Line */}
          <Line
            yAxisId="right"
            type="monotone"
            dataKey="attrition"
            stroke="red"
            strokeWidth={2}
            name="YTD Attrition"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}