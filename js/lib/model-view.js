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
        material.color = new THREE.Color(0xeeeeee);
        material.side = THREE.DoubleSide;
        material.roughness = 0

        return material;
    },

    makeGeometry: function() {
        var geometry = new THREE.Geometry();
        var vertices = this.model.get("vertices");
        var faces = this.model.get("faces");

        vertices.forEach(function (item, index) {
            var vertex = new THREE.Vector3(item[0], item[1], item[2]);
            geometry.vertices.push(vertex);
        });

        faces.forEach(function (item, index) {
            var face = new THREE.Face3(item[0], item[1], item[2]);
            geometry.faces.push(face);
        })

        geometry.computeFaceNormals();
        geometry.computeVertexNormals();

        console.log(geometry);

        return geometry;
    },

    // Set up our lighting
    initLights: function(scene) {
        var ambient = new THREE.AmbientLight(0xeeeeee);
        scene.add(ambient);

        var directional = new THREE.DirectionalLight(0xffffff, 2);
        directional.position.z = 0;
        directional.position.x = 1;
        directional.position.y = 1;
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
        var model = new THREE.Mesh(this.makeGeometry(), this.makeMaterial());
        scene.add(model)

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
        this.scene = scene
        animate();

    }
});

module.exports = {
    ModelView: ModelView,
    HelloView: HelloView
};
