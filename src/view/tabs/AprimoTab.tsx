import * as React from "react";

export function AprimoTab() {
    return (
        <div>
            <h3>Aprimo DAM</h3>
            <p>Fetch vector icons or other assets from Aprimo.</p>
            <button
                className="fetch-btn"
                onClick={() => {
                    parent.postMessage({ pluginMessage: { type: "fetch-aprimo-assets" } }, "*");
                }}
            >
                Fetch Aprimo Assets
            </button>
        </div>
    );
}