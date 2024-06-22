import React from 'react';
import IconClose from './IconClose';

const Modal = ({ onClose, children, Title }) => {
  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-gray bg-opacity-50 z-50">
      
      <div className=" bg-gray-dark rounded-lg p-8 max-w-md w-full">
        <div className="flex w-full justify-between items-center mb-4">
          {/* Title Modal */}
          <h2 className="text-2xl font-bold text-gray-light ">{Title}</h2>
          <IconClose onClose={onClose} />
        </div>
        {/* HTML Modal */}
        {children}
      </div>
    </div>
  );
};

export default Modal;