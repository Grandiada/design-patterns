// import { RectangleManager } from "./managers";

import { TetrahedronManager } from "./managers/TetrahedronManager";

// const rectangleManager = new RectangleManager().read().safeParse();
// console.log(rectangleManager.getObjectInfo("Perimetr14"));

const tetrahedronManager = new TetrahedronManager().read().safeParse();
console.log(tetrahedronManager.getObjectInfo("TnoBase"));
