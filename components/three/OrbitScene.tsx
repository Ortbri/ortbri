"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

interface OrbitSceneProps {
  className?: string;
}

export default function OrbitScene({ className }: OrbitSceneProps) {
  const mountRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!mountRef.current) return;
    
    // Get container dimensions
    const width = mountRef.current.clientWidth;
    const height = mountRef.current.clientHeight;
    
    // Initialize scene, camera, and renderer
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x111111);
    
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    camera.position.z = 5;
    
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    
    mountRef.current.appendChild(renderer.domElement);
    
    // Add orbit controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    
    // Create a grid helper
    const gridHelper = new THREE.GridHelper(10, 10);
    scene.add(gridHelper);
    
    // Add axes helper
    const axesHelper = new THREE.AxesHelper(5);
    scene.add(axesHelper);
    
    // Add objects to the scene
    const geometry = new THREE.TorusKnotGeometry(1, 0.3, 100, 16);
    const material = new THREE.MeshStandardMaterial({ 
      color: 0x6495ed,
      roughness: 0.5,
      metalness: 0.7,
    });
    const torusKnot = new THREE.Mesh(geometry, material);
    torusKnot.castShadow = true;
    scene.add(torusKnot);
    
    // Add lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);
    
    const pointLight = new THREE.PointLight(0xffffff, 1);
    pointLight.position.set(5, 5, 5);
    pointLight.castShadow = true;
    pointLight.shadow.mapSize.width = 1024;
    pointLight.shadow.mapSize.height = 1024;
    scene.add(pointLight);
    
    // Add a light helper
    const pointLightHelper = new THREE.PointLightHelper(pointLight, 0.5);
    scene.add(pointLightHelper);
    
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
      
      torusKnot.rotation.x += 0.005;
      torusKnot.rotation.y += 0.005;
      
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
      geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, []);
  
  return <div ref={mountRef} className={className} style={{ width: "100%", height: "100%" }} />;
} 