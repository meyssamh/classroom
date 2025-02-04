import React from 'react';

const BodyMain = ({children}): JSX.Element => {

    return (
        <section className={'mt-[30px] w-full h-screen bg-white'} role={'children'}>
            {children}
        </section>
    );
};

export default BodyMain;