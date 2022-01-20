import React, { useState } from 'react';

export default function LatestSalesContainer() {
	const [showSlide, setShowSlide] = useState(0);

	const calculatePosition = (elemIndex) => {
		if (elemIndex === showSlide) {
			return 0;
		}

		if (elemIndex > showSlide) {
			return '100%';
		}

		return '-100%';
	};

	const addOne = () => {
		if (showSlide < 2) {
			setShowSlide(showSlide + 1);
		} else {
			setShowSlide(0);
		}
	};

	const minusOne = () => {
		if (showSlide > 0) {
			setShowSlide(showSlide - 1);
		} else {
			setShowSlide(2);
		}
	};

	return (
		<div className="w-full px-10">
			<div className="slider-container relative w-full h-96 overflow-hidden">
				<div
					style={{ left: calculatePosition(0) }}
					className="bg-red-500 w-full absolute inset-0 transition-all"
				>
					1
				</div>
				<div
					style={{ left: calculatePosition(1) }}
					className="bg-red-300 w-full absolute inset-0 transition-all"
				>
					2
				</div>
				<div
					style={{ left: calculatePosition(2) }}
					className="bg-red-900 w-full absolute inset-0 transition-all"
				>
					3
				</div>
			</div>

			<div>
				<button onClick={() => addOne()} className="px-4 py-2 bg-gray-400">
					+
				</button>
				<button onClick={() => minusOne()} className="px-4 py-2 bg-gray-400">
					-
				</button>
			</div>
		</div>
	);
}
