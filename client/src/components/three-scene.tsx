import { useRef, useEffect } from 'react';
import * as THREE from 'three';

type ThreeSceneProps = {
  className?: string;
};

const ThreeScene = ({ className = "" }: ThreeSceneProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const requestRef = useRef<number>();
  
  useEffect(() => {
    if (!containerRef.current) return;
    
    // Create scene
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0F1624);
    
    // Create camera
    const camera = new THREE.PerspectiveCamera(
      75,
      containerRef.current.clientWidth / containerRef.current.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 5;
    
    // Create renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    containerRef.current.appendChild(renderer.domElement);
    
    // Create lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.2);
    scene.add(ambientLight);
    
    const pointLight1 = new THREE.PointLight(0x64FFDA, 1, 100);
    pointLight1.position.set(2, 3, 4);
    scene.add(pointLight1);
    
    const pointLight2 = new THREE.PointLight(0xFF4D4D, 1, 100);
    pointLight2.position.set(-2, -3, 4);
    scene.add(pointLight2);
    
    // Create particle system (cyber grid)
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 1000;
    const posArray = new Float32Array(particlesCount * 3);
    
    for(let i = 0; i < particlesCount * 3; i++) {
      posArray[i] = (Math.random() - 0.5) * 10;
    }
    
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    
    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.03,
      color: 0x64FFDA,
      transparent: true,
      opacity: 0.8,
    });
    
    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particlesMesh);
    
    // Create sphere (main object)
    const sphereGeometry = new THREE.SphereGeometry(1, 32, 32);
    const sphereMaterial = new THREE.MeshPhongMaterial({
      color: 0x0A192F,
      emissive: 0x0A192F,
      specular: 0x64FFDA,
      shininess: 50,
      transparent: true,
      opacity: 0.9,
      wireframe: true,
    });
    
    const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
    scene.add(sphere);
    
    // Create outer glow sphere
    const glowGeometry = new THREE.SphereGeometry(1.2, 32, 32);
    const glowMaterial = new THREE.MeshBasicMaterial({
      color: 0x64FFDA,
      transparent: true,
      opacity: 0.05,
    });
    
    const glowSphere = new THREE.Mesh(glowGeometry, glowMaterial);
    scene.add(glowSphere);
    
    // Create digital circuit lines
    const lineCount = 10;
    const lineSegments: THREE.Line[] = [];
    
    for (let i = 0; i < lineCount; i++) {
      const points = [];
      const segmentCount = 5 + Math.floor(Math.random() * 5);
      const startAngle = Math.random() * Math.PI * 2;
      const startRadius = 1.1;
      
      for (let j = 0; j < segmentCount; j++) {
        const angle = startAngle + (j * 0.2) * (Math.random() > 0.5 ? 1 : -1);
        const radius = startRadius + j * 0.2;
        
        const x = Math.cos(angle) * radius;
        const y = Math.sin(angle) * radius;
        const z = (Math.random() - 0.5) * 2;
        
        points.push(new THREE.Vector3(x, y, z));
      }
      
      const lineGeometry = new THREE.BufferGeometry().setFromPoints(points);
      const lineMaterial = new THREE.LineBasicMaterial({ 
        color: Math.random() > 0.5 ? 0x64FFDA : 0xFF4D4D,
        transparent: true,
        opacity: 0.6,
      });
      
      const line = new THREE.Line(lineGeometry, lineMaterial);
      scene.add(line);
      lineSegments.push(line);
    }
    
    // Handle window resize
    const handleResize = () => {
      if (!containerRef.current) return;
      
      camera.aspect = containerRef.current.clientWidth / containerRef.current.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    };
    
    window.addEventListener('resize', handleResize);
    
    // Animation loop
    const animate = () => {
      particlesMesh.rotation.x += 0.0005;
      particlesMesh.rotation.y += 0.0005;
      
      sphere.rotation.y += 0.005;
      sphere.rotation.x += 0.002;
      
      glowSphere.rotation.y += 0.003;
      glowSphere.rotation.x += 0.001;
      
      lineSegments.forEach((line, i) => {
        line.rotation.y += 0.003 * (i % 2 === 0 ? 1 : -1);
        line.rotation.z += 0.002 * (i % 3 === 0 ? 1 : -1);
      });
      
      renderer.render(scene, camera);
      requestRef.current = requestAnimationFrame(animate);
    };
    
    animate();
    
    // Cleanup
    return () => {
      if (containerRef.current && containerRef.current.contains(renderer.domElement)) {
        containerRef.current.removeChild(renderer.domElement);
      }
      window.removeEventListener('resize', handleResize);
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
      scene.clear();
    };
  }, []);
  
  return <div ref={containerRef} className={`w-full h-full ${className}`}></div>;
};

export default ThreeScene;
