import React from 'react';
import { numberPriceFormat } from '../utils';
import CounterInline from './CounterInline';

export default function FeaturedWithImageSmall({ left, item }) {
	return (
		<div className={`relative pb-1 px-28 mb-10 ${left ? '' : 'text-right'}`}>
			<div
				style={{
					backgroundImage: `url('${item.img}')`,
					backgroundPosition: 'center',
					backgroundSize: 'cover',
					backgroundRepeat: 'no-repeat',
				}}
				className={`bg-gray-200 border border-gray-100 rounded shadow-md bottom-0 h-28 w-24 absolute  ${
					left ? 'left-0' : 'right-0'
				}`}
			>
				<div className="absolute -bottom-7 w-full flex justify-center">
					<CounterInline itemId={item.counter} counter={item.counter} />
				</div>
			</div>
			<div className="relative">
				<div>
					<span className="line-through mr-2 text-sm">
						{numberPriceFormat(item.originalPrice)}
					</span>
					<span className="font-medium text-yellow-600">
						{numberPriceFormat(item.salePrice)}
					</span>
				</div>
				<div>{item.name}</div>
				<div
					style={{ height: '2px' }}
					className={`absolute w-3/6 bg-gray-100 -bottom-4 ${
						left ? 'left-0' : 'right-0'
					}`}
				></div>
			</div>
		</div>
	);
}
