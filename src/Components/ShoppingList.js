import React, { useState } from 'react';
import '../output.css';
import Input from './Form/Input';
import Button from './Form/Button';
import IconClose from './IconClose';
import { TrashIcon,PencilIcon } from '@heroicons/react/solid';
import Modal from './Modal';

const ShoppingList = ({ onClose, ...prop }) => {
    const { Title, Id } = prop;
    const [ingredients, setIngredients] = useState([]);
    const [ingredientValue, setIngredientValue] = useState("");
    const [inputValue, setInputValue] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [indexValue, setIndexValue] = useState(0);
    

    const addIngredient = () => {
        if (inputValue.trim()) {
            setIngredients([...ingredients, inputValue.trim()]);
            setInputValue("");
        }
    };

    const removeIngredient = (index) => {
        const newIngredients = ingredients.filter((_, i) => i !== index);
        setIngredients(newIngredients);
    };
    const toggleModal = (index) => {
        ingredients.map((ingredient, i) => {
            if (i == index) {
                setIngredientValue(ingredient);
            }
        });
        setIndexValue(index);
        setIsModalOpen(!isModalOpen);
    };

    const editIngredient = () => {
        const index = indexValue;
        const newIngredients = ingredients.map((ingredient, i) => {
            if (i == index) {
                return ingredientValue;
            }
            return ingredient;
        });
        setIngredients(newIngredients);
        setIsModalOpen(!isModalOpen);
    };

    return (

        <div className="relative border border-green-dark mt-5  p-6 bg-[var(--gray-dark)] rounded-lg shadow-lg">
            <div className="flex justify-end items-center">
                <IconClose onClose={() => onClose(Id)} />
            </div>

            <h1 className="text-3xl font-bold mb-6 text-white text-center">
                {Title}
            </h1>

            <div className="flex flex-wrap mb-4">
                <Input
                    placeholder="Add ingredient"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    otherClass="bg-[var(--gray-dark)] text-white flex-grow  p-2 border border-green-dark rounded-lg mr-2"
                />
                <Button
                    ColorClass="bg-[var(--green)]"
                    Text="Add"
                    onClick={addIngredient}
                    otherClass="ml-2"
                    HoverColorClass="hover:bg-[var(--green-dark)]"
                />
            </div>
            <ul className="list-disc list-inside mb-9">
                {ingredients.map((ingredient, index) => (
                    <li key={index}
                        className="transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300 flex justify-between items-center p-2 hover:bg-[var(--gray) rounded mb-2">
                        <span className='text-white'>{ingredient}</span>
                        
                        <div className='flex flex-end space-x-4 transition-none'>
                            <PencilIcon
                                className="cursor-pointer transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300 text-orange hover:text-orange-dark h-6 w-6 text-gray-light"
                                onClick={() => toggleModal(index)}
                            />
                            <TrashIcon
                                className="cursor-pointer transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300 text-red hover:text-red-dark h-6 w-6 text-gray-light"
                                onClick={() => removeIngredient(index)}
                            />
                        </div>
                    </li>
                ))}

            </ul>
            <div className="absolute bottom-0 left-6 right-7 mb-3">
                <Button
                    ColorClass="bg-[var(--orange)]"
                    Text="Suggest dishes"
                    onClick={onClose}
                    HoverColorClass="hover:bg-[var(--orange-dark)]"
                    otherClass="w-full px-6"
                />


            </div>
            {isModalOpen && (
                <Modal onClose={() => toggleModal(-1)} Title="Edit ingredient">
                    <Input
                        placeholder="Name of ingredient"
                        value={ingredientValue}
                        onChange={(e) => setIngredientValue(e.target.value)}
                        otherClass="bg-[var(--gray-dark)] text-white w-full flex-grow  p-2 border border-gray-light rounded-lg mr-2"
                    />
                    <div className="flex justify-between">
                        <Button
                            Text="Cancel"
                            ColorClass="bg-red "
                            HoverColorClass="hover:bg-[var(--red-dark)]"
                            onClick={() => toggleModal(-1)}
                            otherClass="mt-4"
                        />
                        <Button
                            Text="Add"
                            ColorClass="bg-green "
                            HoverColorClass="hover:bg-green-dark"
                            onClick={() => editIngredient()}
                            otherClass="mt-4"
                        />
                    </div>

                </Modal>
            )}
        </div>
    );
};

export default ShoppingList;