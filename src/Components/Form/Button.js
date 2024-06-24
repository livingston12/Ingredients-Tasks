import React from 'react';
import classNames from 'classnames';

export default function Button({ onClick, children, ...prop }) {
    const buttonClass = classNames(
        'transition',
        'ease-in-out',
        'delay-150',
        'hover:-translate-y-1',
        'hover:scale-110',
        'duration-300',
        prop.className
    );
    return (
        <button
            className={buttonClass} onClick={onClick}
        >
            {children}
        </button>
    );
}