.rdc-home {
  height: 95vh;
  width: 100%;
  background-color: #0d1117;
  padding: 40px;
  box-sizing: border-box;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.tile-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(var(--tile-size), 1fr));
  grid-auto-rows: var(--tile-size);
  gap: 20px;
  max-width: 1200px;
  width: 100%;
  justify-content: center;
  align-content: center;
  --tile-size: 180px;
}

React.useEffect(() => {
  const baseSize = 180;
  const totalItems = menuItems.length;
  const rows = Math.ceil(totalItems / 4); // estimate 4 tiles per row
  const idealHeight = rows * (baseSize + 20); // + gap

  const root = document.documentElement;

  if (idealHeight > window.innerHeight * 0.85) {
    const reducedSize = Math.floor((window.innerHeight * 0.8) / rows) - 20;
    root.style.setProperty('--tile-size', `${Math.max(reducedSize, 100)}px`);
  } else {
    root.style.setProperty('--tile-size', `${baseSize}px`);
  }
}, [menuItems.length]);
