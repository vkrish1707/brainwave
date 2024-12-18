.triangle-corner {
  position: relative;
  /* Optional: Adjust positioning if needed */
  width: 0;
  height: 0;
  /* You can define these custom properties or inline them directly: */
  --triangle-border: 10px;   /* Adjust the size as needed */
  --triangle-color: black;   /* Adjust the triangle color as needed */
}

/* The top layer of the triangle */
.triangle-corner::before {
  content: "";
  position: absolute;
  top: 0;
  right: 0;
  width: 0;
  height: 0;
  border-top: 1.5px solid black;
  border-bottom: var(--triangle-border) solid transparent;
  border-right: var(--triangle-border) solid var(--triangle-color);
  z-index: 2;
}

/* A slightly bigger shape behind it, to create a layered effect */
.triangle-corner::after {
  content: "";
  position: absolute;
  top: 0;
  right: 0;
  width: 0;
  height: 0;
  border-bottom: calc(var(--triangle-border) + 1.5px) solid transparent;
  border-right: calc(var(--triangle-border) + 1.5px) solid black;
  z-index: 0;
}