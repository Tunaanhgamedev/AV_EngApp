const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

export const searchWord = async (word: string) => {
  try {
    const response = await fetch(`${API_URL}/vocabulary/search?word=${word}`);
    if (!response.ok) {
      throw new Error('Word not found');
    }
    return await response.json();
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};

export const saveWordToUser = async (userId: string, wordData: any, token?: string) => {
  try {
    const response = await fetch(`${API_URL}/vocabulary/save`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(token && { 'Authorization': `Bearer ${token}` })
      },
      body: JSON.stringify({ userId, wordData }),
    });

    if (!response.ok) {
      const err = await response.json();
      throw new Error(err.error || 'Failed to save word');
    }

    return await response.json();
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};
