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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var globals_1 = require("@jest/globals");
var latestUnresolved_1 = require("../pages/api/latestUnresolved");
var node_test_1 = require("node:test");
/**
 * @description Get latest unresolved posts
 * check if the result is an array and has
 * the corresponding types expected from the output
 */
(0, node_test_1.describe)("getLatestUnresolved", function () {
    (0, globals_1.test)("correct properties", function () { return __awaiter(void 0, void 0, void 0, function () {
        var result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, latestUnresolved_1.getLatestUnresolved)()];
                case 1:
                    result = _a.sent();
                    (0, globals_1.expect)(result).toBeInstanceOf(Array);
                    (0, globals_1.expect)(result.length).toBeGreaterThan(0);
                    (0, globals_1.expect)(result[0]).toHaveProperty("slug");
                    (0, globals_1.expect)(result[0]).toHaveProperty("title");
                    (0, globals_1.expect)(result[0]).toHaveProperty("body");
                    (0, globals_1.expect)(result[0]).toHaveProperty("categoryId");
                    (0, globals_1.expect)(result[0]).toHaveProperty("category");
                    (0, globals_1.expect)(result[0]).toHaveProperty("publishedAt");
                    return [2 /*return*/];
            }
        });
    }); });
    (0, globals_1.test)("correct types", function () { return __awaiter(void 0, void 0, void 0, function () {
        var result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, latestUnresolved_1.getLatestUnresolved)()];
                case 1:
                    result = _a.sent();
                    (0, globals_1.expect)(result).toBeInstanceOf(Array);
                    (0, globals_1.expect)(result.length).toBeGreaterThan(0);
                    (0, globals_1.expect)(typeof result[0].slug).toBe("string");
                    (0, globals_1.expect)(typeof result[0].title).toBe("string");
                    (0, globals_1.expect)(typeof result[0].body).toBe("string");
                    (0, globals_1.expect)(typeof result[0].categoryId).toBe("string");
                    (0, globals_1.expect)(typeof result[0].category).toBe("string");
                    (0, globals_1.expect)(typeof result[0].publishedAt).toBe("object");
                    return [2 /*return*/];
            }
        });
    }); });
    (0, globals_1.test)("correct values for single date", function () { return __awaiter(void 0, void 0, void 0, function () {
        var result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, latestUnresolved_1.getLatestUnresolved)(new Date(2022, 11, 4), new Date(2022, 11, 5))];
                case 1:
                    result = _a.sent();
                    (0, globals_1.expect)(result).toBeInstanceOf(Array);
                    (0, globals_1.expect)(result.length).toBeGreaterThan(0);
                    (0, globals_1.expect)(result[0].slug).toBe("DBF6PF903");
                    (0, globals_1.expect)(result[0].title).toBe("0 probability for log in homework 6");
                    (0, globals_1.expect)(result[0].body).toBe("When calculating the entropy, we noticed that it is possible for the class probability to be 0 which would make the log undefined. Assuming we should ignore that term and set it to 0 but wanted to ensure that was the correct behavior. ");
                    (0, globals_1.expect)(result[0].categoryId).toBe("fa89385b-0384-4274-91f4-e56c97171be1");
                    (0, globals_1.expect)(result[0].category).toBe("HW 6");
                    (0, globals_1.expect)(new Date(result[0].publishedAt)).toEqual(new Date("2022-12-04T20:23:31.192Z"));
                    return [2 /*return*/];
            }
        });
    }); });
    (0, globals_1.test)("correct values for multiple dates", function () { return __awaiter(void 0, void 0, void 0, function () {
        var result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, latestUnresolved_1.getLatestUnresolved)(new Date(2022, 9, 1), new Date(2022, 9, 6), 100)];
                case 1:
                    result = _a.sent();
                    (0, globals_1.expect)(result).toBeInstanceOf(Array);
                    (0, globals_1.expect)(result.length).toBe(15); // 15 unresolved posts in this date range
                    return [2 /*return*/];
            }
        });
    }); });
});
