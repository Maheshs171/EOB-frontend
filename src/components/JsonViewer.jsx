import React from 'react';

const JsonViewer = ({ data }) => {
    if (!data) return null;

    return (
        <div className="json-container">
            <pre className="json-pre">
                {JSON.stringify(data, null, 2)}
            </pre>
        </div>
    );
};

export default JsonViewer;
