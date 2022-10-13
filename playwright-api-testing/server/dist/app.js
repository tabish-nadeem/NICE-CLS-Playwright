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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const axios_1 = __importDefault(require("axios"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.listen(process.env.PORT, () => {
    console.info(`Server up and running on PORT ${process.env.PORT}`);
});
const baseUrl = 'https://jsonplaceholder.typicode.com';
app.get('/:env', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.params);
    console.log(req.query);
    const subUrl = getSubUrl(req.params.env);
    const response = yield axios_1.default.get(`${baseUrl}/${subUrl}`);
    const data = yield response.data;
    const statusCode = response.status;
    // return data;
    res.json(data).sendStatus(statusCode);
}));
// dev === users
const getSubUrl = (param) => {
    if (param === process.env.DEV) {
        return 'users';
    }
    else if (param === process.env.STAGE) {
        return 'postss';
    }
    else {
        return 'todos';
    }
};
//# sourceMappingURL=app.js.map