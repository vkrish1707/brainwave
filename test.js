function applyCellStyles(cell, value, color, activeView, previousColor = "") {
  const isDarkColor = color === "000000" || color === "theme=1";
  cell.value = isDarkColor && activeView !== "heatMap" ? "N/A" : value;

  cell.alignment = {
    vertical: "middle",
    horizontal: "center",
    wrapText: true,
  };

  cell.font = {
    color: { argb: isDarkColor ? "FFFFFFFF" : "FF000000" },
  };

  let cellColor = color === "theme=0" ? "FFFFFF" : color;
  cell.fill = {
    type: "pattern",
    pattern: "solid",
    fgColor: { argb: "FF" + cellColor },
  };

  if (previousColor !== "") {
    // Add note
    cell.fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "FF" + cellColor },
    };
    cell.note = "I am note";
    console.log("Here:", previousColor);

    // Simulate triangle by adding diagonal lines
    cell.border = {
      top: { style: "thin" },
      left: { style: "thin" },
      bottom: { style: "thin" },
      right: { style: "thin" },
      diagonal: { style: "thin", color: { argb: "FF" + previousColor } },
      diagonalUp: true, // Enables top-right to bottom-left diagonal
    };

    // Set top-right triangle color as a diagonal fill
    cell.fill = {
      type: "pattern",
      pattern: "lightTrellis",
      bgColor: { argb: "FF" + previousColor },
    };
  } else {
    cell.border = {
      top: { style: "thin" },
      left: { style: "thin" },
      bottom: { style: "thin" },
      right: { style: "thin" },
    };
  }
}