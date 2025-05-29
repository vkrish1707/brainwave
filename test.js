.sub-menu-item {
  padding: 1rem 2rem;
  border-radius: 1rem;
  font-weight: bold;
  letter-spacing: 0.1ch;
  text-transform: uppercase;
  border: 2px solid transparent;
  background: linear-gradient(#1e1e2f, #1e1e2f) padding-box,
              radial-gradient(circle at center, #00fff7, #00a29b, transparent) border-box;
  color: white;
  position: relative;
  cursor: pointer;
  transition: all 0.3s ease;
  background-clip: padding-box;
  box-shadow: 0 0 8px rgba(0, 255, 240, 0.5); /* subtle glow */
}

.sub-menu-item:hover {
  transform: scale(1.05);
  box-shadow:
    0 0 12px rgba(0, 255, 240, 0.9), /* strong glow */
    0 0 20px rgba(0, 255, 240, 0.6); /* outer halo */
  border-color: #00fff7;
}
.sub-menu-item::after {
  content: '';
  position: absolute;
  inset: -4px;
  border-radius: 1rem;
  background: radial-gradient(circle, rgba(0, 255, 240, 0.4) 0%, transparent 80%);
  filter: blur(12px);
  opacity: 0;
  transition: opacity 0.3s ease;
  z-index: -1;
}
.sub-menu-item:hover::after {
  opacity: 1;
}


