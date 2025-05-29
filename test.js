/* Main container */
.rdc-home {
  height: 100vh;
  width: 100%;
  background-color: #0d1117;
  padding: 40px;
  box-sizing: border-box;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

/* Grid for menu tiles */
.tile-grid {
  width: 75%;
  display: grid;
  place-content: center;
  grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
  grid-auto-rows: 100px;
  gap: 20px;
  max-width: 1400px;
  z-index: 1;
}

/* Individual tile styling */
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
  box-shadow: 0 8px 24px #ffffff;
  filter: brightness(1.05);
}

/* Modal backdrop */
.modal-overlay {
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.65);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10;
}

/* Modal box */
.modal-body {
  background-color: #1e1e2f;
  border-radius: 16px;
  padding: 30px;
  min-width: 300px;
  max-width: 600px;
  text-align: center;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.5);
  z-index: 11;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

/* Sub-items container */
.sub-items-wrapper {
  display: flex;
  flex-direction: column;
  gap: 12px;
  align-items: center;
}

/* Sub-menu item button glow style */
.sub-menu-item {
  padding: 1rem 2rem;
  border-radius: 1rem;
  font-weight: bold;
  letter-spacing: 0.1ch;
  text-transform: uppercase;
  border: 4px solid transparent;
  background: linear-gradient(#1e1e2f, #1e1e2f) padding-box,
              radial-gradient(circle at center, #00f5c4, #00a29b, transparent) border-box;
  color: white;
  position: relative;
  cursor: pointer;
  transition: transform 0.2s ease;
  background-clip: padding-box;
}
.sub-menu-item:hover {
  transform: scale(1.05);
}
.sub-menu-item:active {
  transform: scale(0.95);
}

{activeMenu && (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.3 }}
    className="modal-body"
  >
    <AnimatePresence mode="wait">
      <motion.div
        key={activeMenu.title}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="sub-items-wrapper"
      >
        {activeMenu.subItems.map((sub, i) => (
          <motion.button
            key={i}
            className="sub-menu-item"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleSubClick(sub.path)}
          >
            {sub.title}
          </motion.button>
        ))}
      </motion.div>
    </AnimatePresence>
  </motion.div>
)}
