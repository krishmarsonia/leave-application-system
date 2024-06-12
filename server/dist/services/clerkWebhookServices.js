"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTodaysBirthdayServices = exports.clerkWebHookService = void 0;
const svix_1 = require("svix");
const userDbServices_1 = require("../dbServices/userDbServices");
const clerkWebHookService = (payloadString, svixHeaders) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!payloadString || !svixHeaders) {
            throw new Error("parameters not passed");
        }
        const wh = new svix_1.Webhook(process.env.SIGNING_SECRET_NGROK);
        const evt = wh.verify(payloadString, svixHeaders);
        const _a = evt.data, { id } = _a, attributes = __rest(_a, ["id"]);
        const eventType = evt.type;
        const existingUser = yield (0, userDbServices_1.findOneUser)({ externalId: id });
        if (!existingUser) {
            yield (0, userDbServices_1.createOneUser)({
                email: attributes.email_addresses[0].email_address,
                externalId: id,
                name: attributes.first_name + " " + attributes.last_name,
                profileImage: attributes.profile_image_url,
            });
        }
        else {
            existingUser.email = attributes.email_addresses[0].email_address;
            existingUser.name = attributes.first_name + " " + attributes.last_name;
            existingUser.profileImage = attributes.profile_image_url;
            yield existingUser.save();
        }
    }
    catch (error) {
        if (!error.statusCode) {
            error.statusCode = 422;
        }
        throw error;
    }
});
exports.clerkWebHookService = clerkWebHookService;
const getTodaysBirthdayServices = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const startingDay = new Date();
        const wholeBirthdayList = yield (0, userDbServices_1.findUsers)({
            select: {
                _id: 1,
                birthday: 1,
                name: 1,
                profileImage: 1,
            },
        });
        const birthdayList = wholeBirthdayList.filter((wbl) => {
            if (wbl.birthday) {
                const date = new Date(wbl.birthday);
                if (date.getMonth() === startingDay.getMonth() &&
                    date.getDate() === startingDay.getDate()) {
                    return true;
                }
                return false;
            }
            return false;
        });
        return birthdayList;
    }
    catch (error) {
        if (!error.statusCode) {
            error.statusCode = 422;
        }
        throw error;
    }
});
exports.getTodaysBirthdayServices = getTodaysBirthdayServices;
