function encrypt(data) {
  const jsonString = JSON.stringify(data);
  let base64 = btoa(jsonString); // Convert to Base64
  base64 = base64.replace(/=/g, "").slice(0, 16); // Trim to 16 characters
  return base64;
}

function encrypt(data) {
  const jsonString = JSON.stringify(data);
  let base64 = btoa(jsonString); // Convert to Base64
  base64 = base64.replace(/=/g, "").slice(0, 16); // Trim to 16 characters
  return base64;
}