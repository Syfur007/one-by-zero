import { RouterProvider } from "react-router-dom";
import "./App.css";
import router from "./router/Route/Routes";
import "reactjs-popup/dist/index.css";

function App() {
	return <RouterProvider router={router}></RouterProvider>;
}

export default App;
