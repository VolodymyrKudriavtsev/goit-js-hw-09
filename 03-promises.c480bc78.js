!function(){var o,n,i;(o=2,n=1500,i=Math.random()>.3,new Promise((function(t,c){setTimeout((function(){i&&t({position:o,delay:n}),c({position:o,delay:n})}),n)}))).then((function(o){var n=o.position,i=o.delay;console.log("✅ Fulfilled promise ".concat(n," in ").concat(i,"ms"))})).catch((function(o){var n=o.position,i=o.delay;console.log("❌ Rejected promise ".concat(n," in ").concat(i,"ms"))}
//! position, delay
))}();
//# sourceMappingURL=03-promises.c480bc78.js.map
