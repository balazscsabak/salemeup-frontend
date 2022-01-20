import React from 'react';
import { numberPriceFormat } from '../utils';
import CounterInline from './CounterInline';

export default function FeaturedWithImage({ item }) {
	return (
		<div>
			<div className="flex flex-col justify-between">
				<div
					style={{
						backgroundImage: `url('${item.img}')`,
						backgroundPosition: 'center',
						backgroundSize: 'cover',
						backgroundRepeat: 'no-repeat',
					}}
					className="h-56 bg-gray-300 rounded shadow-md "
				></div>

				<div>
					<div className="flex justify-between items-center mt-2 mb-1">
						<div className="flex">
							<div className="line-through">
								{numberPriceFormat(item.originalPrice)}
							</div>
							<div className="ml-2 text-xl font-medium text-yellow-600">
								{numberPriceFormat(item.salePrice)}
							</div>
						</div>
						<div className="flex justify-start my-2">
							<CounterInline itemId={item.counter} counter={item.counter} />
						</div>
					</div>
					<div className="w-10/12">{item.name}</div>
				</div>
			</div>
		</div>
	);
}
