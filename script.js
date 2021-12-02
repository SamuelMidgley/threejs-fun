import * as THREE from "https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.module.js"

const canvas = document.querySelector('.webgl')
const scene = new THREE.Scene()

// Objects
// const geometry = new THREE.TorusGeometry( .7, .2, 16, 100 );
const geometry = new THREE.IcosahedronGeometry(1, 4);

// Materials

const material = new THREE.MeshBasicMaterial()
material.color = new THREE.Color(0xf4ab32)

// Mesh
const sphere = new THREE.Mesh(geometry,material)
scene.add(sphere)

const geometry1 = new THREE.IcosahedronGeometry(.2, 4)
const material1 = new THREE.MeshPhongMaterial()
material1.color = new THREE.Color(0xbbbabf)
const sphere1 = new THREE.Mesh(geometry1, material1)
sphere1.position.set(-1,0,.4)
scene.add(sphere1)

const axesHelper = new THREE.AxesHelper( 5 );
scene.add( axesHelper );


// Lights

const pointLight = new THREE.PointLight(0xffffff, 1)
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
camera.position.x = 3
camera.position.y = 3
camera.position.z = 3
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
    sphere.rotation.y = .5 * elapsedTime
    sphere1.rotation.y = .5 * elapsedTime


    sphere1.position.x = 2*Math.cos(elapsedTime) + 0;
    sphere1.position.z = 2*Math.sin(elapsedTime) + 0; // These to strings make it work

    // Update Orbital Controls
    // controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
    console.log(elapsedTime)
}
tick()

// var t = 0;
// function render() { 
//     requestAnimationFrame(render); 
//     t += 0.01;          
//     sphere.rotation.y += 0.005;
//     sphere1.rotation.y += 0.03;

//     sphere1.position.x = 1*Math.cos(t) + 0;
//     sphere1.position.z = 1*Math.sin(t) + 0; // These to strings make it work

//     renderer.render(scene, camera); 
// } 
// render()