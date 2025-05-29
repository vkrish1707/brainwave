// Updated RDCMenuPage.js with immersive transition for active tile
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './RDCMenuPage.css';
import { useNavigate } from 'react-router-dom';

const menuItems = [
  {
    title: 'Dashboard',
    color: '#0F4C75',
    gridColumn: 'span 1',
    gridRow: 'span 1',
    subItems: [
      { title: 'Overview', path: '/dashboard/overview' },
      { title: 'Performance', path: '/dashboard/performance' }
    ]
  },
  {
    title: 'Reports',
    color: '#3282B8',
    gridColumn: 'span 2',
    gridRow: 'span 1',
    subItems: [
      { title: 'Monthly', path: '/reports/monthly' },
      { title: 'Annual', path: '/reports/annual' }
    ]
  },
  {
    title: 'Settings',
    color: '#1B262C',
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
  const [clickedIndex, setClickedIndex] = React.useState(null);
  const navigate = useNavigate();

  const handleTileClick = (item, index) => {
    if (activeMenu?.title === item.title) {
      setActiveMenu(null);
      setClickedIndex(null);
    } else {
      setActiveMenu(item);
      setClickedIndex(index);
    }
  };

  const handleSubClick = (path) => {
    navigate(path);
  };

  return (
    <div className="rdc-home">
      <div className="tile-grid">
        <AnimatePresence>
          {menuItems.map((item, index) => (
            <motion.div
              key={index}
              className="tile"
              style={{
                backgroundColor: item.color,
                gridColumn: item.gridColumn,
                gridRow: item.gridRow,
                zIndex: activeMenu && clickedIndex === index ? 2 : 0
              }}
              whileHover={!activeMenu ? { scale: 1.03 } : {}}
              whileTap={!activeMenu ? { scale: 0.97 } : {}}
              onClick={() => handleTileClick(item, index)}
              initial={{ opacity: 1 }}
              animate={{
                opacity: activeMenu && clickedIndex !== index ? 0 : 1,
                scale: activeMenu && clickedIndex === index ? 1.1 : 1,
                x: activeMenu && clickedIndex === index ? -100 : 0,
                y: activeMenu && clickedIndex === index ? -100 : 0
              }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
            >
              {item.title}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {activeMenu && (
          <motion.div
            className="sub-menu-floating"
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