import { Button, Typography } from "@mui/material"

const SuccessScreen = () => {
    return (
      <>
        <Typography variant="h5" color='black' fontWeight={'bold'} m={'10px 0'} > Integration Successful! </Typography>
        <Button variant="contained" color="success" sx={{mb:2,mt:1}} >Explore Admin Panel</Button>
        <Typography variant="body1" >Start Talking to Your Chatbot</Typography>
      </>
    );
  };

export default SuccessScreen