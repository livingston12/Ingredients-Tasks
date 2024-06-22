import React from 'react';
import classNames from 'classnames';

export default function Button({ Text, ColorClass, HoverColorClass, onClick, otherClass }) {
    const buttonClass = classNames(
        'transition',
        'ease-in-out',
        'delay-150',
        'hover:-translate-y-1',
        'hover:scale-110',
        'duration-300',
        ColorClass,
        HoverColorClass,
        'text-white',
        'font-bold',
        'py-2',
        'px-4',
        'rounded',
        'focus:outline-none',
        otherClass
        
    );
    return (
        <button
            className={buttonClass} onClick={onClick}>
            {Text}
        </button>
    );
}