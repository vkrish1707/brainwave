import React, { useState, useImperativeHandle, forwardRef } from 'react';

const SkillRenderer = forwardRef((props, ref) => {
    const [value, setValue] = useState(props.value ?? props.data?.SKILL_SET ?? '');

    useImperativeHandle(ref, () => ({
        refresh(params) {
            // AG Grid calls this when row data is updated via applyTransaction
            setValue(params.value ?? params.data?.SKILL_SET ?? '');
            return true;
        }
    }));

    return (
        <span>{value}</span>
    );
});

export default SkillRenderer;