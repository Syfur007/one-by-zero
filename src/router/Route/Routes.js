import { createBrowserRouter } from "react-router-dom";
import Main from "../../Layout/Main/Main.js";
import Books from "../../pages/Contribute/Books.js";
import HandNote from "../../pages/Contribute/HandNote.js";
import Question from "../../pages/Contribute/Question.js";
import Slides from "../../pages/Contribute/Slides.js";
import Course from "../../pages/Course/Course/Course.js";
import Home from "../../pages/Home/Home/Home.js";
import Login from "../../pages/Login/Login.js";
import Profile from "../../pages/Profile/Profile/Profile.js";
import Resources from "../../pages/Resources/Resources.js";
import Signup from "../../pages/Signup/Signup.js";
import PrivateRoute from "../PrivateRoute/PrivateRoute.js";
import Admin from "../../pages/Admin/Admin/Admin.js";
import AdminLayout from "../../Layout/Admin/AdminLayout.js";
import AdminRoute from "../AdminRoute/AdminRoute.js";
import CreateTemplate from "../../pages/Admin/CreateTemplate/CreateTemplate.js";
import CourseBookDetails from "../../pages/Course/CourseBook/CourseBookDetails.js";
import Users from "../../pages/Admin/Users/Users/Users.js";

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
				path: "/contribute/handnotes",
				element: <HandNote></HandNote>,
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
			{
				path: "/course/book/:bookName",
				element: <CourseBookDetails></CourseBookDetails>,
			},
		],
	},
	{
		path: "/admin",
		element: <AdminLayout></AdminLayout>,
		children: [
			{
				path: "/admin",
				element: (
					<AdminRoute>
						<Admin></Admin>,
					</AdminRoute>
				),
			},
			{
				path: "/admin/createtemplate",
				element: <CreateTemplate></CreateTemplate>,
			},
			{
				path: "/admin/users",
				element: (
					<AdminRoute>
						<Users></Users>
					</AdminRoute>
				),
			},
		],
	},
]);

export default router;
