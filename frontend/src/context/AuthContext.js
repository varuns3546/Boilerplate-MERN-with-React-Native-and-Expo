import React, { createContext, useContext, useReducer, useEffect } from 'react';
import authService from '../services/authService';

// Auth context
const AuthContext = createContext();

// Auth states
const AUTH_STATES = {
  LOADING: 'LOADING',
  AUTHENTICATED: 'AUTHENTICATED',
  UNAUTHENTICATED: 'UNAUTHENTICATED'
};

// Action types
const AUTH_ACTIONS = {
  SET_LOADING: 'SET_LOADING',
  LOGIN_SUCCESS: 'LOGIN_SUCCESS',
  LOGOUT: 'LOGOUT',
  UPDATE_USER: 'UPDATE_USER'
};

// Initial state
const initialState = {
  user: null,
  authState: AUTH_STATES.LOADING,
  error: null
};

// Auth reducer
const authReducer = (state, action) => {
  switch (action.type) {
    case AUTH_ACTIONS.SET_LOADING:
      return {
        ...state,
        authState: AUTH_STATES.LOADING,
        error: null
      };

    case AUTH_ACTIONS.LOGIN_SUCCESS:
      return {
        ...state,
        user: action.payload.user,
        authState: AUTH_STATES.AUTHENTICATED,
        error: null
      };

    case AUTH_ACTIONS.LOGOUT:
      return {
        ...state,
        user: null,
        authState: AUTH_STATES.UNAUTHENTICATED,
        error: null
      };

    case AUTH_ACTIONS.UPDATE_USER:
      return {
        ...state,
        user: action.payload.user
      };

    default:
      return state;
  }
};

// Auth provider component
export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  // Check authentication status on app start
  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      dispatch({ type: AUTH_ACTIONS.SET_LOADING });

      const isAuthenticated = await authService.isAuthenticated();
      
      if (isAuthenticated) {
        const userData = await authService.getUserData();
        
        if (userData) {
          dispatch({
            type: AUTH_ACTIONS.LOGIN_SUCCESS,
            payload: { user: userData }
          });
        } else {
          dispatch({ type: AUTH_ACTIONS.LOGOUT });
        }
      } else {
        dispatch({ type: AUTH_ACTIONS.LOGOUT });
      }
    } catch (error) {
      console.error('Auth status check error:', error);
      dispatch({ type: AUTH_ACTIONS.LOGOUT });
    }
  };

  const login = async (email, password) => {
    try {
      dispatch({ type: AUTH_ACTIONS.SET_LOADING });

      const result = await authService.login(email, password);
      
      if (result.success) {
        dispatch({
          type: AUTH_ACTIONS.LOGIN_SUCCESS,
          payload: { user: result.user }
        });
        return { success: true };
      } else {
        dispatch({ type: AUTH_ACTIONS.LOGOUT });
        return { success: false, message: result.message };
      }
    } catch (error) {
      console.error('Login error:', error);
      dispatch({ type: AUTH_ACTIONS.LOGOUT });
      return { success: false, message: 'Login failed' };
    }
  };

  const register = async (userData) => {
    try {
      dispatch({ type: AUTH_ACTIONS.SET_LOADING });

      const result = await authService.register(userData);
      
      if (result.success) {
        dispatch({
          type: AUTH_ACTIONS.LOGIN_SUCCESS,
          payload: { user: result.user }
        });
        return { success: true };
      } else {
        dispatch({ type: AUTH_ACTIONS.LOGOUT });
        return { success: false, message: result.message };
      }
    } catch (error) {
      console.error('Registration error:', error);
      dispatch({ type: AUTH_ACTIONS.LOGOUT });
      return { success: false, message: 'Registration failed' };
    }
  };

  const logout = async () => {
    try {
      await authService.logout();
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      dispatch({ type: AUTH_ACTIONS.LOGOUT });
    }
  };

  const updateUser = async (updateData) => {
    try {
      const result = await authService.updateProfile(updateData);
      
      if (result.success) {
        dispatch({
          type: AUTH_ACTIONS.UPDATE_USER,
          payload: { user: result.user }
        });
        return { success: true };
      } else {
        return { success: false, message: result.message };
      }
    } catch (error) {
      console.error('Update user error:', error);
      return { success: false, message: 'Update failed' };
    }
  };

  const refreshUserData = async () => {
    try {
      const result = await authService.getCurrentUser();
      
      if (result.success) {
        dispatch({
          type: AUTH_ACTIONS.UPDATE_USER,
          payload: { user: result.user }
        });
        return { success: true };
      } else {
        return { success: false, message: result.message };
      }
    } catch (error) {
      console.error('Refresh user data error:', error);
      return { success: false, message: 'Failed to refresh user data' };
    }
  };

  const value = {
    user: state.user,
    authState: state.authState,
    isLoading: state.authState === AUTH_STATES.LOADING,
    isAuthenticated: state.authState === AUTH_STATES.AUTHENTICATED,
    login,
    register,
    logout,
    updateUser,
    refreshUserData,
    checkAuthStatus
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  
  return context;
};

export { AUTH_STATES };