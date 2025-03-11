/// <reference types="@figma/plugin-typings" />

import { libraryFiles } from "./model/libraries";
import { fetchFigmaAssets, fetchAprimoAssets, fetchGoogleDriveAssets } from "./controller/fetchAssets";
import { insertInstance } from "./controller/insertAsset";
import { findLib } from "./controller/uils";

const defaultLib = libraryFiles[0].libraries[0];

figma.ui.onmessage = async (message) => {
    switch (message.type) {
        case "save-token": {
            const { token } = message;
            try {
                await fetchFigmaAssets(token, defaultLib.fileId).then((iconList) => {
                    figma.clientStorage.setAsync("figmaApiToken", token);

                    figma.ui.postMessage({ type: "setting-view", showSetting: false });

                    figma.ui.postMessage({ type: "show-notification", message: 'token saved!'});

                    figma.ui.postMessage({ type: "icon-list-fetched", payload: iconList, library: defaultLib });
                });
            } catch (error) {
                figma.ui.postMessage({ type: "show-notification", message: 'test' });
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
    // await figma.clientStorage.deleteAsync("figmaApiToken");

        const storedToken: string = await figma.clientStorage.getAsync("figmaApiToken");

        if (storedToken) {

            figma.ui.postMessage({ type: "token-found", foundToken: true });

            figma.ui.postMessage({type: "view", view: 'main' });
            figma.ui.postMessage({ type: 'loading', loading: true });

            const iconList = await fetchFigmaAssets(storedToken, defaultLib.fileId);

            figma.ui.postMessage({ type: "icon-list-fetched", payload: iconList, library: defaultLib });

            figma.ui.postMessage({type: 'show-notification', message: "token founded", messageType: 'success'});

        } else {
            console.info("no saved token founded");
            figma.ui.postMessage({type: 'show-notification', message: "token not founded", messageType: 'error'});
        }

    figma.ui.postMessage({ type: "init-libraries", libraries: libraryFiles });

}


figma.showUI(__html__, { width: 396, height: 580 });


await init();

