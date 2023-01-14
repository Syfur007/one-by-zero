import axios from "axios";
import React from "react";
import { useContext } from "react";
import { toast } from "react-hot-toast";
import { CourseContext } from "../../../contexts/CourseProvider/CourseProvider";

const DeleteQuestion = ({ deleteQuestion, setDeleteQuestion }) => {
	const { setCourses, courses } = useContext(CourseContext);
	console.log(courses, setCourses);

	const submitHandler = async (e) => {
		e.preventDefault();
		try {
			const { data } = axios.delete(
				`https://server.onebyzeroedu.com/api/contribute/questions?courseId=${deleteQuestion?.courseId}&questionId=${deleteQuestion?.questionId}`
			);
			console.log(data);
			const filteredQuestions = courses?.questions.filter(
				(question) => question._id !== deleteQuestion?.questionId
			);
			courses.questions = [...filteredQuestions];
			setCourses(courses);
			setDeleteQuestion("");
			toast.success("question successfully deleted");
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
					<form onSubmit={submitHandler} className="text-black">
						<h1 className="text-red-600 font-semibold text-2xl py-5 text-center">
							Are you want to delete it?
						</h1>
						<div className="w-full h-full py-2 ">
							<img
								src={deleteQuestion?.link}
								className="w-full h-full rounded-md"
								alt=""
							/>
						</div>
						<div className="flex justify-between">
							<button className="btn btn-sm btn-primary" type="submit">
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
