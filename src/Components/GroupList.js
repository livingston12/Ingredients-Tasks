import React from "react";
import Icons from "./Icons";
import Button from "./Form/Button";

export default function GroupList({ shoppingLists, setIsOpenAddList, setId, handlenRemoveGroup }) {

    return (
        <main className="flex flex-col w-full md:w-1/3 md:h-full bg-white overflow-y-auto ">
            <div className="flex h-12 w-full justify-between items-center p-5 mt-3">
                <h1 className="text-center font-bold text-2xl text-[#265080]">My Lists</h1>
                <div className="flex">
                    <Button
                        className="px-2"
                        onClick={() => setIsOpenAddList(prev => !prev)}                    >
                        <Icons icon="plus" className="w-8 text-[#265080] fill-current " />
                    </Button>

                    <Button className="px-2 pt-2 text-white">
                        <Icons
                            icon="elipsis-vertical"
                            className="w-[6px] text-black fill-current"
                        />
                    </Button>
                </div>
            </div>
            <div className="flex p-2 w-full">
                <div className="flex w-full bg-gray-200 overflow-hidden rounded-lg">
                    <Icons icon="search" className="w-5 ml-3" />
                    <input type="search" className="bg-gray-200 w-full border-0 p-1 outline-none" placeholder="Search..." />
                </div>
            </div>
            <div className="flex flex-col gap-1  max-h-[140px] md:max-h-[89dvh] overflow-y-auto">
                {shoppingLists.length <= 0 ?
                    <div className="flex justify-center text-black">Empty elements</div>
                    :
                    shoppingLists.map(item => {
                        return (
                            <article 
                                key={item.id}
                                className={`flex ${item.isClicked ? 'bg-green-300' : 'bg-gray-200'}  ${item.isClicked ? 'hover:bg-green-200' : 'hover:bg-gray-300'} justify-between p-5 mx-2 rounded-lg hover:bg-gray-400`} 
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