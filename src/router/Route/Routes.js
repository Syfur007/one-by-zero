import { createBrowserRouter } from "react-router-dom";
import Main from "../../Layout/Main/Main";
import Question from "../../pages/Contribute/Question";
import Course from "../../pages/Course/Course/Course";
import Home from "../../pages/Home/Home/Home";
import Login from "../../pages/Login/Login";
import Signup from "../../pages/Signup/Signup";

const router = createBrowserRouter([
	{
		path: "/",
		element: <Main></Main>,
		children: [
			{
				path: "/",
				element: <Home></Home>,
			},
			{
				path: "/course",
				element: <Course></Course>,
			},
			{
				path: "/login",
				element: <Login></Login>,
			},
			{
				path: "/signup",
				element: <Signup></Signup>,
			},
			{
				path: "/contribute/question",
				element: <Question></Question>,
			},
		],
	},
]);

export default router;
