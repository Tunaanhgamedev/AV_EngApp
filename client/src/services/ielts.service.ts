const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

export const getIeltsPractice = async (skill: string, token?: string) => {
  try {
    const response = await fetch(`${API_URL}/ielts/practice/${skill}`, {
      headers: {
        ...(token && { 'Authorization': `Bearer ${token}` })
      }
    });

    if (!response.ok) {
      throw new Error('Failed to generate IELTS practice');
    }

    return await response.json();
  } catch (error) {
    console.error('IELTS Service generate error:', error);
    throw error;
  }
};

export const submitIeltsPractice = async (data: {
  userId: string;
  skill: string;
  bandScore: number;
  correctCount?: number;
  totalQuestions?: number;
  aiFeedback?: string;
  details: any;
}, token?: string) => {
  try {
    const response = await fetch(`${API_URL}/ielts/submit`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(token && { 'Authorization': `Bearer ${token}` })
      },
      body: JSON.stringify(data)
    });

    if (!response.ok) {
      throw new Error('Failed to submit IELTS practice');
    }

    return await response.json();
  } catch (error) {
    console.error('IELTS Service submit error:', error);
    throw error;
  }
};

export const getIeltsHistory = async (userId: string, token?: string) => {
  try {
    const response = await fetch(`${API_URL}/ielts/history/${userId}`, {
      headers: {
        ...(token && { 'Authorization': `Bearer ${token}` })
      }
    });

    if (!response.ok) {
      throw new Error('Failed to fetch IELTS history');
    }

    return await response.json();
  } catch (error) {
    console.error('IELTS Service history error:', error);
    throw error;
  }
};
