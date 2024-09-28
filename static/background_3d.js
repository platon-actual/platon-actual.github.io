// Ramiro Ríos 2022
import * as THREE from 'three';

import { STLLoader } from '../node_modules/three/examples/jsm/loaders/STLLoader.js';

// import ovni_3d from './ovni_hd.stl';
import ovni_3d from './ovni_lofi.stl';
import planeta_1_stl from './planeta-1.stl';

export default class Background3D {
    constructor(){
        console.log("-CONSTRUCTOR-");
        this.scene = new THREE.Scene();

        this.ovni = null;
        this.planeta_1 = null;
        this.renderer = null;

        this.camera = new THREE.PerspectiveCamera( 45, window.innerWidth/window.innerHeight, 0.1, 1000);
        this.camera.position.set( 20, 0, 20);
        this.camera.lookAt( 0, 0, 0);
        
        // Lights
        this.scene.add( new THREE.HemisphereLight(0x6666cc, 0x449944));

        this.light = new THREE.PointLight(0xcccccc, 9, 100);
        this.light.position.set( 10, 5, 5);
        this.scene.add(this.light);

        // this.renderer = new THREE.CanvasRenderer();
        this.renderer = new THREE.WebGLRenderer({alpha: true});
        this.renderer.setSize(window.innerWidth, window.innerHeight);

        this.renderer.domElement.style.width = "97vw";
        this.renderer.domElement.style.height = "97vh";
        this.renderer.domElement.style.position = "fixed";
        this.renderer.domElement.style.zIndex = "-1";
        document.body.appendChild( this.renderer.domElement);

        console.log("-etapa 1-");
        const loader = new STLLoader();
        loader.load(ovni_3d, 
            (geometry)=>{
                this.ovni = this.addSTLModel(geometry);
                this.ovni.scale.set(0.1, 0.1, 0.1);
            },
            (xhr) => { console.log((xhr.loaded / xhr.total) * 100 + '% loaded') },
            (error) => { console.log(error) }
        );
        console.log("-etapa 2-");
        loader.load(planeta_1_stl, 
            (geometry)=>{ 
                this.planeta_1 = this.addSTLModel(geometry);
                this.planeta_1.position.y = -100;
                this.planeta_1.scale.set( 0.1, 0.1, 0.1);
            },
            (xhr) => { console.log((xhr.loaded / xhr.total) * 100 + '% loaded') },
            (error) => { console.log(error) }
        );

        console.log("-etapa 3-");        

        const geometry = new THREE.BoxGeometry(10, 10, 10);
        const material = new THREE.MeshStandardMaterial({ color: 0x801010 });

        this.cube = new THREE.Mesh(geometry, material);
        // this.scene.add(this.cube);

    }

    updateHeight(value /*entre 0 y 1050*/) {
        let max_value = 2200;
        this.ovni.scale.set(
            (max_value-value) / max_value / 10,
            (max_value-value) / max_value / 10,
            (max_value-value) / max_value / 10
        );
        this.planeta_1.position.y = ( value - max_value)/10;
        // this.planeta_1.position.y = 0;
    }

    animate() {
        requestAnimationFrame( this.animate.bind(this) );
        this.renderer.render( this.scene, this.camera );
        this.cube.rotation.x += 0.01;
        this.cube.rotation.z += 0.01;
        if( this.ovni ){
            this.ovni.rotation.x += 0.01;
            this.ovni.rotation.z += 0.01;
        }
        if( this.planeta_1 ){
            this.planeta_1.rotation.y += 0.005;
        }
    }
    addSTLModel(model){
        console.log("load STL 1");
        const material = new THREE.MeshStandardMaterial({color: 0x994444});
        let new_mesh = new THREE.Mesh(model, material);
        new_mesh.scale.set(0.00001, 0.00001, 0.00001);
        new_mesh.rotation.z = 90;
        this.scene.add(new_mesh);

        console.log("load STL 2");
        return new_mesh;
    }

    resizeWindow() {
        this.renderer.setSize(window.innerWidth, window.innerHeight);

    }
}