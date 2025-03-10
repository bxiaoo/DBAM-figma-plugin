// import * as React from 'react';
// import {SizeDropdown} from "../dropdown/SizeDropdown";
// import {ISizeVariant} from "../../model/figmaAsset";
// import {IAsset} from "../../model/assetItem";
//
// interface InsertModalProps {
//     asset: IAsset;
//     sizes: ISizeVariant[];
// }
//
// export function InsertModal ({asset, sizes}:InsertModalProps) {
//
//     // const [size, setSize] = React.useState<ISizeVariant>(sizes[0]);
//
//     // const handleSizeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
//     //     console.log(e.currentTarget.value);
//     //     const sizeIndex = parseInt(e.currentTarget.value) || 0;
//     //     if (sizes) setSize(sizes[sizeIndex]);
//     // }
//
//     const handleInsert = () => {
//         parent.postMessage({ pluginMessage: { type: 'insert', key: asset.key, size: size, name: asset.name } }, '*');
//     }
//     return (
//         <div id='bottom-modal'>
//             <p>{asset.name}</p>
//             {/*{sizes && <SizeDropdown sizes={sizes} handleSizeChange={handleSizeChange} />}*/}
//             <button onClick={handleInsert}>Insert Instance</button>
//         </div>
//     )
// }