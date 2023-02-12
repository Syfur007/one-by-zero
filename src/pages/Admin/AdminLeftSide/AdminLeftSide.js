import {
	Accordion,
	AccordionBody,
	AccordionHeader,
} from "@material-tailwind/react";
import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";

const AdminLeftSide = () => {
	const [open, setOpen] = useState(0);

	const handleOpen = (value) => {
		setOpen(open === value ? 0 : value);
	};
	return (
		<aside className="w-[250px] fixed top-20 bg-[#1A103D] min-h-[90vh] p-3 text-white">
			<Accordion open={open === 1}>
				<AccordionHeader
					className={`text-white px-3 rounded-sm ${
						open === 1 ? "bg-[#301b83]" : "bg-transparent"
					} hover:bg-[#301b83] border-b-0 hover:text-gray-300 `}
					onClick={() => handleOpen(1)}
				>
					User
				</AccordionHeader>

				<AccordionBody>
					<div className="mb-2">
						<Link
							to="/admin/users"
							className="block px-3 py-2 font-semibold text-white rounded-sm hover:bg-[#20115c]"
						>
							Users
						</Link>
					</div>
					<div className="mb-2">
						<Link className="block px-3 py-2 font-semibold text-white rounded-sm hover:bg-[#20115c]">
							AddUsers
						</Link>
					</div>
				</AccordionBody>
			</Accordion>

			<Accordion open={open === 2}>
				<AccordionHeader
					className={`text-white px-3 rounded-sm ${
						open === 2 ? "bg-[#301b83]" : "bg-transparent"
					} hover:bg-[#301b83] border-b-0 hover:text-gray-300 `}
					onClick={() => handleOpen(2)}
				>
					Resources
				</AccordionHeader>
				<AccordionBody style={{ height: 300 }}>
					<div className="mb-2">
						<Link className="block px-3 py-2 font-semibold text-white rounded-sm hover:bg-[#20115c]">
							Questions
						</Link>
					</div>
					<div className="mb-2">
						<Link className="block px-3 py-2 font-semibold text-white rounded-sm hover:bg-[#20115c]">
							Books
						</Link>
					</div>
					<div className="mb-2">
						<Link className="block px-3 py-2 font-semibold text-white rounded-sm hover:bg-[#20115c]">
							Slides
						</Link>
					</div>
					<div className="mb-2">
						<Link className="block px-3 py-2 font-semibold text-white rounded-sm hover:bg-[#20115c]">
							HandNotes
						</Link>
					</div>
					<div className="py-3 mb-2">
						<Link
							to="/admin/createtemplate"
							className="block px-3 py-2 font-semibold text-white rounded-sm hover:bg-[#20115c]"
						>
							CreateTemplate
						</Link>
					</div>
				</AccordionBody>
			</Accordion>

			<Accordion open={open === 3}>
				<AccordionHeader
					className={`text-white px-3 rounded-sm ${
						open === 3 ? "bg-[#301b83]" : "bg-transparent"
					} hover:bg-[#301b83] border-b-0 hover:text-gray-300 `}
					onClick={() => handleOpen(3)}
				>
					University
				</AccordionHeader>
				<AccordionBody>
					<div className="mb-2">
						<Link className="block px-3 py-2 font-semibold text-white rounded-sm hover:bg-[#20115c]">
							University
						</Link>
					</div>
					<div className="mb-2">
						<Link className="block px-3 py-2 font-semibold text-white rounded-sm hover:bg-[#20115c]">
							AddUniversity
						</Link>
					</div>
				</AccordionBody>
			</Accordion>
		</aside>
	);
};

export default AdminLeftSide;
