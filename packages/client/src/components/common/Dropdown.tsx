import  { useEffect, useState } from 'react';

type DropdownProps = {
    items: {name: string, id: string}[];
    text: string;
    callbackFn?: (id: string) => void,
    addNewOnClick?:()=>void,
    openDropdown: boolean,
    addNewButtonText?: string
    delFn: (farmId:string)=>void
};

function Dropdown({ items, text,addNewOnClick, callbackFn,openDropdown, addNewButtonText, delFn }: DropdownProps ) {
  const [isOpen, setIsOpen] = useState(false);
  useEffect(() => {
    
    setIsOpen(openDropdown);
  }, [openDropdown]);

  const toggleDropdown = () => setIsOpen(!isOpen);
  const clickedButton = ()=>{
    if(addNewOnClick){
    addNewOnClick()
  }
    setIsOpen(false)
  }
  return (
    <div className="relative z-10 flex flex-col  items-center  ">
      
      <button
        onClick={toggleDropdown}
        className="  min-w-fit bg-six text-three  px-4 py-2 rounded-lg hover:bg-opacity-80 transition-colors duration-300"
        >
        {text}
      </button>

      {isOpen && (
        <div className="  mt-2 w-64 shadow-lg bg-gradient-to-b from-three to-two">
          <ul className="divide-y divide-gray-200 flex flex-col ">
            {items.map((item) => (
              <li key={item.id} className="flex">
                <button 
                  onClick={() => {
                    callbackFn?.(item.id);
                    setIsOpen(false);
                  }}
                  className=" block w-full p-2 text-left hover:bg-six hover:bg-opacity-10 "
                >
                  {item.name}

                </button>
                <button onClick={()=>delFn(item.id)} className='bg-five hover:bg-opacity-80 hover:scale-110 '>Del</button>
              </li>
            ))}
          </ul>
          { !!addNewButtonText && <button onClick={clickedButton} className={` bg-four hover:bg-opacity-80 w-full p-2`}>{addNewButtonText}</button>}
        </div>
      )}
    </div>
  );
}

export default Dropdown;

