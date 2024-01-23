import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { collection, query, where, getDocs,serverTimestamp,addDoc } from 'firebase/firestore'; 
import { getAuth } from 'firebase/auth';

import { db } from '@/utils/firebase';

const currentUser = getAuth().currentUser;

export const createSession = createAsyncThunk('app/createSession', async (sessionData) => {
    try {
      console.log('Creating session with payload:', sessionData);
  
      const sessionsCollection = collection(db, 'sessions');
      const sessionRef = await addDoc(sessionsCollection, sessionData); 
  
      return { sessionId: sessionRef.id, ...sessionData };
    } catch (error) {
      throw error;
    }
  });

const initialState = {
    sessions: [],
    loading: false,
    isHost: false,
    error: null,
};

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setHost: (state, action) => {
        state.isHost = action.payload;
      },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createSession.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createSession.fulfilled, (state, action) => {
        state.loading = false;
        state.sessions.push(action.payload);
        state.isHost = action.payload.host || false;
      })
      .addCase(createSession.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  }
});

export const { actions, reducer } = appSlice;
export default appSlice.reducer;