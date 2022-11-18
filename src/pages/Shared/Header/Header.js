import { Fragment } from "react";
import { Link } from "react-router-dom";

const Header = () => {
	const menuItems = (
		<>
			<li>
				<Link to="/">Home</Link>
			</li>

			<li>
				<label htmlFor="my-modal-3" className="btn btn-success rounded-lg">
					Contribute
				</label>
			</li>
		</>
	);
	return (
		<>
			<div className="navbar bg-info text-base-100">
				<div className="navbar-start">
					<div className="dropdown">
						<label tabIndex={0} className="btn btn-ghost lg:hidden">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								className="h-5 w-5"
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
							className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
						>
							{menuItems}
						</ul>
					</div>
					<a className="btn btn-ghost normal-case text-xl">OneBYZero</a>
				</div>
				<div className="navbar-center hidden lg:flex">
					<ul className="menu menu-horizontal p-0">{menuItems}</ul>
				</div>
				<div className="navbar-end">
					<Link to="/login" className="btn">
						Login
					</Link>
				</div>
			</div>

			<div className="">
				<input type="checkbox" id="my-modal-3" className="modal-toggle" />
				<div className="modal">
					<div className="modal-box relative">
						<label
							htmlFor="my-modal-3"
							className="btn btn-sm btn-circle absolute right-2 top-2"
						>
							✕
						</label>
						<div>
							<h1 className="text-2xl font-semibold">
								What are you want to Contribute?
							</h1>
							<ul className="text-xl my-5">
								<li className="p-2 my-2 cursor-pointer transition-all hover:bg-[#3503b4] rounded-sm text-white bg-info">
									<Link className="block w-full" href="#">
										questions
									</Link>
								</li>
								<li className="p-2 my-2 cursor-pointer transition-all hover:bg-[#3503b4] rounded-sm text-white bg-info">
									<Link className="block w-full" href="#">
										books
									</Link>
								</li>
								<li className="p-2 my-2 cursor-pointer transition-all hover:bg-[#3503b4] rounded-sm text-white bg-info">
									<Link className="block w-full" href="#">
										slides
									</Link>
								</li>
							</ul>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default Header;
