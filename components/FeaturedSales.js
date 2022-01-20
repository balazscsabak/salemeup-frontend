import React from 'react';
import { numberPriceFormat, truncateTo60 } from '../utils';
import Counter from './Counter';

export default function FeaturedSales({ sale }) {
	return (
		<div className="w-full mb-2 bg-white px-3 py-1 border border-gray-100 shadow-md rounded">
			<div className="flex items-center">
				<Counter />
				<div className="mx-3 bg-gray-300 w-px h-8"></div>
				<div className="flex justify-between flex-grow items-center">
					<div className="text-xl pr-8">{truncateTo60(sale.name)}</div>
					<div>
						<div className="text-right text-xl font-bold whitespace-nowrap text-yellow-600">
							{numberPriceFormat(sale.salePrice)}
						</div>
						<div className="text-right line-through">
							{numberPriceFormat(sale.originalPrice)}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
