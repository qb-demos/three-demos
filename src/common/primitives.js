import * as THREE from 'Three'
console.log('%c THREE: ', 'background-color: pink', THREE)

// 各种图元
function box () {
  const width = 8
  const height = 8
  const depth = 8
  const box = new THREE.BoxBufferGeometry(width, height, depth)
  return box
}
function circle () {
  const radius = 8
  const segments = 24
  const myCircle = new THREE.CircleBufferGeometry(radius, segments)
  return myCircle
}
function cone () {
  const radius = 6 // ui: radius
  const height = 8 // ui: height
  const radialSegments = 16 // ui: radialSegments
  const geometry = new THREE.ConeGeometry(radius, height, radialSegments)
  return geometry
}
function cylinder () {
  const radiusTop = 4 // ui: radiusTop
  const radiusBottom = 4 // ui: radiusBottom
  const height = 8 // ui: height
  const radialSegments = 12 // ui: radialSegments
  const geometry = new THREE.CylinderGeometry(
    radiusTop, radiusBottom, height, radialSegments)
  return geometry
}
// 十二面体
function dodecahedron () {
  const radius = 6 // ui: radius
  const detail = 0
  const geometry = new THREE.DodecahedronGeometry(radius, detail)
  return geometry
}
// 受挤压的 2D 形状
function extrude () {
  const shape = new THREE.Shape()
  const x = -2.5
  const y = -5
  shape.moveTo(x + 2.5, y + 2.5)
  shape.bezierCurveTo(x + 2.5, y + 2.5, x + 2, y, x, y)
  shape.bezierCurveTo(x - 3, y, x - 3, y + 3.5, x - 3, y + 3.5)
  shape.bezierCurveTo(x - 3, y + 5.5, x - 1.5, y + 7.7, x + 2.5, y + 9.5)
  shape.bezierCurveTo(x + 6, y + 7.7, x + 8, y + 4.5, x + 8, y + 3.5)
  shape.bezierCurveTo(x + 8, y + 3.5, x + 8, y, x + 5, y)
  shape.bezierCurveTo(x + 3.5, y, x + 2.5, y + 2.5, x + 2.5, y + 2.5)

  const extrudeSettings = {
    steps: 2, // ui: steps
    depth: 2, // ui: depth
    bevelEnabled: true, // ui: bevelEnabled
    bevelThickness: 1, // ui: bevelThickness
    bevelSize: 1, // ui: bevelSize
    bevelSegments: 2 // ui: bevelSegments
  }

  const geometry = new THREE.ExtrudeGeometry(shape, extrudeSettings)
  return geometry
}

// 二十面体
function icosahedron () {
  const radius = 8 // ui: radius
  const detail = 2 // ui: detail
  const geometry = new THREE.IcosahedronGeometry(radius, detail)
  return geometry
}

// 绕着一条线旋转形成的形状
function lathe () {
  const points = []
  for (let i = 0; i < 10; ++i) {
    points.push(new THREE.Vector2(Math.sin(i * 0.2) * 3 + 3, (i - 5) * 0.8))
  }

  const geometry = new THREE.LatheGeometry(points)
  return geometry
}

function octahedron () {
  const radius = 8 // ui: radius
  const geometry = new THREE.OctahedronGeometry(radius)
  return geometry
}

export {
  box,
  circle,
  cone,
  cylinder,
  dodecahedron,
  extrude,
  icosahedron,
  lathe,
  octahedron
}
