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

  export const HostSession = createAsyncThunk('app/HostSession', async ({ code, pin }) => {
    try {
     
  
      const sessionsCollection = collection(db, 'sessions');
      const querySnapshot = await getDocs(query(sessionsCollection, where('code', '==', code)));
  
      if (querySnapshot.size === 0) {
        throw new Error('Session not found with the provided code.');
      }
  
      const sessionDoc = querySnapshot.docs[0];
  
      if (!sessionDoc) {
        throw new Error('Session document is null.');
      }
  
      const sessionData = sessionDoc.data();
  
      if (sessionData.pin !== pin) {
        throw new Error('Invalid pin for the session.');
      }
      
      const participantInfo = {
  
        guestId: generateGuestId(),
        isHost:true,
     
      };
      return { sessionId: sessionDoc.id, participant: participantInfo, ...sessionData };
    } catch (error) {
      throw error;
    }
  });
  export const HosturSession = createAsyncThunk('app/HosturSession', async ({ code }) => {
    
    try {
      
      const sessionsCollection = collection(db, 'sessions');
      const querySnapshot = await getDocs(query(sessionsCollection, where('code', '==', code)));
  
      if (querySnapshot.size === 0) {
        throw new Error('Session not found with the provided code.');
      }
  
      const sessionDoc = querySnapshot.docs[0];
  
      if (!sessionDoc) {
        throw new Error('Session document is null.');
      }
  
      const sessionData = sessionDoc.data();
  
  
      const participantInfo = {

        guestId: generateGuestId(),
        isHost:true,
     
      };
      return { sessionId: sessionDoc.id, participant: participantInfo, ...sessionData };
    } catch (error) {
      throw error;
    }
  });

  export const joinSession = createAsyncThunk('app/joinSession', async ({ code }) => {
    try {
      console.log('Joining session with code:', code);
  
      const sessionsCollection = collection(db, 'sessions');
      const querySnapshot = await getDocs(query(sessionsCollection, where('code', '==', code)));
  
      if (querySnapshot.size === 0) {
        throw new Error('Session not found with the provided code.');
      }
  
      const sessionDoc = querySnapshot.docs[0];
  
      if (!sessionDoc) {
        throw new Error('Session document is null.');
      }
  
      const sessionData = sessionDoc.data();
  
  
      const participantInfo = {
  
        guestId: generateGuestId(),
        isHost: false,
     
      };
      return { sessionId: sessionDoc.id, participant: participantInfo, ...sessionData };
    } catch (error) {
      throw error;
    }
  });

  export const sendMessage = createAsyncThunk('app/sendMessage', async ({ sessionId, sender, text }) => {
    try {
      const messagesCollection = collection(db, `sessions/${sessionId}/messages`);
  
      await addDoc(messagesCollection, {
        sender,
        text,
        timestamp: serverTimestamp(),
      });
    } catch (error) {
      throw error;
    }
  });
  
  export const incrementCounter = createAsyncThunk('app/incrementCounter', async ({ sessionId }) => {
    try {
      dispatch(incrementCounterLocally({ sessionId }));
    } catch (error) {
      throw error;
    }
  });
  
  

  const generateGuestId = () => {

    return `guest_${Date.now()}_${Math.floor(Math.random() * 1000)}`;
  };

const initialState = {
    sessions: [],
    messages: [],
    counters: {},
    loading: false,
    error: null,
    isHost:false,
};

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setHost: (state, action) => {
        state.isHost = action.payload;
      },
      setMessages: (state, action) => {
        state.messages = action.payload;
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
      builder
      .addCase(HostSession.fulfilled, (state, action) => {
        state.loading = false;
        state.sessions.push(action.payload); 
        state.isHost = true;
      }).addCase(HostSession.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
      builder
      .addCase(HosturSession.fulfilled, (state, action) => {
        state.loading = false;
        state.sessions.push(action.payload); 
        state.isHost = true;
      }).addCase(HosturSession.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
      builder
      .addCase(joinSession.fulfilled, (state, action) => {
        state.loading = false;
        state.isHost = false;
        state.sessions.push(action.payload); 
      }).addCase(joinSession.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
      builder.addCase(sendMessage.fulfilled, (state, action) => {
        state.loading = false;
        state.sessions.push(action.payload);
      })
   .addCase(sendMessage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  }
});

export const { actions, reducer } = appSlice;
export const { setMessages  } = appSlice.actions;
export default appSlice.reducer;