const widgets = require('@jupyter-widgets/base');
const _ = require('lodash');
const THREE = require("three");
const OrbitControls = require("three-orbitcontrols");

const HelloView = widgets.DOMWidgetView.extend({
    render: function() {
        this.value_changed();
        this.model.on('change:value', this.value_changed, this);
    },

    value_changed: function() {
        this.el.textContent = this.model.get("value");
    }
});

const ModelView = widgets.DOMWidgetView.extend({

    render: function() {

        // Set up the canvas
        this.initView();
    },

    // Function to convert an object into a wireframe
    makeWireframe: function(geometry) {
        var wireframe = new THREE.WireframeGeometry(geometry);
        var line = new THREE.LineSegments(wireframe);

        line.material.depthTest = true;
        line.material.opacity = 0.5;
        line.material.transparent = true;

        return line;
    },

    // Returns our standard "preview" material
    makeMaterial: function() {
        var material = new THREE.MeshStandardMaterial();
        material.color = new THREE.Color(0xe7844c);

        return material;
    },

    // Set up our lighting
    initLights: function(scene) {
        var ambient = new THREE.AmbientLight(0x848484);
        scene.add(ambient);

        var directional = new THREE.DirectionalLight(0xffffff, 0.5);
        directional.position.z = 1;
        directional.position.x = 0;
        directional.position.y = 0;
        scene.add(directional);
    },

    initView: function() {
        const width = 640;
        const height = 480;

        var scene = new THREE.Scene();
        var camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
        camera.position.x = 2;
        camera.position.y = 2;
        camera.position.z = 3;

        var renderer = new THREE.WebGLRenderer();
        renderer.setSize(width, height);
        this.el.appendChild(renderer.domElement);

        this.initLights(scene);

        var geometry = new THREE.BoxGeometry(1, 1, 1);
        var cube = new THREE.Mesh(geometry, this.makeMaterial());
        cube.position.z = 0.5;
        scene.add(cube)

        var controls = new OrbitControls(camera, renderer.domElement);
        controls.enableDamping = true;
        controls.dampingFactor = 0.25;
        controls.enableZoom = true;

        // Create a Plane for the floor like in blender
        var floorGeometry = new THREE.PlaneGeometry(10, 10, 10, 10);
        scene.add(this.makeWireframe(floorGeometry));

        function animate() {
            requestAnimationFrame(animate);
            controls.update();
            renderer.render(scene, camera)
        }

        animate();

    }


});

module.exports = {
    ModelView: ModelView,
    HelloView: HelloView
};
