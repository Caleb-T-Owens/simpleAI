let SimpleAI = require("../simpleAI-node.js");

let tryFunction = (functionToRun, functionName, expectedOutput) => {
   console.log(`Attempting to run ${functionName}()`);
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
      console.error(error);
   }
};

let nn;
try {
   console.log("Attempting to make instance of SimpleAI class");
   nn = new SimpleAI();
   console.log("Success!");
} catch (error) {
   console.log("Fail");
   console.error(error);
}


try {
   console.log("Attempting to run nn.setLayerSizes()");
   nn.setLayerSizes([2,3,2]);
   console.log("Success!");

} catch (error) {
   console.log("Failed!");
   console.error(error);
}

try {
   console.log("Attempting to run nn.build()");
   nn.build();
   console.log("Success!");

} catch (error) {
   console.log("Failed!");
   console.error(error);
}

try {
   console.log("Attempting to run nn.randomizeWeights()");
   nn.randomizeWeights();
   console.log("Success!");

} catch (error) {
   console.log("Failed!");
   console.error(error);
}

try {
   console.log("Attempting to run nn.randomizeWeights()");
   nn.randomizeWeights();
   console.log("Success!");

} catch (error) {
   console.log("Failed!");
   console.error(error);
}

try {
   console.log("Attempting to run nn.evolve()");
   nn.evolve()
   console.log("Success!");

} catch (error) {
   console.log("Failed!");
   console.error(error);
}

try {
   console.log("Attempting to run nn.predict()");
   nn.predict([0,1]);
   console.log("Success!");

} catch (error) {
   console.log("Failed!");
   console.error(error);
}