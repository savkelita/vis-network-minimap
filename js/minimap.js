const ratio = 5; // Ratio is difference between original VisJS Network and Minimap.
const nodes = [
  {
    id: 0,
    label: "0",
    group: 0
  },
  {
    id: 1,
    label: "1",
    group: 0
  },
  {
    id: 2,
    label: "2",
    group: 0
  },
  {
    id: 3,
    label: "3",
    group: 1
  },
  {
    id: 4,
    label: "4",
    group: 1
  },
  {
    id: 5,
    label: "5",
    group: 1
  },
  {
    id: 6,
    label: "6",
    group: 2
  },
  {
    id: 7,
    label: "7",
    group: 2
  },
  {
    id: 8,
    label: "8",
    group: 2
  },
  {
    id: 9,
    label: "9",
    group: 3
  },
  {
    id: 10,
    label: "10",
    group: 3
  },
  {
    id: 11,
    label: "11",
    group: 3
  },
  {
    id: 12,
    label: "12",
    group: 4
  },
  {
    id: 13,
    label: "13",
    group: 4
  },
  {
    id: 14,
    label: "14",
    group: 4
  },
  {
    id: 15,
    label: "15",
    group: 5
  },
  {
    id: 16,
    label: "16",
    group: 5
  },
  {
    id: 17,
    label: "17",
    group: 5
  },
  {
    id: 18,
    label: "18",
    group: 6
  },
  {
    id: 19,
    label: "19",
    group: 6
  },
  {
    id: 20,
    label: "20",
    group: 6
  },
  {
    id: 21,
    label: "21",
    group: 7
  },
  {
    id: 22,
    label: "22",
    group: 7
  },
  {
    id: 23,
    label: "23",
    group: 7
  },
  {
    id: 24,
    label: "24",
    group: 8
  },
  {
    id: 25,
    label: "25",
    group: 8
  },
  {
    id: 26,
    label: "26",
    group: 8
  },
  {
    id: 27,
    label: "27",
    group: 9
  },
  {
    id: 28,
    label: "28",
    group: 9
  },
  {
    id: 29,
    label: "29",
    group: 9
  }
];
const edges = [
  {
    from: 1,
    to: 0
  },
  {
    from: 2,
    to: 0
  },
  {
    from: 4,
    to: 3
  },
  {
    from: 5,
    to: 4
  },
  {
    from: 4,
    to: 0
  },
  {
    from: 7,
    to: 6
  },
  {
    from: 8,
    to: 7
  },
  {
    from: 7,
    to: 0
  },
  {
    from: 10,
    to: 9
  },
  {
    from: 11,
    to: 10
  },
  {
    from: 10,
    to: 4
  },
  {
    from: 13,
    to: 12
  },
  {
    from: 14,
    to: 13
  },
  {
    from: 13,
    to: 0
  },
  {
    from: 16,
    to: 15
  },
  {
    from: 17,
    to: 15
  },
  {
    from: 15,
    to: 10
  },
  {
    from: 19,
    to: 18
  },
  {
    from: 20,
    to: 19
  },
  {
    from: 19,
    to: 4
  },
  {
    from: 22,
    to: 21
  },
  {
    from: 23,
    to: 22
  },
  {
    from: 22,
    to: 13
  },
  {
    from: 25,
    to: 24
  },
  {
    from: 26,
    to: 25
  },
  {
    from: 25,
    to: 7
  },
  {
    from: 28,
    to: 27
  },
  {
    from: 29,
    to: 28
  },
  {
    from: 28,
    to: 0
  }
];

// Create network
const container = document.getElementById('mynetwork');
const data = {
  nodes: nodes,
  edges: edges
};

// Network options
const options = {
  nodes: {
    shape: 'dot',
    size: 30,
    font: {
      size: 32,
      color: '#333'
    },
    borderWidth: 1
  },
  edges: {
    arrows: 'to',
    chosen: false,
    color: {
      color: '#333',
    },
  },
  interaction: {
    dragNodes: false,
  },
};
const network = new vis.Network(container, data, options);

// Draw minimap wrapper
const drawMinimapWrapper = () => {
  const {
    clientWidth,
    clientHeight
  } = network.body.container;
  const minimapWrapper = document.getElementById('minimapWrapper');
  const width = Math.round(clientWidth / ratio);
  const height = Math.round(clientHeight / ratio);

  minimapWrapper.style.width = `${width}px`;
  minimapWrapper.style.height = `${height}px`;
}
// Draw minimap Image
const drawMinimapImage = () => {
  const originalCanvas = document.getElementsByTagName('canvas')[0]
  const minimapImage = document.getElementById('minimapImage')

  const {
    clientWidth,
    clientHeight
  } = network.body.container

  const tempCanvas = document.createElement('canvas')
  const tempContext = tempCanvas.getContext('2d')

  const width = Math.round((tempCanvas.width = clientWidth / ratio))
  const height = Math.round((tempCanvas.height = clientHeight / ratio))

  if (tempContext) {
    tempContext.drawImage(originalCanvas, 0, 0, width, height)
    minimapImage.src = tempCanvas.toDataURL()
    minimapImage.width = width
    minimapImage.height = height
  }
}

// Draw minimap Radar
const drawRadar = () => {
  const {
    clientWidth,
    clientHeight
  } = network.body.container
  const minimapRadar = document.getElementById('minimapRadar')
  const {
    targetScale
  } = network.view
  const scale = network.getScale()
  const translate = network.getViewPosition()
  minimapRadar.style.transform = `translate(${(translate.x / ratio) *
        targetScale}px, ${(translate.y / ratio) * targetScale}px) scale(${targetScale / scale})`
  minimapRadar.style.width = `${clientWidth / ratio}px`
  minimapRadar.style.height = `${clientHeight / ratio}px`
}

network.on('afterDrawing', () => {
  const {
    clientWidth,
    clientHeight
  } = network.body.container;
  const width = Math.round(clientWidth / ratio);
  const height = Math.round(clientHeight / ratio);
  const minimapImage = document.getElementById('minimapImage');
  const minimapWrapper = document.getElementById('minimapWrapper');
  // Initial render
  if (!minimapImage.hasAttribute('src') || minimapImage.src === '') {
    if (!minimapWrapper.style.width || !minimapWrapper.style.height) {
      drawMinimapWrapper();
    }
    drawMinimapImage();
    drawRadar();
  } else if (
    minimapWrapper.style.width !== `${width}px` ||
    minimapWrapper.style.height !== `${height}px`
  ) {
    minimapImage.removeAttribute('src');
    drawMinimapWrapper();
    network.fit();
  } else {
    drawMinimapImage();
    drawRadar();
  }
})

// Extra settings and cool effects :)
network.on('resize', () => {
  network.fit();
})
network.on('dragStart', () => {
  const minimapWrapper = document.getElementById('minimapWrapper');
  minimapWrapper.classList.remove('minimapWrapperIdle');
  minimapWrapper.classList.add('minimapWrapperMove');
})
network.on('dragEnd', () => {
  const minimapWrapper = document.getElementById('minimapWrapper');
  minimapWrapper.classList.remove('minimapWrapperMove');
  minimapWrapper.classList.add('minimapWrapperIdle')
})
network.on('zoom', () => {
  const minimapWrapper = document.getElementById('minimapWrapper');
  minimapWrapper.classList.remove('minimapWrapperIdle');
  minimapWrapper.classList.add('minimapWrapperMove')
})
