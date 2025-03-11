import * as React from "react";
import {IMenu} from "../../model/menu";

import './dropdown.style.css';

declare function require(path: string): any;

interface MenuDropdownProps {
    items: IMenu[];
    onSelect: (item: IMenu) => void;
}

export function MenuDropdown({items, onSelect}: MenuDropdownProps) {
    const [isOpen, setIsOpen] = React.useState(false);

    React.useEffect(() => {
        const closeDropdown = (e: MouseEvent) => {
            if (!(e.target as HTMLElement).closest('.menu-selector')) {
                setIsOpen(false);
            }
        };
        document.addEventListener('click', closeDropdown);
        return () => {
            document.removeEventListener('click', closeDropdown);
        }
    })

    return (
        <div className="menu-selector">
            <button className='dropdown-btn' onClick={() => setIsOpen(!isOpen)}>
                <img src={require('../../assets/menu.svg')} />
            </button>

            { isOpen && (<div className='dropdown-menu'>
                    {items.map((item) => {
                        return (
                            <div key={item.name} onClick={() => onSelect(item)} className='dropdown-item'>{item.name}</div>
                        )
                    })}
            </div>)}
        </div>
    )
}