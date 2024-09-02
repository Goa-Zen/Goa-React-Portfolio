import React from "react";
import emailjs from "emailjs-com";
import { Form, Input, TextArea, Button } from "semantic-ui-react";
import Swal from "sweetalert2";
// import "./App.css";


    // // EmailJS Service ID, template ID and Public Key
    const SERVICE_ID  = 'service_2k8tkkv';
    const TEMPLATE_ID  = 'template_im8b39e';
    const USER_ID  = 'k5xymrxUTOcZ3gXm9';

    // const USER_ID  = 'bb8-k5xymrxUTOcZ3gXm9';



const EmailSubmit = () => {
  
  {/* --- handleOnSubmit method --- */}

    const handleOnSubmit = (e) => {
      e.preventDefault();
      emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, e.target, USER_ID)
        .then((result) => {
          console.log(result.text);
          Swal.fire({
            icon: "success",
            title: "Message Sent Successfully"
          })
        }, (error) => {
          console.log(error.text);
          Swal.fire({
            icon: "error",
            title: "Ooops, something went wrong",
            text: error.text,
          })
        });
      e.target.reset()
    };
return (
    <div className="form-content">
      <Form class="form-wrapper" onSubmit={handleOnSubmit}>
        <Form.Field
          id="form-input-control-email"
          control={Input}
          label="Email"
          name="user_email"
          placeholder="Email…"
          required
          icon="mail"
          iconPosition="left"
        />
        <Form.Field
          id="form-input-control-last-name"
          control={Input}
          label="Name"
          name="user_name"
          placeholder="Name…"
          required
          icon="user circle"
          iconPosition="left"
        />
        <Form.Field
          id="form-input-control-subject"
          control={Input}
          label="Subject"
          name="subject"
          placeholder="Subject…"
          required
          icon="user circle"
          iconPosition="left"
        />        
        <Form.Field
          id="form-textarea-control-opinion"
          control={TextArea}
          label="Message"
          name="message"
          placeholder="Message…"
          required
        />
        <Button type="submit" color="blue">Submit</Button>
      </Form>
    </div>
  );
}


export default EmailSubmit;