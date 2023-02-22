import React from "react";
import { BsFillPlusCircleFill } from "react-icons/bs";
import { primary, secondary } from "../../../constants/colors";
import "./ImageInput.css";

const ImageInput = ({ onChange }) => {
	return (
		<div className="">
			<label className="block" htmlFor="file-upload">
				<BsFillPlusCircleFill
					className={`w-6 h-6 cursor-pointer hover:bg-[${secondary}]`}
				/>
			</label>
			<input
				id="file-upload"
				onChange={onChange}
				className="hidden"
				type="file"
				accept=".png,.jpg,.jpeg"
			/>
		</div>
	);
};

export default ImageInput;
