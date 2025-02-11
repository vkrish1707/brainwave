.triangle-corner {
  position: absolute;
  top: 0;
  right: 0;
  width: 0;
  height: 0;
  border-left: 20px solid transparent;
  border-bottom: 20px solid transparent;
  border-top: 20px solid black; /* Top border */
  border-right: 20px solid black; /* Right border */
}

.triangle-corner::after {
  content: "";
  position: absolute;
  top: 2px;
  right: 2px;
  width: 0;
  height: 0;
  border-left: 18px solid transparent;
  border-bottom: 18px solid transparent;
  border-top: 18px solid red; /* Triangle Fill Color */
  border-right: 18px solid red; /* Right border */
}

const TriangleCorner = ({ color = "red", borderColor = "black", size = 20 }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      xmlns="http://www.w3.org/2000/svg"
      style={{ position: "absolute", top: 0, right: 0 }}
    >
      <polygon
        points={`0,0 ${size},0 0,${size}`}
        fill={color}
        stroke={borderColor}
        strokeWidth="2"
      />
    </svg>
  );
};

export default TriangleCorner;