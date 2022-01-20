import React, { useEffect, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { useForm } from 'react-hook-form';
import isURL from 'validator/lib/isURL';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import { format } from 'date-fns';
import Select from 'react-select';
import CreatableSelect from 'react-select/creatable';

const options = [
	{ value: 'chocolate', label: 'Chocolate' },
	{ value: 'strawberry', label: 'Strawberry' },
	{ value: 'vanilla', label: 'Vanilla' },
	{
		label: '1level',
		options: [
			{
				label: '2level',
				options: [{ label: 'label', value: 'value' }],
			},
		],
	},
];

export default function NewSaleModal({ open, setOpen }) {
	// React Forms
	const {
		register,
		getValues,
		setValue,
		handleSubmit,
		watch,
		formState: { errors },
	} = useForm({
		defaultValues: {
			url: 'https://www.emag.hu/polo-white-ii-szogletes-feher-hatfalas-zuhanykabin-akril-zuhanytalcaval-80x80x195-cm-es-meretben-polowii-80/pd/DHPZ9KMBM/?ref=others_also_viewed_1_1&provider=rec&recid=rec_43_fb6df19b46a2076b65aa7c534bac0d8a9f1ea4270c591a187038313ee880da78_1634821400&scenario_ID=43',
		},
	});

	// States
	const [scanning, setScanning] = useState(false);
	const [startDate, setStartDate] = useState(new Date());
	const [endDate, setEndDate] = useState(null);
	const [selectedTags, setSelectedTags] = useState(null);
	const [selectedCategory, setSelectedCategory] = useState(null);
	const [categories, setCategories] = useState([]);

	useEffect(() => {
		//TODO: stop axios req if closed

		(async () => {
			const { data } = await axios.get(
				`${process.env.NEXT_PUBLIC_API_URL}/categories`
			);

			// {
			// 	label: '1level',
			// 	options: [
			// 		{
			// 			label: '2level',
			// 			options: [{ label: 'label', value: 'value' }],
			// 		},
			// 	],
			// },

			const _cat = data.categories.map((cat) => {
				const children = cat.children.map((c) => {
					return {
						label: c.name,
						value: c._id,
					};
				});

				return {
					label: cat.name,
					options: children,
				};
			});

			setCategories([
				..._cat,
				{ label: 'Egyéb', value: '61ab9068dade06f600c18864' },
			]);
		})();

		return () => {
			console.log('closed');
		};
	}, []);

	const onSubmit = async (data) => {
		const {
			url,
			productSalePrice,
			productOriginalPrice,
			productName,
			productDescription,
		} = data;

		const selectedStartDate = format(startDate, 'yyyy-MM-dd');
		const selectedEndDate = format(endDate, 'yyyy-MM-dd');

		const tags = selectedTags;
		const category = selectedCategory;

		const reqData = {
			url,
			salePrice: productSalePrice,
			originalPrice: productOriginalPrice,
			name: productName,
			description: productDescription,
			startDate: selectedStartDate,
			endDate: selectedEndDate,
			tags,
			category,
		};

		try {
			const saveAttemptRes = await axios.post(
				`${process.env.NEXT_PUBLIC_API_URL}/sales`,
				reqData
			);

			console.log(saveAttemptRes);
		} catch (error) {
			console.log(error);
		}
	};

	let scanTimeout = 'null';

	//FIXME: proper scanning
	const scanHandler = (e) => {
		clearTimeout(scanTimeout);

		scanTimeout = setTimeout(async () => {
			if (isURL(watch('url'))) {
				try {
					setScanning(null);

					const { data } = await axios.get(
						`${process.env.NEXT_PUBLIC_API_URL}/url-scraper`,
						{
							params: {
								url: watch('url'),
							},
						}
					);

					setScanning(true);

					console.log(data);

					if (data.status && !data.error) {
						const title = data.results.ogTitle;
						const description = data.results.ogDescription;
						const img = data.results?.ogImage?.url;

						setValue('productName', title);
						setValue('productDescription', description);
						// setValue('productImg', Img);
					}
				} catch (error) {}
			}
		}, 2000);
	};

	return (
		<Transition.Root show={open}>
			<Dialog
				as="div"
				className="fixed z-10 inset-0 overflow-y-auto"
				onClose={setOpen}
			>
				<div className="flex items-centerjustify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
					<Transition.Child
						enter="ease-out duration-300"
						enterFrom="opacity-0"
						enterTo="opacity-100"
						leave="ease-in duration-200"
						leaveFrom="opacity-100"
						leaveTo="opacity-0"
					>
						<Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
					</Transition.Child>

					<Transition.Child
						enter="ease-out duration-300"
						enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
						enterTo="opacity-100 translate-y-0 sm:scale-100"
						leave="ease-in duration-200"
						leaveFrom="opacity-100 translate-y-0 sm:scale-100"
						leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
					>
						<div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
							<div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
								<div className="w-full">
									<div className="mt-3 text-center sm:mt-0 sm:mx-4 sm:text-left">
										<Dialog.Title
											as="h3"
											className="text-lg leading-6 font-medium text-gray-900"
										>
											Új akciós termék létrehozása:
										</Dialog.Title>

										<div className="mt-3">
											<div>
												<form onSubmit={handleSubmit(onSubmit)} id="data-form">
													<label className="block mb-1 text-sm">
														Link a termekrol (URL)
													</label>

													<input
														type="text"
														className="border border-gray-300 rounded-lg bg-gray-100 block w-full px-3 py-2 text-sm focus:outline-none focus:border-opacity-50 focus:border-yellow-600"
														autoComplete="off"
														placeholder="https://..."
														{...register('url', {
															onChange: (e) => {
																scanHandler(e);
															},
															required: true,
															// pattern: /[A-Za-z]{3}/
															pattern:
																/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/,
														})}
													/>
												</form>
											</div>

											<div className="flex mt-3 items-center mb-5">
												<p className="text-xs text-gray-500">
													Automatikus szkennelés
												</p>

												{scanning === null && (
													<svg
														xmlns="http://www.w3.org/2000/svg"
														className="h-4 w-4 text-gray-600 ml-2 animate-spin"
														viewBox="0 0 20 20"
														fill="currentColor"
													>
														<path
															fillRule="evenodd"
															d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z"
															clipRule="evenodd"
														/>
													</svg>
												)}

												{scanning === false && (
													<svg
														xmlns="http://www.w3.org/2000/svg"
														className="h-4 w-4 text-red-400 ml-2"
														viewBox="0 0 20 20"
														fill="currentColor"
													>
														<path
															fillRule="evenodd"
															d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
															clipRule="evenodd"
														/>
													</svg>
												)}

												{scanning === true && (
													<svg
														xmlns="http://www.w3.org/2000/svg"
														className="h-4 w-4 text-green-600 ml-2"
														viewBox="0 0 20 20"
														fill="currentColor"
													>
														<path
															fillRule="evenodd"
															d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
															clipRule="evenodd"
														/>
													</svg>
												)}
											</div>

											<div className="mb-3">
												<label className="block text-sm mb-1">
													Termék neve
												</label>
												<input
													type="text"
													className="border border-gray-300 rounded-lg bg-gray-100 block w-full px-3 py-2 text-sm focus:outline-none focus:border-opacity-50 focus:border-yellow-600"
													{...register('productName', {
														required: true,
													})}
												/>
											</div>

											<div className="mb-3">
												<label className="block text-sm mb-1">
													Termék leírása
												</label>
												<textarea
													className="border border-gray-300 rounded-lg bg-gray-100 block w-full px-3 py-2 text-sm focus:outline-none focus:border-opacity-50 focus:border-yellow-600"
													{...register('productDescription', {
														required: true,
													})}
												/>
											</div>

											<div className="grid grid-cols-2 gap-3 mb-3">
												<div>
													<label className="block text-sm mb-1">
														Eredeti ár
													</label>
													<input
														type="text"
														className="border border-gray-300 rounded-lg bg-gray-100 block w-full px-3 py-2 text-sm focus:outline-none focus:border-opacity-50 focus:border-yellow-600"
														{...register('productOriginalPrice', {
															required: true,
														})}
													/>
												</div>

												<div>
													<label className="block text-sm mb-1">
														Akciós ár
													</label>
													<input
														type="text"
														className="border border-gray-300 rounded-lg bg-gray-100 block w-full px-3 py-2 text-sm focus:outline-none focus:border-opacity-50 focus:border-yellow-600"
														{...register('productSalePrice', {
															required: true,
														})}
													/>
												</div>
											</div>

											<div className="grid grid-cols-2 gap-3 mb-3">
												<div>
													<label className="block text-sm mb-1">
														Akció kezdete
													</label>
													<DatePicker
														selected={startDate}
														onChange={(date) => setStartDate(date)}
														dateFormat="yyyy-MM-dd"
														className="border border-gray-300 rounded-lg bg-gray-100 block w-full px-3 py-2 text-sm focus:outline-none focus:border-opacity-50 focus:border-yellow-600"
													/>
												</div>

												<div>
													<label className="block text-sm mb-1">
														Akció vége
													</label>
													<DatePicker
														selected={endDate}
														onChange={(date) => setEndDate(date)}
														dateFormat="yyyy-MM-dd"
														className="border border-gray-300 rounded-lg bg-gray-100 block w-full px-3 py-2 text-sm focus:outline-none focus:border-opacity-50 focus:border-yellow-600"
													/>
												</div>
											</div>

											<div className="mb-3">
												<label className="block text-sm mb-1">Kategória</label>
												<Select
													placeholder="Válassz kategóriát"
													onChange={setSelectedCategory}
													options={categories}
													isSearchable={true}
													menuPortalTarget={document.body}
													menuPosition={'fixed'}
													styles={{
														menuPortal: (provided) => ({
															...provided,
															zIndex: 9999,
														}),
														menu: (provided) => ({ ...provided, zIndex: 9999 }),
													}}
												/>
											</div>
											{/* TODO: style react select */}
											<div>
												<label className="block text-sm mb-1">Tags</label>
												<CreatableSelect
													defaultValue={selectedTags}
													onChange={setSelectedTags}
													options={options}
													isSearchable={true}
													isMulti={true}
													menuPortalTarget={document.body}
													menuPosition={'fixed'}
													styles={{
														menuPortal: (provided) => ({
															...provided,
															zIndex: 9999,
														}),
														menu: (provided) => ({ ...provided, zIndex: 9999 }),
													}}
												/>
											</div>
										</div>
									</div>
								</div>
							</div>
							<div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
								<button
									type="submit"
									form="data-form"
									className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-yellow-600 text-base font-medium text-white hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
									onClick={() => {
										// setOpen(false)
									}}
									disabled={false}
								>
									Mentés
								</button>
								<button
									type="button"
									className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
									onClick={() => setOpen(false)}
								>
									Cancel
								</button>
							</div>
						</div>
					</Transition.Child>
				</div>
			</Dialog>
		</Transition.Root>
	);
}
