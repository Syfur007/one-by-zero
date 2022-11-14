import { createBrowserRouter } from "react-router-dom";
import Main from "../../Layout/Main/Main";
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
		],
	},
]);

export default router;
