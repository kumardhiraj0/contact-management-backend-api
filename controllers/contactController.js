const asyncHandler = require("express-async-handler");
const Contact = require("../models/contactModal");

// Get all contacts
//private route
const getContact = asyncHandler(async (req, res) => {
  try {
    const contacts = await Contact.find({user_id : req.user.id});
    if (contacts.length > 0) {
      res.status(200).json(contacts);
    } else {
      res.status(404).json({ message: "Data is empty" });
    }
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch contacts", error: error.message });
  }
});

// Get contact with specific id
//private route
const getContactWithId = asyncHandler(async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
      res.status(404).json({ message: "Contact not found" });
    } else {
      res.status(200).json(contact);
    }
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch contact", error: error.message });
  }
});

// Create a new contact
//private route
const createContact = asyncHandler(async (req, res) => {
  const { name, email, phone } = req.body;

  if (!name || !email || !phone) {
    return res.status(400).json({ message: "All fields are mandatory" });
  }

  try {
    const newContact = await Contact.create({
      name,
      email,
      phone,
      user_id : req.user.id
    });
    res.status(201).json(newContact);
  } catch (error) {
    res.status(500).json({ message: "Failed to create contact", error: error.message });
  }
});

// Update a contact
//private route
const updateContact = asyncHandler(async (req, res) => {
    try {
      // Find the contact first to check ownership
      const existingContact = await Contact.findById(req.params.id);
  
      if (!existingContact) {
        res.status(404).json({ message: "Contact not found" });
        return;
      }
  
      if (existingContact.user_id.toString() !== req.user.id) {
        res.status(403);
        throw new Error("User doesn't have permission to update other user's contact");
      }
  
      // Now update the contact
      const updatedContact = await Contact.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );
  
      if (!updatedContact) {
        res.status(404).json({ message: "Contact not found" });
      } else {
        res.status(200).json(updatedContact);
      }
    } catch (error) {
      res.status(500).json({ message: "Failed to update contact", error: error.message });
    }
  });
  

// Delete a contact
//private route
const deleteContact = asyncHandler(async (req, res) => {
    try {
      const deletedContact = await Contact.findById(req.params.id);
      if (!deletedContact) {
        res.status(404).json({ message: "Contact not found" });
      } else if (deletedContact.user_id.toString() !== req.user.id) {
        res.status(403);
        throw new Error("User doesn't have permission to delete other user's contact");
      } else {
        await Contact.deleteOne({ _id: req.params.id });
        res.status(200).json(deletedContact);
      }
    } catch (error) {
      res.status(500).json({ message: "Failed to delete contact", error: error.message });
    }
  });
module.exports = {
  getContact,
  createContact,
  updateContact,
  deleteContact,
  getContactWithId,
};


// // //for handling async operation no need to write try catch
// // const asyncHandler = require("express-async-handler");
// // //importing modal
// // const Contact = require("../models/contactModal");
// // //@desc Get all contacts
// // //@route Get api/contacts
// // //@access public
// // const getContact = asyncHandler(async (req, res) => {
// //     const contacts = await Contact.find();
// //   res.status(200).json(contacts);
// // });

// // //@desc Get  contact with id
// // //@route Get api/contacts
// // //@access public
// // const getContactWithId = asyncHandler(async(req, res) => {
// //   res.status(200).json({
// //     message: `get contact with id ${req.params.id}`,
// //   });
// // });

// // //@desc create new contact
// // //@route POST api/contacts
// // //@access public
// // const createContact = asyncHandler(async (req, res) => {
// //     console.log("data from the body is :" ,req.body);

// //     const {name,email,phone} =  req.body;
// //     if(!name || !email || !phone){
// //         // throw new Error("All field are mandotory")
// //         res.status(400)
// //         throw new Error("All fields are mandotory");
// //     }
// //     else{
// //         const contact = await Contact.create({
// //             name,
// //             email,
// //             phone
// //         })
// //         res.status(201).json(contact)
// //     }
  
// // });

// // //@desc update contact
// // //@route PUT api/contacts
// // //@access public
// // const updateContact = asyncHandler(async(req, res) => {
// //   res.status(200).json({
// //     message: `Update user with id ${req.params.id}`,
// //   });
// // });

// // //@desc update contact
// // //@route PUT api/contacts
// // //@access public
// // const deleteContact = asyncHandler(async(req, res) => {
// //   res.status(200).json({
// //     message: `Delete user with id ${req.params.id}`,
// //   });
// // });
// // module.exports = {
// //   getContact,
// //   createContact,
// //   updateContact,
// //   deleteContact,
// //   getContactWithId,
// // };

// // // (req,res)=>{
// // //     res.status(200).json({
// // //         message:`get user with id ${req.params.id}`
// // //     })
// // // })
// const asyncHandler = require("express-async-handler");
// const Contact = require("../models/contactModal");

// // Get all contacts
// const getContact = asyncHandler(async (req, res) => {
//   const contacts = await Contact.find();
//   if(contacts.length){
//     res.status(200).json(contacts);
//   }else{
//     res.status(404).json({message:"Data is empty"});
//   }
  
// });

// // Get contact with specific id
// const getContactWithId = asyncHandler(async (req, res) => {
//   const contact = await Contact.findById(req.params.id);
//   if (!contact) {
//     res.status(404).json({ message: "Contact not found" });
//   } else {
//     res.status(200).json(contact);
//   }
// });

// // Create a new contact
// const createContact = asyncHandler(async (req, res) => {
//     const { name, email, phone } = req.body;

//     if (!name || !email || !phone) {
//       return res.status(400).json({ message: "All fields are mandatory" });
//     }
  
//     try {
//       const newContact = await Contact.create({
//         name,
//         email,
//         phone,
//       });
  
//       const savedContact = await newContact.save();
//       res.status(201).json(savedContact);
//     } catch (error) {
//       res.status(500).json({ message: "Failed to create contact", error: error.message });
//     }
//   });

// // Update a contact
// const updateContact = asyncHandler(async (req, res) => {
//   // Implement the update logic using Contact.findByIdAndUpdate or similar
//   // You'll also need to validate the ID and the data being updated
//   const contact = await Contact.findById(req.params.id);
//   if (!contact) {
//     res.status(404).json({ message: "Contact not found" });
//   } else {
//     //res.status(200).json(contact);
//     const updatedContact = await Contact.findByIdAndUpdate(
//         req.params.id,
//         req.body,
//         {new : true}
//       )
//       res.status(200).json(updatedContact)
//   }
  
// });

// // Delete a contact
// const deleteContact = asyncHandler(async (req, res) => {
//   // Implement the delete logic using Contact.findByIdAndDelete or similar
//   // You'll also need to validate the ID
//   const contact = await Contact.findById(req.params.id);
//   if (!contact) {
//     res.status(404).json({ message: "Contact not found" });
//   } else {
//     //res.status(200).json(contact);
//     await Contact.remove();
//     res.status(200).json(contact);
//   }
// });

// module.exports = {
//   getContact,
//   createContact,
//   updateContact,
//   deleteContact,
//   getContactWithId,
// };


