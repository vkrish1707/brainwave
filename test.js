const exportSvg = () => {
  const svgElement = document.querySelector("svg"); // Selects the SVG element (ensure your grid contains SVG)
  
  if (!svgElement) {
    console.error("No SVG found in the document.");
    return;
  }

  const serializer = new XMLSerializer();
  let source = serializer.serializeToString(svgElement);

  // Fix missing namespace (important for PowerPoint compatibility)
  if (!source.includes("xmlns")) {
    source = source.replace(
      "<svg",
      '<svg xmlns="http://www.w3.org/2000/svg"'
    );
  }

  // Create downloadable blob
  const blob = new Blob([source], { type: "image/svg+xml;charset=utf-8" });
  const url = URL.createObjectURL(blob);

  // Create a download link
  const link = document.createElement("a");
  link.href = url;
  link.download = "grid_screenshot.svg";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};