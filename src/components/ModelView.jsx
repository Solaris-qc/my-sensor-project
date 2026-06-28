import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Environment, Grid } from "@react-three/drei";

// 动态传感器小球组件
const SensorNode = ({ position, status, name, onClick, isSelected }) => {
  const meshRef = useRef();

  // 简单的呼吸缩放动画
  useFrame(({ clock }) => {
    const scale = 1 + Math.sin(clock.elapsedTime * 3) * 0.1;
    meshRef.current.scale.set(scale, scale, scale);
  });

  // 报警状态为红色，正常状态为青色
  const color = status === "alarm" ? "#ff4d4f" : "#00e5ff";
  const emissiveIntensity = status === "alarm" ? 2 : 1;

  return (
    <group position={position} onClick={onClick}>
      <mesh ref={meshRef}>
        <sphereGeometry args={[0.15, 32, 32]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={emissiveIntensity}
          toneMapped={false}
        />
      </mesh>
      {isSelected && (
        <mesh>
          <ringGeometry args={[0.2, 0.25, 32]} />
          <meshBasicMaterial color="#fff" side={2} />
        </mesh>
      )}
    </group>
  );
};

// 简化的桥梁主体结构：增加了 onClick 和鼠标悬浮变十字准星的效果
const BridgeStructure = ({ onModelClick }) => (
  <mesh
    position={[0, 0, 0]}
    onClick={(e) => {
      e.stopPropagation(); // 阻止事件穿透
      if (onModelClick) onModelClick(e.point); // 将点击的三维坐标传出去
    }}
    onPointerEnter={() => (document.body.style.cursor = "crosshair")}
    onPointerLeave={() => (document.body.style.cursor = "default")}
  >
    <boxGeometry args={[10, 0.5, 2]} />
    <meshStandardMaterial
      color="#1a365d"
      transparent
      opacity={0.6}
      wireframe={true}
    />
  </mesh>
);

// 【关键修复点】：第 52 行的参数列表里，确保接住了 onModelClick
const ModelView = ({
  sensors = [],
  onSelectSensor,
  selectedSensorId,
  onModelClick,
}) => {
  return (
    <Canvas camera={{ position: [5, 5, 5], fov: 45 }}>
      <color attach="background" args={["#030816"]} />
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1} />

      {/* 将点击事件向下传递给桥梁模型 */}
      <BridgeStructure onModelClick={onModelClick} />

      {sensors.map((sensor) => (
        <SensorNode
          key={sensor.id}
          position={sensor.position}
          status={sensor.status}
          name={sensor.name}
          isSelected={selectedSensorId === sensor.id}
          onClick={(e) => {
            e.stopPropagation();
            if (onSelectSensor) onSelectSensor(sensor.id);
          }}
        />
      ))}

      <Grid
        infiniteGrid
        fadeDistance={20}
        sectionColor="#1a365d"
        cellColor="#0b172c"
      />
      <OrbitControls makeDefault />
      <Environment preset="city" />
    </Canvas>
  );
};

export default ModelView;
