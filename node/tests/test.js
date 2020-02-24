let SimpleAI = require("../simpleAI-node.js");
try {
   console.log("attempting to make instance of SimpleAI class");
   let nn = new SimpleAI();
   console.log("Success!");
} catch (error) {
   console.log("Fail");
   console.error(error);
}