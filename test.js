const hashToDataMap = new Map(); // Store hash-to-data mapping (simulating backend storage)

// Function to generate a 16-character hash for the given data
async function generateShortHash(data) {
  const jsonString = JSON.stringify(data);
  const encoder = new TextEncoder();
  const dataBuffer = encoder.encode(jsonString);

  // Generate SHA-256 hash
  const hashBuffer = await crypto.subtle.digest("SHA-256", dataBuffer);

  // Convert hash buffer to a Base64 string and truncate it to 16 characters
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const base64Hash = btoa(String.fromCharCode.apply(null, hashArray));
  return base64Hash.slice(0, 16); // Return a 16-character hash
}

// Function to encrypt (generate hash and store the data)
async function encrypt(data) {
  const hash = await generateShortHash(data); // Generate a 16-character hash
  hashToDataMap.set(hash, data); // Store the hash-to-data mapping
  return hash; // Return the hash for the URL
}

// Function to decrypt (retrieve the data using the hash)
function decrypt(hash) {
  return hashToDataMap.get(hash); // Retrieve the data from the hash-to-data map
}

// Example usage
(async () => {
  // Data to be encrypted
  const jsonData = {
    filters: { column: "age", value: ">30" },
    visibleColumns: ["name", "age"],
  };

  // Encrypt the data and generate a short hash
  const shortHash = await encrypt(jsonData);
  console.log("Short Hash:", shortHash); // Example: "abcd1234xyz9876"

  // Decrypt the data using the short hash
  const restoredData = decrypt(shortHash);
  console.log("Restored Data:", restoredData); // Original JSON data
})();