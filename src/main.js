import './style.css'

import * as THREE from 'three'

const scene = new THREE.Scene()


const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)

const canvas = document.querySelector('#bg')

const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
})

renderer.setPixelRatio(window.devicePixelRatio)
renderer.setSize(window.innerWidth, window.innerHeight)

const geometry = new THREE.TorusGeometry(10, 3, 16, 100)
const material = new THREE.MeshStandardMaterial({ color: 0xff6347 })
const torus = new THREE.Mesh(geometry, material)

scene.add(torus)

const pointLight = new THREE.PointLight(0xffffff, 200)
pointLight.position.set(20, 30, 0)

const ambientLight = new THREE.AmbientLight(0xffffff)
scene.add(pointLight, ambientLight)

const imageTexture = new THREE.TextureLoader().load("/public/photo.png")

const image = new THREE.Mesh(
  new THREE.BoxGeometry(3, 3, 3),
  new THREE.MeshBasicMaterial({ map: imageTexture })
)
scene.add(image)

const moonTexture = new THREE.TextureLoader().load("./public/moon.jpg")
const normalTexture = new THREE.TextureLoader().load('./public/normal.jpg')

const moon = new THREE.Mesh(
  new THREE.SphereGeometry(3, 32, 32),
  new THREE.MeshStandardMaterial({
    map: moonTexture,
    normalMap: normalTexture,
  })
)

scene.add(moon)

const earthTexture = new THREE.TextureLoader().load("./public/earth.jpg")

const earth = new THREE.Mesh(
  new THREE.SphereGeometry(6, 32, 32),
  new THREE.MeshStandardMaterial({
    map: earthTexture,
    normalMap: normalTexture,
  })
)

scene.add(earth)

moon.position.z = 30
moon.position.setX(-10)

earth.position.z = 30
earth.position.setX(30)

image.position.z = -5
image.position.x = 2

function moveCamera() {
  const t = document.body.getBoundingClientRect().top
  camera.position.x = t * -0.0002
  camera.position.y = t * -0.0002
  camera.position.z = t * -0.01
}
document.body.onscroll = moveCamera

function animate() {
  requestAnimationFrame(animate)

  torus.rotation.x += 0.01
  torus.rotation.y += 0.01
  torus.rotation.z += 0.01

  moon.rotation.y += 0.005
  earth.rotation.y += 0.01

  image.rotation.x += 0.01
  image.rotation.z += 0.01

  renderer.render(scene, camera)
}

function addStars() {
  const geometry = new THREE.SphereGeometry(0.25, 24, 24)
  const material = new THREE.MeshBasicMaterial({ color: 0xffffff })
  const star = new THREE.Mesh(geometry, material)
  const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(1000))

  star.position.set(x, y, z)
  scene.add(star)
}

animate()
Array(2000).fill().forEach(addStars)

