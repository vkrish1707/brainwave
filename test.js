import React from 'react';

const NodeBoxes = ({ nodes }) => {
  return (
    <div style={{ display: 'flex', gap: '5px', padding: '10px' }}>
      {nodes.map((node, index) => (
        <div
          key={index}
          style={{
            width: '50px',
            height: '50px',
            backgroundColor: node.color,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            color: '#fff', // Text color is white for contrast
            fontWeight: 'bold',
            border: '1px solid #000', // Optional border to define the box
          }}
        >
          {node.value}
        </div>
      ))}
    </div>
  );
};

// Usage example
const nodes = [
  { color: '#0070C0', value: 'N7' },
  { color: '#00B050', value: 'N6' },
  { color: '#7030A0', value: 'N5' },
  { color: '#FFC000', value: 'N4' },
  { color: '#00B0F0', value: 'N3' },
  { color: '#FFC0CB', value: 'N2' },
];

const App = () => (
  <div>
    <h2>Node Boxes</h2>
    <NodeBoxes nodes={nodes} />
  </div>
);

export default App;