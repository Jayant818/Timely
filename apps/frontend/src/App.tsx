import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import GetAlert from "./screens/GetAlert";
import LandingPage from "./screens/LandingPage";

function App() {
	return (
		<div className=" w-full bg-[#181a1b] text-white">
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<LandingPage />} />
					<Route path="/getAlert" element={<GetAlert />} />
				</Routes>
			</BrowserRouter>
		</div>
	);
}

export default App;
