const contacts = require("../services/contacts");

const listContacts = async (req, res, next) => {
  try {
    const all = await contacts.listContacts(req.query);
    res.json(all);
  } catch (e) {
    next(e);
  }
};

const getContactById = async (req, res, next) => {
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
};

const addContact = async (req, res, next) => {
  try {
    const { _id } = req.user;
    const contact = await contacts.addContact(req.body, _id);
    res.status(201).json(contact);
  } catch (e) {
    next(e);
  }
};

const updateContact = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const contact = await contacts.updateContact(contactId, req.body);
    if (!contact) {
      res.status(404).json({ message: "Not Found" });
    } else {
      res.json(contact);
    }
  } catch (e) {
    next(e);
  }
};

const updateStatusContact = async (req, res, next) => {
  try {
    const { contactId } = req.params;

    const contact = await contacts.updateContact(contactId, req.body);
    if (!contact) {
      res.status(404).json({ message: "Not Found" });
    } else {
      res.json(contact);
    }
  } catch (e) {
    next(e);
  }
};

const removeContact = async (req, res, next) => {
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
};

module.exports = {
  listContacts,
  getContactById,
  addContact,
  updateContact,
  updateStatusContact,
  removeContact,
};
