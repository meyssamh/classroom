'use client'

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { ThunkDispatch } from '@reduxjs/toolkit';

import Background from '@/public/assets/images/Background.jpg';
import Input from '@/components/UI/Input/Input';
import Button from '@/components/UI/Button/Button';
import { ValidationCheck } from '@/types/declaration';
import Logo from '@/components/UI/Logo/Logo';
import { fetchSignup } from '@/lib/store/action/authActions';
import { RootState } from '@/lib/store';
import Spinner from '@/components/UI/Spinner/Spinner';
import Snackbar from '@/components/UI/Snackbar/Snackbar';
import Image from 'next/image';

export default function Home() {
	// Component state
	const [firstname, setFirstname] = React.useState<string>('');
	const [lastname, setLastname] = React.useState<string>('');
	const [username, setUsername] = React.useState<string>('');
	const [email, setEmail] = React.useState<string>('');
	const [password, setPassword] = React.useState<string>('');
	const [confirmPassword, setConfirmPassword] = React.useState<string>('');
	const [validFirstname, setValidFirstname] = React.useState<boolean>(false);
	const [validLastname, setValidLastname] = React.useState<boolean>(false);
	const [validUsername, setValidUsername] = React.useState<boolean>(false);
	const [validEmail, setValidEmail] = React.useState<boolean>(false);
	const [validPassword, setValidPassword] = React.useState<boolean>(false);
	const [validConfirmPassword, setValidConfirmPassword] = React.useState<ValidationCheck>({
		error: false,
		errorText: '',
	});
	const [openSnackbar, setOpenSnackbar] = React.useState<boolean>(false);

	// Ref
	const firstnameRef = React.useRef<HTMLInputElement>(null);

	// Redux state
	const promiseLoading: 'idle' | 'pending' | 'succeeded' | 'failed' = useSelector((state: RootState) => state.auth.loading);
	const promiseError: string | null = useSelector((state: RootState) => state.auth.error);

	// Router
	const router = useRouter();

	// Validators
	const validateName = (value: string, setValid: React.Dispatch<React.SetStateAction<boolean>>) => {
		const nameRegex = /^[a-zA-Z]+$/;
		setValid(value.trim().length > 0 && !nameRegex.test(value));
	};

	const validateEmail = (value: string, setValid: React.Dispatch<React.SetStateAction<boolean>>) => {
		const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		setValid(!(emailRegex.test(value) && value.length > 0));
	};

	// Error message
	const errorMessage = promiseError === null ? 'Something went wrong!' : promiseError;

	// ThunkDispatch hook
	const dispatch = useDispatch<ThunkDispatch<any, any, any>>();

	const buttonDisabler = !validFirstname &&
		!validLastname &&
		!validUsername &&
		username.trim().length > 0 &&
		!validEmail &&
		email.length > 0 &&
		!validPassword &&
		password.length > 0 &&
		!validConfirmPassword.error &&
		confirmPassword.length > 0 ?
		false :
		true;

	// Higher order handler
	const handleInputChange =
		(
			setter: React.Dispatch<React.SetStateAction<string>>,
			validator: (value: string) => void
		): React.ChangeEventHandler<HTMLInputElement> =>
			(e) => {
				const value = e.target.value;
				setter(value);
				validator(value);
			};

	// Handlers for each input field with proper typing
	const handleChangeFirstname = handleInputChange(
		setFirstname,
		(value) => validateName(value, setValidFirstname)
	);

	const handleChangeLastname = handleInputChange(
		setLastname,
		(value) => validateName(value, setValidLastname)
	);

	const handleChangeUsername = handleInputChange(
		setUsername,
		(value) => setValidUsername(value.trim().length < 4)
	);

	const handleChangeEmail = handleInputChange(
		setEmail,
		(value) => validateEmail(value, setValidEmail)
	);

	const handleChangePassword = handleInputChange(
		setPassword,
		(value) => setValidPassword(value.length < 8)
	);

	const handleChangeConfirmPassword = handleInputChange(
		setConfirmPassword,
		(value) => {
			const isValid = value === password && value.length >= 8;
			setValidConfirmPassword({
				error: !isValid,
				errorText: isValid ? '' : value !== password ? 'Password and Confirm Password are not the same!' : 'Password must have at least 8 characters!'
			});
		}
	);

	function handleSignupClick(): void {
		if (!buttonDisabler) {
			dispatch(fetchSignup({ firstname, lastname, username, email, password, confirmPassword }))
				.then((res) => {
					if (res.type === 'auth/submit/fulfilled') {
						router.push('/dashboard');
					}
				});
		} else {
			setOpenSnackbar(true);
		}
	};

	return (
		<>
			{
				promiseLoading === 'pending' ?
					<Spinner /> :
					promiseLoading === 'failed' ?
						<section className="message">
							<Snackbar
								text={errorMessage}
								severity={'error'}
							/>
						</section> :
						null
			}
			{
				openSnackbar ?
					<section className="message">
						<Snackbar
							text={'Invalid input!'}
							severity={'error'}
						/>
					</section> :
					null
			}
			<main>
				{/* Background image */}
				<Image src={Background} className="fixed object-cover w-screen h-screen left-0 top-0 -z-10" alt={'Background'} />
				<section className={'text-center pt-10 pb-20 sm:pl-10 sm:text-left sm:pb-0'}>
					<Logo />
				</section>
				<section className={'lg:flex'}>
					<section className={'bg-white rounded-lg w-10/12 text-center h-fit m-auto sm:mt-44 sm:w-[460px]'}>
						<h1 className={'text-success font-bold text-2xl p-12 pb-0'}>
							Welcome to Classroom!
						</h1>
						<p className={'text-success font-bold text-base px-10 py-12'}>
							This desktop platform provides you with the convenience of monitoring and managing your course attendees with ease.
						</p>
					</section>
					<section className={'bg-white rounded-lg w-11/12 mx-auto mt-5 mb-10 sm:w-[460px]'}>
						<h1 className={'text-success font-bold text-2xl text-center py-10'}>
							Sign up
						</h1>
						<center>
							<hr className={'w-11/12'} />
						</center>
						<form className={'flex-col justify-between mt-10'}>
							<Input
								label={'First Name'}
								value={firstname}
								name={'firstname'}
								type={'text'}
								required={false}
								maxLength={255}
								onChange={handleChangeFirstname}
								error={validFirstname}
								errorText={'First Name must have only letters!'}
								ref={firstnameRef}
							/>
							<Input
								label={'Last Name'}
								value={lastname}
								name={'lastname'}
								type={'text'}
								required={false}
								maxLength={255}
								onChange={handleChangeLastname}
								error={validLastname}
								errorText={'Last Name must have only letters!'}
							/>
							<Input
								label={'Username *'}
								value={username}
								name={'username'}
								type={'text'}
								required={true}
								maxLength={255}
								onChange={handleChangeUsername}
								error={validUsername}
								errorText={'Username must have at least 4 characters!'}
							/>
							<Input
								label={'E-Mail *'}
								value={email}
								name={'email'}
								type={'email'}
								required={true}
								maxLength={255}
								onChange={handleChangeEmail}
								error={validEmail}
								errorText={'E-Mail address is not valid!'}
							/>
							<Input
								label={'Password *'}
								value={password}
								name={'password'}
								type={'password'}
								required={true}
								maxLength={255}
								onChange={handleChangePassword}
								error={validPassword}
								errorText={'Password must have at least 8 characters!'}
							/>
							<Input
								label={'Confirm Password *'}
								value={confirmPassword}
								name={'confirm-password'}
								type={'password'}
								required={true}
								maxLength={255}
								onChange={handleChangeConfirmPassword}
								error={validConfirmPassword.error}
								errorText={validConfirmPassword.errorText}
							/>
							<p className={'pl-7 pb-10'}>
								* Required
							</p>
						</form>
						<center>
							<section className={'mb-10 w-full'}>
								{
									buttonDisabler ?
										<Button
											variant={'contained-long-disabled'}
											text={'Sign up'}
										/> :
										<Button
											variant={'contained-long'}
											text={'Sign up'}
											onClick={handleSignupClick}
										/>
								}
							</section>
							<Link
								className={'block cursor-pointer select-none no-underline text-success font-bold text-base pb-10'}
								href={'/sign-in'}
							>
								Already have an account? Sign In
							</Link>
						</center>
					</section >
				</section>
			</main>
		</>
	);
};