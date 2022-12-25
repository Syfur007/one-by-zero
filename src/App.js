import { RouterProvider } from "react-router-dom";
import "./App.css";
import router from "./router/Route/Routes";
import "reactjs-popup/dist/index.css";
import { Toaster } from "react-hot-toast";

function App() {
	return (
		<div>
			<RouterProvider router={router}></RouterProvider>
			<Toaster></Toaster>
		</div>
	);
}

export default App;
