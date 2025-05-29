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