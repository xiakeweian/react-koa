import React, { useEffect, useState } from "react";
import * as THREE from "three";
import Stats from 'three/examples/jsm/libs/stats.module';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls'
import { TWEEN } from "three/examples/jsm/libs/tween.module.min.js";
// import './libs/CTMLoader';
// import headModal from './models/Head_02.ctm';
// import mapTexture from './images/Head_02_Diffuse_2k.jpg';
// import bumpMapTexture from './images/Head_02_Bump_2k.jpg';
// import normalMapTexture from './images/Head_02_Gloss_2k.jpg';
// import eyeModel from './models/EyeRight.ctm';
// import eyeMapTexture from './images/Eye_Blue2_1k.jpg';
// import eyeBumpMapTexture from './images/Eye_Bump2_1k.jpg';

// import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
// import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass.js";
// import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";

const Human = () => {
  return (
    <div>
      <div id="container"></div>
    </div>
  );
};
export default Human;
