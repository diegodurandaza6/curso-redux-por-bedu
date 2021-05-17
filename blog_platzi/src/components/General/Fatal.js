import React from 'react';

const Fatal = ({ error }) => {
    return (
        <h2 className="center rojo">
           {error} 
        </h2>
    );
};

export default Fatal;