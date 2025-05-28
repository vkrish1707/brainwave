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