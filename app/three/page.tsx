'use client';

import ThreeContainer from '@/components/three/ThreeContainer';
import OrbitScene from '@/components/three/OrbitScene';
import ThreeScene from '@/components/three/Scene';
import ModelViewer from '@/components/three/ModelViewer';

export default function ThreeDemoPage() {
  return (
    <div className="container mx-auto space-y-8 py-8">
      <h1 className="mb-6 text-3xl font-bold">Three.js Demo</h1>

      <div className="space-y-12">
        <section>
          <h2 className="mb-4 text-2xl font-semibold">Basic Scene</h2>
          <p className="text-muted-foreground mb-4">
            A simple Three.js scene with a rotating cube.
          </p>
          <ThreeContainer>
            <ThreeScene />
          </ThreeContainer>
        </section>

        <section>
          <h2 className="mb-4 text-2xl font-semibold">Interactive Scene with Orbit Controls</h2>
          <p className="text-muted-foreground mb-4">
            A more complex scene with orbit controls. Click and drag to rotate, scroll to zoom.
          </p>
          <ThreeContainer className="h-[600px]">
            <OrbitScene className="h-full w-full" />
          </ThreeContainer>
        </section>

        <section>
          <h2 className="mb-4 text-2xl font-semibold">3D Model Viewer</h2>
          <p className="text-muted-foreground mb-4">
            A 3D model viewer with loading state. Note: You&apos;ll need to add a GLTF model to the
            public/models directory.
          </p>
          <ThreeContainer className="h-[600px]">
            <ModelViewer className="h-full w-full" />
          </ThreeContainer>
        </section>

        <section>
          <h2 className="mb-4 text-2xl font-semibold">Fullscreen Scene</h2>
          <p className="text-muted-foreground mb-4">A fullscreen Three.js experience.</p>
          <ThreeContainer fullScreen>
            <OrbitScene className="h-full w-full" />
          </ThreeContainer>
        </section>
      </div>
    </div>
  );
}
