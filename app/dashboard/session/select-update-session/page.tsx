'use client'

import React from 'react';
import { useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';

import LinkButton from '@/components/UI/LinkButton/LinkButton';
import Tag from '@/components/UI/Tag/Tag';
import BodyHeader from '@/components/Body/Header/Header';
import BodyMain from '@/components/Body/Main/Main';
import { Classes, Sessions } from '@/types/redux';
import { RootState } from '@/lib/store';
import Header from '../../../../components/Header/Header';

export default function SelectEditSession(): JSX.Element {
    // Redux state
    const selectedClass: Classes = useSelector((state: RootState) => state.class.data.class);
    const sessions: Sessions[] = useSelector((state: RootState) => state.class.data.sessions);

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

    // Handler
    function handleSelect(id: number): void {
        localStorage.setItem('selectedSession', `${id}`);
        router.push('/dashboard/session/update-session');
    }

    // Title of body's header
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
                variant={'edit'}
                text={text}
                buttonText={'Edit Session'}
                key={id}
                onClick={handleSelect.bind(this, id)}
            />
        );
    });

    return (
        <>
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