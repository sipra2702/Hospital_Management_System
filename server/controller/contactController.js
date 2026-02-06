const Contact = require("../model/Contact");


const AddContact = async (req, res) => {
  try {

    const contact = await Contact.find()

    return res.json({
      message: "contacts get success",
      contact: xyz,
      status: true,
    });
  } catch (err) {
    return res.json({
      message: "Error while create contact",
      status: false,
    });
  }
};
const GetContact = async (req, res) => {
  try {
    return res.json({
      message: "lets get contact",
    });
  } catch (err) {
    console.log(err);

    return res.json({
      message: "Error while fetch ",
      status: false,
});
  }
};
  const UpdateContact = async (req, res) => {
  try {

    const updatedContact = await Contact.findByIdAndUpdate(req.params.id,req.body)
    return res.json({
      message: "lets update contact",
      status: true,
      updatedContact,
    });
  } catch (err) {

    return res.json({
      message: "Error while update contact",
      status: false,
});
  }
};
const DeleteContact = async (req, res) => {
  try {
      const deletedContact = await Contact.findByIdAndDelete(req.params.id)
   
    return res.json({
      message: "Deleted successfully",
      status: true,
      deletedContact,
    });
  } catch (err) {
    console.log(err);
    return res.json({
      message: "Error while delete contact",
      status: false,
});
  }
};


module.exports = {
  AddContact,
  GetContact,
  UpdateContact,
  DeleteContact,
};