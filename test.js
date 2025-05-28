import React from 'react';
import './NewHeader.css';
import SettingsIcon from '@mui/icons-material/Settings';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';

const NewHeader = () => {
  return (
    <header className="new-header">
      <div className="header-left">
        <img src="/assets/amd-logo.png" alt="AMD Ops" className="logo" />
        <span className="breadcrumb">RDC Home</span>
      </div>

      <div className="header-center">
        <div className="title">R&D Central Operations Dashboard</div>
        <div className="subtitle">AMD Confidential</div>
      </div>

      <div className="header-right">
        <SettingsIcon className="icon" />
        <HelpOutlineIcon className="icon" />
        <span className="username">sshong</span>
        <img src="/assets/profile-placeholder.png" alt="Profile" className="profile-pic" />
      </div>
    </header>
  );
};

export default NewHeader;


/* CustomHeader.css */
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  background-color: #161b22;
  color: white;
  height: 80px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.6);
}

.header-left {
  display: flex;
  align-items: center;
  gap: 15px;
}

.logo {
  height: 40px;
}

.breadcrumb {
  font-size: 16px;
  font-weight: 500;
}

.header-center {
  text-align: center;
}

.header-title {
  margin: 0;
  font-size: 20px;
  font-weight: bold;
}

.header-subtitle {
  font-size: 12px;
  color: #ff4d4f;
}

.header-right {
  display: flex;
  align-items: center;
  gap: 12px;
}

.icon {
  cursor: pointer;
  color: white;
}

.username {
  font-size: 14px;
}

.profile-pic {
  width: 32px;
  height: 32px;
  background-color: #ccc;
  border-radius: 50%;
  overflow: hidden;
  background-image: url('/assets/profile-placeholder.png');
  background-size: cover;
  background-position: center;
}
