# A simple AI library.
So, my goal in making this library was to super simple to use. I didn't want someone to be put of playing with AI because they were put off by the tutorials they found online and weren't able to understand the content and/or couldn't make sense of the code samples.
## Who is this for?
I intend this library to be for not only people who are new to AI but also for people who are more experienced with AI. In version these current versions it only runs on the CPU but I would like to also add a GPU mode either with gpu.js or gl compute shaders.
## So how do I use this library?
When I say that this library is easy to use, I really mean it. With only five lines of code you can have a fully working neural network.
```js
let simpleAI = require("simpleai");
let nn = new simpleAI(); // 1 Make the neural net object
nn.setLayerSizes([2,3,2]); // 2 Set the layer sizes
nn.build(); // 3 build the net
nn.randomizeWeights(); // 4 randomize the weights
nn.randomizeBiases(); // 5 randomize the biases
console.log(nn.predict([1,0]));
```
## You say this is a simple library what if I want customizability!
One of the things that I had in mind when making this library was customizability, so I have included many ways to change the way that the neural network works by modifying functions via some methods. [See documentation](#Documentation)
# Documentation
I am going to go through the recommended functions in the order that you should use them then the unrecommended. You will need to have made your simpleAI object before running these functions
#### setLayerSizes()
*Optional but strongly recommended*
This function sets the layer sizes of the neural network. It expects an array which has two or more whole numbers. Each entry specifies how many nodes each layer has.
```js
nn.setLayerSizes([2,3,2]);
```
#### build()
This function creates the layers and node objects inside your nn object
```js
nn.build()
```
#### randomizeWeights()
This function sets the weights in the neural network
```js
nn.randomizeWeights();
```
#### randomizeBiases()
This function sets the biases in the neural network
```js
nn.randomizeBiases();
```
#### predict()
This function calculates all the values of the nodes and returns the values of the last layer. This function expects an array that is the same size as the first layer
```js
nn.predict([0,1]);
```
#### evolve()
This function chooses one of the weights or biases and either adds or subtracts an amount specified by the training random, by default this is 100 / (Math.random() - 0.5). This function also requires an input from 0 to 1 to set the boundary of choice for whether to modify a bias or weight. 0.8 should be good.
```js
nn.evolve(0.8);
```
### Optional functions
I am not going to give support for using these, you should **not** need to use these.
#### setActivationFunction()
Used before `predict()`
```js
nn.setActivationFunction((x) => {return Math.sin(x*3)});
```
#### setWeightsRandom()
Used before `randomizeWeights()`
```js
nn.setWeightsRandom(() => {return Math.random()});
// I recommend this being between 0 and 1
```
#### setBiasRandom()
Used before `randomizeWeights()`
```js
nn.setBiasRandom(() => {return Math.random()});
// I recommend this being between 0 and 1
```
#### setTrainingRandom()
Used before `train()`
```js
nn.setTrainingRandom(() => {return 100 / (Math.random() - 0.5)});
// I recommend this being between -0.005 and 0.005
```