/// <reference types="@figma/plugin-typings" />

import { libraryFiles } from "./model/libraries";
import { fetchFigmaAssets, fetchAprimoAssets, fetchGoogleDriveAssets } from "./controller/fetchAssets";
import { insertInstance } from "./controller/insertAsset";
import { findLib } from "./controller/uils";

figma.ui.onmessage = async (message) => {
    switch (message.type) {
        case "save-token": {
            const { token } = message;
            try {
                await fetchFigmaAssets(token, libraryFiles[0].libraries[0].fileId).then((iconList) => {
                    figma.clientStorage.setAsync("figmaApiToken", token);

                    figma.ui.postMessage({ type: "show-notification", message: 'token saved!', messageType: message });
                    setTimeout(() => {
                        figma.ui.postMessage({ type: "hide-notification" });
                    }, 2000);

                    figma.ui.postMessage({ type: "icon-list-fetched", payload: iconList });
                });
            } catch (error) {
                figma.ui.postMessage({ type: "show-notification", message: (error as Error).toString(), messageType: 'error' });
                setTimeout(() => {
                    figma.ui.postMessage({ type: "hide-notification" });
                }, 2000);
            }
            break;
        }
        case "fetch-aprimo-assets":
        {
            try {
                const assets = await fetchAprimoAssets("dummy-token");
                figma.ui.postMessage({ type: "aprimo-assets", payload: assets });
            } catch (error) {
                figma.ui.postMessage({ type: 'show-notification', message: (error as Error).toString(), messageType: 'error' });
                setTimeout(() => {
                    figma.ui.postMessage({ type: "hide-notification" });
                }, 2000);
            }
        }
            break;
        case "fetch-gdrive-assets":
        {
            try {
                const assets = await fetchGoogleDriveAssets("dummy-token");
                figma.ui.postMessage({ type: "gdrive-assets", payload: assets });
            } catch (error) {
                figma.ui.postMessage({ type: 'show-notification', message: (error as Error).toString(), messageType: 'error' });
                setTimeout(() => {
                    figma.ui.postMessage({ type: "hide-notification" });
                }, 2000);
            }
        }
            break;

        case "fetch-figma-assets":
        {
            const { fileId } = message;
            // 1. looking for saved token
            const storedToken = await figma.clientStorage.getAsync("figmaApiToken");
            if (!storedToken) {
                // if not founded, send a message to the UI
                figma.ui.postMessage({ type: 'show-notification', message: "Please enter your personal token", messageType: 'warning' });
                return
            }
            // 2. validate token
            try {
                const iconList = await fetchFigmaAssets(storedToken, fileId);
                figma.ui.postMessage({ type: "icon-list-fetched", payload: iconList });
            } catch (error) {
                figma.ui.postMessage({ type: "show-notification", message: (error as Error).toString(), messageType: 'error' });
            }
            break;
        }

        case "select-asset":
        {
            const { fileId, asset } = message;

            try {
                const { sizeVariant } = findLib({ fileId: fileId });
                console.log('selected asset' + sizeVariant);
                figma.ui.postMessage({ type: "show-modal", sizeVariant, asset });

            } catch (error) {
                console.error("Unable to find file ID", fileId);
            }
            break;
        }
        case "insert":
        {
            const { key, size, name } = message;

            console.log(size)

            if (size) {
                await insertInstance(key, name, size.x, size.y);
            } else {
                await insertInstance(key, name);
            }

            figma.ui.postMessage({ type: "icon-inserted", name });
            break;
        }

        default:
            break;
    }
};

async function init() {
    // debug
    await figma.clientStorage.deleteAsync("figmaApiToken");

    const storedToken:string = await figma.clientStorage.getAsync("figmaApiToken");
    if (storedToken) {
        fetchFigmaAssets(storedToken, libraryFiles[0].libraries[0].fileId).then((iconList) => {
            figma.ui.postMessage({ type: "icon-list-fetched", payload: iconList });
        });
        figma.ui.postMessage({type: 'show-notification', message: "token founded", messageType: 'success'});
        figma.ui.postMessage({ type: "hide-notification" });
    } else {
        figma.ui.postMessage({type: 'show-notification', message: "token not founded", messageType: 'error'});
    }

    // send the library infos to the UI
    figma.ui.postMessage({ type: "init-libraries", libraries: libraryFiles });
}


figma.showUI(__html__, { width: 402, height: 625 });

await init();
