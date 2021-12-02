import * as THREE from "https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.module.js"

const canvas = document.querySelector('.webgl')
const scene = new THREE.Scene()

// Objects
// const geometry = new THREE.TorusGeometry( .7, .2, 16, 100 );
const geometry = new THREE.IcosahedronGeometry(.7, 4);

// Materials

const material = new THREE.MeshBasicMaterial()
material.color = new THREE.Color(0xf4ab32)

// Mesh
const sphere = new THREE.Mesh(geometry,material)
scene.add(sphere)

const geometry1 = new THREE.IcosahedronGeometry(.2, 4)
const material1 = new THREE.MeshPhongMaterial()
material1.color = new THREE.Color(0xff0000)
const sphere1 = new THREE.Mesh(geometry1, material1)
sphere1.position.set(-1,-.3,.4)
scene.add(sphere1)



// Lights

const pointLight = new THREE.PointLight(0xffffff, 1)
// pointLight.position.x = 2
// pointLight.position.y = 3
// pointLight.position.z = 4
scene.add(pointLight)

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(100, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 0
camera.position.y = 0
camera.position.z = 2
scene.add(camera)

// Controls
// const controls = new OrbitControls(camera, canvas)
// controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */

const clock = new THREE.Clock()

const tick = () =>
{

    const elapsedTime = clock.getElapsedTime()

    // Update objects
    sphere1.rotation.y = .5 * elapsedTime

    // Update Orbital Controls
    // controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()