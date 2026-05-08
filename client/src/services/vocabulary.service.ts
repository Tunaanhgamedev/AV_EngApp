const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

export const searchWord = async (word: string) => {
  try {
    const response = await fetch(`${API_URL}/vocabulary/search/${word}`);
    if (!response.ok) {
      throw new Error('Word not found');
    }
    return await response.json();
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};

export const learnWord = async (userId: string, wordId: string) => {
  try {
    const response = await fetch(`${API_URL}/vocabulary/learn`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId, wordId }),
    });
    return await response.json();
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};
