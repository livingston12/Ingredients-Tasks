import Button from "./Form/Button";
import Icons from "./Icons";

const Drawer = ({ isOpenAddList, children, setIsOpenAddList, size = 'w-[29%]', title='' }) => {
    return (
        <div className={`fixed left-0 top-0 ${isOpenAddList ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out ${size} h-[100dvh] bg-gray-200 overflow-y-auto`}>
            <div className="flex w-[50%] justify-between p-2 m-4">
                <Button
                    className="bg-gray rounded-full"
                    onClick={() => setIsOpenAddList(prev => !prev)}
                >
                    <Icons icon={'left'} />
                </Button>
                <p className="text-3xl font-bold">{title}</p>
            </div>

            {children}
        </div>
    );
};

export default Drawer;