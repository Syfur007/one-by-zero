import React, { useEffect, useState } from "react";

const Question = () => {
	const [universities, setUniversities] = useState([]);

	// fetch university data
	useEffect(() => {
		fetch("http://localhost:8080/university")
			.then((res) => res.json())
			.then((data) => {
				setUniversities(data);
				console.log(data);
			})
			.catch((err) => console.log(err));
	}, []);

	return (
		<div className="w-full my-10">
			<h1 className="text-4xl text-center uppercase mb-10"> give questions</h1>
			<form className="w-1/2 mx-auto">
				<div className="w-4/3">
					<select className="select select-bordered w-full">
						<option disabled selected>
							Select your university
						</option>
						{universities.map((uni) => (
							<option value={uni.name} key={uni._id}>
								{uni.name}
							</option>
						))}
					</select>
				</div>
			</form>
		</div>
	);
};

export default Question;
