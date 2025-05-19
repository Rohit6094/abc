const text = document.getElementById("home-page-text");
const words = ["Rohit"];
const wait = 2000;

class typeWriter {
	constructor(text, words, wait) {
		this.text = text;
		this.words = words;
		this.wait = +wait;
		this.txt = "";
		this.wordIndex = 0;
		this.type();
		this.isDeleting = false;
	}
	type() {
		const current = this.wordIndex % this.words.length;
		const fullTxt = this.words[current];
		let typeSpeed = 300;
		if (this.isDeleting) {
			this.txt = fullTxt.substring(0, this.txt.length - 1);
		} else {
			this.txt = fullTxt.substring(0, this.txt.length + 1);
		}
		this.text.innerText = `${this.txt}`;
		if (this.isDeleting) {
			typeSpeed /= 2;
		}
		if (!this.isDeleting && this.txt === fullTxt) {
			typeSpeed = this.wait;
			this.isDeleting = true;
		} else if (this.isDeleting && this.txt === "") {
			this.wordIndex++;
			this.isDeleting = false;
			typeSpeed = 500;
		}
		setTimeout(() => this.type(), typeSpeed);
	}
}
new typeWriter(text, words, wait);


function generateID() {
    return 'form-' + Math.random().toString(36).substr(2, 9);
  }

  document.getElementById("send_message").addEventListener("click", function () {
    const scriptURL = "https://script.google.com/macros/s/AKfycbxV_dXd0GpTuSbOU5opwyV7pXaqOO8jC6ScR3vWTVh87FPxUY-WxR1Ro4GEdye8Fkos/exec"; 
    const form = document.getElementById("contact_form");

    // Generate and set unique form ID
    const formId = generateID();
    document.getElementById("form_id").value = formId;

    // Create JSON object with form data
    const data = {
      id: formId,
      name: form.name.value,
      email: form.email.value,
      phone: form.phone.value,
      message: form.message.value
    };

    // Send form data to Google Apps Script via POST
    fetch(scriptURL, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(response => {
      alert("Your message has been sent successfully!");
      form.reset();
    })
    .catch(error => {
      console.error("Error!", error.message);
      alert("There was an error submitting the form.");
    });
  });

