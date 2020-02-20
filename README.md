# A simple AI library.
So, my goal in making this library was to super simple to use. I didn't want someone to be put of playing with AI because they were put off by the tutorials they found online and weren't able to understand the content and/or couldn't make sense of the code samples.
## Who is this for?
I intend this library to be for not only people who are new to AI but also for people who are more experienced with AI. In version these current versions it only runs on the CPU but I would like to also add a GPU mode either with gpu.js or gl compute shaders.
## You say this is a simple library what if I want customizability!
One of the things that I had in mind when making this library was customizability, so I have included many ways to change the way that the neural network works by modifying functions via some methods
#### Examples of modifying functions
I am not going to give support for using these, you should **not** need to use these.
```js
let nn = new SimpleAI();
nn.setActivationFunction((x) => {return Math.sin(x*3)});
```
```js
let nn = new SimpleAI();
nn.setWeightsRandom(() => {return Math.random()});
// I recommend this being between 0 and 1
```
```js
let nn = new SimpleAI();
nn.setBiasRandom(() => {return Math.random()});
// I recommend this being between 0 and 1
```
```js
let nn = new SimpleAI();
nn.setTrainingRandom(() => {return 100 / (Math.random() - 0.5)});
// I recommend this being between -0.005 and 0.005
```
## So how do I use this library?
When I say that this library is easy to use, I really mean it. With only five lines of code you can have a fully working neural network.
```js
let simpleAI = require("simpleai");
let nn = new simpleAI(); // 1
nn.setLayerSizes([2,3,2]); // 2
nn.build(); // 3
nn.randomizeWeights(); // 4
nn.randomizeBiases(); // 5
console.log(nn.predict([1,0]));
```
## Documentation
I want to add documentation but I don't want to half do it and make bad documentation so this will come later. You should be able to
figure out how to use to from the provided.