import { RouterProvider } from "react-router-dom";
import router from "./router/Route/Routes.js";
import "reactjs-popup/dist/index.css";
import { Toaster } from "react-hot-toast";
import "./App.css";

// Black-1: #1a1a1a
// Black-2: #282828
// Black-3: #373737
// Black-4: #424242
// Black-5: #686868

function App() {
	return (
		<div className="bg-[#1a1a1a]">
			<RouterProvider router={router}></RouterProvider>
			<Toaster></Toaster>
		</div>
	);
}

export default App;
