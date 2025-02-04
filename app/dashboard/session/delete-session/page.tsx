'use client'

import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ThunkDispatch } from '@reduxjs/toolkit';

import Tag from '@/components/UI/Tag/Tag';
import LinkButton from '@/components/UI/LinkButton/LinkButton';
import Modal from '@/components/Modal/Modal';
import Spinner from '@/components/UI/Spinner/Spinner';
import Snackbar from '@/components/UI/Snackbar/Snackbar';
import BodyHeader from '@/components/Body/Header/Header';
import BodyMain from '@/components/Body/Main/Main';
import { fetchDeleteSession } from '@/lib/store/action/classActions';
import { Classes, Sessions } from '@/types/redux';
import { RootState } from '@/lib/store';
import Header from '@/components/Header/Header';


export default function DeleteSession(): JSX.Element {
    // Component state
    const [sessionId, setSessionId] = React.useState<number>(0);
    const [modalOpen, setModalOpen] = React.useState<boolean>(false);

    // Redux state
    const selectedClass: Classes = useSelector((state: RootState) => state.class.data.class);
    const sessions: Sessions[] = useSelector((state: RootState) => state.class.data.sessions);
    const promiseLoading: 'idle' | 'pending' | 'succeeded' | 'failed' = useSelector((state: RootState) => state.class.loading);
    const promiseError: string | null = useSelector((state: RootState) => state.class.error);

    // ThunkDispatch hook
    const dispatch = useDispatch<ThunkDispatch<any, any, any>>();

    // Error message
    const errorMessage = promiseError === null ? 'Something went wrong!' : promiseError;

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
    function handleCancelClick(): void {
        setModalOpen(false);
        setSessionId(0);
    }

    function handleProceedClick(): void {
        dispatch(fetchDeleteSession(sessionId));
        setModalOpen(false);
        setSessionId(0);
    }

    function handleDeleteSession(id: number): void {
        setSessionId(id);
        setModalOpen(true);
    }

    // Delete modal
    const modal = (
        <Modal
            label={'Delete Session'}
            type={'delete'}
            question={'Are you sure you want to delete this session?'}
            onCancelClick={handleCancelClick}
            onProceedClick={handleProceedClick}
        />
    );

    // Title of dashboard's body
    const title = `${selectedClass.classname}: Sessions`;

    // Button in header of body, to return to class page.
    const classButton = <section className={'absolute left-2'}>
        <LinkButton
            link={`/dashboard/class/${selectedClass.id}`}
            text={'Go to Class'}
            variant={'contained'}
        />
    </section>;

    // Complete body element
    const bodyContent = sessions.map(session => {
        const sessionDate = new Date(session.date);
        const date = sessionDate.getDate();
        const month = sessionDate.getMonth() + 1;
        const text = `Session ${date}/${month}`;

        const id = session.id;

        return (
            <Tag
                variant={'delete'}
                text={text}
                buttonText={'Delete Session'}
                key={id}
                onClick={handleDeleteSession.bind(this, id)}
            />
        );
    });

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
                                text={'Session deleted successfully!'}
                                severity={'success'}
                            /> :
                            null
            }
            {
                modalOpen === true ?
                    modal :
                    null
            }
            <Header title={title} />
            <BodyHeader>
                {classButton}
            </BodyHeader>
            <BodyMain>
                <section className={classes.body}>
                    {bodyContent}
                </section>
            </BodyMain>
        </>
    );
};