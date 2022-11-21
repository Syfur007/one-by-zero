import { createBrowserRouter } from "react-router-dom";
import Main from "../../Layout/Main/Main";
import Books from "../../pages/Contribute/Books";
import Question from "../../pages/Contribute/Question";
import Slides from "../../pages/Contribute/Slides";
import Course from "../../pages/Course/Course/Course";
import Home from "../../pages/Home/Home/Home";
import Login from "../../pages/Login/Login";
import Resources from "../../pages/Resources/Resources";
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
				path: "/contribute/questions",
				element: <Question></Question>,
			},
			{
				path: "/contribute/slides",
				element: <Slides></Slides>,
			},
			{
				path: "/contribute/books",
				element: <Books></Books>,
			},
			{
				path: "/resources",
				element: <Resources></Resources>,
			},
		],
	},
]);

export default router;
