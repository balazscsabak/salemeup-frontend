import React from 'react';
import { numberPriceFormat } from '../utils';
import CounterInline from './CounterInline';

export default function TopByShop({ items }) {
	return (
		<div>
			<div className="text-base mb-3 text-center">EMAG</div>
			<div>
				{items.map((item) => (
					<TopByShopItem key={item._id} item={item} />
				))}
			</div>
		</div>
	);
}

function TopByShopItem({ item }) {
	return (
		<div className="flex items-center py-2 pr-4 pl-2 rounded border border-gray-100 shadow-md mb-2">
			<div className="px-2 py-2">
				<CounterInline itemId={item.counter} counter={item.counter} />
			</div>
			<div className="flex items-center justify-between py-2 w-full">
				<div className="px-3">{item.name}</div>
				<div>
					<div className="whitespace-nowrap font-medium text-yellow-600 text-right">
						{numberPriceFormat(item.originalPrice)}
					</div>
					<div className="whitespace-nowrap text-right line-through text-sm">
						{numberPriceFormat(item.salePrice)}
					</div>
				</div>
			</div>
		</div>
	);
}
