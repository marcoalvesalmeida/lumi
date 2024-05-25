"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const output_json_1 = __importDefault(require("./swagger/output.json"));
const routes_1 = require("./routes");
const body_parser_1 = __importDefault(require("body-parser"));
const path_1 = __importDefault(require("path"));
const PORT = 3333;
const app = (0, express_1.default)();
app.use((0, morgan_1.default)("dev"));
app.use(body_parser_1.default.json());
app.use((0, cors_1.default)());
app.use('/files', express_1.default.static(path_1.default.join(process.cwd(), 'src/modules/extractor/invoices')));
app.use("/api/", routes_1.router);
app.use("/api/docs", swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(output_json_1.default));
app.listen(PORT, () => {
    console.log(`Server listening at port: ${PORT}`);
});
//# sourceMappingURL=app.js.map