/* RDCMenuPage.css */

.rdc-home {
  height: 100vh;
  width: 100%;
  background-color: #0d1117;
  padding: 40px;
  box-sizing: border-box;
  position: relative;
  overflow: hidden;
}

.tile-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
  grid-auto-rows: 160px;
  gap: 20px;
  z-index: 1;
}

.tile {
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 20px;
  font-weight: bold;
  border-radius: 16px;
  cursor: pointer;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.25);
  user-select: none;
}

.tile:hover {
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.35);
}

.sub-menu {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: #161b22;
  padding: 40px;
  border-radius: 20px;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
  gap: 20px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
  z-index: 10;
  width: 60%;
  max-width: 800px;
  text-align: center;
}

.sub-menu-item {
  background: #222b35;
  color: #ffffff;
  padding: 20px;
  border-radius: 12px;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  transition: box-shadow 0.3s ease, background 0.3s ease;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
}

.sub-menu-item:hover {
  background: #2d3748;
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.5);
}