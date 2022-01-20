import { Fragment } from 'react';
import axios from 'axios';
import { signOut, useSession, signIn } from 'next-auth/react';
import CounterInline from '../components/CounterInline';
import FeaturedSales from '../components/FeaturedSales';
import FeaturedWithImage from '../components/FeaturedWithImage';
import FeaturedWithImageSmall from '../components/FeaturedWithImageSmall';
import HeroSection from '../components/HeroSection';
import LatestSalesContainer from '../components/LatestSalesContainer';
import Top3 from '../components/Top3';
import TopByShop from '../components/TopByShop';
import { Tab } from '@headlessui/react';
import FrontpageSalesByCategory from '../components/FrontpageSalesByCategory';

const _topratedsalesSampleData = [
	{
		_id: '617b0aa9ef8fa740aa23e606',
		url: 'https://www.emag.hu/polo-white-ii-szogletes-feher-hatfalas-zuhanykabin-akril-zuhanytalcaval-80x80x195-cm-es-meretben-polowii-80/pd/DHPZ9KMBM/?ref=others_also_viewed_1_1&provider=rec&recid=rec_43_fb6df19b46a2076b65aa7c534bac0d8a9f1ea4270c591a187038313ee880da78_1634821400&scenario_ID=43',
		salePrice: 4000,
		originalPrice: 10000,
		name: 'Polo White II szögletes fehér hátfalas zuhanykabin',
		description:
			'Polo White II szögletes fehér hátfalas zuhanykabin, akril zuhanytálcával, 80x80x195 cm-es méretben kedvező áron az eMAG-nál ⭐ Fedezd fel a nap ajánlatait és rendelj online az eMAG.hu-n!',

		tags: [
			{
				value: 'strawberry',
				label: 'Strawberry',
			},
			{
				label: '2level',
				options: [
					{
						label: 'label',
						value: 'value',
					},
				],
			},
		],
		category: [
			{
				value: 'strawberry',
				label: 'Strawberry',
			},
		],
		active: true,
		counter: 42,
		__v: 0,
	},
	{
		_id: '617b0aa9ef8fa740aa23e606',
		url: 'https://www.emag.hu/polo-white-ii-szogletes-feher-hatfalas-zuhanykabin-akril-zuhanytalcaval-80x80x195-cm-es-meretben-polowii-80/pd/DHPZ9KMBM/?ref=others_also_viewed_1_1&provider=rec&recid=rec_43_fb6df19b46a2076b65aa7c534bac0d8a9f1ea4270c591a187038313ee880da78_1634821400&scenario_ID=43',
		salePrice: 4000,
		originalPrice: 10000,
		name: 'White II szögletes Polo ',
		description:
			'Polo White II szögletes fehér hátfalas zuhanykabin, akril zuhanytálcával, 80x80x195 cm-es méretben kedvező áron az eMAG-nál ⭐ Fedezd fel a nap ajánlatait és rendelj online az eMAG.hu-n!',

		tags: [
			{
				value: 'strawberry',
				label: 'Strawberry',
			},
			{
				label: '2level',
				options: [
					{
						label: 'label',
						value: 'value',
					},
				],
			},
		],
		category: [
			{
				value: 'strawberry',
				label: 'Strawberry',
			},
		],
		active: true,
		counter: 42,
		__v: 0,
	},
	{
		_id: '617b0aa9ef8fa740aa23e606',
		url: 'https://www.emag.hu/polo-white-ii-szogletes-feher-hatfalas-zuhanykabin-akril-zuhanytalcaval-80x80x195-cm-es-meretben-polowii-80/pd/DHPZ9KMBM/?ref=others_also_viewed_1_1&provider=rec&recid=rec_43_fb6df19b46a2076b65aa7c534bac0d8a9f1ea4270c591a187038313ee880da78_1634821400&scenario_ID=43',
		salePrice: 4000,
		originalPrice: 10000,
		name: 'Fehér hátfalas zuhanykabin Polo White II szögletes, akril zuhanytálcával',
		description:
			'Polo White II szögletes fehér hátfalas zuhanykabin, akril zuhanytálcával, 80x80x195 cm-es méretben kedvező áron az eMAG-nál ⭐ Fedezd fel a nap ajánlatait és rendelj online az eMAG.hu-n!',

		tags: [
			{
				value: 'strawberry',
				label: 'Strawberry',
			},
			{
				label: '2level',
				options: [
					{
						label: 'label',
						value: 'value',
					},
				],
			},
		],
		category: [
			{
				value: 'strawberry',
				label: 'Strawberry',
			},
		],
		active: true,
		counter: 42,
		__v: 0,
	},
	{
		_id: '617b0aa9ef8fa740aa23e606',
		url: 'https://www.emag.hu/polo-white-ii-szogletes-feher-hatfalas-zuhanykabin-akril-zuhanytalcaval-80x80x195-cm-es-meretben-polowii-80/pd/DHPZ9KMBM/?ref=others_also_viewed_1_1&provider=rec&recid=rec_43_fb6df19b46a2076b65aa7c534bac0d8a9f1ea4270c591a187038313ee880da78_1634821400&scenario_ID=43',
		salePrice: 4000,
		originalPrice: 10000,
		name: 'White II szögletes Polo ',
		description:
			'Polo White II szögletes fehér hátfalas zuhanykabin, akril zuhanytálcával, 80x80x195 cm-es méretben kedvező áron az eMAG-nál ⭐ Fedezd fel a nap ajánlatait és rendelj online az eMAG.hu-n!',

		tags: [
			{
				value: 'strawberry',
				label: 'Strawberry',
			},
			{
				label: '2level',
				options: [
					{
						label: 'label',
						value: 'value',
					},
				],
			},
		],
		category: [
			{
				value: 'strawberry',
				label: 'Strawberry',
			},
		],
		active: true,
		counter: 42,
		__v: 0,
	},
	{
		_id: '617b0aa9ef8fa740aa23e606',
		url: 'https://www.emag.hu/polo-white-ii-szogletes-feher-hatfalas-zuhanykabin-akril-zuhanytalcaval-80x80x195-cm-es-meretben-polowii-80/pd/DHPZ9KMBM/?ref=others_also_viewed_1_1&provider=rec&recid=rec_43_fb6df19b46a2076b65aa7c534bac0d8a9f1ea4270c591a187038313ee880da78_1634821400&scenario_ID=43',
		salePrice: 4000,
		originalPrice: 10000,
		name: 'Fehér hátfalas zuhanykabin Polo White II szögletes, akril zuhanytálcával',
		description:
			'Polo White II szögletes fehér hátfalas zuhanykabin, akril zuhanytálcával, 80x80x195 cm-es méretben kedvező áron az eMAG-nál ⭐ Fedezd fel a nap ajánlatait és rendelj online az eMAG.hu-n!',

		tags: [
			{
				value: 'strawberry',
				label: 'Strawberry',
			},
			{
				label: '2level',
				options: [
					{
						label: 'label',
						value: 'value',
					},
				],
			},
		],
		category: [
			{
				value: 'strawberry',
				label: 'Strawberry',
			},
		],
		active: true,
		counter: 42,
		__v: 0,
	},
];

export default function Home({
	latestSales,
	topRatedSales,
	salesByCategories,
}) {
	const { data: session, status } = useSession();

	const top3Rated = topRatedSales.slice(0, 3);
	const topRated4WithImage = topRatedSales.slice(4, 8);

	const byShop1 = topRatedSales.slice(10, 15);
	const byShop2 = topRatedSales.slice(7, 12);
	const byShop3 = topRatedSales.slice(14, 19);

	return (
		<div>
			<div>
				<HeroSection />
			</div>

			<div className="-mt-10 relative">
				<Top3 items={top3Rated} />
			</div>

			<div className="container mx-auto mt-28">
				<div className="mb-10 flex items-start justify-center">
					<h1 className="text-3xl">Kiemelt akciók</h1>
					<span className="text-3xl font-medium italic text-yellow-600 ml-3">
						%
					</span>
				</div>

				<div className="mb-14">
					<div className="grid grid-cols-4 gap-3">
						{topRated4WithImage.map((item) => (
							<FeaturedWithImage key={item._id} item={item} />
						))}
					</div>
				</div>
			</div>

			<div className="container mx-auto">
				<div className="mb-6 flex items-start justify-center">
					<h1 className="text-3xl">Kategória szerint</h1>
					<span className="text-3xl font-medium italic text-yellow-600 ml-3">
						%
					</span>
				</div>

				<Tab.Group vertical>
					<Tab.List>
						<div className="flex justify-center items-center mb-28 flex-wrap gap-3">
							{salesByCategories.map((salesByCat) => (
								<Tab as={Fragment}>
									{({ selected }) => (
										<button
											className={
												selected
													? 'px-3 py-1 bg-yellow-600 rounded-xl text-white text-sm'
													: 'px-3 py-1 bg-gray-200 rounded-xl text-sm'
											}
										>
											{salesByCat.name}
										</button>
									)}
								</Tab>
							))}
						</div>
					</Tab.List>
					<Tab.Panels>
						{salesByCategories.map((salesByCat) => (
							<Tab.Panel>
								<FrontpageSalesByCategory sales={salesByCat.sales} />
							</Tab.Panel>
						))}
					</Tab.Panels>
				</Tab.Group>
			</div>

			<div>
				<div className="container mx-auto">
					<div className="mb-10 flex items-center justify-center">
						<h1 className="text-3xl">Akciók boltok szerint</h1>
						<span className="text-3xl font-medium italic text-yellow-600 ml-3">
							%
						</span>
					</div>
					<div className="w-full grid grid-cols-3 gap-10">
						<TopByShop items={byShop1} />
						<TopByShop items={byShop2} />
						<TopByShop items={byShop3} />
					</div>
				</div>
			</div>
		</div>
	);
}

export async function getServerSideProps(context) {
	try {
		const { data } = await axios.get(
			`${process.env.NEXT_PUBLIC_API_URL}/sales/frontpage`
		);

		let { latestSales, topRatedSales, salesByCategories } = data;

		// toprated - 20
		// latest - 50

		return {
			props: {
				latestSales: latestSales || [],
				topRatedSales: topRatedSales || [],
				salesByCategories: salesByCategories || [],
			},
		};
	} catch (error) {
		return {
			props: {
				latest: null,
			},
		};
	}
}
