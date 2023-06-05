const Contact = require('../models/contactModel')

const qrCode = require('qrcode')

const createInfo = async (req, res) => {
    const {whatsApp, messenger, email, contactNo} = req.body

    let emptyFields = []

    // if(!name) {
    //     emptyFields.push("name")
    // }
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
        let response = []
        const contact = await Contact.create({whatsApp, messenger, email, contactNo})
        qrCode.toDataURL(whatsApp, (error, qrDataURLWhatsApp) => {
            if (error) {
                console.error('Failed to generate QR code:', error);
            } else {
                console.log('WhatsApp URL:', qrDataURLWhatsApp)
                response.push('qrDataURLWhatsApp')
            }
        })
        qrCode.toDataURL(messenger, (error, qrDataURLMessenger) => {
            if (error) {
                console.error('Failed to generate Messgenger QR', error);
            } else {
                console.log('Messgenger QR:', qrDataURLMessenger);
                response.push('qrDataURLMessenger')
            }
        })
        res.status(200).json(response)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

module.exports = { createInfo };