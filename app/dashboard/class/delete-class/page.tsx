'use client'

import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ThunkDispatch } from '@reduxjs/toolkit';

import LinkButton from '@/components/UI/LinkButton/LinkButton';
import Modal from '@/components/Modal/Modal';
import { Classes } from '@/types/redux';
import Tag from '@/components/UI/Tag/Tag';
import Spinner from '@/components/UI/Spinner/Spinner';
import Snackbar from '@/components/UI/Snackbar/Snackbar';
import BodyHeader from '@/components/Body/Header/Header';
import BodyMain from '@/components/Body/Main/Main';
import { RootState } from '@/lib/store';
import { fetchDeleteClass } from '@/lib/store/action/homeActions';
import Header from '@/components/Header/Header';

export default function DeleteClass(): JSX.Element {
    // Component state
    const [modalOpen, setModalOpen] = React.useState<boolean>(false);
    const [classId, setClassId] = React.useState<number>(0);

    // Redux state
    const userClasses: Classes[] = useSelector((state: RootState) => state.home.data.classes);
    const promiseLoading: 'idle' | 'pending' | 'succeeded' | 'failed' = useSelector((state: RootState) => state.home.loading);
    const promiseError: string | null = useSelector((state: RootState) => state.home.error);

    // ThunkDispatch hook
    const dispatch = useDispatch<ThunkDispatch<any, any, any>>();

    // Error message
    const errorMessage = promiseError === null ? 'Something went wrong!' : promiseError;

    // Valid classes made by user
    let validUserClasses: JSX.Element[];

    if (userClasses.length !== 0) {
        validUserClasses = userClasses.map((course: Classes) => {
            const id = course.id;
            return (
                <Tag
                    variant={'delete'}
                    text={course.classname}
                    buttonText='Delete Class'
                    key={course.id}
                    onClick={handleDeleteClass.bind(this, id)}
                />
            );
        });
    } else {
        // TODO: else should have throw error or show error page!
        validUserClasses = [];
    }

    const classes = {
        body: `
		  flex flex-col w-11/12 p-10 items-center gap-[60px]
		  sm:grid sm:grid-cols-1 mx-auto sm:p-[40px_0] 
		  md:grid-cols-2 lg:grid-cols-4
		`,
        hint: `
		  flex items-center justify-center h-full text-[1.5rem]
		`,
    };

    // Handlers
    function handleDeleteClass(id: number): void {
        setClassId(id);
        setModalOpen(true);
    }

    function handleCancelClick(): void {
        setClassId(0);
        setModalOpen(false);
    }

    function handleProceedClick(): void {
        dispatch(fetchDeleteClass(classId));
        setClassId(0);
        setModalOpen(false);
    }

    // Button in header of body, to return to home page.
    const homeButton = <LinkButton variant={'contained'} text={'Go to Home'} link={'/dashboard'} />;

    // Delete modal
    const modal = (
        <Modal
            label={'Delete Class'}
            type={'delete'}
            question={'Are you sure you want to delete this class?'}
            onCancelClick={handleCancelClick}
            onProceedClick={handleProceedClick}
        />
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
                                text={'Class deleted successfully!'}
                                severity={'success'}
                            /> :
                            null
            }
            {
                modalOpen === true ?
                    modal :
                    null
            }
            <Header title={'Delete Class'} />
            <BodyHeader>
                {homeButton}
            </BodyHeader>
            <BodyMain>
                {bodyContent}
            </BodyMain>
        </>
    );
};