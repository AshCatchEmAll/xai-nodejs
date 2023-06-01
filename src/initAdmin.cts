import { Category } from "./mongoose/category.entity.cjs";


export const initAdmin =  () => {
    return {
        resources: [
            Category
        ]
    };
}


    module.exports.initAdmin = initAdmin;