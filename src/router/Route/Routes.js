import { createBrowserRouter } from "react-router-dom";
import Main from "../../Layout/Main/Main";
import Books from "../../pages/Contribute/Books";
import Question from "../../pages/Contribute/Question";
import Slides from "../../pages/Contribute/Slides";
import Course from "../../pages/Course/Course/Course";
import Home from "../../pages/Home/Home/Home";
import Login from "../../pages/Login/Login";
import Profile from "../../pages/Profile/Profile";
import Resources from "../../pages/Resources/Resources";
import Signup from "../../pages/Signup/Signup";
import PrivateRoute from "../PrivateRoute/PrivateRoute";

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
				element: (
					<PrivateRoute>
						<Question></Question>
					</PrivateRoute>
				),
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
				element: (
					<PrivateRoute>
						<Resources></Resources>
					</PrivateRoute>
				),
			},
			{
				path: "/profile",
				element: <Profile></Profile>,
			},
		],
	},
]);

export default router;
