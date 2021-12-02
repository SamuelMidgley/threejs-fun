import * as THREE from "https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.module.js"

// Load Canvas
const canvas = document.querySelector('.webgl')

// Create Scene
const scene = new THREE.Scene()

// Axes Helper
// const axesHelper = new THREE.AxesHelper( 5 );
// scene.add( axesHelper );


// Creating the Sun
const geometry = new THREE.IcosahedronGeometry(1, 4);
const material = new THREE.MeshBasicMaterial()
material.color = new THREE.Color(0xf4ab32) // Yellow
const sun = new THREE.Mesh(geometry,material)
scene.add(sun)

// Creating the Planets
function planetCreator(radius, color){
    const geometry = new THREE.IcosahedronGeometry(radius, 4)
    const material = new THREE.MeshPhongMaterial()
    material.color = new THREE.Color(color)
    const sphere = new THREE.Mesh(geometry, material)
    return sphere
}

const mercury = planetCreator(.1, 0xbbbabf)
const venus = planetCreator(.2, 0xaf7b4b)
const earth = planetCreator(.2, 0x3f4f21)
const mars = planetCreator(.2, 0xe57d58)
const jupiter = planetCreator(.4, 0xae816a)
const saturn = planetCreator(.3, 0xebcb80)
const uranus = planetCreator(.3, 0xcdf3f4)
const neptune = planetCreator(.3, 0x3a57e0)

const planetList = [mercury, venus, earth, mars, jupiter, saturn, uranus, neptune]
planetList.forEach(element => {
    scene.add(element)
});

// Planet Orbit function
function planetOrbit(planet, radius, speed, elapsedTime, offset){
    planet.position.x = radius*Math.cos(offset + elapsedTime / speed)
    planet.position.z = radius*Math.sin(offset + elapsedTime / speed) 
}


// Lighting
const pointLight = new THREE.PointLight(0xffffff, 2)
scene.add(pointLight)

// Sizes
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

// Camera
const camera = new THREE.PerspectiveCamera(100, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 10
camera.position.y = 7
camera.position.z = 10
// Point camera towards sun
camera.lookAt(new THREE.Vector3(0, 0, 0))
scene.add(camera)

// Controls
// const controls = new OrbitControls(camera, canvas)
// controls.enableDamping = true

// Renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))


// Animator
const clock = new THREE.Clock()

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    // Update objects
    planetOrbit(mercury, 2, 1, elapsedTime, 0)
    planetOrbit(venus, 4, 2, elapsedTime, .4)
    planetOrbit(earth, 6, 4, elapsedTime, 0.2)
    planetOrbit(mars, 8, 6, elapsedTime, .1)
    planetOrbit(jupiter, 10, 7, elapsedTime, 1)
    planetOrbit(saturn, 12, 8, elapsedTime, .5)
    planetOrbit(uranus, 14, 9, elapsedTime, 1.7)
    planetOrbit(neptune, 16, 10, elapsedTime, 3)

    // Update Orbital Controls
    // controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
    console.log(elapsedTime)
}
tick()