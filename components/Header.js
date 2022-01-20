import { useEffect, useState } from 'react';
import NewSaleModal from './NewSaleModal';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { useUser } from '../hooks';
import { useRouter } from 'next/router';
import Signin from './Signin';

export default function Header() {
	const [categories, setCategories] = useState([]);
	const [showNewSaleModal, setShowNewSaleModal] = useState(false);
	const [showLoginModal, setShowLoginModal] = useState(false);
	const { data: user, status } = useSession();
	const { isAuthenticated } = useUser();

	const router = useRouter();

	const profileClick = () => {
		if (isAuthenticated) {
			router.push('/profile');
		} else {
			setShowLoginModal(true);
		}
	};

	useEffect(() => {
		//TODO: get categories and make it dropdown menu
	}, []);

	return (
		<header>
			<div className="border-b">
				<div className="container mx-auto flex py-2 flex-col md:flex-row items-center justify-end">
					<div
						className="flex items-center text-sm cursor-pointer"
						onClick={() => setShowNewSaleModal(true)}
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							className="h-5 w-5 mr-1"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
							/>
						</svg>
						Új Akció
					</div>

					<div
						className="flex items-center text-sm mx-10 cursor-pointer"
						onClick={() => profileClick()}
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							className="h-5 w-5 mr-1"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
							/>
						</svg>
						{isAuthenticated ? 'Profil' : 'Bejelentkezés'}
					</div>

					<div>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							className="h-5 w-5 cursor-pointer mr-1"
							viewBox="0 0 20 20"
							fill="currentColor"
						>
							<path
								fillRule="evenodd"
								d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
								clipRule="evenodd"
							/>
						</svg>
					</div>
				</div>
			</div>
			<div className="container mx-auto flex flex-wrap py-5 flex-col md:flex-row items-center justify-between">
				<div>
					<Link href="/">
						<a className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								stroke="currentColor"
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth="2"
								className="w-10 h-10 text-white p-2 bg-yellow-600 rounded-full"
								viewBox="0 0 24 24"
							>
								<path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
							</svg>
							<span className="ml-3 text-xl">Salemeup</span>
						</a>
					</Link>
				</div>
				<nav className="uppercase text-lg">
					<Link href="/">
						<a className="mr-10 ">Kezdőlap</a>
					</Link>
					<Link href="/test">
						<a className="mr-10 ">Kategóriák</a>
					</Link>
					<a className="mr-10 ">Third Link</a>
					<a className="">Fourth Link</a>
				</nav>
			</div>
			<div className="bg-gray-100 text-gray-400 text-sm">
				<div className="container mx-auto flex px-3 py-1">
					<div className="mx-auto flex align-center">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							className="h-5 w-5 mr-4 text-yellow-600"
							viewBox="0 0 20 20"
							fill="currentColor"
						>
							<path
								fillRule="evenodd"
								d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
								clipRule="evenodd"
							/>
						</svg>
						<div>LG 3931 Hazimozi Rendszer BLUETOOTH 1.3</div>
						<div className="text-yellow-600 ml-6">15.990 .-</div>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							className="h-5 w-5 ml-4 text-yellow-600"
							viewBox="0 0 20 20"
							fill="currentColor"
						>
							<path
								fillRule="evenodd"
								d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
								clipRule="evenodd"
							/>
						</svg>
					</div>
				</div>
			</div>
			{showNewSaleModal && (
				<NewSaleModal open={showNewSaleModal} setOpen={setShowNewSaleModal} />
			)}
			{showLoginModal && <Signin closePopup={() => setShowLoginModal(false)} />}
		</header>
	);
}
