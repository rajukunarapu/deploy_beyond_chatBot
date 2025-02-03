import { ArrowUpward, ChatBubble } from "@mui/icons-material";
import {
    Button,
    Paper,
    Stack,
    TextField,
    Typography,
    Box,
    IconButton,
} from "@mui/material";
import { useState } from "react";

const Chatbot = () => {
    const [messages, setMessages] = useState([
        { text: "Hello! How can I assist you?", sender: "bot" },
    ]);

    // capturing the user data
    const [input, setInput] = useState("");

    // open the chatbot
    const [open, setOpen] = useState(false);

    const handleSend = () => {
        if (!input.trim()) return;
        const userMessage = { text: input, sender: "user" };
        setMessages([...messages, userMessage]);
        setInput("");
        setTimeout(() => {
            setMessages(prev => [...prev, { text: "This is a dummy response!", sender: "bot" }]);
        }, 1000);
    };

    return (
        <>
            <Button variant="contained" color="primary" sx={{ position: "absolute", bottom: 35, right: 50 }}
                startIcon={<ChatBubble />} onClick={() => setOpen(!open)}
            >
                Chat
            </Button>
            {open && (
                <>
                    <Box sx={{ position: "relative" }}>
                        <Paper
                            sx={{
                                mb: 10, width: 250, height: 250, p: 3, borderRadius: 5, border: "2px solid black", position: "absolute",
                                top: 30, right: 20, overflow: "auto", // Prevents overflow issues
                            }}
                        >
                            <Typography variant="h6" color="black" fontWeight={"bold"} mb={2} >
                                BeyondChats - Chatbot
                            </Typography>
                            {messages.map((msg, index) => (
                                <Box
                                    key={index} sx={{
                                        display: "flex", justifyContent: msg.sender === "user" ? "flex-end" : "flex-start",
                                        mb: 2,
                                    }}
                                >
                                    <Typography
                                        sx={{
                                            padding: "4px 10px",
                                            borderRadius: "15px",
                                            backgroundColor:
                                                msg.sender === "user" ? "blueviolet" : "yellowgreen", // Green for user, light grey for bot
                                            color: msg.sender === "user" ? "white" : "black",
                                            maxWidth: "100%",
                                        }}
                                    >
                                        {msg.text}
                                    </Typography>
                                </Box>
                            ))}
                            <Stack
                                spacing={2}
                                direction={"row"}
                                justifyContent={"center"}
                                alignItems={"center"}
                                sx={{ position:'sticky' ,bottom:5 }}
                            >
                                <TextField
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    placeholder="Type a message"
                                    type="text"
                                    variant="outlined"
                                    color="black"
                                    autoFocus
                                    fullWidth
                                    sx={{
                                        "& .MuiOutlinedInput-input": { height: 4 },
                                        width: 250,
                                    }}
                                    size="medium"
                                />
                                <IconButton
                                    sx={{ ":hover": { backgroundColor: "gray", color: "white" } }}
                                    size="medium"
                                    onClick={handleSend}
                                >
                                    <ArrowUpward />
                                </IconButton>
                            </Stack>
                        </Paper>
                    </Box>
                </>
            )}
        </>
    );
};

export default Chatbot;
