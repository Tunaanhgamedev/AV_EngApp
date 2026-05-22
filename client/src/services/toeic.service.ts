const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

export const getToeicPractice = async (part: number, token?: string) => {
  try {
    const response = await fetch(`${API_URL}/toeic/practice/${part}`, {
      headers: {
        ...(token && { 'Authorization': `Bearer ${token}` })
      }
    });

    if (!response.ok) {
      throw new Error('Failed to generate TOEIC practice');
    }

    return await response.json();
  } catch (error) {
    console.error('TOEIC Service generate error:', error);
    throw error;
  }
};

export const submitToeicPractice = async (data: {
  userId: string;
  part: number;
  correctCount: number;
  totalQuestions: number;
  details: any;
}, token?: string) => {
  try {
    const response = await fetch(`${API_URL}/toeic/submit`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(token && { 'Authorization': `Bearer ${token}` })
      },
      body: JSON.stringify(data)
    });

    if (!response.ok) {
      throw new Error('Failed to submit TOEIC practice');
    }

    return await response.json();
  } catch (error) {
    console.error('TOEIC Service submit error:', error);
    throw error;
  }
};

export const getToeicHistory = async (userId: string, token?: string) => {
  try {
    const response = await fetch(`${API_URL}/toeic/history/${userId}`, {
      headers: {
        ...(token && { 'Authorization': `Bearer ${token}` })
      }
    });

    if (!response.ok) {
      throw new Error('Failed to fetch TOEIC history');
    }

    return await response.json();
  } catch (error) {
    console.error('TOEIC Service history error:', error);
    throw error;
  }
};
