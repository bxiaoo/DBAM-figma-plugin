import * as React from 'react';
import {TokenInput} from "../input/TokenInput";
import {IBrandLibraries, ILibrary, ISizeVariant} from "../../model/figmaAsset";
import {IAsset} from "../../model/assetItem";
import {LibDropdown} from "../dropdown/LibDropdown";
import {AssetList} from "../assetList/AssetList";
import {InsertModal} from "../modal/InsertModal";
import {findLib} from "../../controller/uils";

interface FigmaTabProps {
    msgCallback: (msg:string) => void;
}

export function FigmaTab({msgCallback}: FigmaTabProps) {
    const [libList, setLibList] = React.useState<IBrandLibraries[] | null>(null);
    const [currentFileId, setCurrentFileId] = React.useState<string>('');
    const [currentSizes, setCurrentSizes] = React.useState<ISizeVariant[] | null>(null);
    const [showModal, setShowModal] = React.useState(false);
    const [selectedAsset, setSelectedAsset] = React.useState<IAsset | null>(null);

    const [loading, setLoading] = React.useState(false);
    const [showSetting, setShowSetting] = React.useState(true);
    const [tokenValidating, setTokenValidating] = React.useState(false);

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
                // setCurrentSizes(msg.library.sizeVariant);
                setLoading(false);
                break;
            case "show-modal":
                setShowModal(true);
                setSelectedAsset(msg.asset);
                break;
            case "icon-inserted":
                setShowModal(false);
                msgCallback("asset inserted success!");
                break;
            case "setting-view":
                setShowSetting(msg.showSetting);
                break;
            case "invalid-token":
                setTokenValidating(msg.validating);
                break;
            case "show-notification":
                console.log("show notification");
                msgCallback(msg.message);
                break;

        }
    }

    const handleTokenSave = (token: string) => {
        setLoading(true);

        setTokenValidating(true);

        parent.postMessage({
            pluginMessage: {
                type: "save-token",
                token: token,
                fileId: currentFileId,
            }
        }, "*")
    }

    const handleLibChange = (fileId: string) => {
        setCurrentFileId(fileId);
        setAssetList(null);

        setLoading(true);

        const { sizeVariant } = findLib({fileId});
        setCurrentSizes(sizeVariant);
        setShowModal(false);

        parent.postMessage({
            pluginMessage: {
                type: "fetch-figma-assets",
                fileId: fileId,
            }
        }, "*")
    }

    return (
        <div className='tab-content'>
            {showSetting && <div id='setting'>
                <div className='headline'>
                    <h1>Authentication</h1>
                    <p>This token is requested to fetch assets from your account.</p>
                </div>
                <TokenInput onSaveToken={handleTokenSave} validating={tokenValidating} />
            </div>}

            {!showSetting && loading && <span>Loading...</span>}

            {assetList && <div className='asset-view'>
                {libList && <LibDropdown handleLibChange={handleLibChange} options={libList} />}
                {assetList && <AssetList assets={assetList} currentFileId={currentFileId!} sizes={currentSizes} />}

                {showModal && currentSizes && selectedAsset && <InsertModal asset={selectedAsset} sizes={currentSizes}  />}
            </div>}
        </div>
    );
}