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
var dayPosts_1 = require("../pages/api/dayPosts");
var node_test_1 = require("node:test");
/**
 * @description Get posts by which day of the week they were published
 * check if the result is an array and has
 * the corresponding types expected from the output
 * along with single day and multiple day tests
 */
(0, node_test_1.describe)("getDayPosts", function () {
    (0, globals_1.test)("correct properties", function () { return __awaiter(void 0, void 0, void 0, function () {
        var result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, dayPosts_1.getDayPosts)()];
                case 1:
                    result = _a.sent();
                    (0, globals_1.expect)(result).toBeInstanceOf(Object);
                    (0, globals_1.expect)(result).toHaveProperty("Monday");
                    (0, globals_1.expect)(result).toHaveProperty("Tuesday");
                    (0, globals_1.expect)(result).toHaveProperty("Wednesday");
                    (0, globals_1.expect)(result).toHaveProperty("Thursday");
                    (0, globals_1.expect)(result).toHaveProperty("Friday");
                    (0, globals_1.expect)(result).toHaveProperty("Saturday");
                    (0, globals_1.expect)(result).toHaveProperty("Sunday");
                    return [2 /*return*/];
            }
        });
    }); });
    (0, globals_1.test)("correct types", function () { return __awaiter(void 0, void 0, void 0, function () {
        var result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, dayPosts_1.getDayPosts)()];
                case 1:
                    result = _a.sent();
                    (0, globals_1.expect)(result).toBeInstanceOf(Object);
                    (0, globals_1.expect)(typeof result.Monday).toBe("number");
                    (0, globals_1.expect)(typeof result.Tuesday).toBe("number");
                    (0, globals_1.expect)(typeof result.Wednesday).toBe("number");
                    (0, globals_1.expect)(typeof result.Thursday).toBe("number");
                    (0, globals_1.expect)(typeof result.Friday).toBe("number");
                    (0, globals_1.expect)(typeof result.Saturday).toBe("number");
                    (0, globals_1.expect)(typeof result.Sunday).toBe("number");
                    return [2 /*return*/];
            }
        });
    }); });
    (0, globals_1.test)("correct values for single date", function () { return __awaiter(void 0, void 0, void 0, function () {
        var result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, dayPosts_1.getDayPosts)(new Date(2022, 11, 4), new Date(2022, 11, 5))];
                case 1:
                    result = _a.sent();
                    (0, globals_1.expect)(result).toBeInstanceOf(Object);
                    (0, globals_1.expect)(result.Monday).toBe(0);
                    (0, globals_1.expect)(result.Tuesday).toBe(0);
                    (0, globals_1.expect)(result.Wednesday).toBe(0);
                    (0, globals_1.expect)(result.Thursday).toBe(0);
                    (0, globals_1.expect)(result.Friday).toBe(0);
                    (0, globals_1.expect)(result.Saturday).toBe(0);
                    (0, globals_1.expect)(result.Sunday).toBe(5);
                    return [2 /*return*/];
            }
        });
    }); });
    (0, globals_1.test)("correct values for multiple dates", function () { return __awaiter(void 0, void 0, void 0, function () {
        var result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, dayPosts_1.getDayPosts)(new Date(2022, 9, 1), new Date(2022, 10, 1))];
                case 1:
                    result = _a.sent();
                    (0, globals_1.expect)(result).toBeInstanceOf(Object);
                    (0, globals_1.expect)(result.Monday).toBe(27);
                    (0, globals_1.expect)(result.Tuesday).toBe(50);
                    (0, globals_1.expect)(result.Wednesday).toBe(79);
                    (0, globals_1.expect)(result.Thursday).toBe(14);
                    (0, globals_1.expect)(result.Friday).toBe(11);
                    (0, globals_1.expect)(result.Saturday).toBe(7);
                    (0, globals_1.expect)(result.Sunday).toBe(19);
                    return [2 /*return*/];
            }
        });
    }); });
});
