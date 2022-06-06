import React, { useEffect, useState } from "react";
import * as THREE from "three";

const ThreeDom = () => {
  useEffect(() => {
    // threeInit();
  }, []);
  let arr = [
    { id: 1, name: "部门1", pid: 0 },
    { id: 2, name: "部门2", pid: 1 },
    { id: 3, name: "部门3", pid: 1 },
    { id: 4, name: "部门4", pid: 3 },
    { id: 5, name: "部门5", pid: 4 },
  ];

  function createThree(list) {
    var map = {}, // 创建一个用ID作Key的对象
      listData = [], // 创建一个空数组，用来接收传入的数组
      paraArray = []; // 返回的数组
    // 循环遍历出map对象和数组格式
    list.forEach((item) => {
      // 给map，listData赋值
      map[item.id] = item;
      listData.push(item);
    });
    // 循环数组
    listData.forEach((item) => {
      // 根据父级的ID，找到对应的对象
      var even = map[item.pid];
      // 判断对象是否存在，存在的话，进行深层次的判断
      if (even) {
        // 判断父级是否存在子级，存在进行传值
        if (even.children) {
          even.children.push(item);
        } else {
          // 不存在，创建子级，进行传值
          even.children = [];
          even.children.push(item);
        }
      } else {
        // 对象不存在，做为初始的值，传入空数组
        paraArray.push(item);
      }
    });
    return paraArray;
  }
  console.log(createThree(arr));
  const threeInit = () => {
    const threeDom = document.getElementById("threeDom");
    const camera = new THREE.PerspectiveCamera(
      70,
      window.innerWidth,
      window.innerHeight,
      0.01,
      10
    );
    camera.position.z = 1;
    const scene = new THREE.Scene();
    const geometry = new THREE.BoxGeometry(0.2, 0.2, 0.2);
    const material = new THREE.MeshNormalMaterial();

    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setAnimationLoop(animation);
    threeDom.appendChild(renderer.domElement);

    function animation(time) {
      mesh.rotation.x = time / 2000;
      mesh.rotation.y = time / 1000;

      renderer.render(scene, camera);
    }
  };

  return <div id="threeDom"></div>;
};
export default ThreeDom;
