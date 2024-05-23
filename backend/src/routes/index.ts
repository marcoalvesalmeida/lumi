import { Router } from "express";
import { clientController } from "../modules/client/ClientController";
import { invoiceController } from "../modules/invoices/InvoiceController";

const router = Router();

router.get("/", function (req, res) {
    res.status(200).json("Hello World");
});

router.get("/clients", clientController.handleListAllClients);
router.get("/invoices/:client", invoiceController.handleFindInvoiceByClient);

export { router };
