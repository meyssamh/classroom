'use client'

import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ThunkDispatch } from '@reduxjs/toolkit';

import LinkButton from '@/components/UI/LinkButton/LinkButton';
import Tag from '@/components/UI/Tag/Tag';
import Modal from '@/components/Modal/Modal';
import Spinner from '@/components/UI/Spinner/Spinner';
import Snackbar from '@/components/UI/Snackbar/Snackbar';
import BodyHeader from '@/components/Body/Header/Header';
import BodyMain from '@/components/Body/Main/Main';
import { Classes, Students } from '@/types/redux';
import { RootState } from '@/lib/store';
import { fetchDeleteStudent } from '@/lib/store/action/classActions';
import Header from '@/components/Header/Header';

export default function DeleteStudent(): JSX.Element {
    // Component state
    const [modalOpen, setModalOpen] = React.useState<boolean>(false);
    const [studentId, setStudentId] = React.useState<number>(0);

    // Redux state
    const selectedClass: Classes = useSelector((state: RootState) => state.class.data.class);
    const students: Students[] = useSelector((state: RootState) => state.class.data.students);
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
        setStudentId(0);
    }

    function handleProceedClick(): void {
        const id = studentId;
        dispatch(fetchDeleteStudent(id));
        setModalOpen(false);
        setStudentId(0);
    }

    function handleDeleteStudent(id: number): void {
        setStudentId(id);
        setModalOpen(true);
    }

    // Title of dashboard's body
    const title = `${selectedClass.classname}: Delete Student`;

    // Button in header of body, to return to class page.
    const classButton = <section className={'absolute left-2'}>
        <LinkButton
            link={`/dashboard/class/${selectedClass.id}`}
            text={'Go to Class'}
            variant={'contained'}
        />
    </section>;

    // Delete modal
    const modal = (
        <Modal
            label={'Delete Student'}
            type={'delete'}
            question={'Are you sure you want to delete this student?'}
            onCancelClick={handleCancelClick}
            onProceedClick={handleProceedClick}
        />
    );

    // Complete body element
    const bodyContent = students.map(student => {
        const fullname = student.firstname + ' ' + student.lastname;
        const id = student.id;

        return (
            <Tag
                variant={'delete'}
                text={fullname}
                buttonText={'Delete Student'}
                key={id}
                onClick={handleDeleteStudent.bind(this, id)}
            />
        );
    });

    return (
        <>
            {
                promiseLoading === 'pending' ?
                    <Spinner /> :
                    promiseLoading === 'failed' ?
                        <section>
                            <Snackbar
                                text={errorMessage}
                                severity={'error'}
                            />
                        </section> :
                        promiseLoading === 'succeeded' ?
                            <section>
                                <Snackbar
                                    text={'Student deleted successfully!'}
                                    severity={'success'}
                                />
                            </section> :
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