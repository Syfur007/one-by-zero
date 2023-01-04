import { createBrowserRouter } from "react-router-dom";
import Main from "../../Layout/Main/Main";
import Books from "../../pages/Contribute/Books";
import HandNote from "../../pages/Contribute/HandNote";
import Question from "../../pages/Contribute/Question";
import Slides from "../../pages/Contribute/Slides";
import Course from "../../pages/Course/Course/Course";
import Home from "../../pages/Home/Home/Home";
import Login from "../../pages/Login/Login";
import Profile from "../../pages/Profile/Profile/Profile";
import Resources from "../../pages/Resources/Resources";
import Signup from "../../pages/Signup/Signup";
import PrivateRoute from "../PrivateRoute/PrivateRoute";
import Admin from "../../pages/Admin/Admin/Admin";
import AdminLayout from "../../Layout/Admin/AdminLayout";
import AdminRoute from "../AdminRoute/AdminRoute";
import CreateTemplate from "../../pages/Admin/CreateTemplate/CreateTemplate";
import CourseBookDetails from "../../pages/Course/CourseBook/CourseBookDetails";
import Users from "../../pages/Admin/Users/Users/Users";

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
