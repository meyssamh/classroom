'use client'

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { ThunkDispatch } from '@reduxjs/toolkit';

import Input from '../../UI/Input/Input';
import Button from '../../UI/Button/Button';
import { ValidationCheck } from '@/types/declaration';
import { fetchSignin } from '../../../lib/store/action/authActions';

const Signin = (): JSX.Element => {
    // Component state
    const [username, setUsername] = React.useState<string>('');
    const [usernameError, setUsernameError] = React.useState<ValidationCheck>({
        error: false,
        errorText: '',
    });
    const [password, setPassword] = React.useState<string>('');
    const [passwordError, setPasswordError] = React.useState<ValidationCheck>({
        error: false,
        errorText: '',
    });
    const [openSnackbar, setOpenSnackbar] = React.useState<boolean>(false);

    const router = useRouter();

    // Ref
    const usernameRef = React.useRef<HTMLInputElement>(null);

    // Component hook
	React.useEffect(() => {
		if (usernameRef.current) {
			usernameRef.current.focus();
		}
	}, []);

	// ThunkDispatch hook
	const dispatch = useDispatch<ThunkDispatch<any, any, any>>();

    // Input validation to check if button should be disabled or not.
    const buttonDisabler = !usernameError.error &&
        username.trim().length > 0 &&
        !passwordError.error &&
        password.length > 0 ?
        false :
        true;

    // Higher-order function for input change handling with validation
    const handleInputChangeWithValidation =
        (
            setter: React.Dispatch<React.SetStateAction<string>>,
            validator: (value: string) => void
        ): React.ChangeEventHandler<HTMLInputElement> =>
            (e) => {
                const value = e.target.value;
                setter(value); // Update the input state
                validator(value); // Run the validation function
            };

    // Validation functions for each input
    const validateUsername = (value: string) => {
        let validation = { error: false, errorText: '' };
        if (value.length < 4) {
            validation = {
                error: true,
                errorText: 'Username must have at least 4 characters!',
            };
        }
        setUsernameError(validation);
    };

    const validatePassword = (value: string) => {
        let validation = { error: false, errorText: '' };
        if (value.length < 8) {
            validation = {
                error: true,
                errorText: 'Password must have at least 8 characters!',
            };
        }
        setPasswordError(validation);
    };

    // Handlers for each input field with proper typing
    const handleChangeUsername = handleInputChangeWithValidation(setUsername, validateUsername);
    const handleChangePassword = handleInputChangeWithValidation(setPassword, validatePassword);

    function handleSigninClick(): void {
        if (!buttonDisabler) {
			dispatch(fetchSignin({ username, password }))
				.then((res) => {
					if (res.type === 'auth/signin/fulfilled') {
						router.push('/dashboard');
					}
				});
		} else {
			setOpenSnackbar(true);
		}
    }

    return (
        <section className={'bg-white rounded-lg w-11/12 mt-5 mb-10 sm:w-[460px]'}>
            <h1 className={'text-success font-bold text-2xl text-center py-10'}>
                Sign in
            </h1>
            <center>
                <hr className={'w-11/12'} />
            </center>
            <form className={'flex-col justify-between mt-10'}>
                <Input
                    label={'Username *'}
                    value={username}
                    name={'username'}
                    type={'text'}
                    required={true}
                    maxLength={255}
                    onChange={handleChangeUsername}
                    error={usernameError.error}
                    errorText={usernameError.errorText}
                />
                <Input
                    label={'Password *'}
                    value={password}
                    name={'password'}
                    type={'password'}
                    required={true}
                    maxLength={255}
                    onChange={handleChangePassword}
                    error={passwordError.error}
                    errorText={passwordError.errorText}
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
                                text={'Sign in'}
                            /> :
                            <Button
                                variant={'contained-long'}
                                text={'Sign in'}
                                onClick={handleSigninClick}
                            />
                    }
                </section>
                <Link
                    className={'block cursor-pointer select-none no-underline text-success font-bold text-base pb-10'}
                    href={'/'}
                >
                    You don&apos;t have an account? Sign up
                </Link>
            </center>
        </section >
    );
};

export default Signin;