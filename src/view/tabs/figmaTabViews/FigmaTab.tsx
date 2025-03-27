import * as React from 'react';
import {IBrandLibraries, ILibrary, ISize} from "../../../model/figmaAsset";
import {IAsset} from "../../../model/assetItem";
import {LibDropdown} from "../../dropdown/LibDropdown";
import {AssetList} from "../../assetList/AssetList";
import {SizeDropdown} from "../../dropdown/SizeDropdown";
import {MenuDropdown} from "../../dropdown/MenuDropdown";
import {menu} from "../../../model/libraries";
import {IMenu} from "../../../model/menu";

import "./tab.style.css";
import {Settings} from "./Settings";
import { About } from "./About";

interface FigmaTabProps {
    msgCallback: (msg:string) => void;
}

export function FigmaTab({msgCallback}: FigmaTabProps) {
    const [libList, setLibList] = React.useState<IBrandLibraries[] | null>(null);
    const [currentFileId, setCurrentFileId] = React.useState<string>('');
    const [currentSizes, setCurrentSizes] = React.useState<ISize[] | null>(null);
    const [selectedSize, setSelectedSize] = React.useState<ISize>({name: 'unisize', x: 0, y: 0});
    const [sizeContraints, setSizeContraints] = React.useState<ISize[] >();

    const [loading, setLoading] = React.useState(false);
    const [tokenValidating, setTokenValidating] = React.useState(false);
    const [foundToken, setFoundToken] = React.useState(false);

    const [view, setView] = React.useState<string>('main');

    const [assetList, setAssetList] = React.useState<IAsset[] | null>(null);

    onmessage = (event) => {
        const msg = event.data.pluginMessage;
        switch (msg.type) {
            case "init-libraries":
                console.log("Init DBAM Interface");
                setLibList(msg.libraries);
                break;
            case "icon-list-fetched":
                setAssetList(msg.payload);
                setCurrentFileId(msg.library.fileId);
                setCurrentSizes(msg.library.sizeVariant);
                setSelectedSize(msg.library.sizeVariant[0]);
                setLoading(false);
                break;
            case "view":
                setView(msg.view);
                break;
            case "invalid-token":
                setTokenValidating(msg.validating);
                break;
            case "show-notification":
                console.log("show notification: " + msg.message);
                msgCallback(msg.message);
                break;
            case "loading":
                setLoading(msg.loading);
                break;
            case "token-found":
                setFoundToken(msg.foundToken);
                break;

        }
    }

    const handleTokenSave = (token: string) => {

        setTokenValidating(true);

        parent.postMessage({
            pluginMessage: {
                type: "save-token",
                token: token,
                fileId: currentFileId,
            }
        }, "*")
    }

    const handleLibChange = (lib: ILibrary) => {

        if (!lib) {
            return parent.postMessage({
                pluginMessage: {
                    type: "show-notification",
                    message: "No library selected",
                }
            })
        }

        // update the current file id
        setCurrentFileId(lib.fileId);

        // clear the asset list and the view
        setAssetList(null);

        // update the current sizes of library specified
        setCurrentSizes(lib.sizeVariant);

        // fetch the assets from the selected library
        parent.postMessage({
            pluginMessage: {
                type: "fetch-figma-assets",
                selectedLib: lib
            }
        }, "*")

        // show loading...
        parent.postMessage({
            pluginMessage: {
                type: "loading",
                loading: true
            }
        }, "*")
    }

    const handleSizeChange = (size:ISize) => {
        // store and update the current selected size
        setSelectedSize(size);
    }

    // handle the views
    const handleMenuSelect = (item: IMenu) => {
        setView(item.name);
    }

    const handleSettingCancel = () => {
        setView("main");
    }

    return (
        <div className='tab-content'>
            {!loading && view === 'settings' && <Settings
                handleToken={handleTokenSave}
                validating={tokenValidating}
                hasToken={foundToken}
                handleCancel={handleSettingCancel} />}

            {!loading && view === 'about' && <About handleBack={handleSettingCancel} />}

            {loading && <span>Loading...</span>}

            {!loading && view === 'main' && assetList && <div className='main-view'>
                <div className='config-container'>
                    {libList && <LibDropdown handleLibChange={handleLibChange} options={libList} selectedFileId={currentFileId} />}
                    {currentSizes && <SizeDropdown sizes={currentSizes} handleSizeChange={handleSizeChange} selectedSize={selectedSize} />}
                    <MenuDropdown items={menu} onSelect={handleMenuSelect} />
                </div>
                {assetList && <AssetList assets={assetList} displaySize={currentSizes ? currentSizes[0] : selectedSize}  size={selectedSize} />}

            </div>}
        </div>
    );
}