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
        <div>
        <label>
            Input
            <input type='text'
                   value={token}
                   onChange={(e) => setToken(e.target.value)}
                   placeholder="Search..." />
        </label>
            <button
                onClick={handleSave}
            >Save Token</button>
        </div>
    )
}