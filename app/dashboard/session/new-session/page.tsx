'use client'

import React from 'react';
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { ThunkDispatch } from '@reduxjs/toolkit';

import { Situation } from '@/types/declaration';
import IconButton from '@/components/UI/IconButton/IconButton';
import StudentTag from '@/components/UI/StudentTag/StudentTag';
import BodyHeader from '@/components/Body/Header/Header';
import BodyMain from '@/components/Body/Main/Main';
import { Classes, Students } from '@/types/redux';
import { RootState } from '@/lib/store';
import { fetchNewSession } from '@/lib/store/action/classActions';
import Header from '@/components/Header/Header';

export default function NewSession(): JSX.Element {
    // Component state
    const [situation, setSituation] = React.useState<Situation>({});

    // Redux state
    const selectedClass: Classes = useSelector((state: RootState) => state.class.data.class);
    const students: Students[] = useSelector((state: RootState) => state.class.data.students);

    // ThunkDispatch hook
    const dispatch = useDispatch<ThunkDispatch<any, any, any>>();

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
    function handleCancelClick(): void {
        setSituation({});
        router.push(`/dashboard/class/${selectedClass.id}`);
    }

    function handleSubmitClick(): void {
        if (Object.keys(situation).length === Object.keys(students).length) {
            dispatch(fetchNewSession(situation));
            setSituation({});
            router.push(`/dashboard/class/${selectedClass.id}`);
        }
    }

    function handleAbsentClick(id: number): void {
        setSituation({ ...situation, [id]: false });
    }

    function handlePresentClick(id: number): void {
        setSituation({ ...situation, [id]: true });
    }

    const date = new Date();

    // Title of body's header
    const title = `${selectedClass.classname}: Session ${date.getDate()}/${date.getMonth() + 1}`;

    // Button in header of body
    const actionButtons = (
        <section className={'absolute left-2 flex gap-2'}>
            <IconButton
                variant={'outlined'}
                text={'Cancel'}
                icon={'cancel'}
                onClick={handleCancelClick}
            />
            {
                Object.keys(situation).length === Object.keys(students).length ?
                    <IconButton
                        variant={'contained'}
                        text={'Submit'}
                        icon={'submit'}
                        onClick={handleSubmitClick}
                    /> :
                    <IconButton
                        variant={'contained-disabled'}
                        text={'Submit'}
                        icon={'submit-disabled'}
                    />
            }
        </section>
    );

    // Complete body element
    const bodyContent: JSX.Element[] = students.map(student => {
        const fullname = student.firstname + ' ' + student.lastname;
        const id = student.id;

        if (Object.entries(situation).length === 0) {
            return (
                <StudentTag
                    text={fullname}
                    variant={'unresolved'}
                    key={id}
                    onAbsentClick={handleAbsentClick.bind(this, id)}
                    onPresentClick={handlePresentClick.bind(this, id)}
                />
            );
        } else {
            const studentSituation = Object.entries(situation).find(student => Number(student[0]) === id);

            if (studentSituation) {
                if (studentSituation[1] === true) {
                    return (
                        <StudentTag
                            text={fullname}
                            variant={'present'}
                            key={id}
                        />
                    );
                } else {
                    return (
                        <StudentTag
                            text={fullname}
                            variant={'absent'}
                            key={id}
                        />
                    );
                }
            } else {
                return (
                    <StudentTag
                        text={fullname}
                        variant={'unresolved'}
                        key={id}
                        onAbsentClick={handleAbsentClick.bind(this, id)}
                        onPresentClick={handlePresentClick.bind(this, id)}
                    />
                );
            }
        }
    });

    return (
        <>
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