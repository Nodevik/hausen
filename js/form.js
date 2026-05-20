
function sendEmail() {

  const name = document.getElementById("name").value;
  const phone = document.getElementById("phone").value;
  const email = document.getElementById("email").value;
  const product = document.getElementById("product").value;
  const message = document.getElementById("message").value;

  const subject = encodeURIComponent("New Enquiry from Website");

  const body = encodeURIComponent(
`Name: ${name}

Phone: ${phone}

Email: ${email}

Product Interest: ${product}

Message:
${message}`
  );

  // OPEN GMAIL DIRECTLY
  window.open(
    `https://mail.google.com/mail/?view=cm&fs=1&to=help@hausen.co.in&su=${subject}&body=${body}`,
    "_blank"
  );

}
