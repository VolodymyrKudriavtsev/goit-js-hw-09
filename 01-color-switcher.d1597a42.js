!function(){var t={startBtn:document.querySelector("[data-start]"),stopBtn:document.querySelector("[data-stop]")},e=null;t.stopBtn.setAttribute("disabled",!0);function n(){return"#".concat(Math.floor(16777215*Math.random()).toString(16))}t.startBtn.addEventListener("click",(function(o){t.stopBtn.removeAttribute("disabled"),t.startBtn.setAttribute("disabled",!0),document.body.style.backgroundColor=n(),e=setInterval((function(){document.body.style.backgroundColor=n()}),1e3)})),t.stopBtn.addEventListener("click",(function(n){t.startBtn.removeAttribute("disabled"),t.stopBtn.setAttribute("disabled",!0),clearInterval(e)}))}();
//# sourceMappingURL=01-color-switcher.d1597a42.js.map