const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const IpReuseModel = mongoose.model('IpReuse'); // Assuming the model is defined as IpReuse

// The route to handle the request
router.post('/replaceIpTypeValues', async (req, res) => {
  try {
    // Destructure the IDs from the request body
    const { mainId, copyFromId } = req.body;

    // Fetch the main object using the mainId
    const mainObject = await IpReuseModel.findById(mainId);
    if (!mainObject) {
      return res.status(404).json({ message: 'Main object not found' });
    }

    // Fetch the copyFrom object using the copyFromId
    const copyFromObject = await IpReuseModel.findById(copyFromId);
    if (!copyFromObject) {
      return res.status(404).json({ message: 'Copy-from object not found' });
    }

    // Iterate over the keys of the main object and replace values starting with "IP type"
    Object.keys(mainObject).forEach((key) => {
      if (key.startsWith('ipType') && copyFromObject[key]) {
        // Replace the main object's IP type values with copy-from object's values
        mainObject[key] = copyFromObject[key];
      }
    });

    // Save the updated main object back to the database
    await mainObject.save();

    return res.status(200).json({ message: 'IP type values replaced successfully', mainObject });
  } catch (error) {
    console.error('Error replacing IP type values:', error);
    return res.status(500).json({ message: 'Server error', error });
  }
});

module.exports = router;