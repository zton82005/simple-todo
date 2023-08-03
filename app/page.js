"use client";

import { useState } from "react";
import Image from "next/image";

export default function Home() {
	const [plan, setPlan] = useState("");
	const [displayPlan, setDisplayPlan] = useState("");
	const [yourName, setYourName] = useState("");

	const handleInputNameChange = (event) => {
		// Update the 'plan' state with the user's input from the input field
		setYourName(event.target.value);
	};
	const handleInputChange = (e) => {
		// Update the 'plan' state with the user's input from the input field
		setPlan(e.target.value);
	};

	const handleButtonClick = () => {
		// Set the 'displayPlan' state with the 'plan' value when the button is clicked
		if (plan === "") {
			setDisplayPlan("Nothing");
		} else {
			setDisplayPlan(plan);
		}
	};

	return (
		<main className="flex min-h-screen flex-col items-center justify-center p-24 gap-10">
			<Image
				src="/test-img.jpg"
				width={300}
				height={200}
				alt="computer"
				className="rounded-md"
			/>
			<input
				className="p-2 rounded-md text-black" // Add 'text-black' class to change the text color
				type="text"
				placeholder="Enter your name"
				value={yourName}
				onChange={handleInputNameChange}
			/>
			<input
				className="p-2 rounded-md text-black" // Add 'text-black' class to change the text color
				type="text"
				placeholder="Enter text here"
				value={plan}
				onChange={handleInputChange}
			/>
			<button
				className="p-2 ml-3 bg-slate-500 rounded-md hover:bg-slate-700"
				onClick={handleButtonClick}
			>
				Display
			</button>

			<p className="mt-10 text-center">
				Hello <span className="text-red-500">{yourName}</span>, <br />
				Your plan for today:{" "}
				{displayPlan && <span className="text-blue-300">{displayPlan}</span>}
			</p>
		</main>
	);
}
