# Three.js do Zero

Código do vídeo **"Three.js do Zero"** do canal da [Digital Lift](https://digitallift.com.br).

Sua primeira cena 3D no navegador com Three.js e Vite: os quatro ingredientes (Scene, Camera, Renderer e Mesh), luzes, animação e controle com o mouse.

## Como rodar

```bash
npm install
npm run dev
```

Abra o endereço que o Vite mostrar (normalmente `http://localhost:5173`). Arraste para girar e use o scroll para dar zoom.

## Os 4 ingredientes

| Ingrediente | Papel |
|---|---|
| `Scene` | o palco onde ficam objetos, luzes e câmeras |
| `PerspectiveCamera` | de onde você olha: FOV, aspect, near e far |
| `WebGLRenderer` | quem desenha os pixels no canvas |
| `Mesh` | geometria (forma) + material (aparência) |

## O que mais tem no código

- **Luzes:** `AmbientLight` para preenchimento e `DirectionalLight` como luz principal. Sem luz, o `MeshStandardMaterial` fica preto.
- **Animação:** loop com `requestAnimationFrame` e `THREE.Clock`, para a velocidade não depender do fps.
- **OrbitControls:** importado de `three/addons/controls/OrbitControls.js`.
- **Resize:** atualiza `camera.aspect`, chama `updateProjectionMatrix()` e `renderer.setSize()`.
- **Fog:** `FogExp2` para dar profundidade.

## Arquivos

- `index.html`: o canvas e a interface sobreposta
- `style.css`: canvas em tela cheia
- `main.js`: toda a cena, comentada passo a passo
