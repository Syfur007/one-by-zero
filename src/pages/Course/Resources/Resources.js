import React, { useState } from "react";
import { HiXMark } from "react-icons/hi2";
const Resources = () => {
	const [showModal, setShowModal] = useState(false);
	const cancelButton = () => {
		setShowModal(false);
	};
	return (
		<div className=" w-full text-white">
			{showModal ? (
				<>
					<div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
						<div className="relative my-6 mx-auto w-[90%]">
							{/*content*/}
							<div className="border-0 relative rounded-lg shadow-lg  flex flex-col w-full bg-pink-900 outline-none focus:outline-none">
								<span
									onClick={cancelButton}
									className="absolute top-3 right-3 cursor-pointer"
								>
									<HiXMark className="w-6 h-6"></HiXMark>
								</span>
								{/*header*/}

								<div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
									<h3 className="text-3xl font-semibold">
										Lorem ipsum dolor sit.
									</h3>
								</div>
								{/*body*/}
								<div className="relative p-6 w-full flex-auto">
									<p>lore10</p>
								</div>
							</div>
						</div>
					</div>
					<div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
				</>
			) : null}
			<div className="grid grid-cols-4 gap-4">
				<div
					onClick={() => setShowModal(true)}
					className="w-56  bg-green-700 cursor-pointer flex shadow-md items-center justify-center p-10 border-2 rounded-md"
				>
					<h3 className="text-xl font-semibold">Questions</h3>
				</div>
				<div className="w-56 bg-green-700 cursor-pointer flex shadow-md items-center justify-center p-10 border-2 rounded-md">
					<h3 className="text-xl font-semibold">Books</h3>
				</div>
				<div className="w-56 bg-green-700 cursor-pointer flex shadow-md items-center justify-center p-10 border-2 rounded-md">
					<h3 className="text-xl font-semibold">Class Notes</h3>
				</div>
				<div className="w-56 bg-green-700 cursor-pointer flex shadow-md items-center justify-center p-10 border-2 rounded-md">
					<h3 className="text-xl font-semibold">Lecture Slide</h3>
				</div>
				<div className="w-56 bg-green-700 cursor-pointer flex shadow-md items-center justify-center p-10 border-2 rounded-md">
					<h3 className="text-xl font-semibold">Suggestions</h3>
				</div>
			</div>
		</div>
	);
};

export default Resources;
