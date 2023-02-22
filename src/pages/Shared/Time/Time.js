import React from "react";

const Time = ({ time }) => {
	const presentDate = new Date();
	const previousDate = new Date(time);
	const presentTime = presentDate.getTime();
	const previousTime = previousDate.getTime();
	const dif = presentTime - previousTime;
	const seconds = () => {
		return parseInt(dif / 1000);
	};

	const minutes = () => {
		return parseInt(dif / 60000);
	};

	const hours = () => {
		return parseInt(dif / 3600000);
	};

	const days = () => {
		return parseInt(dif / (24 * 3600 * 1000));
	};

	const weeks = () => {
		return parseInt(dif / (24 * 3600 * 1000 * 7));
	};

	const months = () => {
		const presy = presentDate.getFullYear();
		const prevy = previousDate.getFullYear();
		const presm = presentDate.getMonth();
		const prevm = previousDate.getMonth();
		return parseInt(presm + 12 * presy - (prevm + 12 * prevy));
	};

	const years = () => {
		return presentDate.getFullYear() - previousDate.getFullYear();
	};
	var timeLaps = seconds();
	var dateOutput = "";
	if (timeLaps < 60) {
		dateOutput = timeLaps + " seconds";
	} else {
		timeLaps = minutes();
		if (timeLaps < 60) {
			dateOutput = timeLaps + " minutes";
		} else {
			timeLaps = hours();
			if (timeLaps < 24) {
				dateOutput = timeLaps + " hours";
			} else {
				timeLaps = days();

				if (timeLaps < 7) {
					dateOutput = timeLaps + " days";
				} else {
					timeLaps = weeks();

					if (timeLaps < 4) {
						dateOutput = timeLaps + " weeks";
					} else {
						timeLaps = months();
						if (timeLaps < 12) {
							dateOutput = timeLaps + " months";
						} else {
							timeLaps = years();
						}
					}
				}
			}
		}
	}
	return <span className="font-bold text-white">{dateOutput} ago </span>;
};

export default Time;
