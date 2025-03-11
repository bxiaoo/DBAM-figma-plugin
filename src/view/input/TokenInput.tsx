import * as React from "react";
import './input.style.css';

interface TokenInputProps {
    onSaveToken: (token: string) => void;
    validating: boolean;
    foundToken: boolean;
    backToMain: () => void;
}

export function TokenInput ({ onSaveToken, validating, foundToken, backToMain }: TokenInputProps) {
    const [token, setToken] = React.useState<string>('');

    const handleSave = () => {
        onSaveToken(token);
    }

    return (
        <div className='input'>
        <label>
            Personal token
            <input type='text'
                   value={token}
                   onChange={(e) => setToken(e.target.value)}
                   placeholder="Paste your personal token here" />
        </label>
            <div className='token-btn-container'>
                <button
                className="button"
                onClick={handleSave}>
                    {foundToken ? "Update Token" : "Validate Token"}
                </button>
                { foundToken && <button className='cancel-btn' onClick={backToMain}>Cancel</button>}
                {validating && <span>Validating...</span> }
            </div>
        </div>
    )
}