// This directive tells Next.js that this component runs on the client-side
// It's needed because we're using browser-specific features like 3D graphics and WebXR
'use client';

// Import required components for 3D rendering
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Grid } from '@react-three/drei';
import { Model as PottedPlant } from './components/PottedPlant';
import { Cube } from './components/Cube';

// Import XR components for WebXR functionality (AR/VR)
import { XR, createXRStore, XROrigin } from '@react-three/xr';

// Create an XR store that manages the WebXR session state
// This store handles entering/exiting AR/VR modes and manages XR-specific functionality
const store = createXRStore();

// Main homepage component that renders our 3D scene with XR capabilities
export default function Home() {
  return (
    // Container div that takes up the full viewport (100% width and height)
    <div style={{ width: '100vw', height: '100vh' }}>
      
      {/* 
        Canvas is the main React Three Fiber component that creates a 3D scene
        It sets up WebGL context and handles rendering
        camera prop sets the initial camera position [x, y, z]
        
        The XR component will automatically provide the default "Enter XR" UI
        which intelligently shows AR/VR options based on device capabilities
      */}
      <Canvas camera={{ position: [5, 5, 5] }}>
        
        {/* 
          XR WRAPPER
          The XR component enables WebXR functionality for everything inside it
          It handles XR session management, input tracking, and rendering adjustments
          
          Using default settings which automatically:
          - Shows the built-in "Enter XR" UI in the top center
          - Detects device capabilities (AR/VR support)
          - Provides appropriate options based on the device
          - Handles session management and transitions
        */}
        <XR store={store}>
        
        {/* 
          XR ORIGIN - Controls where the user starts in VR/AR
          This positions the user at a good viewing distance from the scene objects
          Position [4, 1.6, 4] places the user:
          - 4 units away on X-axis (to the right)
          - 1.6 units up on Y-axis (average human eye height)
          - 4 units away on Z-axis (forward from scene center)
          This gives a nice diagonal view of both the cube and plant
        */}
        <XROrigin position={[4, 1.6, 4]} />
        
        {/* 
          LIGHTING SETUP
          We use multiple light sources to create depth and visual interest
        */}
        
        {/* Ambient light provides soft, overall illumination without direction */}
        <ambientLight intensity={0.4} />
        
        {/* Directional light simulates sunlight - comes from one direction */}
        <directionalLight 
          position={[10, 10, 5]}  // Position in 3D space [x, y, z]
          intensity={1.0}         // How bright the light is
          castShadow              // Enable this light to cast shadows
        />
        
        {/* Point light radiates in all directions from a single point */}
        <pointLight 
          position={[-10, -10, -5]}  // Positioned opposite to main light
          intensity={0.5}            // Dimmer than main light
          color="#ffffff"            // Pure white light
        />
        
        {/* Spot light creates a cone of light, like a flashlight */}
        <spotLight
          position={[0, 10, 0]}  // Directly above the scene
          angle={0.3}            // Width of the light cone
          penumbra={1}           // Softness of light edges (0 = sharp, 1 = very soft)
          intensity={0.3}        // Gentle fill light
          castShadow             // Enable shadow casting
        />
        
        {/* 
          3D OBJECTS
          These are our interactive 3D elements in the scene
        */}
        
        {/* Static orange cube positioned at the origin (0, 0, 0) */}
        <Cube />
        
        {/* Interactive potted plant that can be clicked to teleport */}
        <PottedPlant scale={10} />
        
        {/* 
          SCENE HELPERS
          Visual aids that help users understand the 3D space
        */}
        
        {/* Grid floor provides spatial reference and depth perception */}
        <Grid 
          args={[20, 20]}           // Grid dimensions: 20x20 units
          position={[0, -1, 0]}     // Positioned 1 unit below origin
          cellSize={1}              // Each cell is 1x1 unit
          cellThickness={0.5}       // Thin lines for individual cells
          cellColor="#6f6f6f"       // Gray color for cell lines
          sectionSize={5}           // Major grid lines every 5 cells
          sectionThickness={1}      // Thicker lines for major sections
          sectionColor="#9d4b4b"    // Reddish color for section lines
          fadeDistance={25}         // Grid fades out at this distance
          fadeStrength={1}          // How quickly the fade happens
        />
        
        {/* 
          CAMERA CONTROLS
          OrbitControls allows users to navigate around the 3D scene
          - Left click + drag: Rotate camera around the scene
          - Right click + drag: Pan the camera
          - Scroll wheel: Zoom in and out
          Note: OrbitControls work in both regular 3D mode and XR mode
        */}
        <OrbitControls 
          enablePan={true}      // Allow panning (moving the camera)
          enableZoom={true}     // Allow zooming in/out
          enableRotate={true}   // Allow rotating around the scene
        />
        
        </XR> {/* End of XR wrapper - all 3D content above is now XR-enabled */}
      </Canvas>
    </div>
  );
}
