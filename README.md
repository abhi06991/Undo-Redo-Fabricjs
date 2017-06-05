# Undo-Redo-Fabricjs
Implementation of Undo-Redo functionality for your fabricjs project.

## How is this feature implemented?
By saving Canvas States as `JSON`. Whenever a user adds or modifies an object in the `Canvas`, it will save the changed canvas state and maintain it in an `array`. This array is then manipulated whenever user clicks on **Undo** or **Redo** button.

## How this feature can be extended?
This feature can be implemented with almost all events provided by `fabricjs` library. For demonstrative purpose, I have chosen only two events: `object:added` and `object:modified`.

A note of caution:
If `Canvas` becomes too heavy with too many objects, rendering can take time when Undoing or Redoing.

## Working Demo URL
https://jsfiddle.net/abhi47/rwdpf3nL/29/

## Usage
Licensed under the MIT license.


