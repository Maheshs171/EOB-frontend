import React, { useState } from 'react';
import { Copy, Download, Check } from 'lucide-react';

const ActionButtons = ({ data }) => {
    const [copied, setCopied] = useState(false);

    if (!data) return null;

    const handleCopy = () => {
        navigator.clipboard.writeText(JSON.stringify(data, null, 2));
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const handleDownload = () => {
        const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'extracted_data.json';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    };

    return (
        <div className="action-bar">
            <button className="btn-secondary" onClick={handleCopy} title="Copy to Clipboard">
                {copied ? (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <Check size={18} /> Copied
                    </div>
                ) : (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <Copy size={18} /> Copy JSON
                    </div>
                )}
            </button>
            <button className="btn-secondary" onClick={handleDownload} title="Download JSON">
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Download size={18} /> Save JSON
                </div>
            </button>
        </div>
    );
};

export default ActionButtons;
