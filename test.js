.ebvp-header {
  background-color: #111827; /* Dark background */
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  padding: 16px;
  border-radius: 12px;
}

.tile-select {
  background-color: #1f2937;
  border-radius: 8px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.5);
  padding: 8px 16px;
  color: #fff;
  transition: box-shadow 0.3s ease, border 0.3s ease;
  flex: 1;
  min-width: 200px;
}

.tile-select:focus-within {
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.7); /* Blue glow */
  outline: none;
}