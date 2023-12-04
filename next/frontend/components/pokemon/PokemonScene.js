import React, {useEffect} from 'react';
import * as THREE from 'three';
import {GLTFLoader} from 'three/addons/loaders/GLTFLoader.js';

function PokemonScene(context) {
    let parentElement = null;

    let scene = null;
    let camera = null;
    let renderer = null;

    let model = null;
    let animationAction = null;
    let gltf = null;
    let animationMixer = null;
    let name = null;
    const clock = new THREE.Clock();

    async function init() {

        const pokemonName = context.name;

        let formattedId = formatNumberWithLeadingZeros(context.id, 4);
        name = formattedId + "_" + pokemonName + "/" + pokemonName + ".gltf";

        createScene();
        createModel();
    }

    function formatNumberWithLeadingZeros(number, desiredLength) {
        const numberString = number.toString();
        const actualLength = numberString.length;
        const zerosToAdd = Math.max(0, desiredLength - actualLength);
        return '0'.repeat(zerosToAdd) + numberString;
    }

    function changeSelectedAnimation(position) {
        playAnimation(position);
    }

    function changeAnimation(event) {
        changeSelectedAnimation(event.target.value);
    }

    function loadActivities(activities) {
        const buttons = document.getElementById("activities");
        let position = 1;
        for (let activity of activities) {

            let currentPosition = position - 1;

            const name = activity.name.split(".")[2];
            let button = document.createElement("option");
            button.innerHTML = name;
            button.value = currentPosition;
            buttons.appendChild(button);
            position++;
        }
    }

    function createScene() {

        scene = new THREE.Scene();
        camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000); // Aspect ratio is 1


        renderer = new THREE.WebGLRenderer();

        const newSize = document.getElementById("canvasContainer").offsetWidth;

        renderer.setSize(newSize, newSize);
        renderer.domElement.classList.add("rounded");
        document.getElementById("canvasContainer").appendChild(renderer.domElement);
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.9); // Color, Intensity (0-1)
        scene.add(ambientLight);

        // Erstellen und positionieren Sie die Kamera
        camera.position.z = 5;
    }

    function createModel() {

// Laden Sie das GLTF-Modell
        const loader = new GLTFLoader();
        loader.load('/pokemon/bedrock/pokemon/models/' + name, function (loadedModel) {

            gltf = loadedModel;
            // Hier können Sie auf das geladene Modell zugreifen und es zur Szene hinzufügen
            model = gltf.scene;

            console.log(gltf);

            scene.add(model);
            const bbox = new THREE.Box3().setFromObject(model);
            const modelDepth = bbox.max.z - bbox.min.z;
            const modelHeight = bbox.max.y - bbox.min.y;

            model.position.set(0, 0, 0);

            camera.position.set(0, modelHeight/2, Math.min(Math.max(modelDepth, 2), 4));

            console.log(bbox)

            model.rotation.y = 2.5;

            // Optional: Fügen Sie eine Animation oder Interaktionen hinzu
            animationMixer = new THREE.AnimationMixer();

            loadActivities(gltf.animations);

            playAnimation(0);

            animate();
        }, undefined, function (error) {
            console.error('Fehler beim Laden des GLTF-Modells', error);
        });
    }

    function playAnimation(position) {

        if (animationAction != null) animationAction.stop();

        const animationClip = gltf.animations[position];
        animationAction = animationMixer.clipAction(animationClip, model);
        animationAction.play();
    }

    function animate() {
        const deltaTime = clock.getDelta();
        if (animationMixer != null) {
            animationMixer.update(deltaTime);
        }

        requestAnimationFrame(animate);
        renderer.render(scene, camera);
    }


    useEffect(() => {


        init();

        window.addEventListener('resize', () => {
            const newSize = document.getElementById("canvasContainer").offsetWidth;

            camera.updateProjectionMatrix();
            renderer.setSize(newSize, newSize);
        });

    }, []);

    return (
        <>
            <div className="row justify-content-center g-0">
                <div id="canvasContainer" className="col-12">

                </div>

                <div id="selector" className="col-12">
                    <select id="activities" defaultValue={"Open this select menu"} onChange={changeAnimation}
                            className="form-select" style={{width: "100%"}} aria-label="Default select example">
                        <option>Open this select menu</option>
                    </select>
                </div>
            </div>
        </>
    );
}

export default PokemonScene;
