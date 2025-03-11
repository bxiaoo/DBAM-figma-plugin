import * as React from "react";
import {IBrandLibraries, ILibrary} from "../../model/figmaAsset";

import './dropdown.style.css';

interface LibDropdownProps {
    handleLibChange: (lib: ILibrary) => void;
    options: IBrandLibraries[];
    selectedFileId: string;
}

export const LibDropdown = ({handleLibChange, options, selectedFileId}:LibDropdownProps) => {

    const [isOpen, setIsOpen] = React.useState(false);

    const selLib = options.flatMap((brand) =>
        brand.libraries.map((lib) =>
            ({...lib, brand: brand.brand})))
        .find((lib) =>
            lib.fileId === selectedFileId);

    React.useEffect(() => {
        const closeDropdown = (e: MouseEvent) => {
            if (!(e.target as HTMLElement).closest('.lib-selector')) {
                setIsOpen(false);
            }
        };
        document.addEventListener('click', closeDropdown);
        return () => {
            document.removeEventListener('click', closeDropdown);
        }
    })

    return (
        <div className='lib-selector'>
            <button className='dropdown-btn lib-btn' onClick={() => setIsOpen(!isOpen)}>
                {selLib ? `${selLib.brand} - ${selLib.name}` : 'Select Library'}
            </button>

            { isOpen && (
                <div className='dropdown-menu'>
                    {options.map((brand) => (
                        <div key={brand.brand} className='dropdown-group'>
                            <div className='dropdown-group-label'>{brand.brand}</div>
                            {brand.libraries.map((lib) => (
                            <div
                                key={lib.fileId}
                                className='dropdown-item'
                                onClick={() => handleLibChange(lib)}
                            >
                                {lib.name}
                            </div>
                            ))}
                        </div>
                    ))}
                </div>
            )}
        </div>)
}