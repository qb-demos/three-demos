<template>
  <div id="threeWrap03"></div>
</template>

<script setup>
import * as THREE from 'Three'

function init () {
  // Scene
  const scene = new THREE.Scene()
  scene.background = new THREE.Color(0x222222)
  const dom = document.getElementById('threeWrap03')
  const width = dom.clientWidth
  const height = dom.clientHeight

  // Camera
  const fov = 40
  const aspect = 2 // the canvas default
  const near = 0.1
  const far = 1000
  const camera = new THREE.PerspectiveCamera(fov, aspect, near, far)
  camera.position.set(0, 50, 0)
  camera.up.set(0, 0, 1)
  camera.lookAt(0, 0, 0)

  // Renderer
  const renderer = new THREE.WebGLRenderer()
  renderer.setSize(width, height)
  dom.appendChild(renderer.domElement)

  {
    const color = 0xFFFFFF
    const intensity = 3
    const light = new THREE.PointLight(color, intensity)
    scene.add(light)
  }

  // an array of objects who's rotation to update
  const objects = []

  const radius = 1
  const widthSegments = 6
  const heightSegments = 6
  const sphereGeometry = new THREE.SphereGeometry(
    radius, widthSegments, heightSegments)
  // 太阳系
  const solarSystem = new THREE.Object3D()
  scene.add(solarSystem)
  objects.push(solarSystem)
  // 太阳
  const sunMaterial = new THREE.MeshPhongMaterial({ emissive: 0xFFFF00 })
  const sunMesh = new THREE.Mesh(sphereGeometry, sunMaterial)
  sunMesh.scale.set(5, 5, 5)
  solarSystem.add(sunMesh)
  objects.push(sunMesh)
  // 地球
  const earthOrbit = new THREE.Object3D()
  earthOrbit.position.x = 10
  solarSystem.add(earthOrbit)
  objects.push(earthOrbit)

  const earthMaterial = new THREE.MeshPhongMaterial({
    color: 0x2233ff,
    emissive: 0x112244
  })
  const earthMesh = new THREE.Mesh(sphereGeometry, earthMaterial)
  earthOrbit.add(earthMesh)
  objects.push(earthMesh)

  // 月球
  const moonOrbit = new THREE.Object3D()
  moonOrbit.position.x = 2
  earthOrbit.add(moonOrbit)

  const moonMaterial = new THREE.MeshPhongMaterial({ color: 0x888888, emissive: 0x222222 })
  const moonMesh = new THREE.Mesh(sphereGeometry, moonMaterial)
  moonMesh.scale.set(0.5, 0.5, 0.5)
  moonOrbit.add(moonMesh)
  objects.push(moonMesh)

  // 为每个节点添加一个AxesHelper
  objects.forEach((node) => {
    const axes = new THREE.AxesHelper()
    axes.material.depthTest = false
    axes.renderOrder = 1
    node.add(axes)
  })

  function resizeRendererToDisplaySize (renderer) {
    const canvas = renderer.domElement
    const pixelRatio = window.devicePixelRatio
    const width = canvas.clientWidth * pixelRatio | 0
    const height = canvas.clientHeight * pixelRatio | 0
    const needResize = canvas.width !== width || canvas.height !== height
    if (needResize) {
      renderer.setSize(width, height, false)
    }
    return needResize
  }

  function animate (time) {
    time *= 0.001

    if (resizeRendererToDisplaySize(renderer)) {
      const canvas = renderer.domElement
      camera.aspect = canvas.clientWidth / canvas.clientHeight
      camera.updateProjectionMatrix()
    }

    objects.forEach((obj) => {
      obj.rotation.y = time
    })

    renderer.render(scene, camera)

    requestAnimationFrame(animate)
  };

  requestAnimationFrame(animate)
}

onMounted(() => {
  init()
})
onBeforeUnmount(() => { })
</script>

<style lang='scss' scoped>
#threeWrap03 {
  width: 100%;
  height: 100%;
}
</style>
