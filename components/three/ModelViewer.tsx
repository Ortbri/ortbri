"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";

interface ModelViewerProps {
  modelPath?: string;
  className?: string;
}

export default function ModelViewer({ 
  modelPath = "/models/scene.gltf", 
  className 
}: ModelViewerProps) {
  const mountRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    if (!mountRef.current) return;
    
    // Get container dimensions
    const width = mountRef.current.clientWidth;
    const height = mountRef.current.clientHeight;
    
    // Initialize scene, camera, and renderer
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x111111);
    
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    camera.position.set(0, 1, 5);
    
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    
    mountRef.current.appendChild(renderer.domElement);
    
    // Add orbit controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.minDistance = 2;
    controls.maxDistance = 10;
    controls.target.set(0, 1, 0);
    
    // Create a grid helper
    const gridHelper = new THREE.GridHelper(10, 10);
    scene.add(gridHelper);
    
    // Add lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);
    
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(5, 5, 5);
    directionalLight.castShadow = true;
    directionalLight.shadow.mapSize.width = 1024;
    directionalLight.shadow.mapSize.height = 1024;
    scene.add(directionalLight);
    
    // Load 3D model
    const loader = new GLTFLoader();
    
    // Add a placeholder sphere while loading
    const sphereGeometry = new THREE.SphereGeometry(1, 32, 32);
    const sphereMaterial = new THREE.MeshStandardMaterial({ 
      color: 0x888888,
      roughness: 0.5,
      metalness: 0.5,
    });
    const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
    sphere.position.y = 1;
    scene.add(sphere);
    
    // Load the model
    loader.load(
      modelPath,
      (gltf) => {
        // Remove placeholder
        scene.remove(sphere);
        sphereGeometry.dispose();
        sphereMaterial.dispose();
        
        // Add the loaded model
        const model = gltf.scene;
        
        // Center the model
        const box = new THREE.Box3().setFromObject(model);
        const center = box.getCenter(new THREE.Vector3());
        const size = box.getSize(new THREE.Vector3());
        
        // Scale model to reasonable size
        const maxDim = Math.max(size.x, size.y, size.z);
        const scale = 2 / maxDim;
        model.scale.set(scale, scale, scale);
        
        // Center model
        model.position.sub(center.multiplyScalar(scale));
        model.position.y = 0;
        
        // Enable shadows
        model.traverse((node) => {
          if (node instanceof THREE.Mesh) {
            node.castShadow = true;
            node.receiveShadow = true;
          }
        });
        
        scene.add(model);
        setLoading(false);
      },
      () => {
        // Progress callback - intentionally empty
      },
      (error) => {
        console.error("Error loading model:", error);
        setError("Failed to load 3D model");
        setLoading(false);
      }
    );
    
    // Handle window resize
    const handleResize = () => {
      if (!mountRef.current) return;
      
      const width = mountRef.current.clientWidth;
      const height = mountRef.current.clientHeight;
      
      renderer.setSize(width, height);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    };
    
    window.addEventListener("resize", handleResize);
    
    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      
      if (loading) {
        sphere.rotation.y += 0.01;
      }
      
      controls.update();
      renderer.render(scene, camera);
    };
    
    animate();
    
    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize);
      
      if (mountRef.current) {
        mountRef.current.removeChild(renderer.domElement);
      }
      
      // Dispose of resources
      sphereGeometry.dispose();
      sphereMaterial.dispose();
      renderer.dispose();
    };
  }, [modelPath, loading]);
  
  return (
    <div className={className} style={{ position: "relative", width: "100%", height: "100%" }}>
      <div ref={mountRef} style={{ width: "100%", height: "100%" }} />
      
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/50">
          <div className="text-white">Loading 3D Model...</div>
        </div>
      )}
      
      {error && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/50">
          <div className="text-red-500">{error}</div>
        </div>
      )}
    </div>
  );
} 