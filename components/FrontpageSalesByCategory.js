import React from 'react';
import FeaturedSales from './FeaturedSales';
import FeaturedWithImageSmall from './FeaturedWithImageSmall';

export default function FrontpageSalesByCategory({ sales }) {
	const topRatedLeft = sales.slice(0, 5);
	const topRatedRight = sales.slice(5, 10);
	const topRatedWithoutImageLeft = sales.slice(10, 15);
	const topRatedWithoutImageRight = sales.slice(15, 20);

	return (
		<div>
			<div className="mb-5">
				<div className="container mx-auto grid grid-cols-2 gap-12">
					<div>
						{topRatedLeft.map((item, index) => (
							<FeaturedWithImageSmall
								key={item._id}
								left={index % 2 == 0 ? true : false}
								item={item}
							/>
						))}
					</div>
					<div>
						{topRatedRight.map((item, index) => (
							<FeaturedWithImageSmall
								key={item._id}
								left={index % 2 == 0 ? true : false}
								item={item}
							/>
						))}
					</div>
				</div>
			</div>

			<div className="w-full flex mb-28">
				<div className="w-6/12 pr-2">
					<div>
						{topRatedWithoutImageLeft &&
							topRatedWithoutImageLeft.map((sale) => (
								<FeaturedSales key={sale._id} sale={sale} />
							))}
					</div>
				</div>
				<div className="w-6/12 pl-2">
					<div>
						{topRatedWithoutImageRight &&
							topRatedWithoutImageRight.map((sale) => (
								<FeaturedSales key={sale._id} sale={sale} />
							))}
					</div>
				</div>
			</div>
		</div>
	);
}
