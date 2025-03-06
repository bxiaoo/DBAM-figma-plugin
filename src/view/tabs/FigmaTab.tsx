import * as React from 'react';
import {Input} from "../input/TokenInput";
import {IBrandLibraries, ILibrary, ISizeVariant} from "../../model/figmaAsset";
import {IAsset} from "../../model/assetItem";
import {LibDropdown} from "../dropdown/LibDropdown";
import {AssetList} from "../assetList/AssetList";
import {InsertModal} from "../modal/InsertModal";
import {findLib} from "../../controller/uils";

interface FigmaTabProps {
    defaultLib: ILibrary;
    msgCallback: (msg:string) => void;
}

export function FigmaTab({defaultLib, msgCallback}: FigmaTabProps) {
    const [currentFileId, setCurrentFileId] = React.useState<string>(defaultLib.fileId);
    const [currentSizes, setCurrentSizes] = React.useState<ISizeVariant[] | null>(defaultLib.sizeVariant)
    const [showModal, setShowModal] = React.useState(false);
    const [selectedAsset, setSelectedAsset] = React.useState<IAsset | null>(null);

    const [assetList, setAssetList] = React.useState<IAsset[] | null>(null);
    const [libList, setLibList] = React.useState<IBrandLibraries[] | null>(null);

    onmessage = (event) => {
        const msg = event.data.pluginMessage;
        switch (msg.type) {
            case "init-libraries":
                setLibList(msg.libraries);
                setCurrentFileId(defaultLib.fileId);
                break;
            case "icon-list-fetched":
                setAssetList(msg.payload);
                setCurrentSizes(findLib({fileId: currentFileId}).sizeVariant)
                break;
            case "show-modal":
                setShowModal(true);
                setSelectedAsset(msg.asset);
                break;
            case "icon-inserted":
                setShowModal(false);
                msgCallback("asset inserted success!");
        }
    }

    const handleTokenSave = (token: string) => {
        parent.postMessage({
            pluginMessage: {
                type: "save-token",
                token: token,
            }
        }, "*")
    }

    const handleLibChange = (fileId: string) => {
        setCurrentFileId(fileId);
        setAssetList(null);

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
        <div>
            <h3>Authentication</h3>
            <p>This token is requested to fetch assets from your account.</p>
            <Input onSaveToken={handleTokenSave} />

            {libList && <LibDropdown handleLibChange={handleLibChange} options={libList} />}
            {assetList && <AssetList assets={assetList} currentFileId={currentFileId!} sizes={currentSizes} />}

            {showModal && currentSizes && selectedAsset && <InsertModal asset={selectedAsset} sizes={currentSizes}  />}
        </div>
    );
}