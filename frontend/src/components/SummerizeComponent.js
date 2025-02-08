import React, { useState } from 'react';
import axios from 'axios';

const SummarizeComponent = () => {
  const [text, setText] = useState('');
  const [summary, setSummary] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await axios.post('http://127.0.0.1:5001/summarize', {
        text: text,
      });
      setSummary(response.data.summary); // Set the summary from the response
    } catch (err) {
      setError('Failed to summarize text. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>Text Summarization</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="text">Enter your text:</label>
        <br />
        <textarea
          id="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Paste your text here..."
          rows="10"
          cols="50"
          style={{ padding: '10px', margin: '10px 0' }}
        />
        <br />
        <button type="submit" disabled={loading} style={{ padding: '10px 20px', cursor: 'pointer' }}>
          {loading ? 'Summarizing...' : 'Summarize'}
        </button>
      </form>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {summary && (
        <div style={{ marginTop: '20px' }}>
          <h2>Summary:</h2>
          <p>{summary}</p>
        </div>
      )}
    </div>
  );
};

export default SummarizeComponent;