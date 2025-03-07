import * as React from 'react';
import { createRoot } from "react-dom/client";

// import { IAsset } from "./model/assetItem";


import {AprimoTab} from "./view/tabs/AprimoTab";
import {GDriveTab} from "./view/tabs/GDriveTab";
import {FigmaTab} from "./view/tabs/FigmaTab";

import { Notification } from "./view/notification/Notification";

import "./ui.css";
import {libraryFiles} from "./model/libraries";
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

    onmessage = (event) => {
        const msg = event.data.pluginMessage;
        switch (msg.type) {
            // case "init-libraries":
            //     console.log("init-libraries");
            //     setLibList(msg.libraries);
            //     setSelectedLib(msg.libraries[0].libraries[0]);
            //     break;
            case "aprimo-assets":
                // displayAssets("aprimoList", msg.payload);
                break;
            case "gdrive-assets":
                // displayAssets("gdriveList", msg.payload);
                break;
            // case "icon-list-fetched":
            //     setAssetList(msg.payload);
            //     break;

            case "icon-inserted":
                setNotification("Icon inserted successfully");
                setTimeout(() => setNotification(''), 2000);
                break;
            case "show-notification":
                setNotification(msg.message);
                break;
            case "hide-notification":
                setTimeout(() => {
                    setNotification('');
                }, 2000);
                break;
            case "error":
                alert(`Error fetching from ${msg.resource}: ${msg.message}`);
                break;
            default:
                break;
        }
    };

    const handleInsertMsg = (msg: string) => {
        setNotification(msg);
    }

    return (
        <div id="plugin-window">
            <nav>
                <div className='tab-nav'>
                <button
                    className={activeTab === "aprimo" ? "active" : ""}
                    onClick={() => {
                        setActiveTab("aprimo");
                        parent.postMessage({pluginMessage: {type: "fetch-aprimo-assets"}}, "*");
                    }}
                >
                    <img src={require('./assets/aprimo_logo.svg')} />
                </button>
                <button
                    className={activeTab === "gdrive" ? "active" : ""}
                    onClick={() => {
                        setActiveTab("gdrive");
                        parent.postMessage({pluginMessage: {type: "fetch-gdrive-assets"}}, "*");
                    }}
                >
                    <img src={require('./assets/google_logo.svg')} />
                </button>
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
                {activeTab === "figma" && <FigmaTab defaultLib={libraryFiles[0].libraries[0]} msgCallback={handleInsertMsg} />}
            </div>

            {notification && <Notification message={notification} />}

        </div>
    )
}

// window.onmessage = (e) => {
//     const msg = e.data.pluginMessage;
//     if (msg.type === "fetch-aprimo-assets") {
//         console.log("fetch-aprimo-assets");
//     }
// }

createRoot(document.getElementById("root")!).render(<App />);

//
// btnToken.onclick = () => {
//     const tokenValue = document.getElementById('apiToken') as HTMLInputElement;
//
//     if (tokenValue) {
//         parent.postMessage({
//             pluginMessage: {
//                 type: "save-token",
//                 token: tokenValue.value.trim()
//             }
//         }, "*");
//     } else {
//         showNotification("Please enter a valid token", "error");
//         setTimeout(hideNotification, 2000);
//     }
// }
//
//

//
// btnInsert.onclick = () => {
//     const sizeIndex = parseInt(variantIndex.value.trim());
//     parent.postMessage({
//         pluginMessage: {
//             type: "insert",
//             key: selectedAssetKey.innerText,
//             name: selectedAssetName.innerText,
//             size: findLib({fileId: librarySelector.value.trim()}).sizeVariant[sizeIndex],
//         }
//     }, "*");
// };
//
// inputSearch.oninput = () => performSearch(assetList);
//
// const tabButtons: ButtonMap = {
//     aprimo: tabAprimo,
//     gdrive: tabGDrive,
//     figma: tabFigma,
// };
//

//
// tabButtons.aprimo.onclick = () => showTab(tabButtons, tabContents, "aprimo");
// tabButtons.gdrive.onclick = () => showTab(tabButtons, tabContents, "gdrive");
// tabButtons.figma.onclick = () => showTab(tabButtons, tabContents, "figma");
//
//
