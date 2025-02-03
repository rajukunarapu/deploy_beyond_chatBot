import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Google, Visibility, VisibilityOff } from '@mui/icons-material';
import { Container, Typography, TextField, InputAdornment, IconButton, Button, Alert, Paper } from '@mui/material';
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { initializeApp } from 'firebase/app';

// Firebase Configuration
const firebaseConfig = {
  apiKey: "AIzaSyD6sGiM8busdE7-bxrudBZ6au7i78e-ESQ",
  authDomain: "beyondchatbots-16e0e.firebaseapp.com",
  projectId: "beyondchatbots-16e0e",
  storageBucket: "beyondchatbots-16e0e.appspot.com",
  messagingSenderId: "82734513326",
  appId: "1:82734513326:android:0e1070567b7e300342013f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

const Registration = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const ToggleShowPassword = () => setShowPassword((prev) => !prev);

  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [openAlert, setOpenAlert] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
    if (userName !== '' && password !== '') {
      if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(userName) &&
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).{8,}$/.test(password)) {
        setIsSubmitted(false);
        setOpenAlert(true);
        navigate('/verify',{ state:{ gmail:userName } });
      }
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      console.log('Google User:', result.user);
      navigate('/setup');
    } catch (error) {
      console.error('Google Sign-In Error:', error);
    }
  };

  return (
    <Container maxWidth="xs" sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', p: 2 }}>
      <Paper elevation={6} sx={{ p: { xs: 3, sm: 5 }, borderRadius: 5, width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography variant="h5" fontWeight="bold" mb={2} textAlign="center">Create an account</Typography>

        <TextField value={userName} onChange={(e) => setUserName(e.target.value)} label="Email address*"
          type="text" variant="outlined" color="warning" fullWidth sx={{ mt: 2 }} size="medium"
        />
        {isSubmitted && !(/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(userName)) && <Alert severity="error" sx={{ width: '100%', mt: 1 }}>Provide a valid email</Alert>}

        <TextField value={password} onChange={(e) => setPassword(e.target.value)} color="warning" label="Password*"
          type={showPassword ? "text" : "password"} variant="outlined" fullWidth sx={{ mt: 3 }}
          InputProps={{
            endAdornment: <InputAdornment position="end">
              <IconButton onClick={ToggleShowPassword}>
                {showPassword ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            </InputAdornment>
          }}
        />
        {isSubmitted && !(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).{8,}$/.test(password)) && <Alert severity="error" sx={{ width: '100%', mt: 1 }}> Provide a valid password </Alert>}

        <Button variant="contained" onClick={handleSubmit} sx={{ width: '100%', mt: 4, backgroundColor: '#10a37f', color: 'white' }} size="large">
          Continue
        </Button>

        <Button variant="outlined" startIcon={<Google color="action" />} onClick={handleGoogleSignIn}
          size="large" color="secondary" sx={{ width: '100%', mt: 3, color: 'black', fontWeight: 'bold' }}>
          Continue with Google
        </Button>

        {openAlert && <Alert severity="success" variant="filled" sx={{ width: '100%', mt: 1 }}> Successfully registered </Alert>}
      </Paper>
    </Container>
  );
};

export default Registration;
