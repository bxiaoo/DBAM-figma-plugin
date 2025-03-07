import * as React from "react";

interface TokenInputProps {
    onSaveToken: (token: string) => void;
    validating: boolean;
}

export function TokenInput ({ onSaveToken, validating }: TokenInputProps) {
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
                   placeholder="Token placeholder" />
        </label>
            <div className='token-btn-container'>
                <button
                className="button"
                onClick={handleSave}
            >
                Check token
                </button>
                {validating && <span>Validating...</span> }
            </div>
        </div>
    )
}