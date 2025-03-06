import * as React from 'react';

interface NotificationProps {
    message: string;
}

export function Notification ({ message }: NotificationProps) {
    return (
        <div id='notification-bar'>{message}</div>
    )
}