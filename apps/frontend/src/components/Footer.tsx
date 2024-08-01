import { FaExternalLinkAlt } from "react-icons/fa";

const Footer = () => {
	return (
		<footer className="flex justify-between px-4  md:px-10 gap-2 text-white pb-4 pt-4">
			<p className="flex md:gap-1 items-center">
				Made By Jayant
				<a href="https://jayantdev.tech" target="_blank">
					<FaExternalLinkAlt className="text-blue-800" />
				</a>
			</p>
			<p>&copy; 2024 Timely. All rights reserved.</p>
		</footer>
	);
};

export default Footer;
