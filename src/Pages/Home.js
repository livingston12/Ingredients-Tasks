import React, { useState } from 'react';
import ShoppingList from '../Components/ShoppingList';
import Button from '../Components/Form/Button';
import Modal from '../Components/Modal';
import Input from '../Components/Form/Input';


export default function Home() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [groupValue, setGroupValue] = useState('');
    const [shoppingLists, setShoppingLists] = useState([]);

    // Función para abrir/cerrar el modal
    const toggleModal = () => {
        setIsModalOpen(!isModalOpen);
    };

    const OnClickGroupIngredient = () => {
        if (groupValue.trim()) {
            setShoppingLists([...shoppingLists, groupValue.trim()]);
            setGroupValue("");
            toggleModal();
        }

    };

    const onCloseShopping = (index) => {
        const newShoppingLists = shoppingLists.filter((_, i) => i !== index);
        setShoppingLists(newShoppingLists);
    };

    return (
        <div className='mt-20'>
            <Button
                Text="Add new group"
                ColorClass="bg-green"
                HoverColorClass="hover:bg-green-dark"
                onClick={toggleModal}
            />
            <div className="flex space-y-6 space-x-2 flex-wrap">
                {
                    shoppingLists.map((title, index) => (
                        <ShoppingList onClose={onCloseShopping} Id={index} key={index} Title={title} />
                    ))
                }
            </div>


            {isModalOpen && (
                <Modal onClose={toggleModal} Title="Add group of ingredients">
                    <Input
                        placeholder="Group Title"
                        onChange={(e) => setGroupValue(e.target.value)}
                        otherClass="bg-gray-dark text-white w-full flex-grow  p-2 border border-gray-light rounded-lg mr-2"
                    />
                    <div className="flex justify-between">
                        <Button
                            Text="Cancel"
                            ColorClass="bg-red "
                            HoverColorClass="hover:bg-red-dark"
                            onClick={toggleModal}
                            otherClass="mt-4"
                        />
                        <Button
                            Text="Add"
                            ColorClass="bg-green "
                            HoverColorClass="hover:bg-green-dark"
                            onClick={OnClickGroupIngredient}
                            otherClass="mt-4"
                        />
                    </div>

                </Modal>
            )}
        </div>
    );
}