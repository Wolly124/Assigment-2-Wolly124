document.addEventListener('DOMContentLoaded', function () {
    // Initialize Particles.js
    particlesJS('particles-js', {
        particles: {
            number: {
                value: 100,
                density: {
                    enable: true,
                    value_area: 800
                }
            },
            color: {
                value: ['#ff69b4', '#ffffff']
            },
            shape: {
                type: 'circle',
                stroke: {
                    width: 0,
                    color: '#000000'
                },
                polygon: {
                    nb_sides: 5
                }
            },
            opacity: {
                value: 0.5,
                random: true,
                anim: {
                    enable: true,
                    speed: 1,
                    opacity_min: 0.1,
                    sync: false
                }
            },
            size: {
                value: 3,
                random: true,
                anim: {
                    enable: true,
                    speed: 20,
                    size_min: 0.1,
                    sync: false
                }
            },
            line_linked: {
                enable: true,
                distance: 150,
                color: '#ffffff',
                opacity: 0.4,
                width: 1
            },
            move: {
                enable: true,
                speed: 6,
                direction: 'none',
                random: true,
                straight: false,
                out_mode: 'out',
                bounce: false,
                attract: {
                    enable: false,
                    rotateX: 600,
                    rotateY: 1200
                }
            }
        },
        interactivity: {
            detect_on: 'canvas',
            events: {
                onhover: {
                    enable: true,
                    mode: 'bubble'
                },
                onclick: {
                    enable: true,
                    mode: 'repulse'
                },
                resize: true
            },
            modes: {
                grab: {
                    distance: 400,
                    line_linked: {
                        opacity: 1
                    }
                },
                bubble: {
                    distance: 250,
                    size: 10,
                    duration: 2,
                    opacity: 0.8,
                    speed: 3
                },
                repulse: {
                    distance: 400,
                    duration: 0.4
                },
                push: {
                    particles_nb: 4
                },
                remove: {
                    particles_nb: 2
                }
            }
        },
        retina_detect: true
    });

    // Initialize Three.js
    var container = document.getElementById('three-container');

    // Create a scene
    var scene = new THREE.Scene();

    // Create a camera
    var camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
    camera.position.z = 5;

    // Create a renderer
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(container.clientWidth, container.clientHeight);
    container.appendChild(renderer.domElement);

    // Create a geometry and a material
    var geometry = new THREE.BoxGeometry();
    var material = new THREE.MeshBasicMaterial({ color: 0xff69b4 });
    var cube = new THREE.Mesh(geometry, material);
    scene.add(cube);

    // Add event listeners for interaction
    var isDragging = false;
    var previousMousePosition = {
        x: 0,
        y: 0
    };

    container.addEventListener('mousedown', function (e) {
        isDragging = true;
    });

    container.addEventListener('mousemove', function (e) {
        if (isDragging) {
            var deltaMove = {
                x: e.offsetX - previousMousePosition.x,
                y: e.offsetY - previousMousePosition.y
            };

            cube.rotation.y += deltaMove.x * 0.005;
            cube.rotation.x += deltaMove.y * 0.005;
        }

        previousMousePosition = {
            x: e.offsetX,
            y: e.offsetY
        };
    });

    container.addEventListener('mouseup', function (e) {
        isDragging = false;
    });

    container.addEventListener('click', function (e) {
        cube.material.color.set(Math.random() * 0xffffff);
    });

    container.addEventListener('dblclick', function (e) {
        cube.scale.x = Math.random() * 2 + 0.5;
        cube.scale.y = Math.random() * 2 + 0.5;
        cube.scale.z = Math.random() * 2 + 0.5;
    });

    document.addEventListener('keydown', function (e) {
        switch (e.key) {
            case 'ArrowUp':
                cube.position.y += 0.1;
                break;
            case 'ArrowDown':
                cube.position.y -= 0.1;
                break;
            case 'ArrowLeft':
                cube.position.x -= 0.1;
                break;
            case 'ArrowRight':
                cube.position.x += 0.1;
                break;
        }
    });

    // Variables for bouncing
    var velocity = {
        x: 0.05,
        y: 0.05,
        z: 0.05
    };

    // Animation loop
    function animate() {
        requestAnimationFrame(animate);

        // Update cube position
        cube.position.x += velocity.x;
        cube.position.y += velocity.y;
        cube.position.z += velocity.z;

        // Change cube color on movement
        cube.material.color.set(Math.random() * 0xffffff);

        // Check for collisions with container walls
        if (cube.position.x + cube.scale.x / 2 > container.clientWidth / 200 || cube.position.x - cube.scale.x / 2 < -container.clientWidth / 200) {
            velocity.x = -velocity.x;
        }
        if (cube.position.y + cube.scale.y / 2 > container.clientHeight / 200 || cube.position.y - cube.scale.y / 2 < -container.clientHeight / 200) {
            velocity.y = -velocity.y;
        }
        if (cube.position.z + cube.scale.z / 2 > 5 || cube.position.z - cube.scale.z / 2 < -5) {
            velocity.z = -velocity.z;
        }

        renderer.render(scene, camera);
    }

    animate();
});