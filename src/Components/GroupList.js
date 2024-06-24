import React from "react";
import Icons from "./Icons";
import Button from "./Form/Button";

export default function GroupList({ shoppingLists, setIsOpenAddList, setId, handlenRemoveGroup }) {

    return (
        <main className="flex flex-col w-[40%] h-full bg-[var(--gray-dark)] overflow-y-auto ">
            <div className="flex h-12 w-full justify-between items-center p-5">
                <h1 className="text-center font-bold text-xl text-white">My Lists</h1>
                <div className="flex">
                    <Button
                        className="px-2"
                        onClick={() => setIsOpenAddList(prev => !prev)}
                    >
                        <Icons icon="plus" className="w-6 text-green-600 fill-current " />
                    </Button>

                    <Button className="px-2 text-white">
                        <Icons
                            icon="elipsis-vertical"
                            className="w-1 text-white fill-current"
                        />
                    </Button>
                </div>
            </div>
            <div className="flex p-2 w-full">
                <div className="flex w-full bg-gray-200 overflow-hidden rounded-lg">
                    <Icons icon="search" className="w-5 ml-3" />
                    <input type="search" className="bg-[var(--gray-light)] w-full border-0 p-1 outline-none" />
                </div>
            </div>
            <div className="flex flex-col gap-1">
                {shoppingLists.length <= 0 ?
                    <div className="flex justify-center text-white">Empty elements</div>
                    :
                    shoppingLists.map(item => {
                        return (
                            <article 
                                key={item.id}
                                className={`flex ${item.isClicked ? 'bg-green-700' : 'bg-gray-300'}  ${item.isClicked ? 'hover:bg-green-800' : 'hover:bg-gray-400'} justify-between p-5 hover:bg-gray-400`} 
                                onClick={() => { setId(item.id) }}
                            >
                                <h2 className="font-semibold">{item.nombre}</h2>
                                <Button onClick={(e) => {
                                    e.stopPropagation(); 
                                    handlenRemoveGroup(item.id);
                                }}>
                                    <span className="hover:text-red-700" ><Icons icon="x" className="w-5"></Icons></span>
                                </Button>

                            </article>)
                    })
                }
            </div>
        </main>
    )
}