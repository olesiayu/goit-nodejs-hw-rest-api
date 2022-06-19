const express = require("express");
const Joi = require("joi");
const contacts = require("../../models/contacts");
const router = express.Router();
const createError = require("../../errors");

const schema = Joi.object({
  name: Joi.string().min(3).required(),
  email: Joi.string().email().required(),
  phone: Joi.number().min(6).required(),
});

router.get("/", async (req, res, next) => {
  try {
    const all = await contacts.listContacts();
    res.json(all);
  } catch (e) {
    next(e);
  }
  // res.json({ message: "template message" });
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
  // res.json({ message: "template message" });
});

router.post("/", async (req, res, next) => {
  try {
    const { error } = schema.validate(req.body);
    if (error) {
      throw createError(400, error.message);
    }
    const { name, email, phone } = req.body;
    const contact = await contacts.addContact(name, email, phone);
    res.status(201).json(contact);
  } catch (e) {
    next(e);
  }
  // res.json({ message: "template message" });
});

router.delete("/:contactId", async (req, res, next) => {
  try {
    const { id } = req.params;
    const contact = await contacts.removeContact(id);
    if (!contact) {
      res.status(404).json({ message: "Not Found" });
    } else {
      res.json({ message: "Contact deleted" });
    }
  } catch (e) {
    next(e);
  }
  // res.json({ message: "template message" });
});

router.put("/:contactId", async (req, res, next) => {
  try {
    const { error } = schema.validate(req.body);
    if (error) {
      throw createError(400, error.message);
    }
    const { name, email, phone } = req.body;
    const { id } = req.params;
    const contact = await contacts.updateContact(id, name, email, phone);
    if (!contact) {
      res.status(404).json({ message: "Not Found" });
    } else {
      res.json(contact);
    }
  } catch (e) {
    next(e);
  }
  // res.json({ message: "template message" });
});

module.exports = router;
