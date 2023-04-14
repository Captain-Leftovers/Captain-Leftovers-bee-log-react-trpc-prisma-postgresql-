import  { useState } from 'react';

type DropdownProps = {
    items: string[];
    text: string;
    callbackFn?: (item: string) => void,
    addNewOnClick?:()=>void,
    addNewButtonText?: string
};

function Dropdown({ items, text,addNewOnClick, callbackFn, addNewButtonText }: DropdownProps ) {
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
        className="bg-one text-white px-4 py-2 rounded-lg hover:bg-two transition-colors duration-300"
      >
        {text}
      </button>

      {isOpen && (
        <div className="absolute left-0 mt-2 w-48 bg-white shadow-lg rounded-lg">
          <ul className="divide-y divide-gray-200">
            {items.map((item, index) => (
              <li key={index} className="hover:bg-gray-100 ">
                <button 
                  onClick={() => {
                    callbackFn?.(item);
                    setIsOpen(false);
                  }}
                  className="block w-full p-2 text-left"
                >
                  {item}

                </button>
              </li>
            ))}
          </ul>
          { !!addNewButtonText && <button onClick={clickedButton} className={` bg-lime-400 hover:bg-lime-500 w-full text-left`}>{addNewButtonText}</button>}
        </div>
      )}
    </div>
  );
}

export default Dropdown;

