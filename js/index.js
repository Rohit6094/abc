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
