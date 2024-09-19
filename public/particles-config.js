particlesJS('particles-js', {
    "particles": {
        "number": {
            "value": 400, // Increase the number of particles
            "density": {
                "enable": true,
                "value_area": 800
            }
        },
        "color": {
            "value": ["#ffffff", "#cccccc", "#999999", "#666666", "#333333", "#000000"] // Shades of gray and black
        },
        "shape": {
            "type": ["circle", "triangle", "polygon"], // Varied shapes for a modern look
            "stroke": {
                "width": 0,
                "color": "#000000"
            },
            "polygon": {
                "nb_sides": 6
            },
            "image": {
                "src": "img/github.svg",
                "width": 100,
                "height": 100
            }
        },
        "opacity": {
            "value": 0.5,
            "random": true,
            "anim": {
                "enable": true,
                "speed": 1,
                "opacity_min": 0.1,
                "sync": false
            }
        },
        "size": {
            "value": 4,
            "random": true,
            "anim": {
                "enable": true,
                "speed": 20,
                "size_min": 0.1,
                "sync": false
            }
        },
        "line_linked": {
            "enable": true,
            "distance": 150,
            "color": "#cccccc",
            "opacity": 0.4,
            "width": 1
        },
        "move": {
            "enable": true,
            "speed": 6,
            "direction": "none",
            "random": false,
            "straight": false,
            "out_mode": "out",
            "bounce": false,
            "attract": {
                "enable": false,
                "rotateX": 600,
                "rotateY": 1200
            }
        }
    },
    "interactivity": {
        "detect_on": "canvas",
        "events": {
            "onhover": {
                "enable": true,
                "mode": ["grab", "bubble"] // Combination of grab and bubble for interaction
            },
            "onclick": {
                "enable": true,
                "mode": "repulse"
            },
            "resize": true
        },
        "modes": {
            "grab": {
                "distance": 200,
                "line_linked": {
                    "opacity": 1
                }
            },
            "bubble": {
                "distance": 200,
                "size": 8,
                "duration": 2,
                "opacity": 0.8,
                "speed": 3
            },
            "repulse": {
                "distance": 100,
                "duration": 0.4
            },
            "push": {
                "particles_nb": 4
            },
            "remove": {
                "particles_nb": 2
            }
        }
    },
    "retina_detect": true
});

