"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const app_1 = __importDefault(require("../app"));
const PORT = (_a = process.env.PORT) !== null && _a !== void 0 ? _a : 5000;
mongoose_1.default
    .connect(process.env.MONGO_URI)
    .then(() => {
    app_1.default.listen(PORT, () => {
        console.log(`server running at ${PORT}`);
    });
})
    .catch((err) => console.log(err));
module.exports = app_1.default;
