import * as React from 'react';
import {IAsset} from "../../model/assetItem";
import {SearchInput} from "../input/SearchInput";
import {ISizeVariant} from "../../model/figmaAsset";

interface AssetListProps {
    assets: IAsset[];
    currentFileId: string;
    sizes: ISizeVariant[] | null;
}

interface IDisplaySize {
    width: string;
    height: string;
}

export function AssetList({ assets, currentFileId, sizes }: AssetListProps) {
    const [filteredAssets, setFilteredAssets] = React.useState<IAsset[]>(assets);
    const [selectedAsset, setSelectedAsset] = React.useState<IAsset | null>(null);
    const [displaySize, setDisplaySize] = React.useState<IDisplaySize>({ width: 'auto', height: 'auto' });

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

        if (sizes) {
            setDisplaySize({ width: sizes[sizes.length - 1].x.toString(), height: sizes[sizes.length - 1].y.toString() });
        } else {
            setDisplaySize({ width: 'auto', height: 'auto' });
        }
    }, [selectedAsset, sizes]);

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
            {assets ? <div className='asset-container'>
                <SearchInput handleSearch={handleSearch} />
                <div className='asset-list'>
                    {filteredAssets.map((asset, index) => {
                    return (
                        <button className='asset-item' key={index} onClick={() => setSelectedAsset(asset)}>
                            <img src={asset.thumbnail_url} width={displaySize.width} height={displaySize.height} />
                            {/*<p className='asset-name'>{asset.name}</p>*/}
                        </button>
                    );
                })}</div>
            </div>
                : <p>No assets found in that file.</p>
            }
        </div>
    );
}