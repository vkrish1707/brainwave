const nodes = [
  { color: "#ff0000", value: "N1" },
  { color: "#00ff00", value: "N2" },
  { color: "#0000ff", value: "N3" },
  { color: "#ffff00", value: "N4" },
  { color: "#ff00ff", value: "N5" },
  { color: "#00ffff", value: "N6" }
];

const BoxDisplay = () => {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
      
      {/* Triangle before the nodes */}
      <div style={{ width: 0, height: 0, borderLeft: "10px solid transparent", borderRight: "10px solid transparent", borderBottom: "10px solid black", marginRight: "10px" }}>
      </div>
      <div style={{ fontSize: "12px", marginRight: "10px" }}>Last status</div>

      {/* Mapping through nodes to display colored boxes */}
      {nodes.map((node, index) => (
        <div key={index} style={{ backgroundColor: node.color, color: "#fff", width: "50px", height: "50px", display: "flex", justifyContent: "center", alignItems: "center" }}>
          {node.value}
        </div>
      ))}
    </div>
  );
};

export default BoxDisplay;