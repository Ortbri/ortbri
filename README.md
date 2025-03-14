# 3D Models Directory

This directory is for storing 3D models in GLTF/GLB format that can be loaded by the Three.js ModelViewer component.

## Adding Models

1. Place your GLTF/GLB models in this directory
2. The default model path is `/models/scene.gltf`, so name your main model file accordingly or update the path in the ModelViewer component
3. Make sure to include all textures and other assets required by your models

## Finding Free 3D Models

You can find free 3D models at:

- [Sketchfab](https://sketchfab.com/features/free-3d-models)
- [Google Poly](https://poly.pizza/)
- [TurboSquid](https://www.turbosquid.com/Search/3D-Models/free)
- [CGTrader](https://www.cgtrader.com/free-3d-models)

## Model Format

The ModelViewer component is designed to work with GLTF/GLB format models. If your model is in a different format, you'll need to convert it to GLTF/GLB first.

## Example Usage

```tsx
<ModelViewer modelPath="/models/your-model.gltf" />
```
