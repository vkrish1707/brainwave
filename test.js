const maxHC = Math.max(...reportData.map(d => d.hc || 0));
const adjustedMax = Math.ceil(maxHC * 1.3); // 30% extra