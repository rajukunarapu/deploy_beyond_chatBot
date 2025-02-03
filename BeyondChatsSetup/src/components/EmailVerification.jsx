import { useState } from "react";
import { useLocation, useNavigate } from 'react-router-dom';
import { Container, Typography, TextField, Button, Alert, Paper } from '@mui/material';


const EmailVerification = () => {
  const navigate = useNavigate();
  const location = useLocation()
  const { gmail } = location.state || {}

  // State Variables
  const [email, setEmail] = useState(gmail);
  const [code, setCode] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [openVerificationBox, setOpenVerificationBox] = useState(false);
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState('');
  const [removeAlert, setRemoveAlert] = useState(true);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
    if (email !== '' && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setIsSubmitted(false);
      sendVerificationCode();
      setOpenVerificationBox(true);
    }
  };

  const sendVerificationCode = async () => {
    const res = await fetch(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/send-email`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });
    const data = await res.json();
    setMessage(data.desc);
    setSuccess(data.success);
  };

  const verifyCode = async () => {
    const res = await fetch(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/verify-code`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, code }),
    });
    const data = await res.json();
    setMessage(data.message);
    if (data.success) {
      navigate('/setup');
    }
  };

  return (
    <Container maxWidth="xs" sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', p: 2 }}>
      <Paper elevation={6} sx={{ p: { xs: 3, sm: 5 }, borderRadius: 5, width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography variant="h5" fontWeight="bold" mb={2} textAlign="center">Email Verification</Typography>

        <TextField value={email} onChange={(e) => setEmail(e.target.value)} label="Email address*"
          type="text" variant="outlined" color="warning" fullWidth sx={{ mt: 2 }} size="medium"
        />
        {isSubmitted && email === '' && <Alert severity="error" variant="filled" sx={{ width: '100%', mt: 1 }}>Email cannot be empty</Alert>}

        <Button variant="contained" onClick={handleSubmit} sx={{ width: '100%', mt: 2, backgroundColor: '#10a37f', color: 'white' }} size="large">
          Send Code
        </Button>

        {openVerificationBox && (
          <>
            <TextField value={code} onChange={(e) => setCode(e.target.value)} label="Enter Verification Code"
              type="text" variant="outlined" color="warning" fullWidth sx={{ mt: 2 }} size="medium"
            />
            <Button variant="contained" onClick={verifyCode} sx={{ width: '100%', mt: 2, backgroundColor: '#10a37f', color: 'white' }} size="large">
              Continue
            </Button>
          </>
        )}

        {message && removeAlert && (
          <Alert severity={success ? 'success' : 'error'} onClose={() => setRemoveAlert(false)} sx={{ width: '100%', mt: 2 }}>
            {message}
          </Alert>
        )}
      </Paper>
    </Container>
  );
};

export default EmailVerification;
