// Auth.service.js
import HttpAuth from './HttpAuthService';

export default class AuthService {
  // Function to handle user login
  static async login(credentials) {
    const response = await HttpAuth.post('/v1/auth/login', credentials);
    console.log('response', response);
    return response;
  }

  // Function to handle user registration
  static async register(userData) {
    const response = await HttpAuth.post('/v1/auth/register', userData);
    return response?.data;
  }

  // Function to refresh the access token
  static async verifyToken() {
    const access_token = JSON.parse(localStorage.getItem('access_token'));
    const refresh_token = JSON.parse(localStorage.getItem('refresh_token'));
    HttpAuth.refresh_token = refresh_token;
    HttpAuth.access_token = access_token;
    const response = await HttpAuth.get('/v1/users/verify-token');
    return response?.data;
  }

  // Function to handle user logout
  static async logout() {
    // Perform API call to logout endpoint if necessary
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    const response = await HttpAuth.post('/v1/auth/logout', {
      refreshToken: HttpAuth.refresh_token?.token,
    });
    return response;
  }

  // Function to change user password
  static async changePassword(passwordData) {
    const response = await HttpAuth.put(
      '/v1/auth/change-password',
      passwordData,
    );
    return response?.data;
  }

  // Function to initiate a forgot password request
  static async forgotPassword(userData) {
    const response = await HttpAuth.post('/v1/auth/forgot-password', userData);
    return response;
  }

  // Function to reset the password using a token received via email
  static async resetPassword(userData) {
    const url = `/v1/auth/reset-password`;
    const response = await HttpAuth.post(url, userData);
    return response;
  }

  // Function to resend the email verification link
  static async resendVerificationEmail(email) {
    const response = await HttpAuth.post('/v1/auth/resend-verification-email', {
      email,
    });
    return response;
  }

  // Function to verify an email address using a token sent via email
  static async verifyEmail(token) {
    const url = `/v1/auth/verify-email?token=${encodeURIComponent(token)}`;
    const response = await HttpAuth.post(url);
    return response;
  }
}
