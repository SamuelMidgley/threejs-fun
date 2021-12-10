import * as THREE from "https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.module.js"

// Load Canvas
const canvas = document.querySelector('.webgl')

// Create Scene
const scene = new THREE.Scene()

// Axes Helper
// const axesHelper = new THREE.AxesHelper( 5 );
// scene.add( axesHelper );


// Particles (adds extra stars to galaxy map)
var disc = new THREE.TextureLoader().load("https://threejs.org/examples/textures/sprites/disc.png");

const particleGeometry = new THREE.BufferGeometry;
const particlesCount = 5000;

const posArray = new Float32Array(particlesCount * 3);

for(let i = 0; i <particlesCount * 3; i++){
    posArray[i] = (Math.random() - 0.5) *  50
}

particleGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3))
const particlesMaterial = new THREE.PointsMaterial({
    size: 0.005,
    map: disc,
    transparent: true
})
const particlesMesh = new THREE.Points(particleGeometry, particlesMaterial)
scene.add(particlesMesh)


// Add milky war and stars to background
const spaceTexture = new THREE.TextureLoader().load("./img/galaxyMap.jpg")
scene.background = spaceTexture;



// Creating the Sun
const geometry = new THREE.IcosahedronGeometry(1, 7);
// Loading in custom texture map
var sunMap = new THREE.TextureLoader().load("./img/sunTexture.jpg");
const material = new THREE.MeshBasicMaterial({ map: sunMap })
const sun = new THREE.Mesh(geometry,material)
scene.add(sun)



// Creating the Planets
function planetCreator(radius, planetMap){
    const geometry = new THREE.IcosahedronGeometry(radius, 4)
    const material = new THREE.MeshPhongMaterial({ map: planetMap })
    const sphere = new THREE.Mesh(geometry, material)
    return sphere
}

var mercuryMap = new THREE.TextureLoader().load("./img/mercuryMap.jpg");
const mercury = planetCreator(.1, mercuryMap)
var venusMap = new THREE.TextureLoader().load("./img/venusMap.jpg");
const venus = planetCreator(.2, venusMap)
var earthMap = new THREE.TextureLoader().load("./img/earthTexture.jpg");
const earth = planetCreator(.2, earthMap)
var marsMap = new THREE.TextureLoader().load("./img/marsMap.jpg");
const mars = planetCreator(.2, marsMap)
var jupiterMap = new THREE.TextureLoader().load("./img/jupiterMap.jpg");
const jupiter = planetCreator(.4, jupiterMap)
var saturnMap = new THREE.TextureLoader().load("./img/saturnMap.jpg");
const saturn = planetCreator(.3, saturnMap)
var uranusMap = new THREE.TextureLoader().load("./img/uranusMap.jpg");
const uranus = planetCreator(.3, uranusMap)
var neptuneMap = new THREE.TextureLoader().load("./img/neptuneMap.jpg");
const neptune = planetCreator(.3, neptuneMap)

const planetList = [mercury, venus, earth, mars, jupiter, saturn, uranus, neptune]
planetList.forEach(element => {
    scene.add(element)
});

// Planet Orbit function
function planetOrbit(planet, radius, speed, elapsedTime, offset){
    planet.position.x = radius*Math.cos(offset + elapsedTime / speed)
    planet.position.z = radius*Math.sin(offset + elapsedTime / speed) 
}

// Saturns Rings
const ringGeometry = new THREE.RingGeometry(1, .5, 30)
// const ringGeometry = new THREE.RingGeometry(10, 4, 30)
const ringMaterial = new THREE.MeshBasicMaterial({color: 0xffffff, side: THREE.DoubleSide, opacity: 0.25, transparent: true})
// ringMaterial.Color = new THREE.Color(0xffffff)
const saturnRing = new THREE.Mesh(ringGeometry, ringMaterial)
scene.add(saturnRing)
// saturnRing.rotation.z = Math.PI /2
saturnRing.rotation.y = Math.PI
saturnRing.rotation.x = Math.PI / 2


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
camera.position.x = 8
camera.position.y = 15
camera.position.z = 8
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
renderer.setClearColor(new THREE.Color('#191d1f'), 1)


// Animator
const clock = new THREE.Clock()

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    sun.rotation.y = - .05 * elapsedTime

    const radiusMultiplier = 4;
    // Update objects
    planetOrbit(mercury, (0.39*radiusMultiplier), 1, elapsedTime, 0)
    planetOrbit(venus, (0.72*radiusMultiplier), 2, elapsedTime, .4)
    planetOrbit(earth, (1*radiusMultiplier), 4, elapsedTime, 0.2)
    planetOrbit(mars, (1.52*radiusMultiplier), 6, elapsedTime, .1)
    planetOrbit(jupiter, (5.2*radiusMultiplier), 7, elapsedTime, 1)
    planetOrbit(saturn, (9.54*radiusMultiplier), 8, elapsedTime, .5)
    planetOrbit(saturnRing, (9.54*radiusMultiplier), 8, elapsedTime, .5)
    planetOrbit(uranus, (19.2*radiusMultiplier), 9, elapsedTime, 1.7)
    planetOrbit(neptune, (30.06*radiusMultiplier), 10, elapsedTime, 3)

    // Update Orbital Controls
    // controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
    // console.log(elapsedTime)
}
tick()