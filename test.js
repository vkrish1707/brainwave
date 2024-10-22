const fetchAllData = async () => {
    try {
        setIsLoading(true);

        // Initiate both API calls simultaneously
        const [dataResponse, suggestionsResponse] = await Promise.all([
            callDB({ reportDate: "" }, "ipReuse", "GET", "api").catch(err => {
                console.error("Data API failed", err);
                return { data: [] }; // return empty response to avoid blocking
            }),
            callDB({ colIndex: 1 }, "getsoc", "POST", "api").catch(err => {
                console.error("Suggestions API failed", err);
                return { suggestions: [] }; // return empty suggestions to avoid blocking
            })
        ]);

        // Check and process data only if responses contain data
        if (dataResponse.data.length && suggestionsResponse.suggestions.length) {
            setBackendData(dataResponse.data);
            setSuggestions(suggestionsResponse.suggestions);
            setGridConfig(dataResponse.data);  // Set grid config only after both calls are successful
            setAction("actions");
        }

    } catch (error) {
        console.error("ERROR fetching data", error);
    } finally {
        setIsLoading(false); // Ensure loading is false after both calls
    }
};