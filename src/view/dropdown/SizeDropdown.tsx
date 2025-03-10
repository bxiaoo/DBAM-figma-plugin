import * as React from "react";
import {ISize} from "../../model/figmaAsset";

interface SizeDropdownProps {
    sizes: ISize[] | null;
    handleSizeChange: (size: ISize) => void;
    selectedSize: ISize;
}

export function SizeDropdown({sizes, handleSizeChange, selectedSize}: SizeDropdownProps) {
    const [isOpen, setIsOpen] = React.useState(false);

    const selSize = sizes?.find((size) => size.name === selectedSize?.name);

    return (
        <div className='size-selector'>
            <button className='dropdown-btn' onClick={() => setIsOpen(!isOpen)}>
                {selSize ? selSize.name : ''}
            </button>

            {sizes && isOpen && (
                <div className='dropdown-menu'>
                    {sizes.map((size) => (
                        <div
                            key={size.name}
                            className='dropdown-item'
                            onClick={() => handleSizeChange(size)}
                        >
                            {size.name}
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}