import React from "react";
import { useEffect } from "react";
import { useContext } from "react";
import { Outlet } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthProvider/AuthProvider";
import AdminLeftSide from "../../pages/Admin/AdminLeftSide/AdminLeftSide";
import Header from "../../pages/Shared/Header/Header";

const AdminLayout = () => {
	const { setTitle } = useContext(AuthContext);

	useEffect(() => {
		setTitle("Admin | OneByZero");
	}, [setTitle]);

	return (
		<div>
			<Header></Header>
			<div className="py-[64px] w-full">
				<AdminLeftSide></AdminLeftSide>
				<div className="ml-[250px] min-h-[90vh] admin-right-side-box">
					<Outlet></Outlet>
				</div>
			</div>
		</div>
	);
};

export default AdminLayout;
