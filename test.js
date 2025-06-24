valueFormatter: (params) => {
  return typeof params.value === 'number' && params.value === 0 ? '' : params.value;
}