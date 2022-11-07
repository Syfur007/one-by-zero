import { createBrowserRouter } from "react-router-dom";
import Main from "../../Layout/Main/Main";
import Course from "../../pages/Course/Course";
import Home from "../../pages/Home/Home/Home";

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
		],
	},
]);

export default router;
