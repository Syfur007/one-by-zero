import React, { useContext, useState } from "react";
import { AuthContext } from "../../../contexts/AuthProvider/AuthProvider";

const FIleModal = ({ setShowFileModal }) => {
	const [file, setFile] = useState("");
	const { user } = useContext(AuthContext);
	const selectedFileTypes = ["application/pdf"];
	const uploadFileHandler = () => {
		if (file && selectedFileTypes.includes(file.type)) {
			console.log("anis molla");
			alert("anis molla");
		} else if (file.type !== "video/mp4") {
			alert("please select valid file");
		}
	};
	const handleFileChange = (e) => {
		setFile(e.target.files[0]);
	};
	return (
		<div>
			{/* Put this part before </body> tag */}
			<input type="checkbox" id="file-input-modal-3" className="modal-toggle" />
			<div className="modal">
				<div className="relative modal-box">
					<label
						htmlFor="file-input-modal-3"
						className="absolute btn btn-sm btn-circle right-2 top-2"
					>
						✕
					</label>
					<h3 className="text-lg font-bold">Add File </h3>

					<div className="my-5">
						<label htmlFor="" className="mb-2 text-base font-semibold">
							Username
						</label>
						<input
							type="text"
							placeholder="Type here"
							disabled
							value={user?.displayName}
							className="w-full border-2 rounded-md outline-none input active:outline-none focus:outline-none input-primary"
						/>
					</div>
					<div className="my-5">
						<label htmlFor="" className="mb-2 text-base font-semibold">
							Email
						</label>
						<input
							type="text"
							placeholder="Type here"
							disabled
							value={user?.email}
							className="w-full border-2 rounded-md outline-none input active:outline-none focus:outline-none input-primary"
						/>
					</div>
					<div>
						<input
							type="file"
							onChange={handleFileChange}
							className="w-full file-input file-input-bordered file-input-primary "
						/>
					</div>

					<div className="flex justify-between mt-10">
						<button
							onClick={uploadFileHandler}
							type="button"
							className="btn btn-primary"
						>
							submit
						</button>
						<button
							className="btn btn-error"
							onClick={() => setShowFileModal(false)}
						>
							Cancel
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default FIleModal;
