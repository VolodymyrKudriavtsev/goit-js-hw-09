(function(o,n){const e=Math.random()>.3;return new Promise(((i,t)=>{setTimeout((()=>{e&&i({position:o,delay:n}),t({position:o,delay:n})}),n)}))})(2,1500).then((function({position:o,delay:n}){console.log(`✅ Fulfilled promise ${o} in ${n}ms`)})).catch((function({position:o,delay:n}){console.log(`❌ Rejected promise ${o} in ${n}ms`)}
//! position, delay
));
//# sourceMappingURL=03-promises.38e848ba.js.map
