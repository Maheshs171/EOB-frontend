import React, { useRef, useState } from 'react';
import { Upload, FileText, X } from 'lucide-react';

const FileUpload = ({ onFileSelect }) => {
    const [dragActive, setDragActive] = useState(false);
    const [fileName, setFileName] = useState(null);
    const inputRef = useRef(null);

    const handleDrag = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === "dragenter" || e.type === "dragover") {
            setDragActive(true);
        } else if (e.type === "dragleave") {
            setDragActive(false);
        }
    };

    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            handleFile(e.dataTransfer.files[0]);
        }
    };

    const handleChange = (e) => {
        e.preventDefault();
        if (e.target.files && e.target.files[0]) {
            handleFile(e.target.files[0]);
        }
    };

    const handleFile = (file) => {
        if (file.type === "application/pdf") {
            setFileName(file.name);
            onFileSelect(file);
        } else {
            alert("Please upload a PDF file.");
        }
    };

    const clearFile = (e) => {
        e.stopPropagation();
        setFileName(null);
        onFileSelect(null);
        if (inputRef.current) {
            inputRef.current.value = "";
        }
    };

    const onButtonClick = () => {
        inputRef.current.click();
    };

    return (
        <div
            className={`dropzone ${dragActive ? "drag-active" : ""}`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
            onClick={onButtonClick}
        >
            <input
                ref={inputRef}
                type="file"
                className="input-file"
                style={{ display: "none" }}
                onChange={handleChange}
                accept=".pdf"
            />

            {fileName ? (
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <FileText className="icon-large" style={{ color: '#60a5fa' }} />
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span style={{ fontSize: '1.1rem', fontWeight: 500 }}>{fileName}</span>
                        <button onClick={clearFile} style={{ padding: '4px', background: 'transparent', border: 'none', color: '#ef4444' }}>
                            <X size={20} />
                        </button>
                    </div>
                    <p style={{ color: '#94a3b8', marginTop: '0.5rem' }}>Click to change file</p>
                </div>
            ) : (
                <>
                    <Upload className="icon-large" />
                    <p style={{ fontSize: '1.1rem', fontWeight: 500 }}>Drag & Drop your PDF here</p>
                    <p style={{ marginTop: '0.5rem', color: '#94a3b8' }}>or click to browse</p>
                </>
            )}
        </div>
    );
};

export default FileUpload;
