previousQuarter: (() => {
    const i = quarters.indexOf(currentQuarter);
    if (i > 0) {
        return `${quarters[i - 1]}_${year}`;
    } else {
        return `Q4_${year - 1}`;
    }
})(),
nextQuarter: (() => {
    const i = quarters.indexOf(currentQuarter);
    if (i < 3) {
        return `${quarters[i + 1]}_${year}`;
    } else {
        return `Q1_${year + 1}`;
    }
})(),