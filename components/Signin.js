import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { signIn } from 'next-auth/react';
import ContentLoader from './ContentLoader';

export default function Signin({ closePopup }) {
	const [credentialsError, setCredentialsError] = useState(false);
	const [contentLoader, setContentLoader] = useState(false);
	const {
		register,
		handleSubmit,
		watch,
		getValues,
		formState: { errors },
	} = useForm({
		defaultValues: {
			email: 'balazscsabak93@gmail.com',
			password: '123456789',
		},
	});

	const formOnSubmit = async (e) => {
		setContentLoader(true);

		const { ok, error } = await signIn('credentials', {
			email: getValues('email'),
			password: getValues('password'),
			redirect: false,
		});

		setContentLoader(false);

		if (!ok) {
			setCredentialsError('Rossz felhasználónév / jelszó');
		} else {
			closePopup();
		}
	};

	const oAuthSignin = async (e, provider) => {
		e.preventDefault();
		signIn(provider);
	};

	const wrapperClick = (e) => {
		if (e.target === e.currentTarget) {
			closePopup();
		}
	};

	return (
		<div
			className="fixed z-50 inset-0 bg-black bg-opacity-50 flex justify-center items-center"
			onClick={wrapperClick}
		>
			<form
				className="max-w-md w-full bg-white p-5 rounded-lg relative"
				onSubmit={handleSubmit(formOnSubmit)}
			>
				<div>
					<div>
						<h1 className="text-2xl text-center uppercase">Bejelentkezés</h1>
					</div>
					<div>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							className="h-8 w-8 mx-auto my-4 text-yellow-600"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"
							/>
						</svg>
					</div>
					{credentialsError && (
						<div className="text-center my-1 text-lg font-medium text-red-500 rounded p-2">
							Rossz felhasználónév/jelszó
						</div>
					)}
					<div className="mb-3">
						<label className="mb-1 block">Email cím</label>
						<input
							type="email"
							className="w-full border px-3 py-2 rounded border-gray-300"
							{...register('email', {
								required: true,
							})}
						/>
						{/* <div className="text-sm text-red-500 ml-2 mb-1">error</div> */}
					</div>

					<div>
						<label className="mb-1 block">Jelszó</label>

						<input
							type="password"
							className="w-full border px-3 py-2 rounded border-gray-300"
							{...register('password', {
								required: true,
							})}
						/>
					</div>

					<div className="mt-5">
						<input
							type="submit"
							className="block bg-gray-800 text-white w-full uppercase p-3 rounded cursor-pointer border border-gray-100"
							value="Belépés"
						/>
					</div>

					<hr className="my-8"></hr>

					<div>
						<button
							className="block w-full text-white uppercase p-2 mb-3 rounded"
							style={{ backgroundColor: '#4267B2' }}
							onClick={(e) => oAuthSignin(e, 'facebook')}
						>
							Facebook belépés
						</button>
						<button
							className="block w-full text-white uppercase p-2 rounded"
							style={{ backgroundColor: '#4267B2' }}
							onClick={(e) => oAuthSignin(e, 'google')}
						>
							Google belépés
						</button>
					</div>
				</div>
				{contentLoader && <ContentLoader />}
			</form>
		</div>
	);
}
