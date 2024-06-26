import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';


function createThreeScene(container) {
    
    const scene = new THREE.Scene();
  
    
    const camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
    camera.position.set(0, 0, 5); 
  
   
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    container.appendChild(renderer.domElement);
  
    
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5); 
    scene.add(ambientLight);
  
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5); 
    directionalLight.position.set(1, 1, 1).normalize();
    scene.add(directionalLight);
  
    
    const loader = new GLTFLoader();
    loader.load('https://raw.githubusercontent.com/davidoneilljosh/Metavers3d/main/hoodie%20test%20compress.gltf', function(gltf) {
        scene.add(gltf.scene); 
      }, undefined, function(error) {
        console.error('Error loading GLTF model:', error);
      }
    );
  
    
    const geometry = new THREE.BoxGeometry();
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);

    
    function animate() {
      requestAnimationFrame(animate);
      cube.rotation.x += 0.01;
      cube.rotation.y += 0.01;
      renderer.render(scene, camera); 
    }
  
    animate(); 
}

document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('three-container');
    createThreeScene(container);
});

export { createThreeScene };
