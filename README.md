This is a browser based 3D engine which I wrote in about one week. It is intentionally without comments to demonstrate the clarity of code that I write. In a professional setting I would be much less strict about ommitting comments. There are zero import statements, the scene is rendered in browser using the HTML canvas and a custom triangle drawing method. App.js is a good place to start, it shows how to declare the components of a scene (camera, light, canvas, rasterizer, and assets) and starts it running using the setInterval() global function.

If you want to see the math, the structures are responsible for that.

In general I would like to show that my methods are small, they do what they say they do, and they are descriptive. The language of 3D rendering may obfuscate this a little, but I believe that this is clean, maintainable code, and a good example of a difficult problem, the type of which I like to solve.
