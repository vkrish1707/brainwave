.tile {
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--tile-text);
  font-size: 18px;
  font-weight: bold;
  border-radius: 16px;
  cursor: pointer;
  user-select: none;
  padding: 1rem;
  background: linear-gradient(var(--tile-fill), var(--tile-fill)) padding-box,
              radial-gradient(circle at center, var(--tile-glow), transparent) border-box;
  border: 2px solid transparent;
  box-shadow: 0 0 12px rgba(0, 255, 247, 0.2);
  transition: all 0.3s ease;
}

.tile:hover {
  box-shadow: 0 0 25px var(--tile-glow);
  transform: scale(1.03);
  filter: brightness(1.1);
}
.rdc-home {
  --tile-base: #0d1117;
  --tile-fill: #1e1e2f;
  --tile-glow: #00fff7;
  --tile-border: #00fff7;
  --tile-text: white;
}
