const express = require("express");
const router = express.Router();
const { validateRequest } = require("../../middlewares/validateRequest");

const {
  listContacts,
  getContactById,
  addContact,
  updateContact,
  updateStatusContact,
  removeContact,
} = require("../../controllers/contacts");
const { schemaCreate, schemaPatch } = require("../../models/schema");

router.get("/", listContacts);

router.get("/:contactId", getContactById);

router.post(
  "/",
  validateRequest(schemaCreate, "missing required field"),
  addContact
);

router.put(
  "/:contactId",
  validateRequest(schemaCreate, "missing required field"),
  updateContact
);

router.patch(
  "/:contactId/favorite",
  validateRequest(schemaPatch, "missing field favorite"),
  updateStatusContact
);

router.delete("/:contactId", removeContact);

module.exports = router;
