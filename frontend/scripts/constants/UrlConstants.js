const prod = process.env.NODE_ENV === 'production';

export const API_URL = prod ? 'https://shopping-list-astral.herokuapp.com/api' : 'http://localhost:5000/api';
