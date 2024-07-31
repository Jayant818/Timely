import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useState } from "react";
import { FaArrowRightLong } from "react-icons/fa6";
import Footer from "../components/Footer";

const LandingPage = () => {
	const [location, setLocation] = useState("");
	const navigate = useNavigate();
	const [time, setTime] = useState("5");

	const handleClick = () => {
		navigate(`/getAlert?location=${location}&time=${time}`);
	};

	return (
		<div className="pt-4">
			<Navbar />
			<div className="flex flex-col justify-between items-center mt-[10rem] text-white">
				<h2 className="text-6xl font-bold">Never Miss Your Stop Again</h2>
				<p className="text-2xl pt-2">
					Stay alert and arrive on time with our smart travel companion
				</p>
				<div className="flex mt-4 relative">
					<input
						type="text"
						placeholder="Enter your Destination"
						value={location}
						className="  rounded-full px-10 pr-[14.5rem]  py-4 bg-[#121212] text-[#5e5c56] focus:outline-none border-2 border-[#00afd2] text-lg w-[30rem]"
						onChange={(e) => setLocation(e.target.value)}
					/>
					<select
						value={time}
						onChange={(e) => setTime(e.target.value)}
						className="absolute right-[9.3rem] bg-[#121212] text-[#5e5c56] focus:outline-none py-[14px] top-2   text-lg"
					>
						<option value={5}>5 Min</option>
						<option value={10}>10 Min</option>
						<option value={15}>15 Min</option>
						<option value={20}>20 Min</option>
						<option value={30}>30 Min</option>
					</select>
					<button
						onClick={handleClick}
						className="absolute font-medium  flex items-center gap-2 right-0 pr-4 pl-2 rounded-e-full rounded-s-xl bg-[#00afd2] py-[17.7px] text-lg "
					>
						Try for FREE <FaArrowRightLong />{" "}
					</button>
				</div>
			</div>
			<section
				id="features"
				className="flex gap-4  flex-col items-start w-full justify-between pb-20 mt-28"
			>
				<h3 className="pl-20 text-4xl font-extrabold text-white">Features</h3>
				<div className="flex w-full  justify-between px-20 pt-4">
					<div className="flex flex-col p-4 gap-4 border-[1px] border-[#00afd2]  rounded-lg text-white  bg-[#181a1b]  items-center">
						<img
							src="img-1.png"
							alt="Destination Icon"
							className="w-[12renm] h-[12rem]"
						/>
						<h3 className="text-2xl font-bold">Easy Destination Input</h3>

						<p className="w-[18rem]">
							Quickly set your travel plans with our user-friendly interface.
						</p>
					</div>

					<div className="flex flex-col p-4 gap-4 border-[1px] border-[#00afd2]  items-center justify-center rounded-lg text-white  bg-[#181a1b]">
						<img
							src="img-2.png"
							alt="Alert Icon"
							className="w-[12renm] h-[12rem]"
						/>
						<h3 className="text-2xl font-bold">Smart Alerts</h3>
						<p className="w-[18rem]">
							Receive timely notifications 5 minutes before reaching your
							destination.
						</p>
					</div>

					<div className="flex flex-col p-4 gap-4 border-[1px] border-[#00afd2] items-center justify-center rounded-lg text-white  bg-[#181a1b]">
						<img
							src="img-3.png"
							alt="Customize Icon"
							className="w-[12renm] h-[12rem]"
						/>
						<h3 className="text-2xl font-bold">Personalized Settings</h3>
						<p className="w-[18rem]">
							Tailor alert types and timing to suit your individual travel
							preferences.
						</p>
					</div>
				</div>
			</section>
			<Footer />
		</div>
	);
};

export default LandingPage;
