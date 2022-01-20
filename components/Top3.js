import React from 'react';
import {
	calcDecreasePercentage,
	numberPriceFormat,
	truncateTo40,
} from '../utils';

export default function Top3({ items }) {
	return (
		<div className="container mx-auto">
			<div className="grid grid-cols-3 gap-4 w-full xl:w-9/12 mx-auto grid-rows-1">
				{items.map((item) => (
					<Top3Item key={item._id} item={item} />
				))}
			</div>
		</div>
	);
}

function Top3Item({ item }) {
	return (
		<div>
			<div className="h-full">
				<div className="h-full bg-gray-50 rounded-sm p-3 flex flex-col justify-between shadow-md">
					<div className="flex px-3">
						<div className="pr-5 text-xl">{truncateTo40(item.name)}</div>
						<div className="whitespace-nowrap text-yellow-600 font-bold text-2xl">
							{numberPriceFormat(item.salePrice)}
						</div>
					</div>
					<div
						style={{
							backgroundImage: `url('${item.img}')`,
							backgroundPosition: 'center',
							backgroundSize: 'cover',
							backgroundRepeat: 'no-repeat',
						}}
						className=" h-48 w-full border border-gray-300"
					></div>
				</div>
			</div>
			<div className="text-center text-sm font-medium mt-2">
				<span className="line-through">
					{numberPriceFormat(item.originalPrice)}
				</span>
				<span className="ml-2 text-yellow-600">
					{calcDecreasePercentage(item.salePrice, item.originalPrice)}%
				</span>
			</div>
		</div>
	);
}
