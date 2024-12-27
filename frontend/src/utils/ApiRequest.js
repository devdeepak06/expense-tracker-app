// frontend/utils/ApiRequest.js
const host = "https://expense-tracker-app-gurd.vercel.app";
export const setAvatarAPI = `${host}/api/auth/setAvatar`;
export const registerAPI = `${host}/api/auth/register`;
export const loginAPI = `${host}/api/auth/login`;
export const addTransaction = `${host}/api/v1/addTransaction`;
export const getTransactions = `${host}/api/v1/getTransaction`;
export const editTransactions = `${host}/api/v1/updateTransaction`;
export const deleteTransactions = `${host}/api/v1/deleteTransaction`;

export async function apiRequest(url, options = {}) {
  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer 9ghjV3#F5x!5Lkksd8d$R#d9a%4&FJ8aKd`
  };

  const response = await fetch(url, { ...options, headers });
  return response.json();
}