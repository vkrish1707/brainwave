import React, { useState } from "react";
import { Backdrop, CircularProgress, Button, Box } from "@mui/material";

const MyComponent = () => {
  const [isLoading, setIsLoading] = useState(false);

  const handleLoading = () => {
    setIsLoading(true);

    // Simulate an async operation
    setTimeout(() => {
      setIsLoading(false);
    }, 3000); // Stops loading after 3 seconds
  };

  return (
    <Box sx={{ position: "relative", padding: "20px", height: "300px", border: "1px solid #ccc" }}>
      {/* Overlay Backdrop */}
      <Backdrop
        sx={{
          color: "#fff",
          zIndex: (theme) => theme.zIndex.drawer + 1,
        }}
        open={isLoading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>

      {/* Component Content */}
      <Box>
        <h2>My Component</h2>
        <p>This is the content of the component. Try clicking the button below!</p>
        <Button
          variant="contained"
          color="primary"
          onClick={handleLoading}
          disabled={isLoading}
        >
          Start Loading
        </Button>
      </Box>
    </Box>
  );
};

export default MyComponent;