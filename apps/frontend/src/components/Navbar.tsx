const Navbar = () => {
	return (
		<div className="flex justify-between items-center px-4 md:px-10 border-b-[1px] py-1 border-[#272a2b]">
			{/* <h3 className="font-bold text-[#00afd2] text-4xl ">TimelyAlert</h3>
			 */}
			<a href="/">
				<img
					src="logo-2.png"
					alt="TimelyAlert Logo"
					className="w-[4rem] h-[3rem]  md:w-[6rem] md:h-[4rem]"
				/>
			</a>
			{/* <button
				className="rounded-md px-8 py-3 bg-purple-900 text-white font-bold"
				onClick={() => navigate("/getAlert")}
			>
				Get Started
			</button> */}
		</div>
	);
};

export default Navbar;
