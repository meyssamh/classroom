import React from 'react';

/**
 * Functional component of an overlay.
 *
 * @param {JSX.Element} children - Elements to render on top of the overlay.
 * @returns {JSX.Element} An overlay to prevent incorrect user input.
 */
const Overlay = ({ children }: { children: JSX.Element }): JSX.Element => {
  return (
    <section
      role="overlay"
      className="fixed inset-0 w-screen h-screen bg-[#23232345] z-50 flex items-center justify-center"
    >
      {/* Child elements */}
      {children}
    </section>
  );
};

export default Overlay;