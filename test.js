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
function decrypt(encryptedString) {
  try {
    let base64 = encryptedString + "=".repeat((4 - encryptedString.length % 4) % 4); // Re-pad base64
    const jsonString = atob(base64); // Decode Base64
    return JSON.parse(jsonString);
  } catch (error) {
    console.error("Decryption failed:", error);
    return null;
  }
}