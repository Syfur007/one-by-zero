import React from "react";
import { Outlet } from "react-router-dom";
import Footer from "../../pages/Footer/Footer.js";
import Header from "../../pages/Shared/Header/Header.js";

const Main = () => {
	return (
		<div>
			<Header></Header>
			<Outlet></Outlet>
			<Footer></Footer>
		</div>
	);
};

export default Main;
