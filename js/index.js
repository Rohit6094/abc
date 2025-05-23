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

const baserowURL = "https://api.baserow.io/api/database/fields/table/543538/"; 
const baserowToken = "Token <wi5QxZE50rFkHDL42h4SVmNTbq8RZYaj>";  
document.getElementById("send_message").addEventListener("click", function () {
  const form = document.getElementById("contact_form");

  // Optional: Generate a unique form ID
  // const formId = generateID();
  // document.getElementById("form_id").value = formId;

  const data = {
    field_4339412: form.name.value,     
    field_4339413: form.email.value,   
    field_4339414: form.phone.value,    
   field_4339416: form.message.value   
    
  };

  fetch(baserowURL, {
    method: "POST",
    headers: {
      "Authorization": TOKEN wi5QxZE50rFkHDL42h4SVmNTbq8RZYaj,
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  })
  .then(response => {
    if (!response.ok) throw new Error("Failed to submit form");
    alert("Your message has been sent successfully!");
    form.reset();
  })
  .catch(error => {
    console.error("Error!", error.message);
    alert("There was an error submitting the form.");
  });
});
