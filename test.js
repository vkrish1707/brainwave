// RDCMenuPage.js
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './RDCMenuPage.css';
import { useNavigate } from 'react-router-dom';

const menuItems = [
  {
    title: 'Dashboard',
    color: '#4CAF50',
    gridColumn: 'span 1',
    gridRow: 'span 1',
    subItems: [
      { title: 'Overview', path: '/dashboard/overview' },
      { title: 'Performance', path: '/dashboard/performance' }
    ]
  },
  {
    title: 'Reports',
    color: '#2196F3',
    gridColumn: 'span 2',
    gridRow: 'span 1',
    subItems: [
      { title: 'Monthly', path: '/reports/monthly' },
      { title: 'Annual', path: '/reports/annual' }
    ]
  },
  {
    title: 'Settings',
    color: '#9C27B0',
    gridColumn: 'span 1',
    gridRow: 'span 2',
    subItems: [
      { title: 'User Preferences', path: '/settings/preferences' },
      { title: 'System', path: '/settings/system' }
    ]
  }
];

export default function RDCMenuPage() {
  const [activeMenu, setActiveMenu] = React.useState(null);
  const navigate = useNavigate();

  const handleTileClick = (item) => {
    if (activeMenu?.title === item.title) {
      setActiveMenu(null);
    } else {
      setActiveMenu(item);
    }
  };

  const handleSubClick = (path) => {
    navigate(path);
  };

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
            className="sub-menu"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
          >
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
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* rdcMenuPage.css */

.rdc-menu-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 20px;
  padding: 30px;
  background-color: #0d1117;
  min-height: 100vh;
  color: #fff;
}

.tile {
  background-color: #1f2937;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.4);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  cursor: pointer;
  position: relative;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.tile:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.5);
}

.tile-title {
  font-size: 1.2rem;
  font-weight: 600;
  margin-bottom: 8px;
}

.tile-subitems {
  position: absolute;
  bottom: -10px;
  left: 50%;
  transform: translateX(-50%);
  background-color: #111827;
  border-radius: 8px;
  padding: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.6);
  z-index: 10;
  white-space: nowrap;
}

.tile-subitems ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.tile-subitems li {
  padding: 6px 12px;
  color: #f3f4f6;
  font-size: 0.9rem;
  border-radius: 4px;
  transition: background 0.2s;
}

.tile-subitems li:hover {
  background-color: #2563eb;
}