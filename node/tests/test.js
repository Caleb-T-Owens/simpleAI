let SimpleAI = require("../simpleAI-node.js");

let tryFunction = (functionToRun, expectedOutput) => {
   console.log(`Attempting to run ${functionToRun.name}()`);
   try {
      let output = functionToRun();
      if (expectedOutput != undefined) {
         if (output == expectedOutput) {
            console.log("Success!");
         } else {
            console.log("Fail");
            console.error("Incorrect Output");
         }
      } else {
         console.log("Success!");
      }
   } catch (error) {
      console.log("Error")
   }
};


try {
   console.log("Attempting to make instance of SimpleAI class");
   let nn = new SimpleAI();
   console.log("Success!");
} catch (error) {
   console.log("Fail");
   console.error(error);
}

tryFunction(nn.setLayerSizes([2,3,2]));

tryFunction(nn.build());

tryFunction(nn.randomizeWeights());

tryFunction(nn.randomizeWeights());

tryFunction(nn.evolve());

tryFunction(nn.predict());