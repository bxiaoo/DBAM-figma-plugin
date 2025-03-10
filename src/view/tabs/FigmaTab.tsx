import * as React from 'react';
import {TokenInput} from "../input/TokenInput";
import {IBrandLibraries, ILibrary, ISize} from "../../model/figmaAsset";
import {IAsset} from "../../model/assetItem";
import {LibDropdown} from "../dropdown/LibDropdown";
import {AssetList} from "../assetList/AssetList";
import {SizeDropdown} from "../dropdown/SizeDropdown";

interface FigmaTabProps {
    msgCallback: (msg:string) => void;
}

export function FigmaTab({msgCallback}: FigmaTabProps) {
    const [libList, setLibList] = React.useState<IBrandLibraries[] | null>(null);
    const [currentFileId, setCurrentFileId] = React.useState<string>('');
    const [currentSizes, setCurrentSizes] = React.useState<ISize[] | null>(null);
    const [selectedSize, setSelectedSize] = React.useState<ISize>({name: 'unisize', x: 0, y: 0});
    // const [showModal, setShowModal] = React.useState(false);
    // const [selectedAsset, setSelectedAsset] = React.useState<IAsset | null>(null);

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
                setCurrentSizes(msg.library.sizeVariant);
                setSelectedSize(msg.library.sizeVariant[0]);
                setLoading(false);
                break;
            // case "show-modal":
            //     setShowModal(true);
            //     setSelectedAsset(msg.asset);
            //     break;
            case "icon-inserted":
                // setShowModal(false);
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

    const handleLibChange = (lib: ILibrary) => {

        if (!lib) {
            return parent.postMessage({
                pluginMessage: {
                    type: "show-notification",
                    message: "No library selected",
                }
            })
        }

        setCurrentFileId(lib.fileId);
        setAssetList(null);

        setLoading(true);

        setCurrentSizes(lib.sizeVariant);
        // setShowModal(false);

        parent.postMessage({
            pluginMessage: {
                type: "fetch-figma-assets",
                selectedLib: lib
            }
        }, "*")
    }

    const handleSizeChange = (size:ISize) => {
        setSelectedSize(size);
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
                <div className='config-container'>
                    {libList && <LibDropdown handleLibChange={handleLibChange} options={libList} selectedFileId={currentFileId} />}
                    {currentSizes && <SizeDropdown sizes={currentSizes} handleSizeChange={handleSizeChange} selectedSize={selectedSize} />}
                </div>
                {assetList && <AssetList assets={assetList} displaySize={currentSizes ? currentSizes[0] : selectedSize}  size={selectedSize} />}

            </div>}
        </div>
    );
}