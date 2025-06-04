const hcValues = sorted.map(d => d.hc);
const hcMin = Math.min(...hcValues);
const hcMax = Math.max(...hcValues);

const paddingPercent = 0.05; // 5% padding
const hcAxisMin = Math.floor(hcMin * (1 - paddingPercent));
const hcAxisMax = Math.ceil(hcMax * (1 + paddingPercent));