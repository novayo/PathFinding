import React, { useState } from 'react'
import Modal from 'react-bootstrap/Modal';
import emailjs from 'emailjs-com';

// emailjs: https://dashboard.emailjs.com/admin/templates/57jjeff
function Email() {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    function SendEmail(e) {
        e.preventDefault();
        console.log(e.target)
        emailjs.sendForm('PathFinding', 'template_642ox18', e.target, 'user_ukZuD8qr4KxKtc2jHeC1M')
            .then((result) => {
                console.log(result.text);
            }, (error) => {
                console.log(error.text);
            });
        handleClose();
    }

    return (
        <>
            <div id="container-floating">
                <div id="floating-button" data-toggle="tooltip" data-placement="left" data-original-title="Create" onClick={handleShow}>
                    <img className="edit" src="https://i.imgur.com/1vyJaJF.png" alt="" />
                </div>
            </div>

            {/* Form Style 4: https://www.sanwebe.com/2014/08/css-html-forms-designs */}
            <Modal show={show} size='md' onHide={handleClose} centered dialogClassName="Modal1">
                <form className="form-style-4" onSubmit={SendEmail}>
                    <label htmlFor="field1">
                        <span>Enter Your Name</span><input type="text" name="from_name" required />
                    </label>
                    <label htmlFor="field2">
                        <span>Email Address</span><input type="email" name="user_email" required />
                    </label>
                    <label htmlFor="field4">
                        <span>Message to Us</span><textarea name="message" required></textarea>
                    </label>
                    <label>
                        <span> </span><input type="submit" value="Send Letter" />
                    </label>
                </form>
            </Modal>
        </>
    )
}

export default Email
