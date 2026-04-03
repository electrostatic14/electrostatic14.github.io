const CONFIG = {
    // Google Sheets
    GOOGLE_SHEET_URL: 'https://script.google.com/macros/s/AKfycbws-OTlVZ2nwkWBEFO2Dvu-the0URQE9ErQ9o-TOgOBCubeolqhui4ltAq5hr1AmT-X/exec',

    // Game Settings
    GAMES_PER_DAY: 2,
    LANE_WIDTH: 3.5,
    LANES: [-3.5, 0, 3.5],
    ROAD_LENGTH: 400,
    VIEW_DISTANCE: 150,

    // Difficulty Settings
    DIFFICULTIES: {
        easy: {
            trafficFreq: 0.015,
            trafficSpeed: 0.5,
            maxSpeed: 160,
            trafficMaxSpeed: 0.7,
            coinValue: 10,
            label: 'Easy'
        },
        normal: {
            trafficFreq: 0.025,
            trafficSpeed: 0.75,
            maxSpeed: 200,
            trafficMaxSpeed: 0.95,
            coinValue: 15,
            label: 'Normal'
        },
        hard: {
            trafficFreq: 0.035,
            trafficSpeed: 1.0,
            maxSpeed: 240,
            trafficMaxSpeed: 1.3,
            coinValue: 20,
            label: 'Hard'
        },
        insane: {
            trafficFreq: 0.05,
            trafficSpeed: 1.3,
            maxSpeed: 280,
            trafficMaxSpeed: 1.6,
            coinValue: 30,
            label: 'Insane'
        }
    },

    // Colors
    TRAFFIC_COLORS: [0xff0000, 0x0000ff, 0xffff00, 0x00ff00, 0xff00ff, 0x00ffff, 0xffa500],

    // Physics
    ACCELERATION: 0.4,
    FRICTION: 0.95,
    LANE_CHANGE_SPEED: 0.15,
    COLLISION_DISTANCE: 2.2,
    COLLISION_Z_DISTANCE: 2.8,

    // Camera Settings
    CAMERA_HEIGHT: 8,
    CAMERA_DISTANCE: 15,
    CAMERA_FOV: 75,

    // Particles
    PARTICLE_COUNT: 200,
    PARTICLE_LIFETIME: 1000,

    // Audio (если нужно)
    SOUND_ENABLED: true,

    // Debug
    DEBUG_MODE: false
};

// Global Game State
const GAME_STATE = {
    scene: null,
    camera: null,
    renderer: null,
    playerCar: null,
    road: [],
    buildings: [],
    traffic: [],
    particles: [],
    obstacles: [],

    // Game vars
    currentLane: 1,
    targetX: 0,
    speed: 0,
    maxSpeed: 200,
    score: 0,
    coins: 0,
    level: 1,
    gameActive: false,
    gameTime: 0,
    difficulty: 'normal',
    gamesPlayedToday: 0,

    // Input
    moveLeft: false,
    moveRight: false,
    brake: false,

    // Time
    time: 0,
    deltaTime: 0,
    lastFrameTime: Date.now(),

    // UI
    minimapCanvas: null,
    minimapCtx: null,

    // Camera control
    cameraShake: 0
};

// Utilities
function saveToLocalStorage(key, value) {
    try {
        localStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
        console.warn('LocalStorage error:', e);
    }
}

function loadFromLocalStorage(key, defaultValue) {
    try {
        const item = localStorage.getItem(key);
        return item ? JSON.parse(item) : defaultValue;
    } catch (e) {
        console.warn('LocalStorage error:', e);
        return defaultValue;
    }
}

function getCurrentDate() {
    return new Date().toDateString();
}

function randomBetween(min, max) {
    return Math.random() * (max - min) + min;
}

function clamp(value, min, max) {
    return Math.max(min, Math.min(max, value));
}

function lerp(a, b, t) {
    return a + (b - a) * t;
}