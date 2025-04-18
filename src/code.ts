/// <reference types="@figma/plugin-typings" />

import { libraryFiles } from "./model/libraries";
import { fetchFigmaAssets, fetchAprimoAssets, fetchGoogleDriveAssets } from "./controller/fetchAssets";
import { insertInstance } from "./controller/insertAsset";

const defaultLib = libraryFiles[0].libraries[0];

figma.ui.onmessage = async (message) => {
    switch (message.type) {
        case "save-token": {
            const { token } = message;
            try {
                await fetchFigmaAssets(token, defaultLib.fileId).then((iconList) => {
                    figma.clientStorage.setAsync("figmaApiToken", token);

                    figma.ui.postMessage({ type: "view", view: 'main' });

                    figma.ui.postMessage({ type: "show-notification", message: 'token saved!'});

                    figma.ui.postMessage({ type: "icon-list-fetched", payload: iconList, library: defaultLib });
                });
            } catch (error) {
                figma.ui.postMessage({ type: "show-notification", message: 'Token is invalid.' });
                figma.ui.postMessage({ type: "invalid-token", validating: false });
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
            }
        }
            break;

        case "fetch-figma-assets":
        {
            const { selectedLib } = message;
            const fileId = selectedLib ? selectedLib.fileId : defaultLib.fileId;
            // 1. looking for saved token
            const storedToken = await figma.clientStorage.getAsync("figmaApiToken");
            if (!storedToken) {
                // if not founded, send a message to the UI
                figma.ui.postMessage({ type: "setting-view", showSetting: true });
                figma.ui.postMessage({ type: 'show-notification', message: "Please enter your personal token", messageType: 'warning' });
                return
            } else {
                // 2. validate token
                figma.ui.postMessage({ type: "token-found", foundToken: true });
                figma.ui.postMessage({ type: "setting-view", showSetting: false });
                figma.ui.postMessage({type: 'loading', loading: true});
                const iconList = await fetchFigmaAssets(storedToken, fileId);
                figma.ui.postMessage({
                    type: "icon-list-fetched",
                    payload: iconList,
                    library: selectedLib ? selectedLib : defaultLib
                });

                figma.ui.postMessage({ type: "init-libraries", libraries: libraryFiles });
            }
            break;
        }
        case "insert":
        {
            const { key, size, name } = message;

            if (size) {
                await insertInstance(key, name, size.x, size.y);
            } else {
                await insertInstance(key, name,);
            }

            figma.ui.postMessage({ type: "icon-inserted", name });
            break;
        }
        case "loading":
        {
            const { loading } = message;
            figma.ui.postMessage({ type: "loading", loading });
            break;
        }
        default:
            break;
    }
};

async function init() {
    // debug

        const storedToken: string = await figma.clientStorage.getAsync("figmaApiToken");

        if (storedToken) {


            try {
                await fetchFigmaAssets(storedToken, defaultLib.fileId)
                    .then(iconList => {
                        figma.ui.postMessage({ type: "icon-list-fetched", payload: iconList, library: defaultLib });
                        figma.ui.postMessage({ type: "view", view: 'main' });
                        figma.ui.postMessage({ type: 'loading', loading: true });
                        figma.ui.postMessage({ type: "init-libraries", library: libraryFiles });

                        figma.ui.postMessage({ type: "token-found", foundToken: true });
                        figma.ui.postMessage({ type: "loading", loading: false });
                    })
            } catch (error) {
                figma.ui.postMessage({ type: "show-notification", message: `Token expired, please regenerate. ${(error as Error).toString()}`, messageType: 'error' });
                await figma.clientStorage.deleteAsync("figmaApiToken");
                figma.ui.postMessage({ type: "token-found", foundToken: false });
                figma.ui.postMessage({type: "view", view: "settings"});
            }
        } else {
            console.info("no saved token founded");
            figma.ui.postMessage({type: "view", view: 'settings' });
            figma.ui.postMessage({type: 'show-notification', message: "token not founded", messageType: 'error'});
        }

    figma.ui.postMessage({ type: "init-libraries", libraries: libraryFiles });

}


figma.showUI(__html__, { width: 396, height: 580 });


await init();

