# Physics-Based Three.js Scene

This component creates a physics-based 3D scene with falling cubes that interact with each other and the environment using gravity and collision detection.

## Features

- Real-time physics simulation using Cannon.js
- Randomly generated cubes with different sizes and colors
- Gravity control to adjust the falling speed
- Buttons to add more cubes or clear the scene
- Cubes that stack and interact with each other realistically

## How It Works

The physics scene uses two main libraries:

1. **Three.js** - For rendering the 3D scene, cubes, and visual elements
2. **Cannon.js** - For simulating physics, including gravity, collisions, and object interactions

Each cube has two representations:
- A **Three.js Mesh** for visual rendering
- A **Cannon.js Body** for physics calculations

In each animation frame:
1. The physics world is updated
2. The positions and rotations of the physics bodies are applied to their corresponding visual meshes
3. The scene is rendered with the updated positions

## Controls

- **Add Cubes** - Add 5, 20, or 50 cubes to the scene
- **Clear All** - Remove all cubes from the scene
- **Gravity Slider** - Adjust the gravity strength (higher values make cubes fall faster)
- **Cube Counter** - Shows the current number of cubes in the scene

## Implementation Details

### Physics World Setup

```typescript
// Initialize Cannon.js world
const world = new CANNON.World({
  gravity: new CANNON.Vec3(0, gravity, 0),
});
```

### Creating Physics Bodies

```typescript
// Create Cannon.js body
const cubeBody = new CANNON.Body({
  mass: size,
  shape: new CANNON.Box(new CANNON.Vec3(size / 2, size / 2, size / 2)),
  material: new CANNON.Material({
    friction: 0.3,
    restitution: 0.3,
  }),
});
```

### Synchronizing Physics and Visuals

```typescript
// Copy position from Cannon.js to Three.js
cube.position.copy(cubeBody.position as unknown as THREE.Vector3);

// Copy rotation from Cannon.js to Three.js
cube.quaternion.copy(cubeBody.quaternion as unknown as THREE.Quaternion);
```

## Performance Considerations

- The scene limits the maximum number of cubes to prevent performance issues
- Cubes that fall below a certain threshold are removed to maintain performance
- Resources are properly disposed of when the component unmounts to prevent memory leaks 