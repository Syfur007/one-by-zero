import axios from "axios";
import React from "react";
import { useContext } from "react";
import { primary } from "../../../constants/colors";
import { DEFAULT_URL_SERVER } from "../../../constants/url";
import { CourseContext } from "../../../contexts/CourseProvider/CourseProvider";

const DeleteQuestion = ({ deleteQuestion, setDeleteQuestion }) => {
	const { setCourses, courses } = useContext(CourseContext);

	const submitHandler = async (e) => {
		e.preventDefault();

		try {
			const data = await axios.delete(
				`http://localhost:8080/api/contribute/questions?courseId=${deleteQuestion?.courseId}&questionId=${deleteQuestion?.questionId}&link=${deleteQuestion?.link}`
			);
			console.log(data);
			const filteredQuestions = courses?.questions.filter(
				(question) => question._id !== deleteQuestion?.questionId
			);
			courses.questions = [...filteredQuestions];
			setCourses(courses);
			setDeleteQuestion("");
		} catch (error) {
			console.log(error);
		}
	};
	return (
		<div>
			{/* Put this part before </body> tag */}
			<input type="checkbox" id="my-delete-modal" className="modal-toggle" />
			<div className="modal modal-bottom sm:modal-middle">
				<div className="modal-box">
					<form onSubmit={submitHandler} className="text-black w-full">
						<h1 className="text-red-600 font-semibold text-2xl py-5 text-center">
							Are you want to delete it?
						</h1>

						<img
							src={
								deleteQuestion?.link?.includes("i.ibb.co")
									? deleteQuestion?.link
									: `${DEFAULT_URL_SERVER}/${deleteQuestion?.link}`
							}
							className="w-full h-[300px] rounded-md"
							alt=""
						/>

						<div className="flex justify-between mt-2">
							<button
								className={`btn btn-sm bg-[${primary}] border-0`}
								type="submit"
							>
								delete
							</button>
							<label htmlFor="my-delete-modal" className="btn btn-sm btn-error">
								cancel
							</label>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
};

export default DeleteQuestion;
