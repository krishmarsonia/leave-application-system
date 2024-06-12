"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.clerk = void 0;
const clerk_sdk_node_1 = require("@clerk/clerk-sdk-node");
exports.clerk = (0, clerk_sdk_node_1.createClerkClient)({ secretKey: "sk_test_XAwwGhIdhPRIVKGFxendT8jqNrOzGdnu9QC0Hu8WKl" });
