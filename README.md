# VisJS Network - Minimap

This is a basic implementation of minimap.

#### Example ( Pure JS )
[Minimap - Codepen (Fixed size)](https://codepen.io/savkelita/pen/XwNgXE)

[Responsive Minimap - JSFiddle (Responsive)](https://jsfiddle.net/savke/m476zwns/)

#### What is Vis ?
Vis.js is a dynamic, browser based visualization library. The library is designed to be easy to use, handle large amounts of dynamic data, and enable manipulation of the data. [https://github.com/almende/vis](https://github.com/almende/vis)

#### Todo:
Dragging network trought Minimap.

**NOTE:**

At the moment minimap doesn't work if `dragNodes` is enabled inside options.

```
const options = {
  nodes: {},
  edges: {},
  interaction: {
    dragNodes: false,
  },
};
```

Your advice or suggestions will be much appreciated and welcomed.


Made with :heartbeat:
