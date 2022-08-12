<template>
  <div id="threeWrap"></div>
</template>

<script setup>
import * as THREE from 'Three'

function init () {
  const scene = new THREE.Scene()
  const dom = document.getElementById('threeWrap')
  const width = dom.clientWidth
  const height = dom.clientHeight
  const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000)

  const renderer = new THREE.WebGLRenderer()
  renderer.setSize(width, height)
  dom.appendChild(renderer.domElement)

  const geometry = new THREE.BoxGeometry(1, 1, 1)
  const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 })
  const cube = new THREE.Mesh(geometry, material)
  scene.add(cube)

  camera.position.z = 5

  function animate () {
    requestAnimationFrame(animate)

    cube.rotation.x += 0.01
    cube.rotation.y += 0.01

    renderer.render(scene, camera)
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
