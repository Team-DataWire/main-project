"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var prisma_1 = __importDefault(require("../../typescript/prisma"));
var categories_1 = __importDefault(require("../../typescript/categories"));
var categoriesCount = function (date1, date2) { return __awaiter(void 0, void 0, void 0, function () {
    var categoriesCounts, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, prisma_1.default.$queryRaw(templateObject_1 || (templateObject_1 = __makeTemplateObject(["SELECT DISTINCT \"categoryId\" AS \"category\", COUNT(\"number\") AS \"count\" FROM \"Post\" WHERE \"createdAt\" BETWEEN ", " AND ", " GROUP BY \"categoryId\" "], ["SELECT DISTINCT \"categoryId\" AS \"category\", COUNT(\"number\") AS \"count\" FROM \"Post\" WHERE \"createdAt\" BETWEEN ", " AND ", " GROUP BY \"categoryId\" "])), date1, date2)];
            case 1:
                categoriesCounts = (_a.sent()).map(function (categoryCount) {
                    var _a;
                    var category = (_a = {}, _a[categories_1.default[categoryCount.category]] = Number(categoryCount.count), _a);
                    if (category) {
                        return category;
                    }
                    else {
                        return { "NULL": 0 };
                    }
                });
                return [2 /*return*/, Promise.resolve(Object.assign.apply(Object, __spreadArray([{}], categoriesCounts, false)))];
            case 2:
                error_1 = _a.sent();
                return [2 /*return*/, Promise.reject(error_1)];
            case 3: return [2 /*return*/];
        }
    });
}); };
// API handler function for next.js routing
function handler(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var date, dateArray, startDate, endDate, categoriesCounts, dateObj, categoriesCounts;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    date = req.query.date;
                    if (!date) return [3 /*break*/, 4];
                    if (!(typeof date === "string")) return [3 /*break*/, 4];
                    dateArray = date.split(",");
                    if (!(dateArray.length === 2)) return [3 /*break*/, 2];
                    startDate = new Date(dateArray[0]);
                    endDate = new Date(dateArray[1]);
                    return [4 /*yield*/, categoriesCount(startDate, endDate)];
                case 1:
                    categoriesCounts = _a.sent();
                    res.json(categoriesCounts);
                    return [3 /*break*/, 4];
                case 2:
                    dateObj = new Date(date);
                    return [4 /*yield*/, categoriesCount(dateObj, dateObj)];
                case 3:
                    categoriesCounts = _a.sent();
                    res.json(categoriesCounts);
                    _a.label = 4;
                case 4: return [2 /*return*/];
            }
        });
    });
}
exports.default = handler;
var templateObject_1;
