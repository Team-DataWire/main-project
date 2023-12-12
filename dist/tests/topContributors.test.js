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
var topContributors_1 = require("../pages/api/topContributors");
var node_test_1 = require("node:test");
/**
 * @description Get the top contributors by the number of posts they have written
 * check if the result is an array and has
 * the corresponding types expected from the output
 * along with single date and multiple date tests
 */
(0, node_test_1.describe)("getTopContributors", function () {
    (0, globals_1.test)("correct properties", function () { return __awaiter(void 0, void 0, void 0, function () {
        var result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, topContributors_1.getTopContributors)()];
                case 1:
                    result = _a.sent();
                    (0, globals_1.expect)(result).toBeInstanceOf(Array);
                    (0, globals_1.expect)(result[0]).toHaveProperty("slug");
                    (0, globals_1.expect)(result[0]).toHaveProperty("firstName");
                    (0, globals_1.expect)(result[0]).toHaveProperty("lastName");
                    (0, globals_1.expect)(result[0]).toHaveProperty("totalCount");
                    return [2 /*return*/];
            }
        });
    }); });
    (0, globals_1.test)("correct types", function () { return __awaiter(void 0, void 0, void 0, function () {
        var result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, topContributors_1.getTopContributors)()];
                case 1:
                    result = _a.sent();
                    (0, globals_1.expect)(result).toBeInstanceOf(Array);
                    (0, globals_1.expect)(typeof result[0].slug).toBe("string");
                    (0, globals_1.expect)(typeof result[0].firstName).toBe("string");
                    (0, globals_1.expect)(typeof result[0].lastName).toBe("string");
                    (0, globals_1.expect)(typeof result[0].totalCount).toBe("number");
                    return [2 /*return*/];
            }
        });
    }); });
    (0, globals_1.test)("correct values for single date", function () { return __awaiter(void 0, void 0, void 0, function () {
        var result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, topContributors_1.getTopContributors)(new Date(2022, 9, 26), new Date(2022, 9, 27))];
                case 1:
                    result = _a.sent();
                    (0, globals_1.expect)(result).toBeInstanceOf(Array);
                    (0, globals_1.expect)(result.length).toBe(3);
                    (0, globals_1.expect)("".concat(result[0].firstName, " ").concat(result[0].lastName)).toBe("James Daniel");
                    (0, globals_1.expect)(result[0].totalCount).toBe(5);
                    (0, globals_1.expect)("".concat(result[1].firstName, " ").concat(result[1].lastName)).toBe("Cheryl Vaughn");
                    (0, globals_1.expect)(result[2].totalCount).toBe(4);
                    (0, globals_1.expect)("".concat(result[2].firstName, " ").concat(result[2].lastName)).toBe("Andrew Phillips");
                    (0, globals_1.expect)(result[2].totalCount).toBe(4);
                    return [2 /*return*/];
            }
        });
    }); });
    (0, globals_1.test)("correct values for multiple dates", function () { return __awaiter(void 0, void 0, void 0, function () {
        var result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, topContributors_1.getTopContributors)(new Date(2022, 8, 23), new Date(2022, 9, 22))];
                case 1:
                    result = _a.sent();
                    (0, globals_1.expect)(result).toBeInstanceOf(Array);
                    (0, globals_1.expect)(result.length).toBe(3);
                    (0, globals_1.expect)("".concat(result[0].firstName, " ").concat(result[0].lastName)).toBe("Jessica James");
                    (0, globals_1.expect)(result[0].totalCount).toBe(37);
                    (0, globals_1.expect)("".concat(result[1].firstName, " ").concat(result[1].lastName)).toBe("Alexander Harris");
                    (0, globals_1.expect)(result[1].totalCount).toBe(24);
                    (0, globals_1.expect)("".concat(result[2].firstName, " ").concat(result[2].lastName)).toBe("William Adams");
                    (0, globals_1.expect)(result[2].totalCount).toBe(19);
                    return [2 /*return*/];
            }
        });
    }); });
});
