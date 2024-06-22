import React from "react";
import classNames from 'classnames';

export default function Input({ type = "text", onChange, otherClass, ...props }) {
    const buttonClass = classNames(
        'flex-grow',
        'text-gray',
        'font-bold',        
        'border',
        'border-gray-dark',
        'bg-transparent',
        'rounded-lg',
        otherClass
      );
    
    return (
        <input
            type={type}
            {...props}
            onChange={onChange}
            className={buttonClass}
        />
    );
}