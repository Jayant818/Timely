import { useEffect, useState } from "react";

export default function useSocket() {
	const [socket, setSocket] = useState<WebSocket | null>(null);

	useEffect(() => {
		const ws = new WebSocket("ws://localhost:3000");

		ws.onopen = () => {
			console.log("Connected to the ws server");
			setSocket(ws);
		};

		ws.onclose = () => {
			setSocket(null);
		};

		return () => {
			ws.close();
		};
	}, []);

	return socket;
}
