import * as React from 'react';
import {IAsset} from "../../model/assetItem";
import {SearchInput} from "../input/SearchInput";
import {ISizeVariant} from "../../model/figmaAsset";

interface AssetListProps {
    assets: IAsset[];
    currentFileId: string;
    sizes: ISizeVariant[] | null;
}

export function AssetList({ assets, currentFileId, sizes }: AssetListProps) {
    const [filteredAssets, setFilteredAssets] = React.useState<IAsset[]>(assets);
    const [selectedAsset, setSelectedAsset] = React.useState<IAsset | null>(null);

    React.useEffect(() => {
        if (selectedAsset && sizes) {
            parent.postMessage({
                pluginMessage: {
                    type: "select-asset",
                    fileId: currentFileId,
                    asset: selectedAsset
                }
            }, "*");
        } else {
            parent.postMessage({
                pluginMessage: {
                    type: 'insert',
                    key: selectedAsset?.key,
                    name: selectedAsset?.name,
                }
            }, "*");
        }
    }, [selectedAsset]);

    const handleSearch = (query: string) => {
        const filtered = assets.filter((asset) => {
            return asset.name.toLowerCase().includes(query);
        });
        setFilteredAssets(filtered);
    };

    // const handleSelectedAsset = (instance:IAsset) => {
    //     setSelectedAsset(instance);
    //     // parent.postMessage({ pluginMessage: { type: 'select-asset', fileId: currentFileId, asset: selectedAsset} }, '*');
    // }

    return (
        <div>
            {assets ? <div>
                <SearchInput handleSearch={handleSearch} />
                <div>{filteredAssets.map((asset, index) => {
                    return (
                        <button key={index} onClick={() => setSelectedAsset(asset)}>
                            <img src={asset.thumbnail_url} />
                            <p>{asset.name}</p>
                        </button>
                    );
                })}</div>
            </div>
                : <p>No assets found in that file.</p>
            }
        </div>
    );
}