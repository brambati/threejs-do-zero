// ─────────────────────────────────────────────────────────
// main.js — Three.js do Zero
// Instalar: npm install three
// ─────────────────────────────────────────────────────────
import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

// ══════════════════════════════════════════
// 1. INGREDIENTE 1: SCENE (o palco)
//    Onde todos os objetos, luzes e câmeras existem
// ══════════════════════════════════════════
const scene = new THREE.Scene();

// Fog: objetos distantes ficam mais escuros → profundidade
scene.fog = new THREE.FogExp2(0x050810, 0.05);

// ══════════════════════════════════════════
// 2. INGREDIENTE 2: CAMERA (de onde você olha)
//    PerspectiveCamera imita a visão humana
// ══════════════════════════════════════════
const camera = new THREE.PerspectiveCamera(
  75,                              // FOV: campo de visão em graus
  window.innerWidth / window.innerHeight, // aspect ratio
  0.1,                             // near: mais perto que isso não renderiza
  100                              // far:  mais longe que isso não renderiza
);
camera.position.set(0, 0, 3);     // afasta câmera no eixo Z

// ══════════════════════════════════════════
// 3. INGREDIENTE 3: RENDERER (quem desenha)
//    Transforma a scene + camera em pixels no canvas
// ══════════════════════════════════════════
const canvas   = document.getElementById("canvas");
const renderer = new THREE.WebGLRenderer({
  canvas,
  antialias: true,      // bordas suaves (mais pesado, vale a pena)
  alpha: true,          // fundo transparente (usa cor do body)
});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)); // máx 2x para performance

// ══════════════════════════════════════════
// 4. INGREDIENTE 4: MESH (geometria + material)
//    Mesh = forma + aparência = objeto visível
// ══════════════════════════════════════════

// ─── Objeto principal: TorusKnot ───────────────────────
const geometry1 = new THREE.TorusKnotGeometry(
  0.8,   // raio do torus
  0.3,   // raio do tubo
  128,   // segmentos tubulares (mais = mais suave)
  16     // segmentos radiais
);
const material1 = new THREE.MeshStandardMaterial({
  color: 0xa78bfa,   // cor base (roxo)
  roughness: 0.2,    // 0 = espelho, 1 = fosco
  metalness: 0.1,    // 0 = plástico, 1 = metal
});
const mesh1 = new THREE.Mesh(geometry1, material1);
scene.add(mesh1);

// ─── Objeto 2: Sphere ──────────────────────────────────
const geometry2  = new THREE.SphereGeometry(0.4, 32, 32);
const material2  = new THREE.MeshStandardMaterial({ color: 0x00e5ff, roughness: 0.4 });
const mesh2      = new THREE.Mesh(geometry2, material2);
mesh2.position.set(-2.5, 0, 0);
scene.add(mesh2);

// ─── Objeto 3: Icosahedron ─────────────────────────────
const geometry3  = new THREE.IcosahedronGeometry(0.5, 0);
const material3  = new THREE.MeshStandardMaterial({ color: 0xff6b35, roughness: 0.6, wireframe: false });
const mesh3      = new THREE.Mesh(geometry3, material3);
mesh3.position.set(2.5, 0, 0);
scene.add(mesh3);

// ══════════════════════════════════════════
// 5. LUZES
//    MeshStandardMaterial precisa de luz para renderizar
// ══════════════════════════════════════════

// AmbientLight: ilumina tudo igualmente, sem sombra
// → evita que as partes sem luz direta fiquem 100% pretas
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

// DirectionalLight: luz direcional como o sol
const dirLight = new THREE.DirectionalLight(0xffffff, 2);
dirLight.position.set(3, 3, 3);
scene.add(dirLight);

// Luz de apoio do outro lado para não ficar tão escuro
const fillLight = new THREE.DirectionalLight(0xa78bfa, 0.5);
fillLight.position.set(-3, -1, -3);
scene.add(fillLight);

// ══════════════════════════════════════════
// 6. ORBITCONTROLS (interatividade)
//    Arrastar = girar câmera
//    Scroll   = zoom
//    Direito  = pan
// ══════════════════════════════════════════
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;   // inércia suave no movimento
controls.dampingFactor = 0.05;   // quanto mais baixo, mais fluido
controls.enablePan     = false;  // desativa pan (opcional)
controls.minDistance   = 1.5;    // zoom mínimo
controls.maxDistance   = 8;      // zoom máximo

// ══════════════════════════════════════════
// 7. LOOP DE ANIMAÇÃO
//    requestAnimationFrame = ~60fps
// ══════════════════════════════════════════
const clock = new THREE.Clock(); // para animação baseada em tempo (não frames)

function animate() {
  requestAnimationFrame(animate); // chama a si mesmo a cada frame

  const elapsed = clock.getElapsedTime(); // segundos desde o início

  // Rotação contínua (independente do fps)
  mesh1.rotation.x = elapsed * 0.3;
  mesh1.rotation.y = elapsed * 0.5;

  mesh2.rotation.x = elapsed * 0.4;
  mesh2.rotation.y = elapsed * 0.2;

  mesh3.rotation.x = elapsed * 0.2;
  mesh3.rotation.y = elapsed * 0.6;

  // Flutuação suave no eixo Y
  mesh1.position.y = Math.sin(elapsed * 0.8) * 0.1;
  mesh2.position.y = Math.sin(elapsed * 0.6 + 1) * 0.15;
  mesh3.position.y = Math.sin(elapsed * 1.0 + 2) * 0.12;

  // Atualiza OrbitControls (necessário com enableDamping: true)
  controls.update();

  // Renderiza a cena
  renderer.render(scene, camera);
}

animate(); // inicia o loop

// ══════════════════════════════════════════
// 8. RESPONSIVE
//    Mantém proporção ao redimensionar a janela
// ══════════════════════════════════════════
window.addEventListener("resize", () => {
  // Atualiza aspect ratio da câmera
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix(); // OBRIGATÓRIO após mudar qualquer parâmetro da câmera

  // Atualiza tamanho do renderer
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});
