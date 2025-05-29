// RDCMenuPage.js
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './RDCMenuPage.css';
import { useNavigate } from 'react-router-dom';

const menuItems = [
  {
    title: 'Dashboard',
    color: '#00897B',
    gridColumn: 'span 1',
    gridRow: 'span 1',
    subItems: [
      { title: 'Overview', path: '/dashboard/overview' },
      { title: 'Performance', path: '/dashboard/performance' }
    ]
  },
  // Add other items here...
];

export default function RDCMenuPage() {
  const [activeMenu, setActiveMenu] = React.useState(null);
  const navigate = useNavigate();

  const handleTileClick = (item) => {
    setActiveMenu(item);
  };

  const handleSubClick = (path) => {
    navigate(path);
    setActiveMenu(null);
  };

  const closeModal = () => setActiveMenu(null);

  return (
    <div className="rdc-home">
      <div className="tile-grid">
        {menuItems.map((item, index) => (
          <motion.div
            key={index}
            className="tile"
            style={{
              backgroundColor: item.color,
              gridColumn: item.gridColumn,
              gridRow: item.gridRow
            }}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => handleTileClick(item)}
          >
            {item.title}
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {activeMenu && (
          <motion.div
            className="modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeModal}
          >
            <motion.div
              className="modal-content"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="modal-header">
                <h2>{activeMenu.title}</h2>
                <button className="close-button" onClick={closeModal}>
                  &times;
                </button>
              </div>
              <div className="modal-body">
                {activeMenu.subItems.map((sub, i) => (
                  <motion.div
                    key={i}
                    className="sub-menu-item"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleSubClick(sub.path)}
                  >
                    {sub.title}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* RDCMenuPage.css */
.rdc-home {
  height: 95vh;
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
  place-content: center;
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
  user-select: none;
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.25);
}

.tile:hover {
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.35);
}

/* Modal Styles */
.modal-overlay {
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.65);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 99;
}

.modal-content {
  background-color: #1e1e2f;
  padding: 30px;
  border-radius: 16px;
  width: 500px;
  max-width: 90%;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.6);
  color: white;
  position: relative;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.modal-header h2 {
  font-size: 24px;
  margin: 0;
}

.close-button {
  background: none;
  border: none;
  font-size: 28px;
  color: white;
  cursor: pointer;
  transition: transform 0.2s ease;
}

.close-button:hover {
  transform: scale(1.2);
}

.modal-body {
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.sub-menu-item {
  background-color: #292b3c;
  padding: 12px 18px;
  border-radius: 10px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.sub-menu-item:hover {
  background-color: #3a3e5a;
}