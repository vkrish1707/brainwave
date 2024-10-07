
import React, { useState } from 'react';
import './Sidebar.css'; // Import necessary styles

const MainComponent = () => {
  // State to manage sidebar collapse/expand
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(false);
  
  // State to handle checkbox, text input, etc.
  const [checkboxValue, setCheckboxValue] = useState(false);
  const [textInputValue, setTextInputValue] = useState('');

  // Toggle sidebar expansion
  const toggleSidebar = () => {
    setIsSidebarExpanded(!isSidebarExpanded);
  };

  // Handler for checkbox change
  const handleCheckboxChange = (event) => {
    setCheckboxValue(event.target.checked);
    // Call the function based on different selections
    updateSelection(event.target.checked, textInputValue);
  };

  // Handler for text input change
  const handleTextInputChange = (event) => {
    setTextInputValue(event.target.value);
    // Call the function based on different selections
    updateSelection(checkboxValue, event.target.value);
  };

  // Function to handle data change based on selections
  const updateSelection = (checkboxValue, textInputValue) => {
    console.log('Checkbox:', checkboxValue);
    console.log('Text Input:', textInputValue);
    // Add logic to update state, trigger an API call, or handle business logic
  };

  return (
    <div className="main-container">
      <header className="header">
        <h1>Component Header</h1>
      </header>
      
      {/* Sidebar */}
      <div className={`sidebar ${isSidebarExpanded ? 'expanded' : 'collapsed'}`}>
        <div className="hamburger-menu" onClick={toggleSidebar}>
          <span>&#9776;</span> {/* Hamburger Icon */}
        </div>

        {/* Render additional items if sidebar is expanded */}
        {isSidebarExpanded && (
          <div className="sidebar-content">
            {/* Icons */}
            <div className="icon-container">
              <i className="fas fa-home"></i> {/* Example Icon */}
              <i className="fas fa-user"></i>
              <i className="fas fa-cog"></i>
            </div>

            {/* Checkboxes */}
            <div className="checkbox-container">
              <label>
                <input type="checkbox" checked={checkboxValue} onChange={handleCheckboxChange} />
                Enable Option
              </label>
            </div>

            {/* Text Input */}
            <div className="input-container">
              <label>
                Enter Value:
                <input type="text" value={textInputValue} onChange={handleTextInputChange} />
              </label>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MainComponent;


.main-container {
  display: flex;
  height: 100vh;
}

.header {
  flex: 1;
  padding: 20px;
  background-color: #f5f5f5;
}

.sidebar {
  width: 50px; /* Default collapsed width */
  background-color: #333;
  color: white;
  height: 100vh;
  transition: width 0.3s;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  padding: 10px;
}

.sidebar.expanded {
  width: 200px; /* Expanded width */
}

.hamburger-menu {
  cursor: pointer;
  font-size: 24px;
  margin-bottom: 20px;
}

.sidebar-content {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.icon-container {
  margin-bottom: 20px;
}

.icon-container i {
  font-size: 24px;
  margin-right: 10px;
  cursor: pointer;
}

.checkbox-container,
.input-container {
  margin-bottom: 10px;
  color: white;
}

input[type="text"] {
  padding: 5px;
  margin-left: 5px;
}
