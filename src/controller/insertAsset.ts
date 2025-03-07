export async function insertInstance(key:string, name:string, sizeX?:number, sizeY?:number) {
    const selection = figma.currentPage.selection;

    try {
        const publishedComp = await figma.importComponentByKeyAsync(key);

        let insertedCount = 0;

        // For each selected node
        for (const selectedNode of selection) {
            // Check if it's a container type
            if (
                selectedNode.type === "FRAME" ||
                selectedNode.type === "GROUP" ||
                selectedNode.type === "COMPONENT" ||
                selectedNode.type === "INSTANCE"
            ) {
                // 1) Create a new instance from the master
                const instance = publishedComp.createInstance();

                instance.lockAspectRatio()
                if (sizeX && sizeY) instance.resize(sizeX, sizeY);
                instance.name = name;

                // 3) Append it to the container
                selectedNode.appendChild(instance);

                // 4) Position it at top-left or any offset you like
                instance.x = 0;
                instance.y = 0;

                insertedCount++;
            }
        }

        // If no frames (or containers) were selected, you could fallback:
        if (insertedCount === 0) {
            // For example, place one instance in the page center
            const instance = publishedComp.createInstance();

            instance.lockAspectRatio()
            if (sizeX && sizeY) instance.resize(sizeX, sizeY);
            figma.currentPage.appendChild(instance);
            instance.x = figma.viewport.center.x;
            instance.y = figma.viewport.center.y;

            // Or do nothing. Your choice.
        }
    } catch (error) {
        throw new Error("fail to insert instance: " + error);
    }
}