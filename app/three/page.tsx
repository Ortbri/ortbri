"use client";

import ThreeContainer from "@/components/three/ThreeContainer";
import OrbitScene from "@/components/three/OrbitScene";
import ThreeScene from "@/components/three/Scene";
import ModelViewer from "@/components/three/ModelViewer";

export default function ThreeDemoPage() {
  return (
    <div className="container mx-auto py-8 space-y-8">
      <h1 className="text-3xl font-bold mb-6">Three.js Demo</h1>
      
      <div className="space-y-12">
        <section>
          <h2 className="text-2xl font-semibold mb-4">Basic Scene</h2>
          <p className="mb-4 text-muted-foreground">
            A simple Three.js scene with a rotating cube.
          </p>
          <ThreeContainer>
            <ThreeScene />
          </ThreeContainer>
        </section>
        
        <section>
          <h2 className="text-2xl font-semibold mb-4">Interactive Scene with Orbit Controls</h2>
          <p className="mb-4 text-muted-foreground">
            A more complex scene with orbit controls. Click and drag to rotate, scroll to zoom.
          </p>
          <ThreeContainer className="h-[600px]">
            <OrbitScene className="w-full h-full" />
          </ThreeContainer>
        </section>
        
        <section>
          <h2 className="text-2xl font-semibold mb-4">3D Model Viewer</h2>
          <p className="mb-4 text-muted-foreground">
            A 3D model viewer with loading state. Note: You&apos;ll need to add a GLTF model to the public/models directory.
          </p>
          <ThreeContainer className="h-[600px]">
            <ModelViewer className="w-full h-full" />
          </ThreeContainer>
        </section>
        
        <section>
          <h2 className="text-2xl font-semibold mb-4">Fullscreen Scene</h2>
          <p className="mb-4 text-muted-foreground">
            A fullscreen Three.js experience.
          </p>
          <ThreeContainer fullScreen>
            <OrbitScene className="w-full h-full" />
          </ThreeContainer>
        </section>
      </div>
    </div>
  );
} 