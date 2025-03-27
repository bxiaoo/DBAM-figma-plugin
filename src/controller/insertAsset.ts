
export async function insertInstance(key: string, name: string, sizeX?: number, sizeY?: number) {
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




                // if (selectedNode.type === "INSTANCE") {
                //     // selectedNode.getMainComponentAsync().then((comp) => {
                //     //     console.log(comp);
                //     // });
                //
                //     // replace selected instance with the new one
                //     selectedNode.swapComponent(publishedComp);
                //     return;
                //     // instance.x = selectedNode.x;
                //     // instance.y = selectedNode.y + selectedNode.height + 8;
                //     // if (selectedNode.parent) {
                //     //     selectedNode.parent.appendChild(instance);
                //     //
                //     //     figma.notify("Asset inserted");
                //     //     return
                //     // } else {
                //     //     figma.currentPage.appendChild(instance);
                //     //
                //     //     figma.notify("Asset inserted below the selected instance");
                //     //     return;
                //     // }
                // } else {
                //
                //     // 3) Append it to the container
                //     selectedNode.appendChild(instance);
                //
                //     // 4) Position it at top-left or any offset you like
                //     instance.x = 0;
                //     instance.y = 0;
                //
                //     insertedCount++;
                // }

                console.log(selectedNode.type)

                switch (selectedNode.type) {
                    case "INSTANCE":

                        selectedNode.swapComponent(publishedComp);
                        figma.notify("Instance updated!");

                        insertedCount++;
                        break;
                    case "GROUP":
                        figma.notify("Asset should not be inserted in a group");
                        insertedCount++;
                        break;
                    default:
                        try {
                            const instance = publishedComp.createInstance();
                            instance.lockAspectRatio()
                            if (sizeX && sizeY) instance.resize(sizeX, sizeY);

                            selectedNode.appendChild(instance);

                            figma.notify("Instance created!");

                            insertedCount++;
                        } catch (error) {
                            const instance = publishedComp.createInstance();
                            instance.lockAspectRatio()
                            if (sizeX && sizeY) instance.resize(sizeX, sizeY);

                            figma.currentPage.appendChild(instance);

                            instance.x = 0;
                            instance.y = 0;
                            figma.notify("Asset inserted in the center of the viewport");

                            insertedCount++;
                        }
                        break;

                }

            }
        }

        if (insertedCount === 0) {
            // Place one instance in the page center
            const instance = publishedComp.createInstance();

            instance.lockAspectRatio()
            if (sizeX && sizeY) instance.resize(sizeX, sizeY);
            figma.currentPage.appendChild(instance);
            instance.x = figma.viewport.center.x;
            instance.y = figma.viewport.center.y;

            console.log("run the insert once");

            figma.notify("Asset inserted in the center of the viewport");

        }

    } catch (error) {
        throw new Error("fail to insert instance: " + error);
    }
}