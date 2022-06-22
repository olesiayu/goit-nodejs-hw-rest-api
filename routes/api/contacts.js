const express = require("express");
const Joi = require("joi");
const contacts = require("../../models/contacts");
const router = express.Router();
const createError = require("../../errors");

const schema = Joi.object({
  name: Joi.string().min(3).required(),
  email: Joi.string().email().required(),
  phone: Joi.string()
    .min(7)
    .pattern(/^[0-9]+$/)
    .required(),
});

router.get("/", async (req, res, next) => {
  try {
    const all = await contacts.listContacts();
    res.json(all);
  } catch (e) {
    next(e);
  }
});

router.get("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const contact = await contacts.getContactById(contactId);
    if (!contact) {
      res.status(404).json({ message: "Not Found" });
    } else {
      res.json(contact);
    }
  } catch (e) {
    next(e);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const { error } = schema.validate(req.body);
    if (error) {
      throw createError(400, { message: "missing required field" });
    }
    const { name, email, phone } = req.body;
    const contact = await contacts.addContact(name, email, phone);
    res.status(201).json(contact);
  } catch (e) {
    next(e);
  }
});

router.delete("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const contact = await contacts.removeContact(contactId);
    if (!contact) {
      res.status(404).json({ message: "Not Found" });
    } else {
      res.json({ message: "Contact deleted" });
    }
  } catch (e) {
    next(e);
  }
});

router.put("/:contactId", async (req, res, next) => {
  try {
    const { error } = schema.validate(req.body);
    if (error) {
      throw createError(400, { message: "missing fields" });
    }
    const { name, email, phone } = req.body;
    const { contactId } = req.params;
    const contact = await contacts.updateContact(contactId, name, email, phone);
    if (!contact) {
      res.status(404).json({ message: "Not Found" });
    } else {
      res.json(contact);
    }
  } catch (e) {
    next(e);
  }
});

module.exports = router;
