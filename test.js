<div key={index} className="indexed-text">
    <Tooltip title={noteValue}>
        <div>
            {/* Current Value (Primary Display) */}
            {!isFlipped ? (
                isSSGrid ? (
                    <p className="ss-grid-value">{item.value}</p>
                ) : (
                    <>{item.value}</>
                )
            ) : (
                <>
                    {/* Show Check Icon if the color condition matches */}
                    {item.color === "#f0f0f0" && (
                        <div className="check-mark">
                            <CheckIcon />
                        </div>
                    )}

                    {/* Display derived information when colIndex < 5 */}
                    {colIndex < 5 && (
                        <>
                            {item.value}
                            {item.derivedFrom && (
                                <span>{item.derivedFrom}</span>
                            )}
                        </>
                    )}
                </>
            )}
        </div>
    </Tooltip>

    {/* Previous Value Display (On Flip and if Previous Value is Present) */}
    {item.previousValue && isFlipped && (
        <Tooltip title={`Prior Value: ${item.previousValue}`}>
            <div className="indexed-text">
                <span>
                    Prior Value: {item.previousValue}
                </span>
            </div>
        </Tooltip>
    )}
</div>
.indexed-text {
    display: flex;
    flex-direction: column; /* Allow stacking of current and previous values */
    align-items: center;
    justify-content: center;
    text-align: center;
    width: 100%;
    max-width: 100%;
    word-wrap: break-word;
    overflow-wrap: break-word;
    padding: 10px;
    font-family: Verdana;
    min-height: 100%;
    height: auto; /* Let content dictate height */
    line-height: 1.2;
    position: relative;
    white-space: normal;
}

/* Specific styling for SS Grid values */
.ss-grid-value {
    font-size: 19px;
    max-width: 100%;
    word-break: break-word;
    white-space: normal;
    line-height: 1.2;
}

/* Check mark styling */
.check-mark {
    color: green;
    display: inline;
}

/* Handle Tooltip styling */
.tooltip-content {
    white-space: nowrap;
    overflow: visible;
    text-align: center;
}
