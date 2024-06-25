
import { useState } from "react";
import IngredientList from "../Components/IngredientList";
import Drawer from "../Components/Drawer";
import GroupList from "../Components/GroupList";
import { useMLCEngine } from "../Components/IALocal/UseIALocal";


export default function HomeNew() {
    const [shoppingLists, setShoppingLists] = useState([]);
    const [id, setId] = useState(0);
    const [isOpenAddList, setIsOpenAddList] = useState(false);
    const [groupIngredient, setGroupIngredient] = useState('');
    const { engine, error } = useMLCEngine('gemma-2b-it-q4f32_1-MLC', (e) => { console.log(e) });

    const handlenSubmit = (event) => {
        event.preventDefault();
        const form = new FormData(event.target)
        const obj = {
            id: window.crypto.randomUUID(),
            nombre: form.get("grupo"),
            ingredients: [],
            isClicked: false
        }
        setShoppingLists(prev => [...prev, obj]);
        setIsOpenAddList(prev => !prev);
        setGroupIngredient('');
    }
    const handlenSubmitIngredient = (event) => {
        event.preventDefault();
        const form = new FormData(event.target);
        const obj = {
            id: window.crypto.randomUUID(),
            ingredient: form.get("ingredient"),
        };

        setShoppingLists(prev => prev.map(list =>
            list.id === id
                ? { ...list, ingredients: [...list.ingredients, obj] }
                : list
        ));
    };

    const handlenRemoveIngredient = (id) => {
        const newIngredients = shoppingLists.map(list => {
            const updatedIngredients = list.ingredients.filter(ingredient => ingredient.id !== id);
            return { ...list, ingredients: updatedIngredients };
        });

        setShoppingLists(newIngredients);
    };

    const handlenRemoveGroup = (id) => {
        const newGroups = shoppingLists.filter(group => group.id !== id);
        setShoppingLists(newGroups);
    }

    const setCurrentId = (id) => {
        const newGroups = shoppingLists.map(list => {

            list.id === id ? list.isClicked = true : list.isClicked = false;
            return list;
        });

        setId(id);
    }

    return (
        <div className="flex flex-col bg-white md:flex-row">
            <GroupList
                shoppingLists={shoppingLists}
                setIsOpenAddList={setIsOpenAddList}
                setId={setCurrentId}
                handlenRemoveGroup={handlenRemoveGroup}
            />

            <IngredientList
                shoppingLists={shoppingLists}
                id={id}
                handlenSubmitIngredient={handlenSubmitIngredient}
                handlenRemoveIngredient={handlenRemoveIngredient}
                engine={engine}
            />

            <Drawer isOpenAddList={isOpenAddList} setIsOpenAddList={setIsOpenAddList}>
                <form className="p-4" onSubmit={handlenSubmit}>
                    <fieldset className="rounded-md">
                        <legend className="text-xl font-semibold">Add list</legend>
                        <input
                            value={groupIngredient}
                            onChange={e => setGroupIngredient(e.target.value)}
                            name="grupo"
                            className="w-full p-2 border border-[var(--gray-dark)] rounded-md mt-2"
                            placeholder="Group of ingredients" />
                        <button className="w-full mt-2 p-2 bg-blue-500 text-white rounded-md">
                            Add
                        </button>
                    </fieldset>
                </form>
            </Drawer>
        </div>
    );

};