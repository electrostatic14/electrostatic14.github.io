class Scene3D {
    constructor() {
        this.init();
    }

    init() {
        const canvas = document.getElementById('canvas3d');

        // Scene Setup
        GAME_STATE.scene = new THREE.Scene();
        GAME_STATE.scene.background = new THREE.Color(0x87ceeb);
        GAME_STATE.scene.fog = new THREE.Fog(0x87ceeb, CONFIG.VIEW_DISTANCE, CONFIG.VIEW_DISTANCE + 50);

        // Camera Setup
        GAME_STATE.camera = new THREE.PerspectiveCamera(
            CONFIG.CAMERA_FOV,
            window.innerWidth / window.innerHeight,
            0.1,
            1000
        );
        GAME_STATE.camera.position.set(0, CONFIG.CAMERA_HEIGHT, CONFIG.CAMERA_DISTANCE);
        GAME_STATE.camera.lookAt(0, 1, 0);

        // Renderer Setup
        GAME_STATE.renderer = new THREE.WebGLRenderer({
            canvas,
            antialias: true,
            alpha: false,
            powerPreference: 'high-performance'
        });
        GAME_STATE.renderer.setSize(window.innerWidth, window.innerHeight);
        GAME_STATE.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        GAME_STATE.renderer.shadowMap.enabled = true;
        GAME_STATE.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        GAME_STATE.renderer.shadowMap.autoUpdate = true;

        // Lighting
        this.setupLighting();

        // Environment
        this.setupEnvironment();

        // Events
        this.setupEventListeners();

        // Loading complete
        this.hideLoadingScreen();
    }

    setupLighting() {
        // Ambient Light
        const ambient = new THREE.AmbientLight(0xffffff, 0.6);
        GAME_STATE.scene.add(ambient);

        // Directional Light (Sun)
        const dirLight = new THREE.DirectionalLight(0xffffff, 0.9);
        dirLight.position.set(20, 40, 20);
        dirLight.castShadow = true;
        dirLight.shadow.camera.left = -80;
        dirLight.shadow.camera.right = 80;
        dirLight.shadow.camera.top = 80;
        dirLight.shadow.camera.bottom = -80;
        dirLight.shadow.mapSize.width = 4096;
        dirLight.shadow.mapSize.height = 4096;
        dirLight.shadow.bias = -0.0001;
        GAME_STATE.scene.add(dirLight);

        // Hemisphere Light
        const hemisLight = new THREE.HemisphereLight(0x87ceeb, 0x222222, 0.5);
        GAME_STATE.scene.add(hemisLight);
    }

    setupEnvironment() {
        // Road
        this.createRoad();

        // Buildings
        for (let i = 0; i < 50; i++) {
            createBuilding(-100 - i * 25, Math.random() > 0.5 ? 1 : -1);
        }

        // Create player car
        createAmbulance();

        // Create particle system
        initParticleSystem();
    }

    createRoad() {
        const roadGeo = new THREE.PlaneGeometry(15, CONFIG.ROAD_LENGTH);
        const roadMat = new THREE.MeshStandardMaterial({
            color: 0x2a2a2a,
            roughness: 0.9,
            metalness: 0
        });
        const road = new THREE.Mesh(roadGeo, roadMat);
        road.rotation.x = -Math.PI / 2;
        road.position.z = -CONFIG.ROAD_LENGTH / 2;
        road.receiveShadow = true;
        road.castShadow = false;
        GAME_STATE.scene.add(road);

        // Road markings
        for (let i = 0; i < 150; i++) {
            const markGeo = new THREE.PlaneGeometry(0.3, 5);
            const markMat = new THREE.MeshBasicMaterial({ color: 0xffff00 });
            const mark = new THREE.Mesh(markGeo, markMat);
            mark.rotation.x = -Math.PI / 2;
            mark.position.set(0, 0.011, -i * 6);
            mark.castShadow = false;
            GAME_STATE.scene.add(mark);
            GAME_STATE.road.push(mark);
        }

        // Side stripes
        const stripeLeft = new THREE.Mesh(
            new THREE.PlaneGeometry(0.2, CONFIG.ROAD_LENGTH),
            new THREE.MeshBasicMaterial({ color: 0xffffff })
        );
        stripeLeft.rotation.x = -Math.PI / 2;
        stripeLeft.position.set(-7.5, 0.012, -CONFIG.ROAD_LENGTH / 2);
        GAME_STATE.scene.add(stripeLeft);

        const stripeRight = new THREE.Mesh(
            new THREE.PlaneGeometry(0.2, CONFIG.ROAD_LENGTH),
            new THREE.MeshBasicMaterial({ color: 0xffffff })
        );
        stripeRight.rotation.x = -Math.PI / 2;
        stripeRight.position.set(7.5, 0.012, -CONFIG.ROAD_LENGTH / 2);
        GAME_STATE.scene.add(stripeRight);
    }

    setupEventListeners() {
        window.addEventListener('resize', () => this.onWindowResize());
    }

    onWindowResize() {
        GAME_STATE.camera.aspect = window.innerWidth / window.innerHeight;
        GAME_STATE.camera.updateProjectionMatrix();
        GAME_STATE.renderer.setSize(window.innerWidth, window.innerHeight);
    }

    hideLoadingScreen() {
        const loadingScreen = document.getElementById('loadingScreen');
        if (loadingScreen) {
            loadingScreen.style.animation = 'fadeOut 0.5s ease-out forwards';
            setTimeout(() => {
                loadingScreen.style.display = 'none';
            }, 500);
        }
    }

    render() {
        GAME_STATE.renderer.render(GAME_STATE.scene, GAME_STATE.camera);
    }
}

// Initialize scene
let scene3D = null;
window.addEventListener('load', () => {
    scene3D = new Scene3D();
});