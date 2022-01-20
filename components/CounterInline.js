import React from 'react';

export default function CounterInline({ itemId, counter }) {
	return (
		<div className="flex items-center">
			<div className="flex flex-row">
				<div>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						className="h-4 w-4 text-gray-400 cursor-pointer"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth={2}
							d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5"
						/>
					</svg>
				</div>
				<div className="mx-1">
					<div className="text-xs text-gray-400">{counter}</div>
				</div>
				<div>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						className="h-4 w-4 text-gray-400 cursor-pointer"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth={2}
							d="M10 14H5.236a2 2 0 01-1.789-2.894l3.5-7A2 2 0 018.736 3h4.018a2 2 0 01.485.06l3.76.94m-7 10v5a2 2 0 002 2h.096c.5 0 .905-.405.905-.904 0-.715.211-1.413.608-2.008L17 13V4m-7 10h2m5-10h2a2 2 0 012 2v6a2 2 0 01-2 2h-2.5"
						/>
					</svg>
				</div>
			</div>
		</div>
	);
}
