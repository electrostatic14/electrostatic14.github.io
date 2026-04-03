function createAmbulance() {
    const ambulanceGroup = new THREE.Group();

    // Body (white)
    const bodyGeo = new THREE.BoxGeometry(1.8, 1.3, 4.0);
    const whiteMat = new THREE.MeshStandardMaterial({
        color: 0xffffff,
        metalness: 0.7,
        roughness: 0.2,
        flatShading: false
    });
    const body = new THREE.Mesh(bodyGeo, whiteMat);
    body.position.y = 0.65;
    body.castShadow = true;
    body.receiveShadow = true;
    ambulanceGroup.add(body);

    // Cabin (red stripe)
    const cabinGeo = new THREE.BoxGeometry(1.7, 0.9, 1.6);
    const redMat = new THREE.MeshStandardMaterial({
        color: 0xee3333,
        metalness: 0.6,
        roughness: 0.3
    });
    const cabin = new THREE.Mesh(cabinGeo, redMat);
    cabin.position.set(0, 1.5, -0.9);
    cabin.castShadow = true;
    cabin.receiveShadow = true;
    ambulanceGroup.add(cabin);

    // Cabin windows
    const windowMat = new THREE.MeshStandardMaterial({
        color: 0x333355,
        metalness: 0.9,
        roughness: 0.1,
        transparent: true,
        opacity: 0.6
    });
    const windowGeo = new THREE.BoxGeometry(1.7, 0.75, 1.4);
    const window = new THREE.Mesh(windowGeo, windowMat);
    window.position.set(0, 1.5, -0.9);
    window.castShadow = true;
    ambulanceGroup.add(window);

    // Red cross on body
    const crossMat = new THREE.MeshStandardMaterial({
        color: 0xff0000,
        emissive: 0xff0000,
        emissiveIntensity: 0.9,
        metalness: 0.5
    });

    const crossH = new THREE.Mesh(new THREE.BoxGeometry(1.0, 0.2, 0.1), crossMat);
    crossH.position.set(0, 1.3, 1.7);
    crossH.castShadow = true;
    ambulanceGroup.add(crossH);

    const crossV = new THREE.Mesh(new THREE.BoxGeometry(0.2, 1.0, 0.1), crossMat);
    crossV.position.set(0, 1.3, 1.7);
    crossV.castShadow = true;
    ambulanceGroup.add(crossV);

    // Red stripe on body
    const stripeGeo = new THREE.BoxGeometry(1.85, 0.2, 4.05);
    const stripe = new THREE.Mesh(stripeGeo, redMat);
    stripe.position.set(0, 1.1, 0);
    stripe.castShadow = true;
    ambulanceGroup.add(stripe);

    // Headlights (yellow)
    const lightGeo = new THREE.BoxGeometry(0.3, 0.18, 0.12);
    const lightMat = new THREE.MeshStandardMaterial({
        color: 0xffff88,
        emissive: 0xffff44,
        emissiveIntensity: 1.2,
        metalness: 0.8
    });

    const lightL = new THREE.Mesh(lightGeo, lightMat);
    lightL.position.set(-0.7, 0.65, 1.95);
    lightL.castShadow = true;
    ambulanceGroup.add(lightL);

    const lightR = new THREE.Mesh(lightGeo, lightMat);
    lightR.position.set(0.7, 0.65, 1.95);
    lightR.castShadow = true;
    ambulanceGroup.add(lightR);

    // Sirens (red and blue)
    const sirenGeo = new THREE.BoxGeometry(0.35, 0.3, 0.3);
    const redLightMat = new THREE.MeshStandardMaterial({
        color: 0xff0000,
        emissive: 0xff0000,
        emissiveIntensity: 1.5,
        metalness: 0.4
    });
    const blueLightMat = new THREE.MeshStandardMaterial({
        color: 0x0088ff,
        emissive: 0x0088ff,
        emissiveIntensity: 1.5,
        metalness: 0.4
    });

    const sirenRed = new THREE.Mesh(sirenGeo, redLightMat);
    sirenRed.position.set(-0.6, 2.1, -0.6);
    sirenRed.castShadow = true;
    ambulanceGroup.add(sirenRed);
    ambulanceGroup.userData.sirenRed = sirenRed;

    const sirenBlue = new THREE.Mesh(sirenGeo, blueLightMat);
    sirenBlue.position.set(0.6, 2.1, -0.6);
    sirenBlue.castShadow = true;
    ambulanceGroup.add(sirenBlue);
    ambulanceGroup.userData.sirenBlue = sirenBlue;

    // Wheels
    const wheelGeo = new THREE.CylinderGeometry(0.4, 0.4, 0.28, 16);
    const wheelMat = new THREE.MeshStandardMaterial({
        color: 0x0a0a0a,
        metalness: 0.5,
        roughness: 0.8
    });

    const wheelPositions = [
        [-0.95, 0.4, 1.3],
        [0.95, 0.4, 1.3],
        [-0.95, 0.4, -1.3],
        [0.95, 0.4, -1.3]
    ];

    const wheels = [];
    wheelPositions.forEach((pos, idx) => {
        const wheel = new THREE.Mesh(wheelGeo, wheelMat);
        wheel.rotation.z = Math.PI / 2;
        wheel.position.set(...pos);
        wheel.castShadow = true;
        wheel.receiveShadow = true;
        ambulanceGroup.add(wheel);
        wheels.push(wheel);
    });
    ambulanceGroup.userData.wheels = wheels;

    // Bumper
    const bumperGeo = new THREE.BoxGeometry(1.85, 0.15, 0.15);
    const bumperMat = new THREE.MeshStandardMaterial({
        color: 0x333333,
        metal