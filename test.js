Here’s the commit message formatted with why and how points:

Why:

	•	We are providing the ability to copy IP values from one SoC to another SoC, enabling users to streamline the process of managing related SoCs.
	•	When creating a new SoC, users should be able to copy values from any existing SoC, improving the speed and consistency of data entry.
	•	Once an SoC is created or updated, the grid should automatically reflect the updated values, ensuring the user interface remains synchronized with the data.

How:

	•	In the model component, I added a checkbox and a dropdown to select SoCs where the issue is true, allowing users to choose which SoC to copy from.
	•	In the custom cell renderer, I updated the logic to handle the copied IP values for the grid display.
	•	In the IP controller, I created a new API endpoint to handle the copying of IP type values from the selected SoC, which is used when creating or updating a SoC. This API ensures that the correct values are transferred from one SoC to another.