import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'

import { DropdownProps } from '$/declaration';

/**
 * Functional dropdown components.
 *
 * @param {string} label Label of the dropdown button.
 * @param {JSX.Element[]} menu Elements in the dropdown menu.
 * @param {string} variant variant of the dropdown button.
 * It can be either contained or contained-disabled!
 * 
 * @returns {JSX.Element} A dropdown for the header of the dashboard's body.
 */
const Dropdown = ({ label, menu, variant }: DropdownProps): JSX.Element => {
	const disabledDropdown = variant.includes('disabled');
	return (
		<Menu as="div" className="inline-block text-left">
			<div>
				<MenuButton className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-bold text-success shadow-sm ring-1 ring-inset ring-darkgray"
					disabled={disabledDropdown}>
					{label}
					<ChevronDownIcon aria-hidden="true" className="-mr-1 h-5 w-5 text-darkgray" />
				</MenuButton>
			</div>

			<MenuItems
				transition
				className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
			>
				<div className="py-1">
					{menu !== null ?
						menu.map((menuitem, index) => (
							// Dropdown items
							<MenuItem key={index}>
								<section
									className="block text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900"
								>
									{menuitem}
								</section>
							</MenuItem>
						)) :
						null}
				</div>
			</MenuItems>
		</Menu>
	);
};

export default Dropdown;