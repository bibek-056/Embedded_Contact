const express = require('express')
const Contact = require('../models/contactModel')
const router = express.Router()
const util = require('util');
const qrCode = require('qrcode');
const mongoose = require('mongoose')



router.post('/', async (req, res) => {
    const {name, whatsApp, messenger, email, contactNo} = req.body

    let emptyFields = []

    if(!name) {
        emptyFields.push("name")
    }
    if (!whatsApp) {
        emptyFields.push("whatsApp")
    }
    if (!messenger) {
        emptyFields.push("messenger")
    }
    if (!email) {
        emptyFields.push("email")
    }
    if (!contactNo) {
        emptyFields.push("contactNo")
    }
    if (emptyFields.length>0) {
        return res.status(400).json({error: 'Please fill all the contact information', emptyFields})
    }

    try {
        let whatsAppQR;
        let messengerQR;

        try {
            whatsAppQR = await util.promisify(qrCode.toDataURL)(whatsApp);
            console.log('WhatsApp URL:', whatsAppQR);

            messengerQR = await util.promisify(qrCode.toDataURL)(messenger);
            console.log('Messenger QR:', messengerQR);
        } catch (error) {
            console.error('Failed to generate QR code:', error);
            res.status(400).json({ error: error.message });
        }
    const contact = await Contact.create({ name, whatsApp, messenger, email, contactNo, whatsAppQR, messengerQR });
    res.status(200).json(contact._id);
    } catch (error) {
    console.error('Error creating contact:', error);
    res.status(400).json({ error: error.message });
    }

} )

router.get('/:id', async ( req, res) => { 
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such Contact'})
    }

    const contact = await Contact.findById(id)

    if (!contact) {
        return res.status(404).json({error: 'No such Contact'})
    }

    res.status(200).json(contact)
})

module.exports = router;