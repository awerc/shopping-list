const prod = process.env.NODE_ENV === 'production';

export const API_URL = prod ? 'https://bm-manager.herokuapp.com/api' : 'http://localhost:5000/api';
