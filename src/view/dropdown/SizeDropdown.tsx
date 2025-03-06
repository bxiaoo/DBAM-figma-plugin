import * as React from "react";
import {ISizeVariant} from "../../model/figmaAsset";

interface SizeDropdownProps {
    sizes: ISizeVariant[];
    handleSizeChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

export function SizeDropdown({sizes, handleSizeChange}: SizeDropdownProps) {
    return (
        <select id='asset-variant' onChange={handleSizeChange}>
            {sizes.map((size, index) => {
                return (
                    <option key={index} value={index}>{size.name}</option>
                );
            })}
        </select>
    )
}