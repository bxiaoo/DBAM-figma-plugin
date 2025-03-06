import * as React from "react";
import {IBrandLibraries, ILibrary} from "../../model/figmaAsset";

interface LibDropdownProps {
    handleLibChange: (fileId: string) => void;
    options: IBrandLibraries[];
}

export const LibDropdown = ({handleLibChange, options}:LibDropdownProps) => {
    const LibSelector = React.useRef<HTMLSelectElement>(null);

    React.useEffect(() => {
        if (LibSelector.current) {
            LibSelector.current.addEventListener("change", (e) => {
                const fileId = (e.target as HTMLSelectElement).value;
                handleLibChange(fileId);
            });
        }
    }, [LibSelector.current]);

    return (<div>
        <select ref={LibSelector}>
            {options.map((option) => {
                return <optgroup key={option.brand} label={option.brand}>
                    {option.libraries.map((lib) => {
                        return <option key={lib.fileId} value={lib.fileId}>{lib.name}</option>
                    })}
                </optgroup>
            })}
        </select>
    </div>)
}