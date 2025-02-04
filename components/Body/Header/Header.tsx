import React from 'react';

const BodyHeader = ({children}): JSX.Element => {
    return (
        <section className={'flex items-center justify-between mt-[30px]'}>
            <section className={'flex items-center gap-[30px]'}>
                {children}
            </section>
        </section>
    );
};

export default BodyHeader;