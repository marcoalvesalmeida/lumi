"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const ClientController_1 = require("../modules/client/ClientController");
const InvoiceController_1 = require("../modules/invoices/InvoiceController");
const router = (0, express_1.Router)();
exports.router = router;
router.get("/", function (req, res) {
    res.status(200).json("Hello World");
});
router.get("/clients", ClientController_1.clientController.handleListAllClients);
router.get("/invoices/:client", InvoiceController_1.invoiceController.handleFindInvoiceByClient);
router.get("/invoices/paths/:client", InvoiceController_1.invoiceController.handleFindInvoicePathByClient);
//# sourceMappingURL=index.js.map