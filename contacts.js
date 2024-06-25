const fs = require('fs').promises;
const path = require('path'); 
const { v4: uuidv4 } = require('uuid');

const contactsPath = path.join(__dirname, "/db/contacts.json");

async function listContacts() {
  try {
    const data = await fs.readFile(contactsPath);
    contacts = JSON.parse(data.toString());

    return contacts;
    
  } catch (error) {
    console.log(error.message)
  }
}

async function getContactById(contactId) {

  try {
    const contacts = await listContacts();
    const contact = contacts.filter((contact) => contact.id === contactId);

    if (contact.length > 0) {
            console.table(contact)
    } else {
      console.log(`Sorry, there is no contact with id ${contactId}`)
    }
    
  } catch (error) {
    console.error(error.message)
  }
}


async function removeContact(contactId) {

  try {
    const contacts = await listContacts();
    const contactIndex = contacts.findIndex((contact) => contact.id === contactId);
    if (contactIndex !== -1) {
      contacts.splice(contactIndex, 1);
      await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
      console.log(`Contact with the id ${contactId} has been removed.`)        
    } else {
      console.log(`There is no contact in database with ID ${contactId}`)
    }
    
  } catch (error) {
    console.log(error.message)
    
  }
};


async function addContact(name, email, phone) {
  try {
    const contacts = await listContacts();
    const newContact = {
      id: uuidv4(),
      name,
      email,
      phone
    } 
    contacts.push(newContact);
    console.log(newContact);
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    console.log("New contact has been added succesfully");
   
  } catch (error) {
    console.error(error.message)
  
}}

module.exports = {
    listContacts,
    getContactById,
    removeContact,
    addContact,
}