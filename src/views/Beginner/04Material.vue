<template>
  <div id="threeWrap"></div>
</template>

<script setup>
import * as THREE from 'Three'

function init () {
  // Scene
  const scene = new THREE.Scene()
  scene.background = new THREE.Color(0x222222)
  const dom = document.getElementById('threeWrap')
  const width = dom.clientWidth
  const height = dom.clientHeight

  // Camera
  const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000)
  camera.position.z = 2
  // camera.position.x = -5
  // camera.position.y = 2

  // Renderer
  const renderer = new THREE.WebGLRenderer()
  renderer.setSize(width, height)
  dom.appendChild(renderer.domElement)

  // Mesh
  const geometry = new THREE.BoxGeometry(1, 1, 1)
  const material = new THREE.MeshPhongMaterial({ color: 0x00ff00 })
  const mesh = new THREE.Mesh(geometry, material)
  scene.add(mesh)

  // 灯光 1
  const light0 = new THREE.DirectionalLight(0xFFFFFF, 1)
  light0.position.set(-60, 30, 40)
  light0.target.position.set(0, 0, 0)
  scene.add(light0)

  // 灯光 2
  const light1 = new THREE.DirectionalLight(0xFFFFFF, 1)
  light1.position.set(30, -30, 40)
  light1.target.position.set(0, 0, 0)
  scene.add(light1)

  const axesHelper = new THREE.AxesHelper(10)
  scene.add(axesHelper)

  // const helper0 = new THREE.DirectionalLightHelper(light0)
  // scene.add(helper0)
  // const helper1 = new THREE.DirectionalLightHelper(light1)
  // scene.add(helper1)

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

  function animate () {
    // mesh.rotation.x += 0.01
    mesh.rotation.y += 0.01

    if (resizeRendererToDisplaySize(renderer)) {
      const canvas = renderer.domElement
      camera.aspect = canvas.clientWidth / canvas.clientHeight
      camera.updateProjectionMatrix()
    }
    renderer.render(scene, camera)

    requestAnimationFrame(animate)
  };

  animate()
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
