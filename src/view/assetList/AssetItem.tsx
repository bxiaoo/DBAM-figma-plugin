import * as React from 'react';
import { IAsset } from '../../model/assetItem';
import { ISize } from '../../model/figmaAsset';
import "./assetList.style.css"

interface AssetItemProps {
    asset: IAsset;
    handleInsert: (asset: IAsset) => void;
    displaySize: ISize;
}

export function AssetItem ({ asset, handleInsert, displaySize }: AssetItemProps) {
    const [hovering, setHovering] = React.useState(false);

    return (
        <div className='asset-item-container'>
        <button
            className='asset-item'
            onClick={() => handleInsert(asset)}
            onMouseEnter={() => setHovering(true)}
            onMouseLeave={() => setHovering(false)}
        >
            <img src={asset.thumbnail_url} width={displaySize.x === 0 ? 'auto' : displaySize.x * 1.5} height={displaySize.y === 0 ? 'auto' : displaySize.y * 1.5} />
        </button>

            {hovering && <span className='asset-name-popup'>{asset.name}</span>}
        </div>
    )
}