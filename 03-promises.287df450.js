function o({position:o,delay:e}){console.log(`✅ Fulfilled promise ${o} in ${e}ms`)}function e({position:o,delay:e}){console.log(`❌ Rejected promise ${o} in ${e}ms`)}let n=2e3,t=0,l=0;console.log("START  INTERVAL !!! - "+Date.now());const i=setInterval((()=>{t+=1,l+=1,function(o,e){const n=Math.random()>.3;return new Promise(((t,l)=>{setTimeout((()=>{n?(t({position:o,delay:e}),console.log(Date.now())):(l({position:o,delay:e}),console.log(Date.now()))}),e)}))}(l,n).then(o).catch(e),n+=1e3,3!==t||clearInterval(i)}),1e3);
//# sourceMappingURL=03-promises.287df450.js.map