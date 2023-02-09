<template>
  <div id="threeWrap"></div>
</template>

<script setup>
import * as THREE from 'Three'

// 各种图元
function geBox () {
  const width = 8
  const height = 8
  const depth = 8
  const box = new THREE.BoxBufferGeometry(width, height, depth)
  return box
}
function geCircle () {
  const radius = 7
  const segments = 24
  const myCircle = new THREE.CircleBufferGeometry(radius, segments)
  return myCircle
}
function geCone () {
  const radius = 6 // ui: radius
  const height = 8 // ui: height
  const radialSegments = 16 // ui: radialSegments
  const geometry = new THREE.ConeGeometry(radius, height, radialSegments)
  return geometry
}
function geCylinder () {
  const radiusTop = 4 // ui: radiusTop
  const radiusBottom = 4 // ui: radiusBottom
  const height = 8 // ui: height
  const radialSegments = 12 // ui: radialSegments
  const geometry = new THREE.CylinderGeometry(
    radiusTop, radiusBottom, height, radialSegments)
  return geometry
}
function geDodecahedron () {
  const radius = 6 // ui: radius
  const detail = 0
  const geometry = new THREE.DodecahedronGeometry(radius, detail)
  return geometry
}

// 随机纹理
function createMaterial () {
  const material = new THREE.MeshPhongMaterial({ side: THREE.DoubleSide })
  const hue = Math.floor(Math.random() * 100) / 100 // 随机获得一个色相
  const saturation = 1 // 饱和度
  const luminance = 0.5 // 亮度
  material.color.setHSL(hue, saturation, luminance)
  return material
}

function init () {
  const scene = new THREE.Scene()
  scene.background = new THREE.Color(0x222222)
  const dom = document.getElementById('threeWrap')
  const width = dom.clientWidth
  const height = dom.clientHeight
  const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000)
  // const camera = new Three.PerspectiveCamera(40, 2, 0.1, 1000)
  camera.position.z = 70

  // 初始化渲染器
  const renderer = new THREE.WebGLRenderer()
  renderer.setSize(width, height)
  dom.appendChild(renderer.domElement)

  // 添加 2 盏灯光
  const light0 = new THREE.DirectionalLight(0xFFFFFF, 1)
  light0.position.set(-60, 30, 40)
  light0.target.position.set(0, 0, 0)
  scene.add(light0)

  const light1 = new THREE.DirectionalLight(0xFFFFFF, 1)
  light1.position.set(30, 20, 40)
  light1.target.position.set(0, 0, 0)
  scene.add(light1)

  // const helper0 = new THREE.DirectionalLightHelper(light0)
  // scene.add(helper0)
  // const helper1 = new THREE.DirectionalLightHelper(light1)
  // scene.add(helper1)

  // 获取各个 solid 类型的图元实例，并添加到 solidPrimitivesArr 中
  const solidPrimitivesArr = []
  solidPrimitivesArr.push(geBox(), geCircle(), geCone(), geCylinder(), geDodecahedron())

  // 将各个 solid 类型的图元实例转化为网格，并添加到 primitivesArr 中
  const meshArr = []
  solidPrimitivesArr.forEach((item) => {
    const material = createMaterial() // 随机获得一种颜色材质
    const mesh = new THREE.Mesh(item, material)
    meshArr.push(mesh) // 将网格添加到网格数组中
  })

  // 定义物体在画面中显示的网格布局
  const eachRow = 5 // 每一行显示 5 个
  const spread = 15 // 行高 和 列宽

  // 配置每一个图元实例，转化为网格，并位置和材质后，将其添加到场景中
  meshArr.forEach((mesh, index) => {
    // 我们设定的排列是每行显示 eachRow，即 5 个物体、行高 和 列宽 均为 spread 即 15
    // 因此每个物体根据顺序，计算出自己所在的位置
    const row = Math.floor(index / eachRow) // 计算出所在行
    const column = index % eachRow // 计算出所在列

    mesh.position.x = (column - 2) * spread // 为什么要 -2 ？
    // 因为我们希望将每一行物体摆放的单元格，依次是：-2、-1、0、1、2，这样可以使每一整行物体处于居中显示
    mesh.position.y = (2 - row) * spread

    scene.add(mesh) // 将网格添加到场景中
  })
  console.log('%c scene: ', 'background-color: pink', scene)

  // const geometry = new THREE.BoxGeometry(1, 1, 1)
  // const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 })
  // const cube = new THREE.Mesh(geometry, material)
  // scene.add(cube)

  // function animate (time) {
  //   requestAnimationFrame(animate)
  //   time = time * 0.001
  //   meshArr.forEach(item => {
  //     item.rotation.x = time
  //     item.rotation.y = time
  //   })

  //   renderer.render(scene, camera)
  // };

  // animate(1000)

  // 添加自动旋转渲染动画
  const render = (time = 1000) => {
    time = time * 0.001
    meshArr.forEach(item => {
      item.rotation.x = time
      item.rotation.y = time
    })

    renderer.render(scene, camera)
    window.requestAnimationFrame(render)
  }
  window.requestAnimationFrame(render)
}

onMounted(() => {
  init()
})
onBeforeUnmount(() => { })
</script>

<style lang='scss' scoped>
#threeWrap {
  width: 100%;
  height: 100%;
}
</style>
