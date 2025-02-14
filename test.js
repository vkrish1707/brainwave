if (newValue.length > previousValue.length) {
    // A new cell was created → find the extra item in newValue
    const newItem = newValue.find(newItem => 
        !previousValue.some(prevItem => prevItem.value === newItem.value)
    );

    if (newItem) {
        changes.push({
            siDieId: log.siDieId,
            socName: siDieName,
            ipType: ipTypeName,
            changeMadeBy,
            newValue: newItem.value,
            newValueLabel: getLabelFromColor(newItem.value),
            previousValue: "", // No previous value since it's newly created
            previousValueLabel: "",
            type: "Created",
            createdAt
        });
    }
} else if (newValue.length < previousValue.length) {
    // A cell was deleted → find the missing item from newValue
    const deletedItem = previousValue.find(prevItem => 
        !newValue.some(newItem => newItem.value === prevItem.value)
    );

    if (deletedItem) {
        changes.push({
            siDieId: log.siDieId,
            socName: siDieName,
            ipType: ipTypeName,
            changeMadeBy,
            newValue: "", // No new value since it's deleted
            newValueLabel: "",
            previousValue: deletedItem.value,
            previousValueLabel: getLabelFromColor(deletedItem.value),
            type: "Deleted",
            createdAt
        });
    }
}