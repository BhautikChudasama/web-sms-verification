<script>
import { isLoading, verifyPhase, verified } from "./stores.js";
import Snackbar from "./Snackbar.svelte";

let isCopied = false;
let verifingS = false;
let verifiedS = false;

// Copy text
const copy = (e) => {
    e.preventDefault();
    const range = document.createRange();
    range.selectNode(document.querySelector("#message"));
    window.getSelection().removeAllRanges();
    window.getSelection().addRange(range);
    document.execCommand('copy');
    isCopied = true;
    setTimeout(() => {
        isCopied = !isCopied;
    }, 4000);
}

const verify = (e) => {
    e.preventDefault();
    isLoading.update(n => n = !n);
    verifyPhase.update(n => n = true);
    startVerifingPhase();
}

const _otp = () => {
    var codeLen = document.querySelector("#otp").value.length;
    if(codeLen <=0 || codeLen > 6) return;
    document.querySelector("#verifyButton").disabled = true;
    verifingS = true;
    setTimeout(() => {
        verifyPhase.update(n => n = false);
        verified.update(n => n = true);  
        setTimeout(() => {
            verified.update(n => n = false); 
            isLoading.update(n => n = !n); 
        },4000);    
    }, 4000);
}

async function startVerifingPhase() {
    if(!navigator.sms) {
        alert("Your device not support SMS Receiver API");
        return;
    }
    try {
        const sms = await navigator.sms.receive();
        const code = sms.content.match(/^[\s\S]*otp=([0-9]{6})[\s\S]*$/m)[1];
        if(code) {
            document.querySelector("#otp").value = code;
            _otp();
        }
        else {
            alert("SMS Received but not get OTP!");
        }
    }
    catch(e) {
        alert(e);
    }
}



let isVerfied = false;
let isVerifyPhase = false;

verified.subscribe((n) => {
    isVerfied = n;
})

verifyPhase.subscribe((n) => {
    isVerifyPhase = n;
})

</script>

<style>
.i {
    width: 100%;
    display: block;
    margin-top: 16px;
}
.i .howTo {
    font-family: Roboto;
    font-style: normal;
    font-weight: 500;
    font-size: 11px;
    line-height: 16px;
    text-align: left;
    letter-spacing: .8px;
    text-transform: uppercase;
    color: rgba(0, 0, 0, 0.87);
}
ol {
    counter-reset: ol-step-counter;
    list-style: none;
    margin: 10px 0;
    padding-left: 48px;
    position: relative;
}
ol>li {
    counter-increment: ol-step-counter;
    font-size: 14px;
    line-height: 1.778rem;
    margin-bottom: 8px;
}
ol>li::before {
    -webkit-box-align: center;
    -webkit-box-pack: center;
    align-items: center;
    background: #5f6368;
    border-radius: 50%;
    color: #fff;
    content: counter(ol-step-counter);
    display: -ms-inline-flexbox;
    display: -webkit-inline-box;
    display: inline-flex;
    flex-shrink: 0;
    font-size: .75em;
    height: 20px;
    justify-content: center;
    left: 0;
    margin: 4px 0 0;
    position: absolute;
    width: 20px;
}
ol>li {
    font-size: 16px;
    padding-top: 8px;
}
code {
    background: #f7f7f7;
    border: 1px solid #dadce0;
    hyphens: none;
    tab-size: 2;
    text-align: left;
    word-spacing: normal;
    font-size: 14px;
    font-weight: 400;
    margin: 0 .25em;
    padding: .125em .25em;
}
pre {
    max-width: 90%;
    width: 90%;
    overflow: scroll;
    border: 2px solid var(--primary-color);
    padding: 8px;
    background: #543da82e;
    border-radius: 4px;
    word-wrap: break-word;
    white-space: pre-wrap;
}
.action {
    display: block;
}
.action .nav {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
}
.action .nav .copyButton {
    padding: 10px 16px;
    background: #fff;
    color: var(--primary-color);
    text-transform: uppercase;
    font-size: 14px;
    font-weight: bold;
    border: 0;
    border-radius: 4px;
}
.action .nav .copyButton:focus {
    background: #543da824;
    outline: 0;
}
.verifyButton {
    padding: 10px 16px;
    background: var(--primary-color);
    color: #fff;
    text-transform: uppercase;
    font-size: 14px;
    font-weight: bold;
    border: 0;
    border-radius: 4px;
    margin-left: 12px;
}
.verifyButton:focus {
    opacity: 0.8;
}

.verifyButton:disabled {
    opacity: 0.2;
}
.verifyPhase {
    width: 100%;
    margin: 0;
    display: flex;
    justify-content: center;
    margin-top: 50px;
}

.textbox {
    width: 180px;
    height: 42px;
    font-size: 22px;
    outline: 0;
    letter-spacing: 8px;
    text-align: center;
    font-weight: bold;
    border: 0;
    font-family: Roboto;
    border-bottom: 2px solid var(--primary-color);
}

</style>

<!-- instructions -->
{#if !isVerifyPhase}
<div class="i">
    <div class="howTo">
        How Demo Work
    </div>
    <div class="steps">
        <ol>
            <li>Prepare <b>Google Chrome Beta</b> on Android with the Experimental Web Platform features flag turned on at <code>chrome://flags/#enable-experimental-web-platform-features</code>.</li>
            <li>Press <b>Copy</b> to copy message.</li>
            <li>Press <b>Verify</b>.</li>
            <li>From other phone or this phone, send yourself the copied message via SMS.</li>
        </ol>
    </div>
    <div class="howTo" style="margin-top: 40px;">
        let's start
    </div>
    <div class="action">
        <pre class="text" id="message">
Your OTP is: 123456


For: https://sms-receiver-api.web.app/?otp=123456&xFJnfg75+8v
        </pre>
        <div class="nav">
            <button class="copyButton" on:click={copy}>copy</button>
            <button class="verifyButton" on:click={verify}>Verify</button>
        </div>
        <div style="width: 100%; height: 100px"></div>
    </div>
   {#if isCopied}
        <Snackbar title="Message Copied!" url="" linkTitle=""/>
   {/if}
   {#if isVerfied}
        <Snackbar title="You are successfully verified! " url="" linkTitle=""/>
   {/if}
</div>
{/if}

<!-- verification -->
{#if isVerifyPhase}
<div class="verification">
    <form class="verifyPhase">
        <input type="number" class="textbox" placeholder="######" id="otp" required>
        <button type="submit" class="verifyButton" id="verifyButton" on:click={_otp}>verify</button>
    </form>
    {#if verifingS}
        <Snackbar title="Verifing..." url="" linkTitle=""/>
   {/if}
</div>
{/if}