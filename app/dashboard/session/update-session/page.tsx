/* eslint-disable react-hooks/exhaustive-deps */
'use client'

import React from 'react';
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { ThunkDispatch } from '@reduxjs/toolkit';

import { Situation } from '@/types/declaration';
import { Classes, Sessions, Students } from '@/types/redux';
import IconButton from '@/components/UI/IconButton/IconButton';
import StudentTag from '@/components/UI/StudentTag/StudentTag';
import Spinner from '@/components/UI/Spinner/Spinner';
import Snackbar from '@/components/UI/Snackbar/Snackbar';
import BodyHeader from '@/components/Body/Header/Header';
import BodyMain from '@/components/Body/Main/Main';
import { RootState } from '@/lib/store';
import { fetchUpdateSession } from '@/lib/store/action/classActions';
import Header from '../../../../components/Header/Header';

export default function EditSession(): JSX.Element {
    // Component state
    const [situation, setSituation] = React.useState<Situation>({});
    const [sessionDate, setSessionDate] = React.useState<Date>();

    // LocalStorage
    const isClient = typeof window !== "undefined";
    const sessionId = isClient ? localStorage.getItem('selectedSession') : null;

    // Redux state
    const selectedClass: Classes = useSelector((state: RootState) => state.class.data.class);
    const students: Students[] = useSelector((state: RootState) => state.class.data.students);
    const sessions: Sessions[] = useSelector((state: RootState) => state.class.data.sessions);
    const promiseLoading: 'idle' | 'pending' | 'succeeded' | 'failed' = useSelector((state: RootState) => state.home.loading);
    const promiseError: string | null = useSelector((state: RootState) => state.home.error);

    let selectedSession: Sessions | undefined = sessions.filter(session => session.id === Number(sessionId)).pop();

    // Component hook
    React.useEffect(() => {
        if (sessions) {
            const mySelectedSession = sessions.filter(session => session.id === Number(sessionId)).pop();
            const selectedSituation: Situation = mySelectedSession!.situation as Situation;
            const selectedDate = mySelectedSession!.date;

            setSituation(selectedSituation);
            setSessionDate(selectedDate);
        }
    }, []);

    // ThunkDispatch hook
    const dispatch = useDispatch<ThunkDispatch<any, any, any>>();

    // Router
    const router = useRouter();

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
    function handleCancleClick(): void {
        router.push('/dashboard/session/select-edit-session');
    }

    function handleSubmitClick(): void {
        let updatedSession = { ...selectedSession! };

        updatedSession!.situation = { ...situation };

        dispatch(fetchUpdateSession(updatedSession));
        router.push('/dashboard/session/select-update-session');
    }

    function handleSituationClick(id: number): void {
        const updatedSituation = { ...situation };
        updatedSituation[id] = undefined;
        setSituation(updatedSituation);
    }

    function handleAbsentClick(id: number): void {
        setSituation({ ...situation, [id]: false });
    }

    function handlePresentClick(id: number): void {
        setSituation({ ...situation, [id]: true });
    }

    // Error message
    const errorMessage = promiseError === null ? 'Something went wrong!' : promiseError;

    const selectedSessionDate = new Date(sessionDate!);
    const date = selectedSessionDate.getDate();
    const month = selectedSessionDate.getMonth() + 1;

    // Title of body's header
    const title = `${selectedClass.classname}: Session ${date}/${month}`;

    // TODO: Situation of all the students must be chosen to submit button to be active!
    // Buttons of body's header
    const actionButtons = (
        <section className={'absolute left-2 flex gap-2'}>
            <IconButton
                variant={'outlined'}
                icon={'cancel'}
                text={'Cancel'}
                onClick={handleCancleClick}
            />
            {
                students.length === Object.keys(situation).length ?
                    <IconButton
                        variant={'contained'}
                        icon={'submit'}
                        text={'Submit'}
                        onClick={handleSubmitClick}
                    /> :
                    <IconButton
                        variant={'contained-disabled'}
                        icon={'submit-disabled'}
                        text={'Submit'}
                    />
            }
        </section>
    );

    // Complete body element
    const bodyContent: JSX.Element[] = [];

    students.map(student => {
        const fullname = student.firstname + ' ' + student.lastname;

        Object.entries(situation).map(element => {

            if (student.id === parseInt(element[0])) {
                if (element[1] === true) {
                    bodyContent.push(
                        <StudentTag
                            text={fullname}
                            variant={'present'}
                            key={student.id + fullname + element[1]}
                            onClick={handleSituationClick.bind(this, Number(element[0]))}
                        />
                    );
                } else if (element[1] === false) {
                    bodyContent.push(
                        <StudentTag
                            text={fullname}
                            variant={'absent'}
                            key={student.id + fullname + element[1]}
                            onClick={handleSituationClick.bind(this, Number(element[0]))}
                        />
                    );
                } else {
                    bodyContent.push(
                        <StudentTag
                            text={fullname}
                            variant={'unresolved'}
                            key={student.id + fullname + element[1]}
                            onAbsentClick={handleAbsentClick.bind(this, Number(element[0]))}
                            onPresentClick={handlePresentClick.bind(this, Number(element[0]))}
                        />
                    );
                }
            } else {
                null;
            }
        });
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
                                text={'Session edited successfully!'}
                                severity={'success'}
                            /> :
                            null
            }
            <Header title={title} />
            <BodyHeader>
                {actionButtons}
            </BodyHeader>
            <BodyMain>
                <section className={classes.body}>
                    {bodyContent}
                </section>
            </BodyMain>
        </>
    );
};