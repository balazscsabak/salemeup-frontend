import React from 'react';

export default function ContentLoader() {
	return (
		<div className="absolute inset-0 flex justify-center items-center bg-gray-200 bg-opacity-50 rounded-lg">
			<div>
				<div
					style={{ borderTopColor: 'transparent' }}
					className="w-16 h-16 border-4 border-yellow-600 border-dotted rounded-full animate-spin "
				></div>
			</div>
		</div>
	);
}
