const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const levelText = document.getElementById("levelText");
const bounceText = document.getElementById("bounceText");
const hint = document.getElementById("hint");

const infoButton = document.getElementById("infoButton");
const closeInfoButton = document.getElementById("closeInfoButton");

const winOverlay = document.getElementById("winOverlay");
const loseOverlay = document.getElementById("loseOverlay");
const infoOverlay = document.getElementById("infoOverlay");

const nextButton = document.getElementById("nextButton");
const tryAgainButton = document.getElementById("tryAgainButton");


/* =========================================================
   LEVEL DATA
   Coordinates are percentages of the playing square.
   x and y range from 0 to 1.
   ========================================================= */

const levels = [

    /* LEVEL 1
       One easy bounce
    */
    {
        maxBounces: 1,

        ball: {
            x: 0.25,
            y: 0.72
        },

        hole: {
            x: 0.75,
            y: 0.28
        },

        obstacles: []
    },


    /* LEVEL 2
       Two possible wall bounces
    */
    {
        maxBounces: 2,

        ball: {
            x: 0.25,
            y: 0.25
        },

        hole: {
            x: 0.75,
            y: 0.75
        },

        obstacles: []
    },


    /* LEVEL 3
       One obstacle
    */
    {
        maxBounces: 2,

        ball: {
            x: 0.2,
            y: 0.75
        },

        hole: {
            x: 0.8,
            y: 0.25
        },

        obstacles: [
            {
                x: 0.45,
                y: 0.35,
                width: 0.012,
                height: 0.3
            }
        ]
    },


    /* LEVEL 4 */
    {
        maxBounces: 3,

        ball: {
            x: 0.2,
            y: 0.2
        },

        hole: {
            x: 0.8,
            y: 0.8
        },

        obstacles: [
            {
                x: 0.35,
                y: 0.25,
                width: 0.3,
                height: 0.012
            },
            {
                x: 0.35,
                y: 0.67,
                width: 0.3,
                height: 0.012
            }
        ]
    },


    /* LEVEL 5 */
    {
        maxBounces: 3,

        ball: {
            x: 0.2,
            y: 0.5
        },

        hole: {
            x: 0.8,
            y: 0.5
        },

        obstacles: [
            {
                x: 0.4,
                y: 0.2,
                width: 0.08,
                height: 0.3
            },
            {
                x: 0.52,
                y: 0.5,
                width: 0.08,
                height: 0.3
            }
        ]
    },


    /* LEVEL 6 */
    {
        maxBounces: 4,

        ball: {
            x: 0.2,
            y: 0.8
        },

        hole: {
            x: 0.8,
            y: 0.2
        },

        obstacles: [
            {
                x: 0.3,
                y: 0.2,
                width: 0.4,
                height: 0.07
            },
            {
                x: 0.3,
                y: 0.73,
                width: 0.4,
                height: 0.07
            }
        ]
    },


    /* LEVEL 7 */
    {
        maxBounces: 4,

        ball: {
            x: 0.2,
            y: 0.2
        },

        hole: {
            x: 0.8,
            y: 0.5
        },

        obstacles: [
            {
                x: 0.3,
                y: 0.3,
                width: 0.08,
                height: 0.4
            },
            {
                x: 0.62,
                y: 0.2,
                width: 0.08,
                height: 0.4
            }
        ]
    },


    /* LEVEL 8 */
    {
        maxBounces: 5,

        ball: {
            x: 0.15,
            y: 0.5
        },

        hole: {
            x: 0.85,
            y: 0.5
        },

        obstacles: [
            {
                x: 0.3,
                y: 0.15,
                width: 0.08,
                height: 0.3
            },
            {
                x: 0.45,
                y: 0.55,
                width: 0.08,
                height: 0.3
            },
            {
                x: 0.62,
                y: 0.15,
                width: 0.08,
                height: 0.3
            }
        ]
    },


    /* LEVEL 9 */
    {
        maxBounces: 5,

        ball: {
            x: 0.18,
            y: 0.18
        },

        hole: {
            x: 0.82,
            y: 0.82
        },

        obstacles: [
            {
                x: 0.3,
                y: 0.18,
                width: 0.4,
                height: 0.07
            },
            {
                x: 0.3,
                y: 0.75,
                width: 0.4,
                height: 0.07
            },
            {
                x: 0.46,
                y: 0.4,
                width: 0.08,
                height: 0.2
            }
        ]
    },


    /* LEVEL 10 */
    {
        maxBounces: 6,

        ball: {
            x: 0.15,
            y: 0.8
        },

        hole: {
            x: 0.85,
            y: 0.2
        },

        obstacles: [
            {
                x: 0.25,
                y: 0.25,
                width: 0.08,
                height: 0.4
            },
            {
                x: 0.45,
                y: 0.35,
                width: 0.08,
                height: 0.4
            },
            {
                x: 0.65,
                y: 0.2,
                width: 0.08,
                height: 0.4
            }
        ]
    }

];


/* =========================================================
   GAME SETTINGS
   ========================================================= */

let impactEffects = [];

const IMPACT_DURATION = 180;

/* =========================================================
   WALL IMPACT EFFECT
   ========================================================= */

function createImpactEffect(x, y, axis) {

    impactEffects.push({
        x: x,
        y: y,
        axis: axis,
        startTime: performance.now()
    });

    playBounceSound();
}


function drawImpactEffects() {

    const now = performance.now();

    for (let i = impactEffects.length - 1; i >= 0; i--) {

        const effect = impactEffects[i];

        const progress =
            Math.min(
                (now - effect.startTime) / IMPACT_DURATION,
                1
            );

        const alpha = 1 - progress;

        const length = 5 + progress * 7;

        ctx.save();

        ctx.globalAlpha = alpha;

        ctx.strokeStyle = "#222";
        ctx.lineWidth = 2;
        ctx.lineCap = "round";

        /*
           Vertical wall
        */

        if (effect.axis === "x") {

            ctx.beginPath();

            ctx.moveTo(
                effect.x,
                effect.y - length
            );

            ctx.lineTo(
                effect.x,
                effect.y - length - 4
            );

            ctx.moveTo(
                effect.x,
                effect.y + length
            );

            ctx.lineTo(
                effect.x,
                effect.y + length + 4
            );

            ctx.stroke();

        }

        /*
           Horizontal wall
        */

        else {

            ctx.beginPath();

            ctx.moveTo(
                effect.x - length,
                effect.y
            );

            ctx.lineTo(
                effect.x - length - 4,
                effect.y
            );

            ctx.moveTo(
                effect.x + length,
                effect.y
            );

            ctx.lineTo(
                effect.x + length + 4,
                effect.y
            );

            ctx.stroke();
        }

        ctx.restore();

        if (progress >= 1) {
            impactEffects.splice(i, 1);
        }
    }
}

let canvasSize = 500;

const BALL_RADIUS = 10;
const HOLE_RADIUS = 14;

const BALL_SPEED = 0.52;

let currentLevel = 0;


let ball = {
    x: 0,
    y: 0,
    vx: 0,
    vy: 0
};

let hole = {
    x: 0,
    y: 0
};

let obstacles = [];

let bounceCount = 0;

let moving = false;
let aiming = false;

let dying = false;
let deathStartTime = 0;
const DEATH_DURATION = 500;

/* =========================================================
   SOUND
   ========================================================= */

let audioContext = null;

function getAudioContext() {

    if (!audioContext) {
        audioContext = new (window.AudioContext || window.webkitAudioContext)();
    }

    if (audioContext.state === "suspended") {
        audioContext.resume();
    }

    return audioContext;
}


function playBounceSound() {

    const audio = getAudioContext();

    const oscillator = audio.createOscillator();
    const gain = audio.createGain();

    oscillator.type = "sine";

    oscillator.frequency.setValueAtTime(
        180,
        audio.currentTime
    );

    oscillator.frequency.exponentialRampToValueAtTime(
        90,
        audio.currentTime + 0.08
    );

    gain.gain.setValueAtTime(
        0.12,
        audio.currentTime
    );

    gain.gain.exponentialRampToValueAtTime(
        0.001,
        audio.currentTime + 0.09
    );

    oscillator.connect(gain);
    gain.connect(audio.destination);

    oscillator.start();
    oscillator.stop(audio.currentTime + 0.09);
}


function playWinSound() {

    const audio = getAudioContext();

    const notes = [523, 659, 784];

    notes.forEach((frequency, index) => {

        const oscillator = audio.createOscillator();
        const gain = audio.createGain();

        oscillator.type = "sine";

        oscillator.frequency.value = frequency;

        const startTime =
            audio.currentTime + index * 0.09;

        gain.gain.setValueAtTime(
            0.001,
            startTime
        );

        gain.gain.linearRampToValueAtTime(
            0.14,
            startTime + 0.02
        );

        gain.gain.exponentialRampToValueAtTime(
            0.001,
            startTime + 0.25
        );

        oscillator.connect(gain);
        gain.connect(audio.destination);

        oscillator.start(startTime);
        oscillator.stop(startTime + 0.25);
    });
}


function playDeathSound() {

    const audio = getAudioContext();

    const oscillator = audio.createOscillator();
    const gain = audio.createGain();

    oscillator.type = "sawtooth";

    oscillator.frequency.setValueAtTime(
        130,
        audio.currentTime
    );

    oscillator.frequency.exponentialRampToValueAtTime(
        55,
        audio.currentTime + 0.35
    );

    gain.gain.setValueAtTime(
        0.08,
        audio.currentTime
    );

    gain.gain.exponentialRampToValueAtTime(
        0.001,
        audio.currentTime + 0.35
    );

    oscillator.connect(gain);
    gain.connect(audio.destination);

    oscillator.start();
    oscillator.stop(audio.currentTime + 0.35);
}

let aimStart = {
    x: 0,
    y: 0
};

let aimCurrent = {
    x: 0,
    y: 0
};

let animationId = null;

let lastTime = 0;
let holeAnimation = false;
let holeAnimationStart = 0;
let holeAnimationDuration = 350;

let confetti = [];

const CONFETTI_COUNT = 70;
const CONFETTI_DURATION = 1400;

/* =========================================================
   CONFETTI
   ========================================================= */

function startConfetti() {

    confetti = [];

    const now = performance.now();

    for (let i = 0; i < CONFETTI_COUNT; i++) {

        confetti.push({
            x: canvasSize * 0.5,
            y: canvasSize * 0.35,

            vx:
                (Math.random() - 0.5) *
                canvasSize *
                0.9,

            vy:
                -Math.random() *
                canvasSize *
                0.7,

            gravity:
                canvasSize * 0.0015,

            size:
                4 + Math.random() * 4,

            rotation:
                Math.random() * Math.PI,

            rotationSpeed:
                (Math.random() - 0.5) * 0.2,

            startTime: now
        });
    }

    requestAnimationFrame(confettiLoop);
}


function confettiLoop(timestamp) {

    draw();

    let active = false;

    for (const piece of confetti) {

        const elapsed =
            timestamp - piece.startTime;

        const progress =
            Math.min(
                elapsed / CONFETTI_DURATION,
                1
            );

        if (progress < 1) {
            active = true;
        }

        piece.x += piece.vx * 0.016;
        piece.y += piece.vy * 0.016;

        piece.vy += piece.gravity;

        piece.rotation += piece.rotationSpeed;

        ctx.save();

        ctx.translate(
            piece.x,
            piece.y
        );

        ctx.rotate(
            piece.rotation
        );

        ctx.globalAlpha =
            1 - progress;

        ctx.fillStyle =
            ["#111", "#555", "#888", "#bbb", "#222"][
                Math.floor(Math.random() * 5)
            ];

        ctx.fillRect(
            -piece.size / 2,
            -piece.size / 2,
            piece.size,
            piece.size * 1.8
        );

        ctx.restore();
    }

    if (active) {
        requestAnimationFrame(confettiLoop);
    } else {
        confetti = [];
        draw();
    }
}


/* =========================================================
   CANVAS SETUP
   ========================================================= */

function resizeCanvas() {

    const rect = canvas.getBoundingClientRect();

    const size = Math.min(rect.width, rect.height);

    const dpr = window.devicePixelRatio || 1;

    canvas.width = size * dpr;
    canvas.height = size * dpr;

    canvasSize = size;

    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    draw();
}

window.addEventListener("resize", resizeCanvas);


/* =========================================================
   LEVEL LOADING
   ========================================================= */

function loadLevel(index) {

    currentLevel = index;

    const level = levels[currentLevel];

    bounceCount = 0;

    moving = false;
    aiming = false;

    ball.x = level.ball.x * canvasSize;
    ball.y = level.ball.y * canvasSize;

    ball.vx = 0;
    ball.vy = 0;

    hole.x = level.hole.x * canvasSize;
    hole.y = level.hole.y * canvasSize;

    obstacles = level.obstacles.map(obstacle => ({
        x: obstacle.x * canvasSize,
        y: obstacle.y * canvasSize,
        width: obstacle.width * canvasSize,
        height: obstacle.height * canvasSize
    }));

    levelText.textContent = `Level ${currentLevel + 1}`;

    updateBounceText();

    hint.textContent =
        "Drag the ball opposite the direction you want it to go";

    draw();
}


function updateBounceText() {

    const level = levels[currentLevel];

    bounceText.textContent =
        `Bounces: ${bounceCount} / ${level.maxBounces}`;
}


/* =========================================================
   TOUCH / MOUSE POSITION
   ========================================================= */

function getPointerPosition(event) {

    const rect = canvas.getBoundingClientRect();

    let clientX;
    let clientY;

    if (event.touches && event.touches.length > 0) {
        clientX = event.touches[0].clientX;
        clientY = event.touches[0].clientY;
    } else if (event.changedTouches && event.changedTouches.length > 0) {
        clientX = event.changedTouches[0].clientX;
        clientY = event.changedTouches[0].clientY;
    } else {
        clientX = event.clientX;
        clientY = event.clientY;
    }

    return {
        x: clientX - rect.left,
        y: clientY - rect.top
    };
}


/* =========================================================
   START AIMING
   ========================================================= */

function pointerDown(event) {

    if (moving || winOverlay.classList.contains("hidden") === false) {
        return;
    }

    if (!loseOverlay.classList.contains("hidden")) {
        return;
    }

    const point = getPointerPosition(event);

    const distance = Math.hypot(
        point.x - ball.x,
        point.y - ball.y
    );

    if (distance > BALL_RADIUS * 3) {
        return;
    }

    event.preventDefault();

    aiming = true;

    aimStart.x = point.x;
    aimStart.y = point.y;

    aimCurrent.x = point.x;
    aimCurrent.y = point.y;

    draw();
}


/* =========================================================
   UPDATE AIM
   ========================================================= */

function pointerMove(event) {

    if (!aiming) {
        return;
    }

    event.preventDefault();

    const point = getPointerPosition(event);

    aimCurrent.x = point.x;
    aimCurrent.y = point.y;

    draw();
}


/* =========================================================
   RELEASE AIM
   ========================================================= */

function pointerUp(event) {

    if (!aiming) {
        return;
    }

    event.preventDefault();

    const point = getPointerPosition(event);

    aimCurrent.x = point.x;
    aimCurrent.y = point.y;

    const dx = aimStart.x - aimCurrent.x;
    const dy = aimStart.y - aimCurrent.y;

    const distance = Math.hypot(dx, dy);

    aiming = false;

    if (distance < 10) {
        draw();
        return;
    }

    /*
       Direction comes from the opposite direction
       of the player's drag.
    */

    const directionX = dx / distance;
    const directionY = dy / distance;

    ball.vx = directionX * BALL_SPEED;
    ball.vy = directionY * BALL_SPEED;

    moving = true;

    hint.textContent = "";

    lastTime = performance.now();

    if (animationId) {
        cancelAnimationFrame(animationId);
    }

    animationId = requestAnimationFrame(gameLoop);
}


/* =========================================================
   EVENT LISTENERS
   ========================================================= */

canvas.addEventListener("touchstart", pointerDown, {
    passive: false
});

canvas.addEventListener("touchmove", pointerMove, {
    passive: false
});

canvas.addEventListener("touchend", pointerUp, {
    passive: false
});

canvas.addEventListener("mousedown", pointerDown);
canvas.addEventListener("mousemove", pointerMove);
canvas.addEventListener("mouseup", pointerUp);

window.addEventListener("mouseup", pointerUp);


/* =========================================================
   GAME LOOP
   ========================================================= */

function gameLoop(timestamp) {

    if (!moving) {
        return;
    }

    const delta = Math.min(
        timestamp - lastTime,
        30
    );

    lastTime = timestamp;

    /*
       Convert velocity into pixels per frame.
       BALL_SPEED is measured in pixels per millisecond.
    */

    const moveX = ball.vx * delta;
    const moveY = ball.vy * delta;

    moveBall(moveX, moveY);


    draw();

    if (moving) {
        animationId = requestAnimationFrame(gameLoop);
    }
}

/* =========================================================
   HOLE ANIMATION
   ========================================================= */

function startHoleAnimation() {

    if (holeAnimation) {
        return;
    }

    moving = false;
    holeAnimation = true;
    holeAnimationStart = performance.now();

    requestAnimationFrame(holeAnimationLoop);
}


function holeAnimationLoop(timestamp) {

    const elapsed = timestamp - holeAnimationStart;

    const progress = Math.min(
        elapsed / holeAnimationDuration,
        1
    );

    const eased = 1 - Math.pow(1 - progress, 3);

    ball.x += (hole.x - ball.x) * eased * 0.18;
    ball.y += (hole.y - ball.y) * eased * 0.18;

    draw(BALL_RADIUS * (1 - eased * 0.65));

    if (progress < 1) {

        requestAnimationFrame(holeAnimationLoop);

    } else {

        holeAnimation = false;

        ball.x = hole.x;
        ball.y = hole.y;

        draw();

        const level = levels[currentLevel];

        if (bounceCount <= level.maxBounces) {
            winLevel();
        } else {
            loseLevel();
        }
    }
}


function startDeathAnimation() {

    if (dying) {
        return;
    }

    moving = false;
    dying = true;

    playDeathSound();

    deathStartTime = performance.now();

    requestAnimationFrame(deathAnimationLoop);
}


function deathAnimationLoop(timestamp) {

    const elapsed = timestamp - deathStartTime;

    const progress = Math.min(
        elapsed / DEATH_DURATION,
        1
    );

    /*
       Fade from black to red, then disappear.
    */

    const alpha = 1 - progress;

    draw();

    /*
       Draw the red fading ball on top.
    */

    ctx.save();

    ctx.globalAlpha = alpha;

    ctx.beginPath();

    ctx.arc(
        ball.x,
        ball.y,
        BALL_RADIUS,
        0,
        Math.PI * 2
    );

    ctx.fillStyle = "#e53935";

    ctx.fill();

    ctx.restore();


    if (progress < 1) {

        requestAnimationFrame(deathAnimationLoop);

    } else {

        dying = false;

        resetAfterDeath();
    }
}

function resetAfterDeath() {

    const level = levels[currentLevel];

    bounceCount = 0;

    ball.x = level.ball.x * canvasSize;
    ball.y = level.ball.y * canvasSize;

    ball.vx = 0;
    ball.vy = 0;

    moving = false;
    aiming = false;

    updateBounceText();

    hint.textContent =
        "Drag the ball opposite the direction you want it to go";

    draw();
}

/* =========================================================
   MOVE BALL
   ========================================================= */

function moveBall(dx, dy) {

    let newX = ball.x + dx;
    let newY = ball.y + dy;

    /*
       OUTER WALL COLLISION
    */

    if (newX - BALL_RADIUS <= 0) {

        newX = BALL_RADIUS;

        ball.vx = Math.abs(ball.vx);

        registerBounce();

createImpactEffect(
    newX,
    newY,
    "x"
);
    }

    else if (newX + BALL_RADIUS >= canvasSize) {

        newX = canvasSize - BALL_RADIUS;

        ball.vx = -Math.abs(ball.vx);

        registerBounce();

createImpactEffect(
    newX,
    newY,
    "x"
);
    }


    if (newY - BALL_RADIUS <= 0) {

        newY = BALL_RADIUS;

        ball.vy = Math.abs(ball.vy);

        registerBounce();

createImpactEffect(
    newX,
    newY,
    "y"
);
    }

    else if (newY + BALL_RADIUS >= canvasSize) {

        newY = canvasSize - BALL_RADIUS;

        ball.vy = -Math.abs(ball.vy);

        registerBounce();

createImpactEffect(
    newX,
    newY,
    "y"
);
    }


    /*
       OBSTACLE COLLISIONS
    */

    for (const obstacle of obstacles) {

        const collision = circleRectangleCollision(
            newX,
            newY,
            BALL_RADIUS,
            obstacle
        );

        if (!collision) {
            continue;
        }

        newX = collision.x;
        newY = collision.y;

        if (collision.axis === "x") {
            ball.vx *= -1;
        } else {
            ball.vy *= -1;
        }

        registerBounce();

        if (!moving) {
            return;
        }
    }


    ball.x = newX;
    ball.y = newY;


    /*
       HOLE CHECK
    */

    const holeDistance = Math.hypot(
        ball.x - hole.x,
        ball.y - hole.y
    );

    if (holeDistance <= HOLE_RADIUS + BALL_RADIUS) {

    // Start the "rolling into the hole" animation
    startHoleAnimation();

    return;
    }
}


/* =========================================================
   BOUNCE
   ========================================================= */

function registerBounce() {

    bounceCount++;

    updateBounceText();

    const level = levels[currentLevel];

    if (bounceCount > level.maxBounces) {

        moving = false;

        startDeathAnimation();
    }
}


/* =========================================================
   CIRCLE / RECTANGLE COLLISION
   ========================================================= */

function circleRectangleCollision(cx, cy, radius, rect) {

    // Find the closest point on the rectangle to the ball
    const closestX = Math.max(
        rect.x,
        Math.min(cx, rect.x + rect.width)
    );

    const closestY = Math.max(
        rect.y,
        Math.min(cy, rect.y + rect.height)
    );

    const dx = cx - closestX;
    const dy = cy - closestY;

    const distanceSquared = dx * dx + dy * dy;

    // No collision
    if (distanceSquared > radius * radius) {
        return null;
    }


    /*
       Work out which direction the ball came from.

       This is much safer than simply choosing whichever
       rectangle side happens to be closest.
    */

    const overlapLeft =
        cx + radius - rect.x;

    const overlapRight =
        rect.x + rect.width - (cx - radius);

    const overlapTop =
        cy + radius - rect.y;

    const overlapBottom =
        rect.y + rect.height - (cy - radius);


    const overlaps = [
        { amount: overlapLeft, axis: "x", direction: -1 },
        { amount: overlapRight, axis: "x", direction: 1 },
        { amount: overlapTop, axis: "y", direction: -1 },
        { amount: overlapBottom, axis: "y", direction: 1 }
    ];

    /*
       Only consider positive overlaps.
    */

    const validOverlaps = overlaps.filter(
        overlap => overlap.amount >= 0
    );

    if (validOverlaps.length === 0) {
        return null;
    }


    /*
       Use the smallest overlap.

       This identifies the side of the wall that the
       ball actually collided with.
    */

    validOverlaps.sort(
        (a, b) => a.amount - b.amount
    );

    const collision = validOverlaps[0];


    /*
       Push the ball back outside the wall.

       This prevents it from getting stuck inside
       the obstacle.
    */

    if (collision.axis === "x") {

        if (collision.direction === -1) {

            return {
                x: rect.x - radius - 0.5,
                y: cy,
                axis: "x"
            };

        } else {

            return {
                x: rect.x + rect.width + radius + 0.5,
                y: cy,
                axis: "x"
            };
        }

    } else {

        if (collision.direction === -1) {

            return {
                x: cx,
                y: rect.y - radius - 0.5,
                axis: "y"
            };

        } else {

            return {
                x: cx,
                y: rect.y + rect.height + radius + 0.5,
                axis: "y"
            };
        }
    }
}


/* =========================================================
   WIN / LOSE
   ========================================================= */

function winLevel() {

    playWinSound();

    startConfetti();

    setTimeout(() => {
        winOverlay.classList.remove("hidden");
    }, 150);
}

/* =========================================================
   NEXT LEVEL
   ========================================================= */

nextButton.addEventListener("click", () => {

    winOverlay.classList.add("hidden");

    if (currentLevel < levels.length - 1) {

        loadLevel(currentLevel + 1);

    } else {

        /*
           After the final level, start over.
        */

        currentLevel = 0;

        loadLevel(currentLevel);
    }
});


/* =========================================================
   TRY AGAIN
   ========================================================= */

tryAgainButton.addEventListener("click", () => {

    loseOverlay.classList.add("hidden");

    loadLevel(currentLevel);
});


/* =========================================================
   INFO
   ========================================================= */

infoButton.addEventListener("click", () => {

    if (moving || aiming) {
        return;
    }

    infoOverlay.classList.remove("hidden");
});


closeInfoButton.addEventListener("click", () => {

    infoOverlay.classList.add("hidden");
});


/* =========================================================
   DRAW EVERYTHING
   ========================================================= */

function draw(ballRadius = BALL_RADIUS) {

    ctx.clearRect(
        0,
        0,
        canvasSize,
        canvasSize
    );


    /*
       WHITE PLAYING AREA
    */

    ctx.fillStyle = "#ffffff";

    ctx.fillRect(
        0,
        0,
        canvasSize,
        canvasSize
    );


    /*
       OBSTACLE WALLS
    */

    for (const obstacle of obstacles) {

        drawObstacle(obstacle);
    }


    /*
       HOLE
    */

    drawHole();


    /*
       AIMING TRAJECTORY
    */

    if (aiming) {

        drawTrajectory();
    }

    /*
   IMPACT EFFECTS
*/

drawImpactEffects();




    /*
       BALL
    */

    drawBall(ballRadius);
}


/* =========================================================
   DRAW OBSTACLE
   ========================================================= */

function drawObstacle(obstacle) {

    ctx.save();

    ctx.fillStyle = "#222";

    ctx.fillRect(
        obstacle.x,
        obstacle.y,
        obstacle.width,
        obstacle.height
    );

    ctx.restore();
}


/* =========================================================
   DRAW HOLE
   ========================================================= */

function drawHole() {

    ctx.save();

    /*
       Outer ring
    */

    ctx.beginPath();

    ctx.arc(
        hole.x,
        hole.y,
        HOLE_RADIUS + 5,
        0,
        Math.PI * 2
    );

    ctx.strokeStyle = "#d2d2d2";
    ctx.lineWidth = 2;

    ctx.stroke();


    /*
       Hole
    */

    ctx.beginPath();

    ctx.arc(
        hole.x,
        hole.y,
        HOLE_RADIUS,
        0,
        Math.PI * 2
    );

    ctx.fillStyle = "#161616";

    ctx.fill();

    ctx.restore();
}


/* =========================================================
   DRAW BALL
   ========================================================= */

function drawBall(radius = BALL_RADIUS) {

    ctx.save();

    /*
       Subtle shadow
    */

    ctx.beginPath();

    ctx.arc(
        ball.x + 1,
        ball.y + 2,
        radius,
        0,
        Math.PI * 2
    );

    ctx.fillStyle = "rgba(0,0,0,0.16)";

    ctx.fill();


    /*
       Ball
    */

    ctx.beginPath();

    ctx.arc(
        ball.x,
        ball.y,
        radius,
        0,
        Math.PI * 2
    );

    ctx.fillStyle = "#080808";

    ctx.fill();

    ctx.restore();
}


/* =========================================================
   DRAW AIMING LINE
   ========================================================= */

function drawTrajectory() {

    const dx = aimStart.x - aimCurrent.x;
    const dy = aimStart.y - aimCurrent.y;

    const distance = Math.hypot(dx, dy);

    if (distance < 5) {
        return;
    }

    const dirX = dx / distance;
    const dirY = dy / distance;


    /*
       Limit the displayed aiming length.
    */

    const lineLength = Math.min(
        90,
        Math.max(35, distance)
    );


    const endX =
        ball.x + dirX * lineLength;

    const endY =
        ball.y + dirY * lineLength;


    /*
       Dashed trajectory
    */

    ctx.save();

    ctx.beginPath();

    ctx.moveTo(ball.x, ball.y);

    ctx.lineTo(endX, endY);

    ctx.strokeStyle = "rgba(0,0,0,0.35)";
    ctx.lineWidth = 2;

    ctx.setLineDash([5, 5]);

    ctx.stroke();

    ctx.setLineDash([]);


    /*
       Arrow head
    */

    const arrowSize = 8;

    const angle = Math.atan2(
        dirY,
        dirX
    );

    ctx.beginPath();

    ctx.moveTo(
        endX,
        endY
    );

    ctx.lineTo(
        endX - arrowSize * Math.cos(angle - Math.PI / 6),
        endY - arrowSize * Math.sin(angle - Math.PI / 6)
    );

    ctx.lineTo(
        endX - arrowSize * Math.cos(angle + Math.PI / 6),
        endY - arrowSize * Math.sin(angle + Math.PI / 6)
    );

    ctx.closePath();

    ctx.fillStyle = "rgba(0,0,0,0.45)";

    ctx.fill();

    ctx.restore();
}


/* =========================================================
   ROUNDED RECTANGLE
   ========================================================= */

function roundRect(
    context,
    x,
    y,
    width,
    height,
    radius
) {

    const r = Math.min(
        radius,
        width / 2,
        height / 2
    );

    context.beginPath();

    context.moveTo(
        x + r,
        y
    );

    context.lineTo(
        x + width - r,
        y
    );

    context.quadraticCurveTo(
        x + width,
        y,
        x + width,
        y + r
    );

    context.lineTo(
        x + width,
        y + height - r
    );

    context.quadraticCurveTo(
        x + width,
        y + height,
        x + width - r,
        y + height
    );

    context.lineTo(
        x + r,
        y + height
    );

    context.quadraticCurveTo(
        x,
        y + height,
        x,
        y + height - r
    );

    context.lineTo(
        x,
        y + r
    );

    context.quadraticCurveTo(
        x,
        y,
        x + r,
        y
    );

    context.closePath();
}


/* =========================================================
   START GAME
   ========================================================= */

function startGame() {

    /*
       Canvas needs to have its size before loading
       the level positions.
    */

    const rect = canvas.getBoundingClientRect();

    canvasSize = Math.min(
        rect.width,
        rect.height
    );

    resizeCanvas();

    loadLevel(0);
}


startGame();