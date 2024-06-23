import { useState } from "react";
import Icons from "../Components/Icons";

export default function HomeNew() {
    const [shoppingLists, setShoppingLists] = useState([]);
    const [id, setId] = useState(0);
    const [isOpenAddList, setIsOpenAddList] = useState(false);

    const handlenSubmit=(event)=>{
            event.preventDefault();        
            const form = new FormData(event.target)
            const obj={
                id:window.crypto.randomUUID(),
                nombre:form.get("grupo"),
                ingredients:[]
            }
            setShoppingLists(prev=>[...prev,obj])
            setIsOpenAddList(prev => !prev)
    }
    const handlenSubmitIngredient = (event) => {
        event.preventDefault();
        const form = new FormData(event.target);
        const obj = {
            id: window.crypto.randomUUID(),
            ingredient: form.get("ingredient"),
        };

        setShoppingLists(prev => prev.map(list => 
            list.id == id 
            ? { ...list, ingredients: [...list.ingredients, obj] } 
            : list
        ));
    };



    return (
        <div className="flex">
      <main className="flex flex-col w-[40%] h-full bg-gray-50 overflow-y-auto">
        <div className="flex h-12 w-full justify-between items-center p-5">
          <h1 className="text-center font-bold text-xl">Mis lista</h1>
          <div className="flex">
            <button className="px-2" onClick={() => setIsOpenAddList(prev => !prev)}><Icons icon="plus" className="w-6" /></button>
            <button className="px-2"><Icons icon="elipsis-vertical" className="w-1" /></button>
          </div>
        </div>
        <div className="flex p-2 w-full">
          <div className="flex w-full bg-gray-200 overflow-hidden rounded-lg">
            <Icons icon="search" className="w-5 ml-3" />
            <input type="search" className="bg-gray-200 w-full border-0 p-1 outline-none" />
          </div>
        </div>
        <div className="flex flex-col gap-3">
            {shoppingLists.length<=0?
            <div className="flex justify-center">No hay elemento en tu lista</div>
            :
            shoppingLists.map(item=>{
               return(<article key={item.id} className="p-5 hover:bg-gray-300" onClick={()=>{setId(item.id)}}>
                     <h2 className="font-semibold">{item.nombre}</h2>
               </article>)

            })
            }
        </div>
      </main>

      <div className={`fixed left-0 top-0 ${isOpenAddList ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out w-[29%] h-[100dvh] bg-gray-50 overflow-y-auto`}>
        <button className="bg-gray-400 rounded-full p-2 m-4" onClick={() => setIsOpenAddList(prev => !prev)}><Icons icon={'left'} /></button>
        <form className="p-4" onSubmit={handlenSubmit}>
          <fieldset className="rounded-md">
            <legend className="text-xl font-semibold">Agregar Lista</legend>
            <input name="grupo" className="w-full p-2 border border-gray-300 rounded-md mt-2" />
            <button className="w-full mt-2 p-2 bg-blue-500 text-white rounded-md">Add</button>
          </fieldset>
        </form>
      </div>
        

            <aside className="flex flex-col w-full h-[100dvh] bg-orange-100 ">
              <div className="w-full h-12 bg-gray-100 pl-10 pt-2 font-bold">
                {shoppingLists.find(c=>c.id==id)!=undefined?shoppingLists.find(c=>c.id==id).nombre:''}
              </div>  
              <div className="flex flex-col gap-2 h-[84dvh] overflow-y-auto ">
                 {shoppingLists.find(c=>c.id==id)==undefined?'':
                  shoppingLists.find(c=>c.id==id).ingredients.length <=0?
            <div className="flex justify-center">No hay ingredientes</div>
            :shoppingLists.find(c=>c.id==id).ingredients.map(item=>{
                return(<article key={item.id} className="flex bg-green-200 p-3 justify-between ">
                <h2 className="font-semibold">{item.ingredient}</h2>
                <span className="hover:text-red-700" onClick={()=>alert(item.id)}><Icons icon="x" className="w-5"></Icons></span>
          </article>)
            })}
             
             </div>
             <div className="w-full bg-gray-200 flex items-center">
              <button className="bg-blue-600 ml-3 p-2 h-10 rounded-lg text-white">Recetas</button>
              <form className="p-5 w-full" onSubmit={handlenSubmitIngredient}>
                <div className="flex w-full bg-white overflow-hidden rounded-lg">
                  <textarea name="ingredient" className=" w-full border-0 p-2 outline-none  resize-none" placeholder="Agregar Ingrediente " />
                  <button className="p-5"><Icons icon="send" className="w-5"></Icons></button>
                </div>
               </form>  

             </div>
            </aside> 

        </div>
    );
}