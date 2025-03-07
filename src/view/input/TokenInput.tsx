import * as React from "react";

interface TokenInputProps {
    onSaveToken: (token: string) => void;
}

export function Input ({ onSaveToken }: TokenInputProps) {
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
            <div>
            <button
                className="button"
                onClick={handleSave}
            >
                Check token
            </button>
            </div>
        </div>
    )
}