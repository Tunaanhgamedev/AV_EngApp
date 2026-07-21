const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

export const getWritingChallenge = async (token?: string) => {
  try {
    const response = await fetch(`${API_URL}/toeic-writing/challenge`, {
      headers: {
        ...(token && { 'Authorization': `Bearer ${token}` })
      }
    });

    if (!response.ok) {
      throw new Error('Failed to fetch TOEIC writing challenge');
    }

    return await response.json();
  } catch (error) {
    console.error('TOEIC Writing Service get challenge error:', error);
    throw error;
  }
};

export const evaluateWritingChallenge = async (data: {
  challenge: any;
  userText: string;
  userId?: string;
}, token?: string) => {
  try {
    const response = await fetch(`${API_URL}/toeic-writing/evaluate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(token && { 'Authorization': `Bearer ${token}` })
      },
      body: JSON.stringify(data)
    });

    if (!response.ok) {
      throw new Error('Failed to evaluate TOEIC writing challenge');
    }

    return await response.json();
  } catch (error) {
    console.error('TOEIC Writing Service evaluate error:', error);
    throw error;
  }
};
