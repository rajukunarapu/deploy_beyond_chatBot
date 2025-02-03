import { Button, Typography, Box } from "@mui/material";
import Chatbot from "./Chatbot"; // Import the Chatbot component
import { useNavigate } from "react-router-dom";

const ChatbotIntegration = () => {
  const navigate = useNavigate();

  return (
    <Box sx={{ padding: { xs: 2, sm: 4 }, textAlign: "center" }}>
      <Typography variant="h4" fontWeight="bold" mb={3}>
        Chatbot Integration
      </Typography>

      {/* Buttons for testing and integration */}
      <Box sx={{ mb: 3 ,display:'flex',justifyContent:'center', alignItems:'center' }}>
        <Button
          variant="contained"
          color="success"
          sx={{ mr: 2}}
          onClick={() => alert("Chatbot Test Started")}
        >
          Test Chatbot
        </Button>
        <Button
          variant="contained"
          color="secondary"
          onClick={() => navigate("/success")}
        >
          Integrate on Website
        </Button>
      </Box>

      {/* Chatbot Component */}
      <Chatbot />
    </Box>
  );
};

export default ChatbotIntegration;
