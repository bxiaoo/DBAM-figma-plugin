import * as React from 'react';
import {TokenInput} from "../../input/TokenInput";

interface SettingsProps {
    handleToken: (token: string) => void;
    validating: boolean;
    hasToken: boolean;
    handleCancel: () => void;
}

export function Settings({handleToken, validating, hasToken, handleCancel}: SettingsProps) {
    return (
        <div id='setting'>
            <div className='headline'>
                <h1>Authentication</h1>
                <p>This token is requested to fetch assets from your account.</p>
            </div>
            <TokenInput onSaveToken={handleToken} validating={validating} foundToken={hasToken} backToMain={handleCancel} />
        </div>
    )
}