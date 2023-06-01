"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initAdmin = void 0;
const category_entity_cjs_1 = require("./mongoose/category.entity.cjs");
const initAdmin = () => {
    return {
        resources: [
            category_entity_cjs_1.Category
        ]
    };
};
exports.initAdmin = initAdmin;
module.exports.initAdmin = exports.initAdmin;
//# sourceMappingURL=initAdmin.cjs.map