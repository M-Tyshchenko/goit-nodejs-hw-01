const { program } = require("commander");

const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
} = require("./contacts");

program
  .option("-a, --action <action>", "choose action")
  .option("-i, --id <id>", "contact id")
  .option("-n, --name <name>", "contact name")
  .option("-e, --email <email>", "contact email")
  .option("-p, --phone <phone>", "contact phone");

program.parse(process.argv);

const options = program.opts();

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      const contacts = await listContacts();
      return console.log(contacts);

    case "get":
      const getContact = await getContactById(id);
      return console.log(getContact);

    case "remove":
      const removedContact = await removeContact(id);
      return console.log(removedContact);

    case "add":
      const newContact = addContact(name, email, phone);
      return console.log(newContact);

    default:
      console.warn("Unknown action :(");
  }
}

invokeAction(options);
