import * as React from "react";

export function GDriveTab() {
    return (
        <div>
            <h3>Google Drive</h3>
            <p>Fetch files or icons from Google Drive.</p>
            <button
                className="fetch-btn"
                onClick={() => {
                    parent.postMessage({ pluginMessage: { type: "fetch-gdrive-assets" } }, "*");
                }}
            >
                Fetch GDrive Assets
            </button>
        </div>
    );
}