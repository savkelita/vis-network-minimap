const ratio = 5; // Difference between original canvas and minimap.
const nodes = new vis.DataSet([
  {
    id: 1,
    label: 'Node 1',
  },
  {
    id: 2,
    label: 'Node 2',
  },
  {
    id: 3,
    label: 'Node 3',
  },
  {
    id: 4,
    label: 'Node 4',
  },
  {
    id: 5,
    label: 'Node 5',
  },
]);
const edges = new vis.DataSet([
  {
    from: 1,
    to: 3,
  },
  {
    from: 1,
    to: 2,
  },
  {
    from: 2,
    to: 4,
  },
  {
    from: 2,
    to: 5,
  },
  {
    from: 3,
    to: 3,
  },
])

// create a network
const container = document.getElementById('mynetwork')
const data = {
  nodes: nodes,
  edges: edges,
}
const options = {}
const network = new vis.Network(container, data, options)

// Draw minimap Wrapper
const drawMinimapWrapper = () => {
  const { clientWidth, clientHeight } = network.body.container
  const minimapWrapper = document.getElementById('minimapWrapper')
  const width = Math.round(clientWidth / ratio)
  const height = Math.round(clientHeight / ratio)

  minimapWrapper.style.width = `${width}px`
  minimapWrapper.style.height = `${height}px`
}

// Draw minimap Image
const drawMinimapImage = () => {
  const originalCanvas = document.getElementsByTagName('canvas')[0]
  const minimapImage = document.getElementById('minimapImage')

  const { clientWidth, clientHeight } = network.body.container

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
  const { clientWidth, clientHeight } = network.body.container
  const minimapRadar = document.getElementById('minimapRadar')
  const { targetScale } = network.view
  const scale = network.getScale()
  const translate = network.getViewPosition()
  minimapRadar.style.transform = `translate(${(translate.x / ratio) * targetScale}px, ${(translate.y / ratio) *
    targetScale}px) scale(${targetScale / scale})`
  minimapRadar.style.width = `${clientWidth / ratio}px`
  minimapRadar.style.height = `${clientHeight / ratio}px`
}

network.on('afterDrawing', () => {
  const { clientWidth, clientHeight } = network.body.container
  const width = Math.round(clientWidth / ratio)
  const height = Math.round(clientHeight / ratio)
  const minimapImage = document.getElementById('minimapImage')
  const minimapWrapper = document.getElementById('minimapWrapper')
  // Initial render
  if (!minimapImage.hasAttribute('src') || minimapImage.src === '') {
    if (!minimapWrapper.style.width || !minimapWrapper.style.height) {
      drawMinimapWrapper()
    }
    drawMinimapImage()
    drawRadar()
  } else if (minimapWrapper.style.width !== `${width}px` || minimapWrapper.style.height !== `${height}px`) {
    minimapImage.removeAttribute('src')
    drawMinimapWrapper()
    network.fit()
  } else {
    drawRadar()
  }
})

// Extra settings and cool effects :)
network.on('resize', () => {
  network.fit()
})
network.on('dragStart', () => {
  const minimapWrapper = document.getElementById('minimapWrapper')
  minimapWrapper.classList.remove('minimapWrapperIdle')
  minimapWrapper.classList.add('minimapWrapperMove')
})
network.on('dragEnd', () => {
  const minimapWrapper = document.getElementById('minimapWrapper')
  minimapWrapper.classList.remove('minimapWrapperMove')
  minimapWrapper.classList.add('minimapWrapperIdle')
})
network.on('zoom', () => {
  const minimapWrapper = document.getElementById('minimapWrapper')
  minimapWrapper.classList.remove('minimapWrapperIdle')
  minimapWrapper.classList.add('minimapWrapperMove')
})
