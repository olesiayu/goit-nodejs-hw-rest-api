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

router.post("/", validateRequest(schemaCreate), addContact);

router.put("/:contactId", validateRequest(schemaCreate), updateContact);

router.patch(
  "/:contactId/favorite",
  validateRequest(schemaPatch),
  updateStatusContact
);

router.delete("/:contactId", removeContact);

module.exports = router;
