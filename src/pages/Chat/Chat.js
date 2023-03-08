import React, { useState, useEffect } from "react";
import io from "socket.io-client";

const socket = io("http://localhost:8080");

const Chat = () => {
	const [username, setUsername] = useState("");
	const [message, setMessage] = useState("");
	const [messages, setMessages] = useState([]);

	useEffect(() => {
		socket.on("chatMessage", (data) => {
			setMessages([...messages, data]);
		});
	}, [messages]);

	const sendMessage = () => {
		socket.emit("chatMessage", { username, message });
		setMessage("");
	};

	return (
		<div style={{ paddingTop: 100 }}>
			<h1>Chat App</h1>
			<div>
				<label htmlFor="username">Username:</label>
				<input
					id="username"
					type="text"
					value={username}
					onChange={(e) => setUsername(e.target.value)}
				/>
			</div>
			<div>
				<label htmlFor="message">Message:</label>
				<input
					id="message"
					type="text"
					value={message}
					onChange={(e) => setMessage(e.target.value)}
				/>
				<button onClick={sendMessage}>Send</button>
			</div>
			<div>
				{messages.map((message, index) => (
					<div key={index}>
						<strong>{message.username}:</strong> {message.message}
					</div>
				))}
			</div>
		</div>
	);
};

export default Chat;
