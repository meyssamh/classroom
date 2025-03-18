'use client'

import React from 'react';
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { ThunkDispatch } from '@reduxjs/toolkit';

import BodyHeader from '@/components/Body/Header/Header';
import BodyMain from '@/components/Body/Main/Main';
import Button from '@/components/UI/Button/Button';
import Dropdown from '@/components/UI/Dropdown/Dropdown';
import Tag from '@/components/UI/Tag/Tag';
import { Classes } from '@/types/redux';
import Input from '@/components/UI/Input/Input';
import Modal from '@/components/Modal/Modal';
import Spinner from '@/components/UI/Spinner/Spinner';
import Snackbar from '@/components/UI/Snackbar/Snackbar';
import { RootState } from '@/lib/store';
import { fetchClasses, fetchNewClass } from '@/lib/store/action/homeActions';
import { fetchClass } from '@/lib/store/action/classActions';
import Header from '@/components/Header/Header';

export default function Dashboard() {
	// Component state
	const [modalOpen, setModalOpen] = React.useState<boolean>(false);
	const [newClassname, setNewClassname] = React.useState<string>('');
	const [openSnackbar, setOpenSnackbar] = React.useState<boolean>(false);

	// Router
	const router = useRouter();

	// Ref
	const classnameRef = React.useRef<HTMLInputElement>(null);

	// Redux state
	const promiseLoading: 'idle' | 'pending' | 'succeeded' | 'failed' = useSelector((state: RootState) => state.home.loading);
	const promiseError: string | null = useSelector((state: RootState) => state.home.error);
	const userClasses: Classes[] = useSelector((state: RootState) => state.home.data.classes);

	// ThunkDispatch hook
	const dispatch = useDispatch<ThunkDispatch<any, any, any>>();

	// Component hooks
	React.useEffect(() => {
		dispatch(fetchClasses());
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	React.useEffect(() => {
		if (classnameRef.current) {
			classnameRef.current.focus();
		}
	}, [modalOpen]);

	// Error message
	const errorMessage = promiseError === null ? 'Something went wrong!' : promiseError;

	let validUserClasses: JSX.Element[];

	if (Object.keys(userClasses).length !== 0) {
		validUserClasses = userClasses.map((course: Classes) => {
			const id = course.id;
			return (
				<Tag
					variant={'open'}
					text={course.classname}
					buttonText={'Open Class'}
					key={id}
					onClick={handleClickOpenClass.bind(this, id)}
				/>
			);
		});
	} else {
		validUserClasses = [];
	}

	// Handlers
	function handleNewClass(): void {
		setModalOpen(true);
	}

	function handleEditClass(): void {
		router.push('/dashboard/class/update-class');
	}

	function handleDeleteClass(): void {
		router.push('/dashboard/class/delete-class');
	}

	function handleChangeInput(e: React.ChangeEvent<HTMLInputElement>): void {
		setNewClassname(e.target.value);
	}

	function handleCancelClick(): void {
		setModalOpen(false);
		setNewClassname('');
	}

	async function handleProceedClick() {
		if (newClassname.trim().length > 0) {
			setModalOpen(false);
			dispatch(fetchNewClass(newClassname));
			setNewClassname('');
		} else {
			setNewClassname('');
			setModalOpen(false);
			setOpenSnackbar(true);
		}
	}

	function handleClickOpenClass(id: number): void {
		dispatch(fetchClass(id));
		router.push('dashboard/class/' + id);
	}

	const classes = {
		body: `
		  flex flex-col max-w-11/12 p-10 items-center gap-[60px]
		  sm:grid sm:grid-cols-1 mx-auto  
		  md:grid-cols-2 xl:grid-cols-4
		`,
		hint: `
		  flex items-center justify-center h-full text-[1.5rem]
		`,
	};

	// Elements of modal
	const modalChildren = (
		<Input
			label={'Class Name *'}
			maxLength={255}
			name={'classname'}
			error={newClassname.length === 0}
			errorText={'Class Name is required!'}
			value={newClassname}
			required={true}
			type={'text'}
			ref={classnameRef}
			onChange={(e): void => handleChangeInput(e)}
		/>
	);

	// Modal with different types for different situations.
	const modal = newClassname.trim().length > 0 ?
		<Modal
			label={'New Class'}
			type={'edit'}
			onCancelClick={handleCancelClick}
			onProceedClick={handleProceedClick}
		>
			{modalChildren}
		</Modal> :
		<Modal
			label={'New Class'}
			type={'edit-disabled'}
			onCancelClick={handleCancelClick}
		>
			{modalChildren}
		</Modal>;

	// Dropdown child elements
	const dropdownMenu = [
		<Button
			variant="text"
			text="New Class"
			onClick={handleNewClass}
			key="new-class"
		/>,
		<Button
			variant={userClasses.length === 0 ? 'text-disabled' : 'text'}
			text="Edit Class"
			onClick={userClasses.length === 0 ? undefined : handleEditClass}
			key="edit-class"
		/>,
		<Button
			variant={userClasses.length === 0 ? 'text-disabled' : 'text'}
			text="Delete Class"
			onClick={userClasses.length === 0 ? undefined : handleDeleteClass}
			key="delete-class"
		/>,
	];

	const classDropdown = (
		<section className={'absolute right-2'}>
			<Dropdown
				variant="contained"
				label="Class"
				menu={dropdownMenu}
			/>
		</section>
	);

	// Complete body element
	const bodyContent = validUserClasses.length > 0 ?
		<section className={classes.body}>
			{validUserClasses}
		</section> :
		<strong className={classes.hint}>Please add a class!</strong>;

	return (
		<>
			{
				promiseLoading === 'pending' ?
					<Spinner /> :
					promiseLoading === 'failed' ?
						<Snackbar
							text={errorMessage}
							severity={'error'}
						/> :
						promiseLoading === 'succeeded' ?
							<Snackbar
								text={'New class added successfully!'}
								severity={'success'}
							/> :
							null
			}
			{
				modalOpen === true ?
					modal :
					null
			}
			{
				openSnackbar ?
					<Snackbar
						text={'Invalid input!'}
						severity={'error'}
					/> :
					null
			}
			<Header title={'Dashboard'} />
			<BodyHeader>
				{classDropdown}
			</BodyHeader>
			<BodyMain>
				{bodyContent}
			</BodyMain>
		</>
	);
};