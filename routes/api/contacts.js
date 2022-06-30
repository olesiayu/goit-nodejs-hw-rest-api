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
const { auth } = require("../../middlewares/auth");

router.get("/", auth, listContacts);

router.get("/:contactId", getContactById);

router.post("/", validateRequest(schemaCreate), auth, addContact);

router.put("/:contactId", validateRequest(schemaCreate), updateContact);

router.patch(
  "/:contactId/favorite",
  validateRequest(schemaPatch),
  updateStatusContact
);

router.delete("/:contactId", auth, removeContact);

module.exports = router;
