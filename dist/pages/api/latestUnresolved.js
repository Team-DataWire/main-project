"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getLatestUnresolved = void 0;
var prisma_1 = __importDefault(require("../../typescript/prisma"));
var categories_1 = __importDefault(require("../../typescript/categories"));
/**
 * @description Get latest unresolved posts
 * @param count
 * @returns Promise of returned Post[]
 */
var getLatestUnresolved = function (startDate, endDate, count) {
    if (startDate === void 0) { startDate = new Date(2022, 8, 5); }
    if (endDate === void 0) { endDate = new Date(2022, 11, 15); }
    if (count === void 0) { count = 10; }
    return __awaiter(void 0, void 0, void 0, function () {
        var latestUnresolved, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, prisma_1.default.post
                            .findMany({
                            where: {
                                createdAt: {
                                    gte: startDate,
                                    lte: endDate,
                                },
                                // filter out private posts
                                NOT: [
                                    {
                                        body: {
                                            startsWith: "zzz",
                                        },
                                    },
                                ],
                                // we want posts with no comments, where the answeredAt field is null
                                answeredAt: null,
                            },
                            take: count,
                            orderBy: {
                                createdAt: "desc",
                            },
                            select: {
                                // select the following fields to return
                                title: true,
                                body: true,
                                slug: true,
                                categoryId: true,
                                publishedAt: true,
                            },
                        })
                            // map the posts to include the category name, to the PostData interface
                            .then(function (posts) {
                            return posts.map(function (post) { return (__assign(__assign({}, post), { category: categories_1.default[post.categoryId] })); });
                        })];
                case 1:
                    latestUnresolved = _a.sent();
                    return [2 /*return*/, Promise.resolve(latestUnresolved)];
                case 2:
                    error_1 = _a.sent();
                    return [2 /*return*/, Promise.reject(error_1)];
                case 3: return [2 /*return*/];
            }
        });
    });
};
exports.getLatestUnresolved = getLatestUnresolved;
// API handler function for next.js routing
function handler(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var date, dateArray, startDate, endDate, contributors, dateObj, contributors;
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
                    return [4 /*yield*/, (0, exports.getLatestUnresolved)(startDate, endDate)];
                case 1:
                    contributors = _a.sent();
                    res.json(contributors);
                    return [3 /*break*/, 4];
                case 2:
                    dateObj = new Date(date);
                    return [4 /*yield*/, (0, exports.getLatestUnresolved)(dateObj, dateObj)];
                case 3:
                    contributors = _a.sent();
                    res.json(contributors);
                    _a.label = 4;
                case 4: return [2 /*return*/];
            }
        });
    });
}
exports.default = handler;
