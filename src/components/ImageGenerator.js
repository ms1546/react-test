import React, { useState } from 'react';
import '../App.css';

function App() {
  const [inputText, setInputText] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleGenerateImage = async () => {
    setLoading(true);
    setImageUrl('');
    setError('');
    const response = await fetch('https://api.openai.com/v1/images/generations', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        prompt: inputText,
        n: 1,
        size: "512x512"
      })
    });

    const data = await response.json();
    if (response.ok) {
      if (data.data && data.data.length > 0) {
        setImageUrl(data.data[0].url);
      } else {
        console.error('Error generating image:', data);
      }
    } else {
      setError(data.error.message);
    }
    setLoading(false);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Image Generation with OpenAI</h1>
        <div className="input-group">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Enter text for image generation"
          />
          <button onClick={handleGenerateImage}>Generate Image</button>
        </div>
        {loading && <p>Generating...</p>}
        {error && <p>Error: {error}</p>}
        {imageUrl && <img src={imageUrl} alt="Generated" className="generated-image" />}
      </header>
    </div>
  );
}

export default App;
