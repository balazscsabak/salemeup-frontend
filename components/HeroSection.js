import React from 'react';

export default function HeroSection() {
	return (
		<div style={{ height: '40vh' }} className="hero-bg relative">
			<div className="w-full absolute bottom-1/3 left-0">
				<div className="container mx-auto flex">
					<div className="w-7/12">
						<h1 className="text-white text-4xl">
							Lorem ipsum dolor sit amet consectetur adipiscing elit nisi nec,
							inceptos litora facilisi et
						</h1>
					</div>
					<div className="w-5/12 flex justify-center items-center">
						<button className="bg-white px-5 py-3 rounded-full">
							CLICK ME
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}
