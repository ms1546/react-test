import React, { useState } from 'react';
import './styles/ImageGenerator.css';

const fetchGeneratedImage = async (inputText) => {
  const response = await fetch('https://api.openai.com/v1/images/generations', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}`
    },
    body: JSON.stringify({
      prompt: inputText,
      n: 1,
      size: "256x256"
    })
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.error?.message || 'Failed to generate image');
  }

  return result.data;
};

function ImageGenerator () {
  const [inputText, setInputText] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleGenerateImage = async () => {
    if (!inputText.trim()) {
      setError('Please enter text for image generation.');
      return;
    }

    setLoading(true);
    setImageUrl('');
    setError('');

    try {
      const generatedImages = await fetchGeneratedImage(inputText);

      if (generatedImages && generatedImages.length > 0) {
        setImageUrl(generatedImages[0].url);
      } else {
        throw new Error('No image generated');
      }
    } catch (error) {
      console.error('Error generating image:', error);
      setError(error.message || 'An unexpected error occurred');
    } finally {
      setLoading(false);
    }
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

export default ImageGenerator;
