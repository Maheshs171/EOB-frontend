import React, { useState } from 'react';
import axios from 'axios';
import Loader from './components/Loader';
import FileUpload from './components/FileUpload';
import JsonViewer from './components/JsonViewer';
import ActionButtons from './components/ActionButtons';
import { AlertCircle } from 'lucide-react';

function App() {
  const [file, setFile] = useState(null);
  const [model, setModel] = useState('vsp');
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);

  const handleProcess = async () => {
    if (!file) return;

    setLoading(true);
    setResponse(null);
    setError(null);

    const formData = new FormData();
    formData.append('pdf', file);
    formData.append('model', model);

    try {
      // Using environment variable for API URL
      // Ensure VITE_API_URL is set in .env file
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/process_pdfs`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setResponse(res.data);
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.detail || "An error occurred while processing the file.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <div className="header">
        <h1>PDF Processor</h1>
        <p style={{ color: '#94a3b8', marginTop: '0.5rem' }}>Upload a PDF to extract structured data</p>
      </div>

      <div className="card">
        <FileUpload onFileSelect={setFile} />

        <div className="controls">
          <select
            className="select-model"
            value={model}
            onChange={(e) => setModel(e.target.value)}
          >
            <option value="vsp">VSP</option>
            <option value="eyemed">EyeMed</option>
          </select>

          <button
            className="btn-primary"
            onClick={handleProcess}
            disabled={!file || loading}
            style={{ opacity: (!file || loading) ? 0.7 : 1, cursor: (!file || loading) ? 'not-allowed' : 'pointer' }}
          >
            {loading ? 'Processing...' : 'Process PDF'}
          </button>
        </div>

        {error && (
          <div style={{
            marginTop: '1rem',
            padding: '1rem',
            background: 'rgba(239, 68, 68, 0.1)',
            border: '1px solid #ef4444',
            borderRadius: '8px',
            color: '#fca5a5',
            display: 'flex',
            alignItems: 'center',
            gap: '10px'
          }}>
            <AlertCircle size={20} />
            {error}
          </div>
        )}

        {loading && <Loader />}

        {!loading && response && (
          <div className="fade-in">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '2rem' }}>
              <h3 style={{ margin: 0 }}>Results</h3>
              <ActionButtons data={response} />
            </div>
            <JsonViewer data={response} />
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
