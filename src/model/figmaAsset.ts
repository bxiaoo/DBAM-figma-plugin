export interface ISizeVariant {
    name: string;
    x: number;
    y: number;
}
export interface ILibrary {
    name: string;
    fileId: string;
    sizeVariant: ISizeVariant[] | null;
}
export interface IBrandLibraries {
    brand: string;
    libraries: ILibrary[];
}