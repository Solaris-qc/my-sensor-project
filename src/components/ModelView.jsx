import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Grid } from "@react-three/drei";
import * as THREE from "three";

// 1. 传感器节点组件 (增加了呼吸灯闪烁效果)
const SensorPoint = ({ position, status, isSelected, onClick, name }) => {
  const meshRef = useRef();

  // 如果是报警状态，让它产生轻微的呼吸闪烁效果
  useFrame(({ clock }) => {
    if (status === "alarm" && meshRef.current) {
      meshRef.current.material.emissiveIntensity =
        1 + Math.sin(clock.elapsedTime * 5) * 0.5;
    }
  });

  const color = status === "alarm" ? "#ff4d4f" : "#00ffaa";

  return (
    <group position={position}>
      <mesh
        ref={meshRef}
        onClick={(e) => {
          e.stopPropagation();
          onClick();
        }}
        onPointerOver={() => (document.body.style.cursor = "pointer")}
        onPointerOut={() => (document.body.style.cursor = "auto")}
      >
        <sphereGeometry args={[0.3, 32, 32]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={isSelected ? 2 : 0.8}
          transparent
          opacity={0.9}
        />
      </mesh>
      {/* 选中时在外层加一个光环 */}
      {isSelected && (
        <mesh>
          <ringGeometry args={[0.4, 0.5, 32]} />
          <meshBasicMaterial
            color="#00e5ff"
            side={THREE.DoubleSide}
            transparent
            opacity={0.6}
          />
        </mesh>
      )}
    </group>
  );
};

// 2. 桥梁主体结构组件 (用基础几何体拼接，代替真实的 GLTF 模型)
const BridgeStructure = () => {
  return (
    <group position={[0, -1, 0]}>
      {/* 桥面 (Deck) */}
      <mesh position={[0, 2, 0]}>
        <boxGeometry args={[16, 0.2, 2.5]} />
        <meshStandardMaterial
          color="#1a365d"
          metalness={0.5}
          roughness={0.2}
          transparent
          opacity={0.8}
        />
      </mesh>

      {/* 左侧主塔 (Left Tower) */}
      <mesh position={[-4, 2.5, 0]}>
        <boxGeometry args={[0.8, 5, 2.6]} />
        <meshStandardMaterial color="#0b172c" metalness={0.8} />
      </mesh>

      {/* 右侧主塔 (Right Tower) */}
      <mesh position={[4, 2.5, 0]}>
        <boxGeometry args={[0.8, 5, 2.6]} />
        <meshStandardMaterial color="#0b172c" metalness={0.8} />
      </mesh>

      {/* 桥墩 (Piers) */}
      <mesh position={[-4, 0.5, 0]}>
        <cylinderGeometry args={[0.5, 0.8, 3, 16]} />
        <meshStandardMaterial color="#334" />
      </mesh>
      <mesh position={[4, 0.5, 0]}>
        <cylinderGeometry args={[0.5, 0.8, 3, 16]} />
        <meshStandardMaterial color="#334" />
      </mesh>
    </group>
  );
};

// 3. 主视图组件
const ModelView = ({ sensors, onSelectSensor, selectedSensorId }) => {
  return (
    <Canvas camera={{ position: [0, 6, 12], fov: 45 }}>
      <color attach="background" args={["#050b14"]} />

      {/* 光源设置 */}
      <ambientLight intensity={0.4} color="#8da2c0" />
      <directionalLight
        position={[10, 20, 10]}
        intensity={1.5}
        color="#00e5ff"
      />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#ff00aa" />

      {/* 科技感网格地面 */}
      <Grid
        renderOrder={-1}
        position={[0, -1, 0]}
        infiniteGrid
        fadeDistance={20}
        fadeStrength={5}
        cellSize={1}
        sectionSize={5}
        sectionColor="#1a365d"
        cellColor="#0b172c"
      />

      {/* 加载桥梁结构 */}
      <BridgeStructure />

      {/* 遍历渲染传感器点位 */}
      {sensors.map((sensor) => (
        <SensorPoint
          key={sensor.id}
          name={sensor.name}
          position={sensor.position}
          status={sensor.status}
          isSelected={sensor.id === selectedSensorId}
          onClick={() => onSelectSensor(sensor.id)}
        />
      ))}

      {/* 视角控制器限制，防止用户把模型翻到底朝天 */}
      <OrbitControls
        makeDefault
        maxPolarAngle={Math.PI / 2 - 0.05} // 禁止视角低于地平面
        minDistance={5}
        maxDistance={25}
      />
    </Canvas>
  );
};

export default ModelView;
