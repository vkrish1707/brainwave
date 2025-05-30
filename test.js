const transformForRowSpan = (data) => {
  const nameMap = {};
  const result = [];

  data.forEach((row) => {
    nameMap[row.ebvpNode] = (nameMap[row.ebvpNode] || 0) + 1;
  });

  const countMap = {};

  data.forEach((row) => {
    countMap[row.ebvpNode] = (countMap[row.ebvpNode] || 0) + 1;

    if (nameMap[row.ebvpNode] > 0) {
      const isLast = countMap[row.ebvpNode] === nameMap[row.ebvpNode];
      result.push({
        ...row,
        rowspan: nameMap[row.ebvpNode],
        isLastRowInGroup: isLast, // Add this flag
      });
      nameMap[row.ebvpNode] = 0;
    } else {
      const isLast = countMap[row.ebvpNode] === nameMap[row.ebvpNode];
      result.push({
        ...row,
        ebvpNode: '',
        rowspan: 1,
        isLastRowInGroup: isLast,
      });
    }
  });

  return result;
};