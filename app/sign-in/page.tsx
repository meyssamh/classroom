'use client'

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { ThunkDispatch } from '@reduxjs/toolkit';

import Background from '@/public/assets/images/Background.jpg';
import Logo from '@/components/UI/Logo/Logo';
import Input from '@/components/UI/Input/Input';
import Button from '@/components/UI/Button/Button';
import { ValidationCheck } from '@/types/declaration';
import { RootState } from '@/lib/store';
import { fetchSignin } from '@/lib/store/action/authActions';
import Spinner from '@/components/UI/Spinner/Spinner';
import Snackbar from '@/components/UI/Snackbar/Snackbar';

export default function Signin() {
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

    // Router
    const router = useRouter();

    // Ref
    const usernameRef = React.useRef<HTMLInputElement>(null);

    // Component hook
    React.useEffect(() => {
        if (usernameRef.current) {
            usernameRef.current.focus();
        }
    }, []);

    // Redux state
    const promiseLoading: 'idle' | 'pending' | 'succeeded' | 'failed' = useSelector((state: RootState) => state.auth.loading);
    const promiseError: string | null = useSelector((state: RootState) => state.auth.error);

    // Error message
    const errorMessage = promiseError === null ? 'Something went wrong!' : promiseError;

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
                setter(value);
                validator(value);
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
        <>
            {
                promiseLoading === 'pending' ?
                    <Spinner /> :
                    promiseLoading === 'failed' ?
                        <section className="text-center mt-8">
                            <Snackbar
                                text={errorMessage}
                                severity={'error'}
                            />
                        </section> :
                        null
            }
            {
                openSnackbar ?
                    <section className="text-center mt-8">
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
                <section className={'text-center pt-10 pb-20 sm:pl-10 sm:text-left'}>
                    <Logo />
                </section>
                <section className={'flex items-center justify-center'}>
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
                </section>
            </main>
        </>
    );
};