'use client'

import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ThunkDispatch } from '@reduxjs/toolkit';

import LinkButton from '@/components/UI/LinkButton/LinkButton';
import Input from '@/components/UI/Input/Input';
import Modal from '@/components/Modal/Modal';
import { Classes } from '@/types/redux';
import Tag from '@/components/UI/Tag/Tag';
import Spinner from '@/components/UI/Spinner/Spinner';
import Snackbar from '@/components/UI/Snackbar/Snackbar';
import BodyHeader from '@/components/Body/Header/Header';
import BodyMain from '@/components/Body/Main/Main';
import { RootState } from '@/lib/store';
import { fetchUpdateClass } from '@/lib/store/action/homeActions';
import Header from '@/components/Header/Header';

export default function UpdateClass(): JSX.Element {
    // Component state
    const [modalOpen, setModalOpen] = React.useState<boolean>(false);
    const [classId, setClassId] = React.useState<number>(0);
    const [classname, setClassname] = React.useState<string>('');
    const [openSnackbar, setOpenSnackbar] = React.useState<boolean>(false);

    // Ref
    const classnameRef = React.useRef<HTMLInputElement>(null);

    // Component hook
    React.useEffect(() => {
        if (classnameRef.current) {
            classnameRef.current.focus();
        }
    }, [modalOpen]);

    // Redux state
    const promiseLoading: 'idle' | 'pending' | 'succeeded' | 'failed' = useSelector((state: RootState) => state.home.loading);
    const userClasses: Classes[] = useSelector((state: RootState) => state.home.data.classes);
    const promiseError: string | null = useSelector((state: RootState) => state.home.error);

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

    let validUserClasses: JSX.Element[];

    if (userClasses.length !== 0) {
        validUserClasses = userClasses.map((course: Classes) => {
            const id = course.id;
            return (
                <Tag
                    variant={'edit'}
                    text={course.classname}
                    buttonText={'Edit Class'}
                    key={course.id}
                    onClick={handleEditClassname.bind(this, id)}
                />
            );
        });
    } else {
        // TODO: else should have throw error or show error page!
        validUserClasses = [];
    }

    // Handlers
    function handleEditClassname(id: number): void {
        const selectedClass = userClasses.filter(course => {
            if (course.id === id) {
                return course;
            } else {
                return null;
            }
        });
        setClassId(id);
        setClassname(selectedClass[0].classname);
        setModalOpen(true);
    }

    function handleChangeInput(e: React.ChangeEvent<HTMLInputElement>): void {
        setClassname(e.target.value);
    }

    function handleCancelClick(): void {
        setModalOpen(false);
        setClassname('');
        setClassId(0);
    }

    function handleProceedClick(): void {
        if (classname.trim().length > 0) {
            const updatedClass = { id: classId, classname };
            setModalOpen(false);
            dispatch(fetchUpdateClass(updatedClass));
            setClassname('');
            setClassId(0);
        } else {
            setClassname('');
            setClassId(0);
            setModalOpen(false);
            setOpenSnackbar(true);
        }
    }

    // Button in header of body, to return to home page.
    const homeButton = <section className={'mx-7'}>
        <LinkButton variant={'contained'} text={'Go to Home'} link={'/dashboard'} />
    </section>;

    // Elements of modal
    const modalChildren = (
        <Input
            label={'Class Name *'}
            maxLength={255}
            name={'classname'}
            error={classname.trim().length > 0}
            errorText={'Class Name is required!'}
            value={classname}
            required={true}
            type={'text'}
            ref={classnameRef}
            onChange={(e): void => handleChangeInput(e)}
        />
    );

    // Modal with different types for different situations.
    const modal = classname.trim().length > 0 ?
        <Modal
            label={'Edit Class'}
            type={'edit'}
            onCancelClick={handleCancelClick}
            onProceedClick={handleProceedClick}
        >
            {modalChildren}
        </Modal> :
        <Modal
            label={'Edit Class'}
            type={'edit-disabled'}
            onCancelClick={handleCancelClick}
        >
            {modalChildren}
        </Modal>;

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
                                text={'Class edited successfully!'}
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
            <Header title={'Update Class'} />
            <BodyHeader>
                {homeButton}
            </BodyHeader>
            <BodyMain>
                {bodyContent}
            </BodyMain>
        </>
    );
};