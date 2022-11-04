import React from "react";
import { Outlet } from "react-router-dom";
import Footer from "../../pages/Footer/Footer";
import Header from "../../pages/Shared/Header/Header";

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
