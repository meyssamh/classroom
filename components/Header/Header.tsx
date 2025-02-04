import * as React from 'react';
import {
	Disclosure,
	DisclosureButton,
	DisclosurePanel,
	Menu,
	MenuButton,
	MenuItem,
	MenuItems
} from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { ThunkDispatch } from '@reduxjs/toolkit';

import User from '../UI/User/User';
import DateInfo from '../UI/DateInfo/DateInfo';
import Logo from '../UI/Logo/Logo';
import { fetchSignout } from '@/lib/store/action/authActions';

/**
 * Functional component for header of dashboard.
*
* @returns {JSX.Element} Header of the dashboard.
*/
export default function Header({ title }) {

	const pathname = usePathname();

	// Router
	const router = useRouter();

	// ThunkDispatch hook
	const dispatch = useDispatch<ThunkDispatch<any, any, any>>();

	function handleSignout(): void {
		localStorage.clear();
		dispatch(fetchSignout());

		router.push('/sign-in');
	}

	return (
		<>
			<section className="min-h-full">
				<Disclosure as="nav" className="bg-white">
					<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
						<div className="flex h-16 items-center justify-between">
							<div className="flex items-center">
								<div className="flex-shrink-0">
									<Logo />
								</div>
								<div className="hidden md:block">
									<div className="ml-10 flex items-baseline space-x-4">
										<DateInfo />
									</div>
								</div>
							</div>
							<div className="hidden md:block">
								<div className="ml-4 flex items-center md:ml-6">
									{/* Profile dropdown */}
									<Menu as="div" className="relative ml-3">
										<div>
											<MenuButton className="relative flex max-w-xs items-center outline-0">
												<span className="absolute -inset-1.5" />
												<span className="sr-only">Open user menu</span>
												<User />
											</MenuButton>
										</div>
										<MenuItems
											transition
											className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg transition outline-0 data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in ring-black ring-1 ring-opacity-5"
										>
											{
												pathname === '/dashboard' ?
													<></> :
													<MenuItem>
														<Link href={"/dashboard"} className={"block w-full px-4 py-2 text-left text-sm text-gray-700 data-[focus]:bg-gray-100"}>
															Home
														</Link>
													</MenuItem>
											}
											<MenuItem>
												<button className={"block w-full px-4 py-2 text-left text-sm text-gray-700 data-[focus]:bg-gray-100"}
													onClick={handleSignout}
												>
													Sign out
												</button>
											</MenuItem>
										</MenuItems>
									</Menu>
								</div>
							</div>
							<div className="-mr-2 flex md:hidden">
								{/* Mobile menu button */}
								<DisclosureButton className="group relative inline-flex items-center justify-center rounded-md bg-white p-2 text-success outline-0">
									<span className="absolute -inset-0.5" />
									<span className="sr-only">Open main menu</span>
									<Bars3Icon aria-hidden="true" className="block h-6 w-6 group-data-[open]:hidden" />
									<XMarkIcon aria-hidden="true" className="hidden h-6 w-6 group-data-[open]:block" />
								</DisclosureButton>
							</div>
						</div>
					</div>

					<DisclosurePanel className="md:hidden">

						<div className="border-t border-whitesmoke pb-3 pt-4 px-2">
							{
								pathname === "/dashboard" ?
									<></> :
									<DisclosureButton
										as="a"
										href={"/dashboard"}
										className="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-blue hover:text-white"
									>
										Home
									</DisclosureButton>
							}
							<DisclosureButton
								as="button"
								className="block w-full text-left rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-blue hover:text-white"
								onClick={handleSignout}
							>
								Sign out
							</DisclosureButton>
						</div>
					</DisclosurePanel>
				</Disclosure>

				<header className="bg-white shadow">
					<div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
						<h1 className="text-3xl font-bold tracking-tight text-success">
							{title}
						</h1>
					</div>
				</header>
			</section>
		</>
	);
};