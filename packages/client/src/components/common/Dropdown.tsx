import  { useState } from 'react';

type DropdownProps = {
    items: {name: string, id: string}[];
    text: string;
    callbackFn?: (id: string) => void,
    addNewOnClick?:()=>void,
    addNewButtonText?: string
    delFn: (farmId:string)=>void
};

function Dropdown({ items, text,addNewOnClick, callbackFn, addNewButtonText, delFn }: DropdownProps ) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => setIsOpen(!isOpen);
  const clickedButton = ()=>{
    if(addNewOnClick){
    addNewOnClick()
  }
    setIsOpen(false)
  }
  return (
    <div className="relative">
      <button
        onClick={toggleDropdown}
        className="bg-three text-one px-4 py-2 rounded-lg hover:bg-opacity-80 transition-colors duration-300"
      >
        {text}
      </button>

      {isOpen && (
        <div className="absolute left-0 mt-2 w-48 bg-white shadow-lg rounded-lg">
          <ul className="divide-y divide-gray-200">
            {items.map((item) => (
              <li key={item.id} className="hover:bg-gray-100 flex">
                <button 
                  onClick={() => {
                    callbackFn?.(item.id);
                    setIsOpen(false);
                  }}
                  className="block w-full p-2 text-left"
                >
                  {item.name}

                </button>
                <button onClick={()=>delFn(item.id)} className='bg-five hover:bg-opacity-80'>Del</button>
              </li>
            ))}
          </ul>
          { !!addNewButtonText && <button onClick={clickedButton} className={` bg-three hover:bg-opacity-80 w-full text-left`}>{addNewButtonText}</button>}
        </div>
      )}
    </div>
  );
}

export default Dropdown;

