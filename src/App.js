import { RouterProvider } from "react-router-dom";
import router from "./router/Route/Routes.js";
import "reactjs-popup/dist/index.css";
import { Toaster } from "react-hot-toast";
import "./App.css";

function App() {
	return (
		<div>
			<RouterProvider router={router}></RouterProvider>
			<Toaster></Toaster>
		</div>
	);
}

export default App;
