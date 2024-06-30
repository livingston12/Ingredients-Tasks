import Button from "./Form/Button";
import Icons from "./Icons";

const Drawer = ({ isOpenAddList, children, setIsOpenAddList, size = 'w-full md:w-[29%]', title='' }) => {
    return (
        <div className={`fixed left-0 top-0 ${isOpenAddList ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out ${size} h-[100dvh] bg-gray-100 overflow-y-auto`}>
            
            <div className="flex w-full p-2 m-4">
                <h1 className="text-3xl font-bold">{title}</h1>
                <Button
                    className="absolute top-3 right-3"
                    onClick={() => setIsOpenAddList(prev => !prev)}
                >
                    <Icons icon={'x'}  className="w-8"/>
                </Button>
            </div>

            {children}
        </div>
    );
};

export default Drawer;