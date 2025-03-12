import * as React from 'react';
import { createRoot } from "react-dom/client";

// import { IAsset } from "./model/assetItem";


import {AprimoTab} from "./view/tabs/AprimoTab";
import {GDriveTab} from "./view/tabs/GDriveTab";
import {FigmaTab} from "./view/tabs/figmaTabViews/FigmaTab";

import { Notification } from "./view/notification/Notification";

import "./ui.css";
// import {IBrandLibraries} from "./model/figmaAsset";
// import {libraryFiles} from "./model/libraries";
// import {IBrandLibraries, ILibrary} from "./model/figmaAsset";
// import {libraryFiles} from "./model/libraries";

declare function require(path: string): any;


type TabKey = "aprimo" | "gdrive" | "figma";

function App() {

    const [activeTab, setActiveTab] = React.useState<TabKey>("figma");
    const [notification, setNotification] = React.useState<string>('');

    React.useEffect(() => {
        if (notification) {
            setTimeout(() => setNotification(''), 2000);
        }
    }, [notification]);

    const handleInsertMsg = (msg: string) => {
        setNotification(msg);
    }

    return (
        <div id="plugin-window">
            <nav>
                <div className='tab-nav'>
                {/*<button*/}
                {/*    className={activeTab === "aprimo" ? "active" : ""}*/}
                {/*    onClick={() => {*/}
                {/*        setActiveTab("aprimo");*/}
                {/*        parent.postMessage({pluginMessage: {type: "fetch-aprimo-assets"}}, "*");*/}
                {/*    }}*/}
                {/*>*/}
                {/*    <img src={require('./assets/aprimo_logo.svg')} />*/}
                {/*</button>*/}
                {/*<button*/}
                {/*    className={activeTab === "gdrive" ? "active" : ""}*/}
                {/*    onClick={() => {*/}
                {/*        setActiveTab("gdrive");*/}
                {/*        parent.postMessage({pluginMessage: {type: "fetch-gdrive-assets"}}, "*");*/}
                {/*    }}*/}
                {/*>*/}
                {/*    <img src={require('./assets/google_logo.svg')} />*/}
                {/*</button>*/}
                <button
                    className={activeTab === "figma" ? "active" : ""}
                    onClick={() => {
                        setActiveTab("figma");
                        parent.postMessage({pluginMessage: {type: "fetch-figma-assets"}}, "*");
                    }}
                >
                    <img src={require('./assets/devicon_figma.svg')} />
                </button>
                </div>
            </nav>

            <div id='content-container'>
                {activeTab === "aprimo" && <AprimoTab />}
                {activeTab === "gdrive" && <GDriveTab />}
                {activeTab === "figma" && <FigmaTab msgCallback={handleInsertMsg} />}
            </div>

            {notification && <Notification message={notification} />}

        </div>
    )
}
createRoot(document.getElementById("root")!).render(<App />);