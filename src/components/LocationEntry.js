import React from 'react';
import TextField from '@material-ui/core/TextField';

const LocationEntry = ({ onUpdate }) => {
    const handleBlur = (e) => onUpdate(e.target.value);

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            onUpdate(e.target.value);
        }
    }

    return (
       <TextField
            autoFocus
            label="Enter location"
            onBlur={handleBlur}
            onKeyDown={handleKeyDown}
       />
    );
}

export default LocationEntry;
