# Three.js Components

This directory contains reusable Three.js components for creating 3D experiences in your Next.js application.

## Components

### ThreeContainer

A flexible container for Three.js scenes with configurable size and styling.

```tsx
<ThreeContainer fullScreen={true} className="custom-class">
  {/* Three.js scene components go here */}
</ThreeContainer>
```

### Scene

A basic Three.js scene with a rotating cube.

```tsx
<ThreeContainer>
  <Scene />
</ThreeContainer>
```

### OrbitScene

An interactive Three.js scene with orbit controls, allowing users to rotate, pan, and zoom.

```tsx
<ThreeContainer>
  <OrbitScene className="h-full w-full" />
</ThreeContainer>
```

### ModelViewer

A component for loading and displaying 3D models in GLTF/GLB format.

```tsx
<ThreeContainer>
  <ModelViewer modelPath="/models/your-model.gltf" className="h-full w-full" />
</ThreeContainer>
```

## Usage

1. Import the components you need
2. Wrap your Three.js scene components with the ThreeContainer
3. Add the scene component inside the container

Example:

```tsx
import ThreeContainer from '@/components/three/ThreeContainer';
import OrbitScene from '@/components/three/OrbitScene';

export default function MyPage() {
  return (
    <div className="my-page">
      <h1>My 3D Scene</h1>
      <ThreeContainer className="h-[500px]">
        <OrbitScene className="h-full w-full" />
      </ThreeContainer>
    </div>
  );
}
```

## Adding Custom Three.js Components

To create your own Three.js components:

1. Create a new file in this directory
2. Use the existing components as templates
3. Make sure to handle cleanup properly to avoid memory leaks
4. Use the "use client" directive at the top of your component file

## Performance Tips

- Dispose of Three.js resources in the cleanup function
- Use appropriate level of detail for your models
- Implement frustum culling for complex scenes
- Consider using WebGL2 for better performance
- Use compressed textures when possible
