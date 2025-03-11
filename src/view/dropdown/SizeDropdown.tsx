import * as React from "react";
import {ISize} from "../../model/figmaAsset";

import "./dropdown.style.css"
import {clsx} from "clsx";

interface SizeDropdownProps {
    sizes: ISize[] | null;
    handleSizeChange: (size: ISize) => void;
    selectedSize: ISize;
}

export function SizeDropdown({sizes, handleSizeChange, selectedSize}: SizeDropdownProps) {
    const [isOpen, setIsOpen] = React.useState(false);

    const selSize = sizes?.find((size) => size.name === selectedSize?.name);

    React.useEffect(() => {
        const closeDropdown = (e: MouseEvent) => {
            if (!(e.target as HTMLElement).closest('.size-selector')) {
                setIsOpen(false);
            }
        };
        document.addEventListener('click', closeDropdown);
        return () => {
            document.removeEventListener('click', closeDropdown);
        }
    })

    return (
        <div className='size-selector'>
            <button className={clsx('dropdown-btn', sizes?.length === 1 && 'disabled')} onClick={() => setIsOpen(!isOpen)} disabled={sizes?.length === 1}>
                {selSize ? selSize.name : ''}
            </button>

            {sizes && isOpen && (
                <div className='dropdown-menu'>
                    {sizes.map((size) => (
                        <div
                            key={size.name}
                            className='dropdown-item'
                            onClick={() => {
                                handleSizeChange(size)
                                setIsOpen(false)
                            }}
                        >
                            {size.name}
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}