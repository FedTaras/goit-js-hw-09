const t={btnStart:document.querySelector("button[data-start]"),btnStop:document.querySelector("button[data-stop]"),body:document.querySelector("body")};t.btnStart.addEventListener("click",(function(n){n&&(e=setInterval((()=>{t.body.style.backgroundColor=`#${Math.floor(16777215*Math.random()).toString(16)}`}),1e3),t.btnStart.disabled=!0)})),t.btnStop.addEventListener("click",(function(n){n&&(clearTimeout(e),t.btnStart.disabled=!1)}));let e=null;
//# sourceMappingURL=01-color-switcher.85125a45.js.map
