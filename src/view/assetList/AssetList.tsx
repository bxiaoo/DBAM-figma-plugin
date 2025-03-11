import * as React from 'react';
import {AssetItem} from "./AssetItem";
import {IAsset} from "../../model/assetItem";
import {SearchInput} from "../input/SearchInput";
import {ISize} from "../../model/figmaAsset";

import "./assetList.style.css";

interface AssetListProps {
    assets: IAsset[];
    // sizes: ISizeVariant[] | null;
    size: ISize;
    displaySize: ISize;
}

export interface IDisplaySize {
    width: string;
    height: string;
}

export function AssetList({ assets, size, displaySize }: AssetListProps) {
    const [filteredAssets, setFilteredAssets] = React.useState<IAsset[]>(assets);

    const handleSearch = (query: string) => {
        const filtered = assets.filter((asset) => {
            return asset.name.toLowerCase().includes(query);
        });
        setFilteredAssets(filtered);
    };

    const handleInsert = (asset: IAsset) => {
        parent.postMessage({
            pluginMessage: {
                type: 'insert',
                key: asset.key,
                size: size,
                name: asset.name,
            }
        }, "*");
    }

    return (
        <div>
            {assets ? <div className='asset-container'>
                <SearchInput handleSearch={handleSearch} />
                <div className='asset-list'>
                    {filteredAssets
                        .slice()
                        .sort((a, b) => a.name.localeCompare(b.name))
                        .map((asset, index) => {
                    return (
                        <AssetItem key={index} asset={asset} handleInsert={handleInsert} displaySize={displaySize} />
                    );
                })}
                    {!filteredAssets && <p>No such assets found in that file.</p>}</div>
            </div>
                : <p>No such assets found in that file.</p>
            }
        </div>
    );
}