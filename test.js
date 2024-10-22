useEffect(() => {
    // First call FetchSuggestions
    fetchSuggestions();

    // Set a delay of 1 second (1000ms) to wait for the suggestions state to be set
    const suggestionCheckInterval = setInterval(() => {
        // Check if suggestions are set and have length greater than 0
        if (suggestions.length > 0) {
            // Call FetchData after confirming the suggestions are populated
            fetchData();
            clearInterval(suggestionCheckInterval); // Clear the interval once FetchData is called
        }
    }, 1000); // 1-second interval to check the suggestions state

    // Cleanup function to clear interval on component unmount
    return () => clearInterval(suggestionCheckInterval);

}, [suggestions]); // Dependency array, triggers when suggestions change

// Function to fetch suggestions
const fetchSuggestions = () => {
    callDB({ colIndex: 1 }, "getsoc", "POST", "api", (response) => {
        if (response) {
            setSuggestions(response.suggestions);
        }
    });
};

// Function to fetch data (called after suggestions are populated)
const fetchData = () => {
    callDB({ reportDate: "" }, "ipReuse", "GET", "api", (response) => {
        if (response.data) {
            setBackendData(response.data);
            setGridConfig(response.data);
            setAction("actions");
            setIsLoading(false);
        }
    });
};