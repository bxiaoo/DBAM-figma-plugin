import { IBrandLibraries } from "./figmaAsset";
import {IMenu} from "./menu";

export const libraryFiles: IBrandLibraries[] = [
    {
        brand: "Universal",
        libraries: [
            {
                name: "System icons",
                fileId: "kywf7UGBVQgvSwlb3t8BJY",
                sizeVariant: [
                    {name: "20x20", x: 20, y: 20},
                    {name: "14x14", x: 14, y: 14},
                    {name: "16x16", x: 16, y: 16},
                    {name: "24x24", x: 24, y: 24},
                    {name: "32x32", x: 32, y: 32}
                ],
                minSize: {name: "14x14", x: 14, y: 14},
                maxSize: {name: "32x32", x: 32, y: 32}
            },
        ]
    },
    {
        brand: "IONOS",
        libraries: [
            {
                name: "brand icons",
                fileId: "W862WSkHvk3J0MAYGIdwDQ",
                sizeVariant: [
                    {name: "32x32", x: 32, y: 32},
                    {name: "36x36", x: 36, y: 36},
                    {name: "48x48", x: 48, y: 48},
                    {name: "64x64", x: 64, y: 64},
                ],
                minSize: {name: "32x32", x: 32, y: 32},
                maxSize: {name: "64x64", x: 64, y: 64}
            },

            {
                name: "Illustrations",
                fileId: "lGBQlGVQoPwDlPdaAv3E0P",
                sizeVariant: [
                    {name: "320x320", x: 320, y: 320},
                    {name: "480x480", x: 480, y: 480},
                ],
                minSize: {name: "320x320", x: 320, y: 320},
                maxSize: {name: "480x480", x: 480, y: 480}
            },
            {
                name: "brandmarks",
                fileId: "0o611Awje3OIWQ0ZPRH4b4",
                sizeVariant: [
                    {name: 'unisize', x: 0, y: 32}
                ]
            },
            {
                name: "Partner logos",
                fileId: "hTuQ8bL3oBf8iruQnRTmZ5",
                sizeVariant: [
                    {name: 'unisize', x: 0, y: 32}
                ]
            }

        ]
    },
    {
        brand: "Strato",
        libraries: [
            {
                name: "product icons",
                fileId: "TL9sbzz63uGeRHp1qQ6RI0",
                sizeVariant: [
                    {name: "32x32", x: 32, y: 32},
                    {name: "36x36", x: 36, y: 36},
                    {name: "48x48", x: 48, y: 48},
                    {name: "64x64", x: 64, y: 64},
                ],
            },
            {
                name: "brandmarks",
                fileId: "i5tpbp7FfwHCNnXvX2vKVU",
                sizeVariant: [
                    {name: 'unisize', x: 0, y: 32}
                ]
            }
        ]
    },
    {
        brand: "Home.pl",
        libraries: [
            {
                name: "brand icons",
                fileId: "arf0sbP59NoCMYEPOLMeMj",
                sizeVariant: [
                    {name: "32x32", x: 32, y: 32},
                    {name: "36x36", x: 36, y: 36},
                    {name: "48x48", x: 48, y: 48},
                    {name: "64x64", x: 64, y: 64},
                ],
                minSize: {name: "32x32", x: 32, y: 32},
                maxSize: {name: "64x64", x: 64, y: 64}
            }]
    }
];

export const menu:IMenu[] = [
    {
        name: "settings",
    },
    {
        name: 'about'
    }
]