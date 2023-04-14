import { Fragment, useContext, useEffect, useState } from "react";
import "react-tooltip/dist/react-tooltip.css";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../../../contexts/AuthProvider/AuthProvider.js";
import useUser from "../../../hooks/useUser.js";
import navbarLogo from "../../../images/navbar-logo.png";
import { DEFAULT_URL_SERVER } from "../../../constants/url.js";
const Header = () => {
	const [showModel, setShowModel] = useState(true);
	const { user, logOut } = useContext(AuthContext);
	const [role, , userDetails] = useUser(user?.email);

	useEffect(() => {
		setShowModel(true);
	}, [showModel]);

	const menuItems = (
		<>
			<li>
				<Link className="hover:bg-[#1a1a1a] rounded-md " to="/">
					Home
				</Link>
			</li>
			<li>
				<Link className="hover:bg-[#1a1a1a] rounded-md " to="/resources">
					Resources
				</Link>
			</li>
			{user && (
				<li>
					<label
						htmlFor="my-modal-3"
						className="hover:bg-[#1a1a1a] rounded-md "
					>
						Contribute
					</label>
				</li>
			)}
		</>
	);

	const logoutHandler = () => {
		logOut()
			.then(() => {})
			.catch((err) => {
				console.log(err);
			});
	};

	const handleClick = () => {
		const elem = document.activeElement;
		if (elem) {
			elem?.blur();
		}
	};

	return (
		<>
			<div className="fixed top-0 z-50 w-full mx-auto max-w-screen-2xl navbar bg-[#373737] text-base-100">
				<div className="navbar-start">
					<div className="dropdown">
						<label tabIndex={0} className="btn btn-ghost lg:hidden">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								className="w-5 h-5"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth="2"
									d="M4 6h16M4 12h8m-8 6h16"
								/>
							</svg>
						</label>
						<ul
							tabIndex={0}
							className="p-2 mt-3 shadow bg-[#1a1a1a] menu menu-compact dropdown-content rounded-box w-52"
						>
							<>
								<li>
									<NavLink
										className={(navData) =>
											navData.isActive
												? "bg-[#1a1a1a]"
												: "hover:bg-[#1a1a1a] rounded-md"
										}
										onClick={handleClick}
										to="/"
									>
										Home
									</NavLink>
								</li>
								{user && (
									<li
										onClick={handleClick}
										className="hover:bg-[#1a1a1a] rounded-md "
									>
										<label htmlFor="my-modal-3" className="">
											Contribute
										</label>
									</li>
								)}

								<li onClick={handleClick}>
									<NavLink
										className={({ isActive }) =>
											isActive ? "bg-[#1a1a1a]" : "bg-[#1a1a1a] rounded-md "
										}
										to="/resources"
									>
										Resources
									</NavLink>
								</li>
							</>
						</ul>
					</div>
					<Link to="/" className="block outline-none ">
						<img src={navbarLogo} className="h-[70px] min-w-[250px] " alt="" />
					</Link>
				</div>
				<div className="hidden navbar-center lg:flex">
					<ul className="flex items-center w-full menu menu-horizontal">
						{menuItems}
					</ul>
				</div>
				<div className="w-full navbar-end">
					{!user?.uid ? (
						<Link
							to="/login"
							className="px-4 py-3 hover:bg-[#1a1a1a] rounded-md"
						>
							Login
						</Link>
					) : (
						<>
							<div className="z-50 mr-2 dropdown dropdown-bottom dropdown-end">
								{userDetails?.image ? (
									<div tabIndex={1} className="w-10 h-10 cursor-pointer">
										<img
											src={`${
												userDetails?.image?.includes("i.ibb.co")
													? userDetails?.image
													: DEFAULT_URL_SERVER + "/" + userDetails?.image
											}`}
											alt=""
											className="w-10 h-10 rounded-full"
											title={user?.displayName}
										/>
									</div>
								) : (
									<div className="w-10 h-10 cursor-pointer " tabIndex={1}>
										<img
											src={user.photoURL}
											data-tip="hello i am anis"
											className="w-10 h-10 rounded-full tooltip"
											alt=""
											title={user?.displayName}
										/>
									</div>
								)}
								{/* {user.photoURL ? (
									<div className="w-10 h-10 cursor-pointer " tabIndex={1}>
										<img
											src={user.photoURL}
											data-tip="hello i am anis"
											className="w-10 h-10 rounded-full tooltip"
											alt=""
											title={user?.displayName}
										/>
									</div>
								) : (
									<div tabIndex={1} className="w-10 h-10 cursor-pointer">
										<img
											src="https://i.ibb.co/qn6gKkK/1000-F-331699188-l-Rpvqx-O5-QRtw-OM05g-R50-Imaa-Jg-Bx68vi.jpg"
											alt=""
											className="w-10 h-10 rounded-full"
											title={user?.displayName}
										/>
									</div>
								)} */}
								<ul
									tabIndex={1}
									className="p-2 mt-3 z-50 shadow dropdown-content menu bg-[#282828] rounded-box w-52"
								>
									<li className="mb-2" onClick={handleClick}>
										<NavLink
											className={({ isActive }) =>
												isActive ? "bg-[#1a1a1a]" : "hover:bg-[#1a1a1a] z-50"
											}
											to="/profile"
										>
											Profile
										</NavLink>
									</li>
									{role === "admin" && (
										<li onClick={handleClick}>
											<NavLink
												to="/admin"
												className={({ isActive }) =>
													isActive ? "bg-[#1a1a1a]" : "hover:bg-[#1a1a1a] z-50"
												}
											>
												Admin
											</NavLink>
										</li>
									)}
									<li onClick={handleClick}>
										<button
											className="hover:bg-[#1a1a1a]"
											onClick={logoutHandler}
										>
											logout
										</button>
									</li>
								</ul>
							</div>
						</>
					)}
				</div>
			</div>
			{/* //TODO:: CONTRIBUTE MODAL */}
			{showModel && (
				<div className="">
					<input type="checkbox" id="my-modal-3" className="modal-toggle" />
					<div className="modal">
						<div className="relative modal-box">
							<label
								htmlFor="my-modal-3"
								className="absolute btn btn-sm btn-circle right-2 top-2"
							>
								✕
							</label>
							<div>
								<h1 className="text-2xl font-semibold">
									What are you want to Contribute?
								</h1>
								<ul className="my-5 text-xl capitalize">
									<li className="p-2 my-2 cursor-pointer transition-all hover:bg-[#1a1a1a] rounded-sm text-white bg-[#424242]">
										<Link
											className="block w-full"
											to="/contribute/questions"
											id="my-modal-3"
											onClick={() => {
												setShowModel(false);
											}}
										>
											questions
										</Link>
									</li>
									<li className="p-2 my-2 cursor-pointer transition-all hover:bg-[#1a1a1a] rounded-sm text-white bg-[#424242]">
										<Link
											className="block w-full"
											to="/contribute/books"
											id="my-modal-3"
											onClick={() => {
												setShowModel(false);
											}}
										>
											books
										</Link>
									</li>
									<li className="p-2 my-2 cursor-pointer transition-all hover:bg-[#1a1a1a] rounded-sm text-white bg-[#424242]">
										<Link
											className="block w-full"
											to="/contribute/slides"
											id="my-modal-3"
											onClick={() => {
												setShowModel(false);
											}}
										>
											Lecture Slides
										</Link>
									</li>
									<li className="p-2 my-2 cursor-pointer transition-all hover:bg-[#1a1a1a] rounded-sm text-white bg-[#424242]">
										<Link
											className="block w-full "
											to="/contribute/handnotes"
											id="my-modal-3"
											onClick={() => {
												setShowModel(false);
											}}
										>
											Notes
										</Link>
									</li>
								</ul>
							</div>
						</div>
					</div>
				</div>
			)}
		</>
	);
};

export default Header;
