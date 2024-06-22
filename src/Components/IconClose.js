import React from "react";

export default function IconClose({onClose}) {
    return (
        <button
            className="
        transition
        ease-in-out
        delay-150
        hover:-translate-y-1
        hover:scale-110
        duration-300 text-white hover:text-gray focus:outline-none"
            onClick={onClose}
        >
            <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg">
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                />
            </svg>
        </button>

    );
}