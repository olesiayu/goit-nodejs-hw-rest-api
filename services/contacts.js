const { Contact } = require("../models/schema");

const listContacts = async (query) => {
  const { page, limit } = query;
  const skipped = (page - 1) * limit;
  const skip = skipped < 0 ? 0 : skipped;
  return Contact.find({}, {}, { skip, limit: +limit }).populate(
    "owner",
    "email subscription"
  );
};

const getContactById = async (contactId) => {
  return Contact.findById(contactId);
};

const addContact = async (contact, id) => {
  return Contact.create({ ...contact, owner: id });
};

const updateContact = async (contactId, contact) => {
  return Contact.findByIdAndUpdate(contactId, contact, { new: true });
};

const removeContact = async (contactId) => {
  return Contact.findByIdAndDelete(contactId);
};

module.exports = {
  listContacts,
  getContactById,
  addContact,
  updateContact,
  removeContact,
};
