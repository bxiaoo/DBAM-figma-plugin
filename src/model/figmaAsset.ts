export interface ISize {
    name: string;
    x: number;
    y: number;
}
export interface ILibrary {
    name: string;
    fileId: string;
    sizeVariant: ISize[] | null;
    minSize?: ISize;
    maxSize?: ISize;
}
export interface IBrandLibraries {
    brand: string;
    libraries: ILibrary[];
}