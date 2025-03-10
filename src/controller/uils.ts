import { ISize } from "../model/figmaAsset";
import { libraryFiles } from "../model/libraries";

interface FindLibOptions {
    fileId?: string;
    libName?: string;
}

interface FindLibResults {
    libName: string;
    sizeVariant: ISize[] | null;
}

export function findLib(options: FindLibOptions): FindLibResults {

    const { fileId, libName } = options;

    for (const { brand, libraries } of libraryFiles) {
        for (const library of libraries) {

            const matchesFileId = fileId && library.fileId === fileId;
            const matchesLibName = libName && library.name === libName;

            if (matchesFileId || matchesLibName) {
                // if (library.sizeVariant) {
                //     return {
                //         libName: library.name,
                //         sizeVariant: library.sizeVariant
                //     };
                // } else {
                //     throw new Error(
                //         `Library "${library.name}" under "${brand}" does not have a size variant`
                //     )
                // }

                return {
                    libName: library.name,
                    sizeVariant: library.sizeVariant
                }
            }
        }
    }
    throw new Error(`No matching library found for fileId ${fileId}`);
}