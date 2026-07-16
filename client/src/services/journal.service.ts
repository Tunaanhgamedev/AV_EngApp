const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

export const analyzeJournal = async (userId: string, content: string, title?: string, token?: string, trainedSkills?: string[]) => {
  try {
    const response = await fetch(`${API_URL}/journal/analyze`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(token && { 'Authorization': `Bearer ${token}` })
      },
      body: JSON.stringify({ userId, content, title, trainedSkills }),
    });

    if (!response.ok) {
      throw new Error('Failed to analyze journal');
    }

    return await response.json();
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};

export const getJournalHistory = async (userId: string, token?: string) => {
  try {
    const response = await fetch(`${API_URL}/journal/history/${userId}`, {
      headers: {
        ...(token && { 'Authorization': `Bearer ${token}` })
      }
    });
    if (!response.ok) {
      throw new Error('Failed to fetch journal history');
    }
    return await response.json();
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};
