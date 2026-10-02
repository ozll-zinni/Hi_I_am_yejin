"use client";

import * as THREE from "three";
import { useEffect, useRef, useState } from "react";
import { Canvas, extend, useFrame, useThree, type ThreeElement, type ThreeEvent } from "@react-three/fiber";
import { Environment, Lightformer, RoundedBox } from "@react-three/drei";
import {
  BallCollider,
  CuboidCollider,
  Physics,
  RigidBody,
  useRopeJoint,
  useSphericalJoint,
  type RapierRigidBody,
} from "@react-three/rapier";
import { MeshLineGeometry, MeshLineMaterial } from "meshline";
import { site } from "@/content/site";

extend({ MeshLineGeometry, MeshLineMaterial });
declare module "@react-three/fiber" {
  interface ThreeElements {
    meshLineGeometry: ThreeElement<typeof MeshLineGeometry>;
    meshLineMaterial: Partial<ThreeElement<typeof MeshLineMaterial>>;
  }
}

// Plastic holder
const CARD_W = 1.7;
const CARD_H = 2.7;
const CARD_D = 0.14;
// Window cut into the lower part of the holder
const WIN_W = 1.49;
const WIN_H = 2.05;
const WIN_Y = -CARD_H / 2 + 0.11 + WIN_H / 2;
// Two parallel cords entering the top of the holder
const CORD_X = 0.6;
const CORD_COLOR = "#d6d5d1";
const SEGMENT = 0.5; // rope segment length
const WIND = 0.05; // idle sway force, as a fraction of the card's weight
const GRAVITY = 40;

export default function Lanyard() {
  return (
    <Canvas camera={{ position: [0, 0, 13], fov: 25 }} gl={{ alpha: true }} dpr={[1, 2]}>
      <ambientLight intensity={1.6} />
      <directionalLight position={[2, 4, 6]} intensity={1.4} />
      <Physics gravity={[0, -GRAVITY, 0]} interpolate timeStep={1 / 60}>
        <Band />
      </Physics>
      <Environment environmentIntensity={0.5}>
        <Lightformer intensity={2} position={[0, -1, 5]} rotation={[0, 0, Math.PI / 3]} scale={[100, 0.1, 1]} />
        <Lightformer intensity={3} position={[-1, -1, 1]} rotation={[0, 0, Math.PI / 3]} scale={[100, 0.1, 1]} />
        <Lightformer intensity={3} position={[1, 1, 1]} rotation={[0, 0, Math.PI / 3]} scale={[100, 0.1, 1]} />
        <Lightformer intensity={10} position={[-10, 0, 14]} rotation={[0, Math.PI / 2, Math.PI / 3]} scale={[100, 10, 1]} />
      </Environment>
    </Canvas>
  );
}

function Band() {
  const fixed = useRef<RapierRigidBody>(null!);
  const j1 = useRef<RapierRigidBody>(null!);
  const j2 = useRef<RapierRigidBody>(null!);
  const j3 = useRef<RapierRigidBody>(null!);
  const card = useRef<RapierRigidBody>(null!);
  const leftCord = useRef<THREE.Mesh<MeshLineGeometry>>(null!);
  const rightCord = useRef<THREE.Mesh<MeshLineGeometry>>(null!);

  const { size, viewport } = useThree();
  const topY = viewport.height / 2 + 0.2; // anchor just above the top edge

  const [tmp] = useState(() => ({
    vec: new THREE.Vector3(),
    dir: new THREE.Vector3(),
    quat: new THREE.Quaternion(),
    euler: new THREE.Euler(),
    lerped: [new THREE.Vector3(), new THREE.Vector3(), new THREE.Vector3()],
    curve: new THREE.CatmullRomCurve3(Array.from({ length: 5 }, () => new THREE.Vector3()), false, "chordal"),
  }));
  const [dragged, setDragged] = useState<THREE.Vector3 | null>(null);
  const texture = useCardTexture();

  useRopeJoint(fixed, j1, [[0, 0, 0], [0, 0, 0], SEGMENT]);
  useRopeJoint(j1, j2, [[0, 0, 0], [0, 0, 0], SEGMENT]);
  useRopeJoint(j2, j3, [[0, 0, 0], [0, 0, 0], SEGMENT]);
  useSphericalJoint(j3, card, [[0, 0, 0], [0, CARD_H / 2 + 0.15, 0]]);

  useFrame((state, delta) => {
    if (!fixed.current || !card.current) return;
    const { vec, dir, quat, euler, lerped, curve } = tmp;

    if (dragged) {
      vec.set(state.pointer.x, state.pointer.y, 0.5).unproject(state.camera);
      dir.copy(vec).sub(state.camera.position).normalize();
      vec.add(dir.multiplyScalar(state.camera.position.length()));
      [card, j1, j2, j3, fixed].forEach((ref) => ref.current.wakeUp());
      card.current.setNextKinematicTranslation({ x: vec.x - dragged.x, y: vec.y - dragged.y, z: vec.z - dragged.z });
    } else {
      // Gentle wind so the badge never hangs perfectly still.
      const t = state.clock.elapsedTime;
      const weight = card.current.mass() * GRAVITY;
      card.current.resetForces(true);
      card.current.addForce({ x: weight * WIND * (Math.sin(t * 1.1) + 0.4 * Math.sin(t * 2.7)), y: 0, z: 0 }, true);
    }

    // Smooth the rope joints so the cords don't jitter.
    [j1, j2, j3].forEach((ref, i) => {
      const p = ref.current.translation();
      if (lerped[i].lengthSq() === 0) lerped[i].copy(p);
      const dist = Math.max(0.1, Math.min(1, lerped[i].distanceTo(p)));
      lerped[i].lerp(p, delta * (10 + dist * 40));
    });

    // Two parallel cords: same rope, offset sideways, ending in the holder's top corners.
    const top = fixed.current.translation();
    const pos = card.current.translation();
    const r = card.current.rotation();
    quat.set(r.x, r.y, r.z, r.w);
    for (const [cord, side] of [[leftCord, -1], [rightCord, 1]] as const) {
      curve.points[0].set(side * CORD_X, CARD_H / 2 - 0.05, 0).applyQuaternion(quat).add(vec.set(pos.x, pos.y, pos.z));
      curve.points[1].copy(lerped[2]).x += side * CORD_X;
      curve.points[2].copy(lerped[1]).x += side * CORD_X;
      curve.points[3].copy(lerped[0]).x += side * CORD_X;
      curve.points[4].set(top.x + side * CORD_X, top.y, top.z);
      cord.current.geometry.setPoints(curve.getPoints(40));
    }

    // Keep the front facing the camera.
    euler.setFromQuaternion(quat, "YXZ");
    const ang = card.current.angvel();
    card.current.setAngvel({ x: ang.x, y: ang.y - euler.y * 0.15, z: ang.z }, true);
  });

  const onDown = (e: ThreeEvent<PointerEvent>) => {
    e.stopPropagation();
    (e.target as Element).setPointerCapture(e.pointerId);
    const p = card.current.translation();
    setDragged(new THREE.Vector3().copy(e.point).sub(tmp.vec.set(p.x, p.y, p.z)));
    document.body.style.cursor = "grabbing";
  };
  const onUp = (e: ThreeEvent<PointerEvent>) => {
    e.stopPropagation();
    (e.target as Element).releasePointerCapture(e.pointerId);
    setDragged(null);
    document.body.style.cursor = "grab";
  };

  const segment = { type: "dynamic", canSleep: true, colliders: false, angularDamping: 2, linearDamping: 2 } as const;

  return (
    <>
      <group position={[0, topY, 0]}>
        <RigidBody ref={fixed} {...segment} type="fixed" />
        <RigidBody ref={j1} position={[SEGMENT, 0, 0]} {...segment}>
          <BallCollider args={[0.1]} />
        </RigidBody>
        <RigidBody ref={j2} position={[SEGMENT * 2, 0, 0]} {...segment}>
          <BallCollider args={[0.1]} />
        </RigidBody>
        <RigidBody ref={j3} position={[SEGMENT * 3, 0, 0]} {...segment}>
          <BallCollider args={[0.1]} />
        </RigidBody>
        <RigidBody
          ref={card}
          position={[SEGMENT * 4, 0, 0]}
          {...segment}
          canSleep={false}
          type={dragged ? "kinematicPosition" : "dynamic"}
        >
          <CuboidCollider args={[CARD_W / 2, CARD_H / 2, CARD_D / 2]} />
          <group
            onPointerDown={onDown}
            onPointerUp={onUp}
            onPointerOver={() => (document.body.style.cursor = "grab")}
            onPointerOut={() => !dragged && (document.body.style.cursor = "auto")}
          >
            <RoundedBox args={[CARD_W, CARD_H, CARD_D]} radius={0.07} smoothness={6} creaseAngle={0.6}>
              <meshPhysicalMaterial color="#f4f2ee" roughness={0.45} clearcoat={0.4} clearcoatRoughness={0.3} />
            </RoundedBox>
            {/* Recessed rim around the window */}
            <RoundedBox args={[WIN_W + 0.06, WIN_H + 0.06, 0.02]} radius={0.01} position={[0, WIN_Y, CARD_D / 2]}>
              <meshStandardMaterial color="#dcdad5" roughness={0.6} />
            </RoundedBox>
            <mesh position={[0, WIN_Y, CARD_D / 2 + 0.012]}>
              <planeGeometry args={[WIN_W, WIN_H]} />
              <meshPhysicalMaterial map={texture} roughness={0.35} clearcoat={1} clearcoatRoughness={0.1} />
            </mesh>
          </group>
        </RigidBody>
      </group>
      <mesh ref={leftCord}>
        <meshLineGeometry />
        <meshLineMaterial color={CORD_COLOR} lineWidth={0.1} resolution={[size.width, size.height]} />
      </mesh>
      <mesh ref={rightCord}>
        <meshLineGeometry />
        <meshLineMaterial color={CORD_COLOR} lineWidth={0.1} resolution={[size.width, size.height]} />
      </mesh>
    </>
  );
}

// The card inside the window is drawn on a 2D canvas and used as a texture.
const TEX_W = 600;
const TEX_H = Math.round((TEX_W * WIN_H) / WIN_W);
const SANS = `"Pretendard", "Apple SD Gothic Neo", "Noto Sans KR", "Malgun Gothic", sans-serif`;

// Client-only component (ssr: false), so the canvas can be built on first render.
function useCardTexture() {
  const [texture] = useState(() => {
    const canvas = Object.assign(document.createElement("canvas"), { width: TEX_W, height: TEX_H });
    drawCard(canvas);
    const t = new THREE.CanvasTexture(canvas);
    t.colorSpace = THREE.SRGBColorSpace;
    t.anisotropy = 8;
    return t;
  });
  useEffect(() => () => texture.dispose(), [texture]);
  return texture;
}

function drawCard(canvas: HTMLCanvasElement) {
  const ctx = canvas.getContext("2d")!;
  ctx.fillStyle = "#ebeae6";
  ctx.fillRect(0, 0, TEX_W, TEX_H);

  // Soft inner shadow along the top edge, where the card slides under the holder.
  const shade = ctx.createLinearGradient(0, 0, 0, 40);
  shade.addColorStop(0, "rgba(0,0,0,0.12)");
  shade.addColorStop(1, "rgba(0,0,0,0)");
  ctx.fillStyle = shade;
  ctx.fillRect(0, 0, TEX_W, 40);

  const left = 56;
  ctx.fillStyle = "#1c1c1c";
  ctx.font = `700 60px ${SANS}`;
  ctx.fillText(site.fullName, left, 130);
  ctx.font = `500 56px ${SANS}`;
  ctx.fillText(site.fullNameEn, left, 206);

  ctx.fillStyle = "#7a7a77";
  ctx.font = `500 40px ${SANS}`;
  [site.role].forEach((line, i) => {
    const y = 316 + i * 58;
    ctx.fillRect(left, y - 32, 5, 36);
    ctx.fillText(line, left + 20, y);
  });
}
