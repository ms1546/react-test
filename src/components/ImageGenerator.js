import React, { useState } from 'react';

function App() {
  const [inputText, setInputText] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  const handleGenerateImage = async () => {
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
    if (data.data && data.data.length > 0) {
      setImageUrl(data.data[0].url);
    } else {
      console.error('Error generating image:', data);
    }
  };

  return (
    <div className="App">
      <h1>Image Generation with OpenAI</h1>
      <input
        type="text"
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        placeholder="Enter text for image generation"
      />
      <button onClick={handleGenerateImage}>Generate Image</button>
      {imageUrl && <img src={imageUrl} alt="Generated" />}
    </div>
  );
}

export default App;
