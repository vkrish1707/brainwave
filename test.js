<div style={{ display: "flex", alignItems: "center", position: "relative", width: "100%" }}>
  {/* Centered Text */}
  <p style={{ flex: 1, textAlign: "center", margin: 0 }}>{item.value}</p>

  {/* Right-Aligned Triangle */}
  <div style={{ position: "absolute", top: 0, right: 0 }}>
    <TriangleCorner color="red" borderColor="black" size={20} />
  </div>
</div>