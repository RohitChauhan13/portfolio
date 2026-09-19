import axios from 'axios';
import fpPromise from '@fingerprintjs/fingerprintjs';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 4000,
  headers: {
    'Content-Type': 'application/json',
  },
});

let cachedVisitorId = null;

apiClient.interceptors.request.use(async (config) => {
  try {
    if (!cachedVisitorId) {
      if (typeof window !== 'undefined') {
        const fp = await fpPromise.load();
        const result = await fp.get();
        cachedVisitorId = result.visitorId;
      }
    }
    if (cachedVisitorId) {
      config.headers['X-Visitor-Id'] = cachedVisitorId;
    }
  } catch (err) {
    console.error('Error getting fingerprint:', err);
  }
  return config;
});

export const getPersonalInfo = async () => {
  try {
    const res = await apiClient.get('/personal');
    return res.data.data;
  } catch (error) {
    console.error('Error fetching personal info', error);
    return null;
  }
};

export const getEducation = async () => {
  try {
    const res = await apiClient.get('/education?limit=100');
    return res.data.data;
  } catch (error) {
    console.error('Error fetching education', error);
    return [];
  }
};

export const getExperience = async () => {
  try {
    const res = await apiClient.get('/experience?limit=100');
    return res.data.data;
  } catch (error) {
    console.error('Error fetching experience', error);
    return [];
  }
};

export const getProjects = async (featured = false) => {
  try {
    const url = featured ? '/projects?featured=true&limit=100' : '/projects?limit=100';
    const res = await apiClient.get(url);
    return res.data.data;
  } catch (error) {
    console.error('Error fetching projects', error);
    return [];
  }
};

export const getProjectBySlug = async (slug) => {
  try {
    const res = await apiClient.get(`/projects/${slug}`);
    return res.data.data;
  } catch (error) {
    console.error('Error fetching project by slug', error);
    return null;
  }
};

export const getSkills = async () => {
  try {
    const res = await apiClient.get('/skills?limit=100');
    return res.data.data;
  } catch (error) {
    console.error('Error fetching skills', error);
    return [];
  }
};

export const submitContact = async (data) => {
  const res = await apiClient.post('/contact', data);
  return res.data;
};

export const submitFeedback = async (data) => {
  const res = await apiClient.post('/feedback', data);
  return res.data;
};

export const logVisit = async () => {
  try {
    await apiClient.post('/analytics/visit');
  } catch (error) {
    // Ignore error silently
  }
};

export const sendChatMessage = async (question, sessionId, chatHistory = []) => {
  try {
    const res = await apiClient.post('/chat', { question, session_id: sessionId, messages: chatHistory });
    return res.data;
  } catch (error) {
    if (error.response?.status === 429) {
      throw new Error(error.response.data.message || 'Daily limit reached');
    }
    console.error('Chat API Error:', error);
    throw error;
  }
};

export const getChatStatus = async (sessionId = '') => {
  try {
    const url = sessionId ? `/chat/status?session_id=${sessionId}` : '/chat/status';
    const res = await apiClient.get(url);
    return res.data.data;
  } catch (error) {
    console.error('Chat Status API Error:', error);
    return null;
  }
};
