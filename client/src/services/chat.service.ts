const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

export const sendMessage = async (params: {
  userId: string,
  sessionId: string,
  message: string,
  persona: string,
  scenario: string,
  history: any[]
}, token?: string) => {
  try {
    const response = await fetch(`${API_URL}/chat/message`, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        ...(token && { 'Authorization': `Bearer ${token}` })
      },
      body: JSON.stringify(params),
    });

    if (!response.ok) {
      throw new Error('Failed to send message');
    }

    return await response.json();
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};

export const getChatHistory = async (userId: string, sessionId: string, token?: string) => {
  try {
    const response = await fetch(`${API_URL}/chat/history/${userId}/${sessionId}`, {
      headers: {
        ...(token && { 'Authorization': `Bearer ${token}` })
      }
    });
    if (!response.ok) {
      throw new Error('Failed to fetch chat history');
    }
    return await response.json();
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};
