const lengthSlider = document.querySelector(".pass-length input");
const options = document.querySelectorAll(".option input");
//span COPY_ICON kanske inte funkar gave den classnamn copy-hover också
const copyIcon = document.querySelector(".input-box span");
const passwordInput = document.querySelector(".inputbox input");
const passIndicator = document.querySelector(".pass-indicator");
const generateButton = document.querySelector(".generate-button");
//checkboxes checked id
const resultEl = document.getElementById('result');
const uppercaseEl = document.getElementById('uppercase');
const lowercaseEl = document.getElementById('lowercase');
const numbersEl = document.getElementById('numbers');
const symbolsEl = document.getElementById('symbols');
const copyall = document.getElementById('copy-all-id')
//object kan använda filter även på object istället för bara arrayer!
Object.filter = (obj, predicate) => 
    Object.keys(obj)
          .filter( key => predicate(obj[key]) )
          .reduce( (res, key) => (res[key] = obj[key], res), {} );


const randomFunc = {
    upper: getUpperCase,
    lower: getLowerCase,
    number: getNumber,
    symbol: getSymbol,
}

generateButton.addEventListener("click", () => {
    const length = +lengthSlider.value;
    const hasUpper = uppercaseEl.checked;
    const hasLower = lowercaseEl.checked;
    const hasNumber = numbersEl.checked;
    const hasSymbol = symbolsEl.checked;
    
    resultEl.value = generatePassword(length, hasLower, hasUpper, hasNumber, hasSymbol);
});



function generatePassword(length, lower, upper, number, symbol) {
    let generatedPassword = "";

    const typesArr = Object.filter({'lower':lower, 'upper':upper,'number':number,'symbol':symbol},item => item);
    for (let i = 0; i < length; i++) {
        let func = Object.keys(typesArr)[Math.floor(Math.random() * Object.keys(typesArr).length)];
        generatedPassword += randomFunc[func]();

    }
    console.log(generatedPassword)
    return generatedPassword;
}

function copypassword() {
    resultEl.value
    console.log(resultEl.value)
    copyToClipboard(resultEl.value);
}
// anända typ alltid om du ska copiera nått
function copyToClipboard(text) {
    const e = document.createElement('textarea');
    e.value = text;
    document.body.appendChild(e); //lägger till TEXTENAREAN I HTML ONSYNLIG EFTER REMOVECHILD.
    e.select(); //selectar allt som den har i sitt value, precis som du skulle markera med musen fast java gör det
    document.execCommand('copy'); // function som exicutar copy commandot samma som CTRL-C
    document.body.removeChild(e); //Tar bort TEXTAREAN FRÅN HTML
 }


function disableOnlyCheckbox(){
	let totalChecked = [uppercaseEl, lowercaseEl, numbersEl, symbolsEl].filter(El => El.checked)
	totalChecked.forEach(El => {
		if(totalChecked.length == 1){
		    El.disabled = true;
		}else{
			El.disabled = false;
		}
	})
}

[uppercaseEl, lowercaseEl, numbersEl, symbolsEl].forEach(El => {
	El.addEventListener('click', () => {
		disableOnlyCheckbox()
	})
})









///////////////////////////////////////////////////////////////////////
function getUpperCase() {
    const uppercase = "QWERTYUIOPÅASDFGHJKLÖÄZXCVBNM";
    return uppercase[Math.floor(Math.random() * uppercase.length)];    
}

function getLowerCase() {
    const lowercase = "qwertyuiopåasdfghjklöäzxcvbnm";
    return lowercase[Math.floor(Math.random() * lowercase.length)];    
}

function getNumber() {
    const numbers = "1234567890";
    return numbers[Math.floor(Math.random() * numbers.length)];    
}

function getSymbol() {
    const symbols = "!#¤%&/()=?`^*><";
    return symbols[Math.floor(Math.random() * symbols.length)];  
}
/////////////////////////////////////////////////////////////


/////////////////////////////////////////////////////


// const generatePassword = () =>{
//     let staticPassword = "";
// }



passLength = lengthSlider.value;

const updatePassindicator = () =>{
    passIndicator.id = lengthSlider.value <= 6 ? "weak" : lengthSlider.value <= 10 ? "medium" : lengthSlider.value <= 16 ? "strong" :  "verystrong";
}


const updateSlider = () => {
    length2 = document.querySelector(".pass-length span").innerText = lengthSlider.value;
    updatePassindicator();
    console.log(lengthSlider.value)
}
updateSlider();


copyall.addEventListener('click', copypassword)
lengthSlider.addEventListener("input", updateSlider);

//varje gång du ska lägga till en eventlister så ska du lägga ett ID!!!!! Copy button
