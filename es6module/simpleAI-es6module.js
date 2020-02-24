/*
@Class
This is the main class for the simple ai JS lib and contains all the code for evolving, creating, saving, and loading neural networks
*/
class simpleAI {
   /*
   @Function
   @Args: none
   @Returns: void
   Constructor for the class.
   */
   constructor() {
      this.layerSizes = [2, 2]; // This is set to a four node, two layer network as a default;
      this.activationFunction = (x) => {
         return Math.sin(x*3);
      }; // This will be the activation function;
      this.weightsRandom = () => {
         return Math.random();
      };
      this.biasRandom = () => {
         return (Math.random()-0.5);
      };
      this.trainingRandom = () => {
         return 100 / (Math.random() - 0.5); // We subtract 0.5 so half (ish) of the returned values will be negative
      };
      this.network = []; // This is a rather important one, it is the actual values of the nodes. I set the actual values of it in the build Function but I am still making it here so if someone runs a predict function it will hopefully make less of an error.
   }

   static getRandomInt (max) {
      return Math.floor(Math.random() * Math.floor(max));
   }
   /*
   @Function
   @args: sizes (array of ints)
   @returns: void
   This is just a small function that sets the node sizes for the neural network
   */
   setLayerSizes(sizes) {
      this.layerSizes = sizes;
   }

   /*
   @Function
   @args: activationFunction (function)
   @returns: void
   */
   setActivationFunction(activationFunction) {
      this.activationFunction = activationFunction;
   }

   /*
   @Function
   @args: weightsRandomFunction (function)
   @returns: void
   */
   setWeightsRandom(weightsRandomFunction) {
      this.weightsRandom = weightsRandomFunction;
   }

   /*
   @Function
   @args: biasRandomFunction (function)
   @returns: void
   */
   setBiasRandom(biasRandomFunction) {
      this.biasRandom = biasRandomFunction;
   }

   /*
   @Function
   @args: trainingRandomFunction (function)
   @returns: void
   */
   setTrainingRandom(trainingRandomFunction) {
      this.trainingRandom = trainingRandomFunction;
   }

   /*
   @Function
   @args: none
   @returns: void
   */
   build() {
      // So we have got our array that tels us how many nodes each layers have and how many layers there are at the same time (index
      // length + 1) I don't think that I will also set all the weights and biases here at the same time into one object.
      this.layerSizes.forEach((layer, i1) => {

         let layerArray = [];
         /*[ // This is a small example of what a layer should be like.
            {weights = [0,0,0], bias = 0, value = 0} , {weights = [0,0,0], bias = 0, value = 0} , {weights = [0,0,0], bias = 0, value = 0}
         ];*/

         for (let i2 = 0; i2 != layer /* layer is a number */ ; ++i2) {
            if (i1 != 0) { // for all the others but the first we need to set the weights. Because the first two are inputs that don't have biases or weights.
               let weights = new Array(this.network[i1-1].length).fill(0);
               let node = {
                  weights : weights,
                  bias : 0,
                  value : 0
               };
               layerArray.push(node);
            } else {
               let node = {
                  value : 0
               };
               layerArray.push(node);
            }
         }

         this.network.push(layerArray);
         ++i1;
      });

      // Do we need to randomize the values here? I think yes but will do later so I have some more thinking time @todo

   }

   randomizeWeights() {
      this.network.forEach((layer, layerIndex) => {
         if (layerIndex == 0) {
            return;
         }
         this.network[layerIndex].forEach((node, nodeIndex) => {
            this.network[layerIndex][nodeIndex].weights.forEach((weight, weightIndex) => {
               this.network[layerIndex][nodeIndex].weights[weightIndex] = this.weightsRandom();
            });
         });
      });
   }

   randomizeBiases() {
      this.network.forEach((layer, layerIndex) => {
         if (layerIndex == 0) {
            return;
         }
         this.network[layerIndex].forEach((node, nodeIndex) => {
            this.network[layerIndex][nodeIndex].bias = this.biasRandom();
         });
      });
   }

   /*
   @Function
   @Args: weightBiasChance (number (0 to 1))
   @Returns: void
   This is the evolve function that modifies one of the wights or biases
   */
   evolve(weightBiasChance) {
      let i1 = Math.random();
      if (weightBiasChance > i1) { // Modify Weights
         let layerCount = this.network.length;
         let selectedLayer = 1 + this.getRandomInt(layerCount - 1);
         let nodeCount = this.network[selectedLayer].length;
         let selectedNode = this.getRandomInt(nodeCount);
         let weightCount = this.network[selectedLayer][selectedNode].weights.length;
         let selectedWeight = this.getRandomInt(weightCount);
         this.network[selectedLayer][selectedNode].weights[selectedWeight] += this.trainingRandom();
      } else { // Modify Biases 
         let layerCount = this.network.length;
         let selectedLayer = 1 + this.getRandomInt(layerCount - 1);
         let nodeCount = this.network[selectedLayer].length;
         let selectedNode = this.getRandomInt(nodeCount);
         this.network[selectedLayer][selectedNode].bias += this.trainingRandom();
      }
   }

   /* 
   @Function
   @Args: inputs (array)
   @Returns: outputs (array);
   predicts the values from the input
   */
   predict(inputs) {
      if (inputs.length != this.layerSizes[0]) {
         throw "Error: prediction input not equal to network's first layer";
      };

      inputs.forEach((input, i1) => {
         this.network[0][i1].value = input;
      });
      
      /*
      For each layer that isn't the first:
         For each node:
            Add together all the multiples of the previous layers nodes and weights for those connections that are stored in the node.
            We should store that in the node
            Then we just need to += the bias and run it through the activation function
      */
      /*[ // This is a small example of what a layer should be like.
      {weights = [0,0,0], bias = 0, value = 0} , {weights = [0,0,0], bias = 0, value = 0} , {weights = [0,0,0], bias = 0, value = 0}
      ];*/
      this.network.forEach((layer, i1) => { // this selects the layer out of the network
         if (i1 == 0) { // we don't want to run the maths on the first 
            return; // is using return the best way to do this
         }

         this.network[i1].forEach((node, i2) => { // this selects the node
            this.network[i1][i2].weights.forEach((weight, i3) => {
               this.network[i1][i2].value += (weight * this.network[i1-1][i3].value);
            });
            this.network[i1][i2].value += this.network[i1][i2].bias;
            this.network[i1][i2].value = this.activationFunction(this.network[i1][i2].value);
         });
      });
      
      let output = [];
      this.network[this.network.length - 1].forEach((node) => {
         output.push(node.value);
      });
      return output;
   }
}

export {simpleAI};