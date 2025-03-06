import {IAsset} from "../model/assetItem";

export async function fetchFigmaAssets(token:string, fileId:string = "W862WSkHvk3J0MAYGIdwDQ"):Promise<IAsset[]> {
    const url = `https://api.figma.com/v1/files/${fileId}/components`;
    const resp = await fetch(url, {
        method: "GET",
        headers: {
            "X-Figma-Token": token
        }
    });
    if (!resp.ok) {
        throw new Error(`Invalid token, please check it or regenerate from your figma configuration: ${resp.status}`);
    }
    const data = await resp.json();

    // data.meta.components is an array of { key, node_id, name, description, ... }
    // We'll build our own array with the info we need.
    const components = data.meta.components || [];

    return components.map((c:IAsset) => ({
        node_id: c.node_id,   // This is used to fetch images
        name: c.name,
        thumbnail_url: c.thumbnail_url,
        key: c.key
        // c.key is also available if you need it for referencing library components
    }));
}

export async function fetchAprimoAssets(token: string) {
    // For demonstration, let's assume there's an endpoint like:
    //   https://YOUR_ORG.aprimo.com/api/assets/{assetId}/content
    const assetContentUrl = `https://unitedinternet.aprimo.com/api/assets/content`;

    const response = await fetch(assetContentUrl, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });

    if (!response.ok) {
        throw new Error(`Failed to fetch asset content. Status: ${response.status}`);
    }

    const contentType = response.headers.get('Content-Type') || '';

    if (contentType.includes('image/svg+xml')) {
        // It's an SVG
        const svgString = await response.text();
        return { type: 'SVG', data: svgString };
    } else if (contentType.startsWith('image/')) {
        // It's a bitmap (PNG, JPG, etc.)
        const blob = await response.blob();
        const buffer = await blob.arrayBuffer();
        return { type: 'BITMAP', data: new Uint8Array(buffer) };
    } else {
        throw new Error(`Unsupported content type: ${contentType}`);
    }
}

export async function fetchGoogleDriveAssets(token:string) {
    // Example: listing files in Drive, filtering for certain file types
    // or in a specific folder. This is just a demonstration:
    const driveApiUrl = "https://www.googleapis.com/drive/v3/files";
    const params = new URLSearchParams({
        pageSize: "10",
        fields: "files(id,name,iconLink)"
    });

    const response = await fetch(`${driveApiUrl}?${params.toString()}`, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
        }
    });

    if (!response.ok) {
        throw new Error(`Google Drive API error. Status: ${response.status}`);
    }

    const data = await response.json();
    // data.files => array of file objects with id, name, iconLink, etc.
    return data.files || [];
}