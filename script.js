const display = document.getElementById('password-display');
const genBtn = document.getElementById('generate-btn');
const slider = document.getElementById('length-slider');
const lengthVal = document.getElementById('length-val');

slider.oninput = () => lengthVal.innerText = slider.value;

function generate() {
    const length = slider.value;
    const charset = {
        lower: "abcdefghijklmnopqrstuvwxyz",
        upper: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
        num: "0123456789",
        sym: "!@#$%^&*()_+~`|}{[]:;?><,./-="
    };

    let pool = charset.lower;
    if(document.getElementById('upper').checked) pool += charset.upper;
    if(document.getElementById('numbers').checked) pool += charset.num;
    if(document.getElementById('symbols').checked) pool += charset.sym;

    // --- CYBERSECURITY BEST PRACTICE: CSPRNG ---
    let password = "";
    const randomValues = new Uint32Array(length);
    window.crypto.getRandomValues(randomValues);

    for (let i = 0; i < length; i++) {
        password += pool[randomValues[i] % pool.length];
    }
    
    display.value = password;
    updateStrength(password, pool.length);
}

function updateStrength(pwd, poolSize) {
    const entropy = Math.floor(pwd.length * Math.log2(poolSize));
    const bar = document.getElementById('strength-bar');
    document.getElementById('entropy-text').innerText = `Entropy: ${entropy} bits`;

    if (entropy < 60) { bar.style.width = "30%"; bar.style.background = "#ef4444"; }
    else if (entropy < 100) { bar.style.width = "65%"; bar.style.background = "#f59e0b"; }
    else { bar.style.width = "100%"; bar.style.background = "#22c55e"; }
}

genBtn.addEventListener('click', generate);