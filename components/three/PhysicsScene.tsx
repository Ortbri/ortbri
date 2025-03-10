'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import * as THREE from 'three';
import * as CANNON from 'cannon-es';

interface PhysicsSceneProps {
  className?: string;
}

export default function PhysicsScene({ className }: PhysicsSceneProps) {
  const mountRef = useRef<HTMLDivElement>(null);
  const [cubeCount, setCubeCount] = useState(0);
  const [gravity, setGravity] = useState(-9.82);
  const worldRef = useRef<CANNON.World | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cubesRef = useRef<THREE.Mesh[]>([]);
  const cubeBodiesRef = useRef<CANNON.Body[]>([]);

  // Function to add a new cube
  const addCube = useCallback((count = 1) => {
    if (!worldRef.current || !sceneRef.current) return;

    const world = worldRef.current;
    const scene = sceneRef.current;
    const width = window.innerWidth;
    const height = window.innerHeight;

    for (let i = 0; i < count; i++) {
      // Random size between 0.5 and 1.5
      const size = Math.random() * 1 + 0.5;

      // Create Three.js cube
      const geometry = new THREE.BoxGeometry(size, size, size);
      const material = new THREE.MeshStandardMaterial({
        color: Math.random() * 0xffffff,
        roughness: 0.7,
        metalness: 0.3,
      });
      const cube = new THREE.Mesh(geometry, material);
      cube.castShadow = true;
      cube.receiveShadow = true;
      scene.add(cube);
      cubesRef.current.push(cube);

      // Create Cannon.js body
      const cubeBody = new CANNON.Body({
        mass: size, // Mass proportional to size
        shape: new CANNON.Box(new CANNON.Vec3(size / 2, size / 2, size / 2)),
        material: new CANNON.Material({
          friction: 0.3,
          restitution: 0.3, // Bounciness
        }),
      });

      // Random position at the top of the screen
      cubeBody.position.set(
        ((Math.random() - 0.5) * width) / 20, // Random X position
        height / 100 + Math.random() * 10, // Start above the screen
        ((Math.random() - 0.5) * width) / 20 // Random Z position
      );

      // Random rotation
      cubeBody.quaternion.setFromEuler(
        Math.random() * Math.PI,
        Math.random() * Math.PI,
        Math.random() * Math.PI
      );

      world.addBody(cubeBody);
      cubeBodiesRef.current.push(cubeBody);

      setCubeCount(prev => prev + 1);
    }
  }, []);

  // Function to clear all cubes
  const clearCubes = useCallback(() => {
    if (!worldRef.current || !sceneRef.current) return;

    const world = worldRef.current;
    const scene = sceneRef.current;

    // Remove all cubes from the scene and physics world
    for (const cube of cubesRef.current) {
      scene.remove(cube);
      if (cube.geometry) cube.geometry.dispose();
      if (cube.material instanceof THREE.Material) cube.material.dispose();
    }

    for (const body of cubeBodiesRef.current) {
      world.removeBody(body);
    }

    // Clear the arrays
    cubesRef.current = [];
    cubeBodiesRef.current = [];
    setCubeCount(0);
  }, []);

  // Function to update gravity
  const updateGravity = useCallback((value: number) => {
    if (!worldRef.current) return;

    setGravity(value);
    worldRef.current.gravity.set(0, value, 0);
  }, []);

  useEffect(() => {
    if (!mountRef.current) return;

    // Get container dimensions
    const width = window.innerWidth;
    const height = window.innerHeight;

    // Initialize Three.js scene
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x111111);
    sceneRef.current = scene;

    // Initialize camera
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    camera.position.set(0, 5, 15);

    // Initialize renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    mountRef.current.appendChild(renderer.domElement);

    // Initialize Cannon.js world
    const world = new CANNON.World({
      gravity: new CANNON.Vec3(0, gravity, 0), // Earth gravity
    });
    worldRef.current = world;

    // Add a ground plane (invisible in Three.js, just for physics)
    const groundBody = new CANNON.Body({
      type: CANNON.Body.STATIC,
      shape: new CANNON.Plane(),
    });
    groundBody.quaternion.setFromEuler(-Math.PI / 2, 0, 0); // Rotate to be flat
    groundBody.position.set(0, -height / 200, 0); // Position at bottom of screen
    world.addBody(groundBody);

    // Create a visible floor in Three.js
    const floorGeometry = new THREE.PlaneGeometry(width / 10, width / 10);
    const floorMaterial = new THREE.MeshStandardMaterial({
      color: 0x333333,
      roughness: 0.8,
      metalness: 0.2,
    });
    const floor = new THREE.Mesh(floorGeometry, floorMaterial);
    floor.rotation.x = -Math.PI / 2;
    floor.position.copy(groundBody.position as unknown as THREE.Vector3);
    floor.receiveShadow = true;
    scene.add(floor);

    // Add walls to keep cubes from falling off the sides
    const wallThickness = 0.5;
    const wallHeight = 20;

    // Left wall
    const leftWallBody = new CANNON.Body({
      type: CANNON.Body.STATIC,
      shape: new CANNON.Box(new CANNON.Vec3(wallThickness, wallHeight, width / 20)),
    });
    leftWallBody.position.set(-width / 20, 0, 0);
    world.addBody(leftWallBody);

    // Right wall
    const rightWallBody = new CANNON.Body({
      type: CANNON.Body.STATIC,
      shape: new CANNON.Box(new CANNON.Vec3(wallThickness, wallHeight, width / 20)),
    });
    rightWallBody.position.set(width / 20, 0, 0);
    world.addBody(rightWallBody);

    // Back wall
    const backWallBody = new CANNON.Body({
      type: CANNON.Body.STATIC,
      shape: new CANNON.Box(new CANNON.Vec3(width / 20, wallHeight, wallThickness)),
    });
    backWallBody.position.set(0, 0, -width / 20);
    world.addBody(backWallBody);

    // Front wall (invisible, just to keep cubes from falling towards camera)
    const frontWallBody = new CANNON.Body({
      type: CANNON.Body.STATIC,
      shape: new CANNON.Box(new CANNON.Vec3(width / 20, wallHeight, wallThickness)),
    });
    frontWallBody.position.set(0, 0, width / 20);
    world.addBody(frontWallBody);

    // Create initial cubes
    addCube(20);

    // Add lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(5, 10, 7.5);
    directionalLight.castShadow = true;
    directionalLight.shadow.mapSize.width = 1024;
    directionalLight.shadow.mapSize.height = 1024;
    directionalLight.shadow.camera.far = 50;
    directionalLight.shadow.camera.left = -10;
    directionalLight.shadow.camera.right = 10;
    directionalLight.shadow.camera.top = 10;
    directionalLight.shadow.camera.bottom = -10;
    scene.add(directionalLight);

    // Add a cube every 2 seconds, up to a maximum of 100 cubes
    const cubeInterval = setInterval(() => {
      if (cubesRef.current.length < 100) {
        addCube();
      } else {
        clearInterval(cubeInterval);
      }
    }, 2000);

    // Handle window resize
    const handleResize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;

      renderer.setSize(width, height);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    };

    window.addEventListener('resize', handleResize);

    // Animation loop
    const timeStep = 1 / 60; // 60 fps
    const animate = () => {
      requestAnimationFrame(animate);

      // Step the physics world
      world.step(timeStep);

      // Update cube positions and rotations based on physics
      for (let i = 0; i < cubesRef.current.length; i++) {
        const cube = cubesRef.current[i];
        const cubeBody = cubeBodiesRef.current[i];

        // Copy position from Cannon.js to Three.js
        cube.position.copy(cubeBody.position as unknown as THREE.Vector3);

        // Copy rotation from Cannon.js to Three.js
        cube.quaternion.copy(cubeBody.quaternion as unknown as THREE.Quaternion);

        // Remove cubes that have fallen too far
        if (cubeBody.position.y < -20) {
          scene.remove(cube);
          world.removeBody(cubeBody);
          cubesRef.current.splice(i, 1);
          cubeBodiesRef.current.splice(i, 1);
          i--;
          setCubeCount(prev => prev - 1);

          // Create a new cube to replace the removed one
          if (cubesRef.current.length < 100) {
            addCube();
          }
        }
      }

      renderer.render(scene, camera);
    };

    animate();

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      clearInterval(cubeInterval);

      if (mountRef.current) {
        mountRef.current.removeChild(renderer.domElement);
      }

      // Dispose of Three.js resources
      scene.traverse(object => {
        if (object instanceof THREE.Mesh) {
          object.geometry.dispose();

          if (object.material instanceof THREE.Material) {
            object.material.dispose();
          } else if (Array.isArray(object.material)) {
            for (const material of object.material) {
              material.dispose();
            }
          }
        }
      });

      renderer.dispose();
    };
  }, [addCube, gravity]);

  return (
    <>
      <div
        ref={mountRef}
        className={className}
        style={{
          width: '100vw',
          height: '100vh',
          position: 'fixed',
          top: 0,
          left: 0,
          overflow: 'hidden',
        }}
      />

      <div className="fixed bottom-4 left-4 z-10 flex flex-col gap-2 rounded-lg bg-black/30 p-4 backdrop-blur-sm">
        <h2 className="mb-2 font-bold text-white">Controls</h2>

        <div className="mb-4 grid grid-cols-2 gap-2">
          <button
            type="button"
            onClick={() => addCube(5)}
            className="rounded-md bg-blue-500 px-4 py-2 text-white transition-colors hover:bg-blue-600"
          >
            Add 5 Cubes
          </button>

          <button
            type="button"
            onClick={() => addCube(20)}
            className="rounded-md bg-green-500 px-4 py-2 text-white transition-colors hover:bg-green-600"
          >
            Add 20 Cubes
          </button>

          <button
            type="button"
            onClick={() => addCube(50)}
            className="rounded-md bg-purple-500 px-4 py-2 text-white transition-colors hover:bg-purple-600"
          >
            Add 50 Cubes
          </button>

          <button
            type="button"
            onClick={clearCubes}
            className="rounded-md bg-red-500 px-4 py-2 text-white transition-colors hover:bg-red-600"
          >
            Clear All
          </button>
        </div>

        <div className="mb-2">
          <label htmlFor="gravity" className="mb-1 block text-white">
            Gravity: {gravity.toFixed(2)}
          </label>
          <input
            id="gravity"
            type="range"
            min="-20"
            max="0"
            step="0.1"
            value={gravity}
            onChange={e => updateGravity(Number.parseFloat(e.target.value))}
            className="w-full"
          />
        </div>

        <div className="rounded-md bg-black/50 px-4 py-2 text-white">Cubes: {cubeCount}</div>
      </div>
    </>
  );
}
