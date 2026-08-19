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

    /* =====================================================
       LEVEL 1 — INTRO
       Simple diagonal shot with one wall bounce
       ===================================================== */

    {
        maxBounces: 2,

        ball: {
            x: 0.15,
            y: 0.75
        },

        hole: {
            x: 0.82,
            y: 0.25
        },

        obstacles: [
            {
                x: 0.42,
                y: 0.15,
                width: 0.012,
                height: 0.30
            }
        ],

        spikes: []
    },


    /* =====================================================
       LEVEL 2 — TWO WALLS
       ===================================================== */

    {
        maxBounces: 3,

        ball: {
            x: 0.18,
            y: 0.22
        },

        hole: {
            x: 0.82,
            y: 0.78
        },

        obstacles: [
            {
                x: 0.32,
                y: 0.15,
                width: 0.012,
                height: 0.42
            },
            {
                x: 0.65,
                y: 0.43,
                width: 0.012,
                height: 0.42
            }
        ],

        spikes: []
    },


    /* =====================================================
       LEVEL 3 — FIRST SPIKE
       ===================================================== */

    {
        maxBounces: 3,

        ball: {
            x: 0.15,
            y: 0.78
        },

        hole: {
            x: 0.84,
            y: 0.20
        },

        obstacles: [
            {
                x: 0.35,
                y: 0.25,
                width: 0.012,
                height: 0.35
            },
            {
                x: 0.62,
                y: 0.48,
                width: 0.012,
                height: 0.35
            }
        ],

        spikes: [
            {
                x: 0.48,
                y: 0.72,
                radius: 0.035
            }
        ]
    },


    /* =====================================================
       LEVEL 4 — HORIZONTAL WALLS
       ===================================================== */

    {
        maxBounces: 4,

        ball: {
            x: 0.18,
            y: 0.20
        },

        hole: {
            x: 0.82,
            y: 0.80
        },

        obstacles: [
            {
                x: 0.25,
                y: 0.35,
                width: 0.45,
                height: 0.012
            },
            {
                x: 0.30,
                y: 0.65,
                width: 0.45,
                height: 0.012
            }
        ],

        spikes: []
    },


    /* =====================================================
       LEVEL 5 — WALL + SPIKES
       ===================================================== */

    {
        maxBounces: 4,

        ball: {
            x: 0.16,
            y: 0.50
        },

        hole: {
            x: 0.84,
            y: 0.50
        },

        obstacles: [
            {
                x: 0.32,
                y: 0.18,
                width: 0.012,
                height: 0.32
            },
            {
                x: 0.60,
                y: 0.50,
                width: 0.012,
                height: 0.32
            }
        ],

        spikes: [
            {
                x: 0.48,
                y: 0.32,
                radius: 0.035
            }
        ]
    },


    /* =====================================================
       LEVEL 6 — ZIG-ZAG
       ===================================================== */

    {
        maxBounces: 5,

        ball: {
            x: 0.15,
            y: 0.82
        },

        hole: {
            x: 0.85,
            y: 0.18
        },

        obstacles: [
            {
                x: 0.25,
                y: 0.20,
                width: 0.012,
                height: 0.42
            },
            {
                x: 0.48,
                y: 0.38,
                width: 0.012,
                height: 0.42
            },
            {
                x: 0.71,
                y: 0.20,
                width: 0.012,
                height: 0.42
            }
        ],

        spikes: []
    },


    /* =====================================================
       LEVEL 7 — SPIKE MAZE
       Last "learning" level
       ===================================================== */

    {
        maxBounces: 5,

        ball: {
            x: 0.15,
            y: 0.20
        },

        hole: {
            x: 0.85,
            y: 0.80
        },

        obstacles: [
            {
                x: 0.28,
                y: 0.28,
                width: 0.40,
                height: 0.012
            },
            {
                x: 0.32,
                y: 0.68,
                width: 0.40,
                height: 0.012
            }
        ],

        spikes: [
            {
                x: 0.50,
                y: 0.48,
                radius: 0.035
            },
            {
                x: 0.72,
                y: 0.28,
                radius: 0.035
            }
        ]
    },


    /* =====================================================
       LEVEL 8 — CROSSOVER
       ===================================================== */

    {
        maxBounces: 6,

        ball: {
            x: 0.14,
            y: 0.50
        },

        hole: {
            x: 0.86,
            y: 0.50
        },

        obstacles: [
            {
                x: 0.30,
                y: 0.15,
                width: 0.012,
                height: 0.32
            },
            {
                x: 0.30,
                y: 0.53,
                width: 0.012,
                height: 0.32
            },
            {
                x: 0.55,
                y: 0.15,
                width: 0.012,
                height: 0.32
            },
            {
                x: 0.55,
                y: 0.53,
                width: 0.012,
                height: 0.32
            }
        ],

        spikes: [
            {
                x: 0.42,
                y: 0.50,
                radius: 0.035
            }
        ]
    },


    /* =====================================================
       LEVEL 9 — PORTAL INTRO
       ===================================================== */

    {
        maxBounces: 6,

        ball: {
            x: 0.15,
            y: 0.75
        },

        hole: {
            x: 0.84,
            y: 0.22
        },

        obstacles: [
            {
                x: 0.30,
                y: 0.20,
                width: 0.012,
                height: 0.42
            },
            {
                x: 0.58,
                y: 0.38,
                width: 0.012,
                height: 0.42
            }
        ],

        spikes: [
            {
                x: 0.43,
                y: 0.28,
                radius: 0.035
            }
        ],

        portals: [
            {
                x: 0.22,
                y: 0.30,
                radius: 0.055
            },
            {
                x: 0.78,
                y: 0.70,
                radius: 0.055
            }
        ]
    },


    /* =====================================================
       LEVEL 10 — PORTAL ZIG-ZAG
       ===================================================== */

    {
        maxBounces: 7,

        ball: {
            x: 0.18,
            y: 0.82
        },

        hole: {
            x: 0.82,
            y: 0.18
        },

        obstacles: [
            {
                x: 0.28,
                y: 0.18,
                width: 0.012,
                height: 0.35
            },
            {
                x: 0.50,
                y: 0.47,
                width: 0.012,
                height: 0.35
            },
            {
                x: 0.72,
                y: 0.18,
                width: 0.012,
                height: 0.35
            }
        ],

        spikes: [
            {
                x: 0.40,
                y: 0.65,
                radius: 0.035
            },
            {
                x: 0.63,
                y: 0.35,
                radius: 0.035
            }
        ],

        portals: [
            {
                x: 0.18,
                y: 0.30,
                radius: 0.055
            },
            {
                x: 0.82,
                y: 0.70,
                radius: 0.055
            }
        ]
    },


    /* =====================================================
       LEVEL 11 — THE CORRIDOR
       ===================================================== */

    {
        maxBounces: 7,

        ball: {
            x: 0.15,
            y: 0.50
        },

        hole: {
            x: 0.85,
            y: 0.50
        },

        obstacles: [
            {
                x: 0.25,
                y: 0.15,
                width: 0.012,
                height: 0.55
            },
            {
                x: 0.50,
                y: 0.30,
                width: 0.012,
                height: 0.55
            },
            {
                x: 0.75,
                y: 0.15,
                width: 0.012,
                height: 0.55
            }
        ],

        spikes: [
            {
                x: 0.38,
                y: 0.20,
                radius: 0.035
            },
            {
                x: 0.63,
                y: 0.70,
                radius: 0.035
            }
        ]
    },


    /* =====================================================
       LEVEL 12 — FOUR CORNERS
       ===================================================== */

    {
        maxBounces: 8,

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
                x: 0.28,
                y: 0.25,
                width: 0.35,
                height: 0.012
            },
            {
                x: 0.38,
                y: 0.72,
                width: 0.35,
                height: 0.012
            },
            {
                x: 0.72,
                y: 0.30,
                width: 0.012,
                height: 0.25
            }
        ],

        spikes: [
            {
                x: 0.25,
                y: 0.50,
                radius: 0.035
            },
            {
                x: 0.68,
                y: 0.55,
                radius: 0.035
            }
        ]
    },


    /* =====================================================
       LEVEL 13 — PORTAL TRAP
       ===================================================== */

    {
        maxBounces: 8,

        ball: {
            x: 0.15,
            y: 0.80
        },

        hole: {
            x: 0.85,
            y: 0.20
        },

        obstacles: [
            {
                x: 0.28,
                y: 0.18,
                width: 0.012,
                height: 0.40
            },
            {
                x: 0.48,
                y: 0.42,
                width: 0.012,
                height: 0.40
            },
            {
                x: 0.68,
                y: 0.18,
                width: 0.012,
                height: 0.40
            }
        ],

        spikes: [
            {
                x: 0.38,
                y: 0.68,
                radius: 0.035
            },
            {
                x: 0.58,
                y: 0.30,
                radius: 0.035
            },
            {
                x: 0.76,
                y: 0.65,
                radius: 0.035
            }
        ],

        portals: [
            {
                x: 0.18,
                y: 0.25,
                radius: 0.055
            },
            {
                x: 0.82,
                y: 0.75,
                radius: 0.055
            }
        ]
    },


    /* =====================================================
       LEVEL 14 — THE SNAKE
       ===================================================== */

    {
        maxBounces: 9,

        ball: {
            x: 0.15,
            y: 0.20
        },

        hole: {
            x: 0.85,
            y: 0.80
        },

        obstacles: [
            {
                x: 0.25,
                y: 0.25,
                width: 0.45,
                height: 0.012
            },
            {
                x: 0.25,
                y: 0.50,
                width: 0.012,
                height: 0.25
            },
            {
                x: 0.25,
                y: 0.75,
                width: 0.45,
                height: 0.012
            },
            {
                x: 0.70,
                y: 0.50,
                width: 0.012,
                height: 0.25
            },
            {
                x: 0.45,
                y: 0.50,
                width: 0.012,
                height: 0.012
            }
        ],

        spikes: [
            {
                x: 0.50,
                y: 0.38,
                radius: 0.035
            },
            {
                x: 0.50,
                y: 0.62,
                radius: 0.035
            }
        ]
    },


    /* =====================================================
       LEVEL 15 — PORTAL LOOP
       ===================================================== */

    {
        maxBounces: 9,

        ball: {
            x: 0.12,
            y: 0.50
        },

        hole: {
            x: 0.88,
            y: 0.50
        },

        obstacles: [
            {
                x: 0.25,
                y: 0.18,
                width: 0.012,
                height: 0.28
            },
            {
                x: 0.25,
                y: 0.54,
                width: 0.012,
                height: 0.28
            },
            {
                x: 0.50,
                y: 0.30,
                width: 0.012,
                height: 0.40
            },
            {
                x: 0.75,
                y: 0.18,
                width: 0.012,
                height: 0.28
            },
            {
                x: 0.75,
                y: 0.54,
                width: 0.012,
                height: 0.28
            }
        ],

        spikes: [
            {
                x: 0.38,
                y: 0.50,
                radius: 0.035
            },
            {
                x: 0.62,
                y: 0.50,
                radius: 0.035
            }
        ],

        portals: [
            {
                x: 0.18,
                y: 0.20,
                radius: 0.055
            },
            {
                x: 0.82,
                y: 0.80,
                radius: 0.055
            }
        ]
    },


    /* =====================================================
       LEVEL 16 — CROSSROADS
       ===================================================== */

    {
        maxBounces: 10,

        ball: {
            x: 0.15,
            y: 0.15
        },

        hole: {
            x: 0.85,
            y: 0.85
        },

        obstacles: [
            {
                x: 0.30,
                y: 0.15,
                width: 0.012,
                height: 0.55
            },
            {
                x: 0.30,
                y: 0.70,
                width: 0.40,
                height: 0.012
            },
            {
                x: 0.70,
                y: 0.30,
                width: 0.012,
                height: 0.40
            },
            {
                x: 0.30,
                y: 0.30,
                width: 0.40,
                height: 0.012
            }
        ],

        spikes: [
            {
                x: 0.50,
                y: 0.20,
                radius: 0.035
            },
            {
                x: 0.50,
                y: 0.80,
                radius: 0.035
            },
            {
                x: 0.20,
                y: 0.50,
                radius: 0.035
            }
        ]
    },


    /* =====================================================
       LEVEL 17 — PORTAL SWITCH
       ===================================================== */

    {
        maxBounces: 10,

        ball: {
            x: 0.15,
            y: 0.82
        },

        hole: {
            x: 0.85,
            y: 0.18
        },

        obstacles: [
            {
                x: 0.25,
                y: 0.20,
                width: 0.012,
                height: 0.50
            },
            {
                x: 0.50,
                y: 0.30,
                width: 0.012,
                height: 0.50
            },
            {
                x: 0.75,
                y: 0.10,
                width: 0.012,
                height: 0.50
            }
        ],

        spikes: [
            {
                x: 0.38,
                y: 0.75,
                radius: 0.035
            },
            {
                x: 0.62,
                y: 0.25,
                radius: 0.035
            },
            {
                x: 0.80,
                y: 0.70,
                radius: 0.035
            }
        ],

        portals: [
            {
                x: 0.18,
                y: 0.25,
                radius: 0.055
            },
            {
                x: 0.82,
                y: 0.75,
                radius: 0.055
            }
        ]
    },


    /* =====================================================
       LEVEL 18 — THE GRID
       ===================================================== */

    {
        maxBounces: 11,

        ball: {
            x: 0.15,
            y: 0.50
        },

        hole: {
            x: 0.85,
            y: 0.50
        },

        obstacles: [
            {
                x: 0.25,
                y: 0.20,
                width: 0.012,
                height: 0.25
            },
            {
                x: 0.25,
                y: 0.55,
                width: 0.012,
                height: 0.25
            },
            {
                x: 0.45,
                y: 0.20,
                width: 0.012,
                height: 0.25
            },
            {
                x: 0.45,
                y: 0.55,
                width: 0.012,
                height: 0.25
            },
            {
                x: 0.65,
                y: 0.20,
                width: 0.012,
                height: 0.25
            },
            {
                x: 0.65,
                y: 0.55,
                width: 0.012,
                height: 0.25
            }
        ],

        spikes: [
            {
                x: 0.35,
                y: 0.48,
                radius: 0.035
            },
            {
                x: 0.55,
                y: 0.52,
                radius: 0.035
            },
            {
                x: 0.75,
                y: 0.48,
                radius: 0.035
            }
        ]
    },


    /* =====================================================
       LEVEL 19 — CHAOS
       ===================================================== */

    {
        maxBounces: 12,

        ball: {
            x: 0.12,
            y: 0.82
        },

        hole: {
            x: 0.88,
            y: 0.18
        },

        obstacles: [
            {
                x: 0.22,
                y: 0.18,
                width: 0.012,
                height: 0.38
            },
            {
                x: 0.40,
                y: 0.44,
                width: 0.012,
                height: 0.38
            },
            {
                x: 0.58,
                y: 0.18,
                width: 0.012,
                height: 0.38
            },
            {
                x: 0.76,
                y: 0.44,
                width: 0.012,
                height: 0.38
            },
            {
                x: 0.32,
                y: 0.30,
                width: 0.22,
                height: 0.012
            },
            {
                x: 0.50,
                y: 0.70,
                width: 0.22,
                height: 0.012
            }
        ],

        spikes: [
            {
                x: 0.30,
                y: 0.68,
                radius: 0.035
            },
            {
                x: 0.50,
                y: 0.30,
                radius: 0.035
            },
            {
                x: 0.70,
                y: 0.68,
                radius: 0.035
            },
            {
                x: 0.82,
                y: 0.35,
                radius: 0.035
            }
        ],

        portals: [
            {
                x: 0.15,
                y: 0.25,
                radius: 0.055
            },
            {
                x: 0.85,
                y: 0.75,
                radius: 0.055
            }
        ]
    },


    /* =====================================================
       LEVEL 20 — FINAL
       Large multi-part puzzle
       ===================================================== */

    {
        maxBounces: 14,

        ball: {
            x: 0.12,
            y: 0.88
        },

        hole: {
            x: 0.88,
            y: 0.12
        },

        obstacles: [
            {
                x: 0.20,
                y: 0.18,
                width: 0.012,
                height: 0.45
            },
            {
                x: 0.38,
                y: 0.38,
                width: 0.012,
                height: 0.45
            },
            {
                x: 0.56,
                y: 0.18,
                width: 0.012,
                height: 0.45
            },
            {
                x: 0.74,
                y: 0.38,
                width: 0.012,
                height: 0.45
            },

            {
                x: 0.20,
                y: 0.30,
                width: 0.18,
                height: 0.012
            },
            {
                x: 0.56,
                y: 0.70,
                width: 0.18,
                height: 0.012
            },
            {
                x: 0.38,
                y: 0.30,
                width: 0.18,
                height: 0.012
            }
        ],

        spikes: [
            {
                x: 0.28,
                y: 0.72,
                radius: 0.035
            },
            {
                x: 0.48,
                y: 0.25,
                radius: 0.035
            },
            {
                x: 0.65,
                y: 0.52,
                radius: 0.035
            },
            {
                x: 0.80,
                y: 0.30,
                radius: 0.035
            }
        ],

        portals: [
            {
                x: 0.14,
                y: 0.22,
                radius: 0.055
            },
            {
                x: 0.86,
                y: 0.78,
                radius: 0.055
            }
        ]

    },

        /* =========================================================
        LEVEL 21
        INTRODUCTION TO COBWEBS + BOOSTS
        Simple straight path.
        ========================================================= */

    {
        maxBounces: 1,

    ball: {
        x: 0.15,
        y: 0.5
    },

    hole: {
        x: 0.85,
        y: 0.5
    },

    obstacles: [],

    spikes: [],

    portals: [],

    cobwebs: [
        {
            x: 0.40,
            y: 0.5,
            radius: 0.035
        }
    ],

    boosts: [
        {
            x: 0.62,
            y: 0.5,
            width: 0.07,
            height: 0.07,
            direction: 0
        }
    ]
},


/* =========================================================
   LEVEL 22
   Simple wall + cobweb + boost
   ========================================================= */

{
    maxBounces: 2,

    ball: {
        x: 0.18,
        y: 0.75
    },

    hole: {
        x: 0.82,
        y: 0.25
    },

    obstacles: [
        {
            x: 0.42,
            y: 0.25,
            width: 0.07,
            height: 0.32
        }
    ],

    cobwebs: [
        {
            x: 0.30,
            y: 0.55,
            radius: 0.035
        }
    ],

    boosts: [
        {
            x: 0.65,
            y: 0.35,
            width: 0.07,
            height: 0.07,
            direction: -Math.PI / 4
        }
    ]
},


/* =========================================================
   LEVEL 23
   First spike + cobweb
   ========================================================= */

{
    maxBounces: 2,

    ball: {
        x: 0.18,
        y: 0.25
    },

    hole: {
        x: 0.82,
        y: 0.75
    },

    obstacles: [
        {
            x: 0.42,
            y: 0.20,
            width: 0.08,
            height: 0.38
        }
    ],

    spikes: [
        {
            x: 0.68,
            y: 0.55,
            radius: 0.035
        }
    ],

    cobwebs: [
        {
            x: 0.30,
            y: 0.35,
            radius: 0.035
        }
    ],

    boosts: [
        {
            x: 0.60,
            y: 0.70,
            width: 0.07,
            height: 0.07,
            direction: Math.PI / 4
        }
    ]
},


/* =========================================================
   LEVEL 24
   Portal introduction with web
   ========================================================= */

{
    maxBounces: 3,

    ball: {
        x: 0.18,
        y: 0.80
    },

    hole: {
        x: 0.82,
        y: 0.20
    },

    obstacles: [
        {
            x: 0.35,
            y: 0.30,
            width: 0.30,
            height: 0.07
        }
    ],

    portals: [
        {
            x: 0.25,
            y: 0.25,
            radius: 0.055
        },
        {
            x: 0.75,
            y: 0.75,
            radius: 0.055
        }
    ],

    cobwebs: [
        {
            x: 0.55,
            y: 0.75,
            radius: 0.035
        }
    ],

    boosts: [
        {
            x: 0.50,
            y: 0.20,
            width: 0.07,
            height: 0.07,
            direction: 0
        }
    ]
},


/* =========================================================
   LEVEL 25
   Zig-zag
   ========================================================= */

{
    maxBounces: 4,

    ball: {
        x: 0.15,
        y: 0.80
    },

    hole: {
        x: 0.85,
        y: 0.20
    },

    obstacles: [
        {
            x: 0.25,
            y: 0.20,
            width: 0.08,
            height: 0.42
        },
        {
            x: 0.48,
            y: 0.38,
            width: 0.08,
            height: 0.42
        },
        {
            x: 0.71,
            y: 0.20,
            width: 0.08,
            height: 0.42
        }
    ],

    spikes: [
        {
            x: 0.38,
            y: 0.72,
            radius: 0.035
        },
        {
            x: 0.63,
            y: 0.28,
            radius: 0.035
        }
    ],

    cobwebs: [
        {
            x: 0.34,
            y: 0.48,
            radius: 0.035
        },
        {
            x: 0.60,
            y: 0.55,
            radius: 0.035
        }
    ],

    boosts: [
        {
            x: 0.44,
            y: 0.25,
            width: 0.07,
            height: 0.07,
            direction: -Math.PI / 2
        },
        {
            x: 0.68,
            y: 0.72,
            width: 0.07,
            height: 0.07,
            direction: Math.PI / 2
        }
    ]
},


/* =========================================================
   LEVEL 26
   ========================================================= */

{
    maxBounces: 4,

    ball: {
        x: 0.20,
        y: 0.20
    },

    hole: {
        x: 0.80,
        y: 0.80
    },

    obstacles: [
        {
            x: 0.30,
            y: 0.20,
            width: 0.40,
            height: 0.07
        },
        {
            x: 0.30,
            y: 0.73,
            width: 0.40,
            height: 0.07
        },
        {
            x: 0.60,
            y: 0.38,
            width: 0.07,
            height: 0.24
        }
    ],

    spikes: [
        {
            x: 0.48,
            y: 0.48,
            radius: 0.035
        }
    ],

    cobwebs: [
        {
            x: 0.22,
            y: 0.52,
            radius: 0.035
        }
    ],

    boosts: [
        {
            x: 0.75,
            y: 0.30,
            width: 0.07,
            height: 0.07,
            direction: Math.PI / 2
        }
    ]
},


/* =========================================================
   LEVEL 27
   Portal maze
   ========================================================= */

{
    maxBounces: 4,

    ball: {
        x: 0.15,
        y: 0.50
    },

    hole: {
        x: 0.85,
        y: 0.50
    },

    obstacles: [
        {
            x: 0.30,
            y: 0.15,
            width: 0.07,
            height: 0.35
        },
        {
            x: 0.63,
            y: 0.50,
            width: 0.07,
            height: 0.35
        }
    ],

    portals: [
        {
            x: 0.22,
            y: 0.20,
            radius: 0.055
        },
        {
            x: 0.78,
            y: 0.80,
            radius: 0.055
        }
    ],

    spikes: [
        {
            x: 0.50,
            y: 0.50,
            radius: 0.04
        }
    ],

    cobwebs: [
        {
            x: 0.45,
            y: 0.75,
            radius: 0.035
        }
    ],

    boosts: [
        {
            x: 0.52,
            y: 0.25,
            width: 0.07,
            height: 0.07,
            direction: 0
        }
    ]
},


/* =========================================================
   LEVEL 28
   ========================================================= */

{
    maxBounces: 5,

    ball: {
        x: 0.15,
        y: 0.75
    },

    hole: {
        x: 0.85,
        y: 0.25
    },

    obstacles: [
        {
            x: 0.25,
            y: 0.20,
            width: 0.07,
            height: 0.40
        },
        {
            x: 0.45,
            y: 0.40,
            width: 0.07,
            height: 0.40
        },
        {
            x: 0.65,
            y: 0.20,
            width: 0.07,
            height: 0.40
        }
    ],

    spikes: [
        {
            x: 0.36,
            y: 0.70,
            radius: 0.035
        },
        {
            x: 0.58,
            y: 0.30,
            radius: 0.035
        }
    ],

    cobwebs: [
        {
            x: 0.35,
            y: 0.35,
            radius: 0.035
        },
        {
            x: 0.56,
            y: 0.65,
            radius: 0.035
        }
    ],

    boosts: [
        {
            x: 0.48,
            y: 0.25,
            width: 0.07,
            height: 0.07,
            direction: 0
        },
        {
            x: 0.72,
            y: 0.70,
            width: 0.07,
            height: 0.07,
            direction: -Math.PI / 2
        }
    ]
},


/* =========================================================
   LEVEL 29
   ========================================================= */

{
    maxBounces: 5,

    ball: {
        x: 0.20,
        y: 0.50
    },

    hole: {
        x: 0.80,
        y: 0.50
    },

    obstacles: [
        {
            x: 0.35,
            y: 0.15,
            width: 0.08,
            height: 0.28
        },
        {
            x: 0.52,
            y: 0.57,
            width: 0.08,
            height: 0.28
        },
        {
            x: 0.69,
            y: 0.15,
            width: 0.08,
            height: 0.28
        }
    ],

    portals: [
        {
            x: 0.25,
            y: 0.20,
            radius: 0.055
        },
        {
            x: 0.75,
            y: 0.80,
            radius: 0.055
        }
    ],

    spikes: [
        {
            x: 0.45,
            y: 0.50,
            radius: 0.04
        },
        {
            x: 0.62,
            y: 0.50,
            radius: 0.04
        }
    ],

    cobwebs: [
        {
            x: 0.42,
            y: 0.25,
            radius: 0.035
        }
    ],

    boosts: [
        {
            x: 0.57,
            y: 0.72,
            width: 0.07,
            height: 0.07,
            direction: Math.PI
        }
    ]
},


/* =========================================================
   LEVEL 30
   ========================================================= */

{
    maxBounces: 5,

    ball: {
        x: 0.18,
        y: 0.82
    },

    hole: {
        x: 0.82,
        y: 0.18
    },

    obstacles: [
        {
            x: 0.28,
            y: 0.25,
            width: 0.40,
            height: 0.07
        },
        {
            x: 0.32,
            y: 0.68,
            width: 0.40,
            height: 0.07
        },
        {
            x: 0.48,
            y: 0.35,
            width: 0.07,
            height: 0.30
        }
    ],

    portals: [
        {
            x: 0.20,
            y: 0.45,
            radius: 0.055
        },
        {
            x: 0.80,
            y: 0.55,
            radius: 0.055
        }
    ],

    spikes: [
        {
            x: 0.40,
            y: 0.50,
            radius: 0.035
        },
        {
            x: 0.60,
            y: 0.50,
            radius: 0.035
        }
    ],

    cobwebs: [
        {
            x: 0.65,
            y: 0.35,
            radius: 0.035
        },
        {
            x: 0.35,
            y: 0.60,
            radius: 0.035
        }
    ],

    boosts: [
        {
            x: 0.52,
            y: 0.75,
            width: 0.07,
            height: 0.07,
            direction: 0
        }
    ]
},


/* =========================================================
   LEVEL 31
   ========================================================= */

{
    maxBounces: 6,

    ball: {
        x: 0.15,
        y: 0.15
    },

    hole: {
        x: 0.85,
        y: 0.85
    },

    obstacles: [
        {
            x: 0.25,
            y: 0.25,
            width: 0.07,
            height: 0.50
        },
        {
            x: 0.68,
            y: 0.25,
            width: 0.07,
            height: 0.50
        },
        {
            x: 0.40,
            y: 0.42,
            width: 0.20,
            height: 0.07
        }
    ],

    spikes: [
        {
            x: 0.50,
            y: 0.25,
            radius: 0.035
        },
        {
            x: 0.50,
            y: 0.75,
            radius: 0.035
        }
    ],

    cobwebs: [
        {
            x: 0.32,
            y: 0.18,
            radius: 0.035
        },
        {
            x: 0.68,
            y: 0.82,
            radius: 0.035
        }
    ],

    boosts: [
        {
            x: 0.35,
            y: 0.65,
            width: 0.07,
            height: 0.07,
            direction: Math.PI / 2
        },
        {
            x: 0.65,
            y: 0.35,
            width: 0.07,
            height: 0.07,
            direction: -Math.PI / 2
        }
    ]
},


/* =========================================================
   LEVEL 32
   ========================================================= */

{
    maxBounces: 6,

    ball: {
        x: 0.18,
        y: 0.50
    },

    hole: {
        x: 0.82,
        y: 0.50
    },

    obstacles: [
        {
            x: 0.25,
            y: 0.20,
            width: 0.07,
            height: 0.30
        },
        {
            x: 0.43,
            y: 0.50,
            width: 0.07,
            height: 0.30
        },
        {
            x: 0.61,
            y: 0.20,
            width: 0.07,
            height: 0.30
        }
    ],

    portals: [
        {
            x: 0.18,
            y: 0.20,
            radius: 0.055
        },
        {
            x: 0.82,
            y: 0.80,
            radius: 0.055
        }
    ],

    spikes: [
        {
            x: 0.34,
            y: 0.55,
            radius: 0.04
        },
        {
            x: 0.52,
            y: 0.45,
            radius: 0.04
        },
        {
            x: 0.70,
            y: 0.55,
            radius: 0.04
        }
    ],

    cobwebs: [
        {
            x: 0.35,
            y: 0.25,
            radius: 0.035
        },
        {
            x: 0.55,
            y: 0.72,
            radius: 0.035
        }
    ],

    boosts: [
        {
            x: 0.48,
            y: 0.28,
            width: 0.07,
            height: 0.07,
            direction: 0
        }
    ]
},


/* =========================================================
   LEVEL 33
   ========================================================= */

{
    maxBounces: 6,

    ball: {
        x: 0.15,
        y: 0.80
    },

    hole: {
        x: 0.85,
        y: 0.20
    },

    obstacles: [
        {
            x: 0.22,
            y: 0.30,
            width: 0.35,
            height: 0.07
        },
        {
            x: 0.43,
            y: 0.63,
            width: 0.35,
            height: 0.07
        },
        {
            x: 0.65,
            y: 0.25,
            width: 0.07,
            height: 0.38
        }
    ],

    spikes: [
        {
            x: 0.30,
            y: 0.55,
            radius: 0.035
        },
        {
            x: 0.58,
            y: 0.50,
            radius: 0.035
        }
    ],

    cobwebs: [
        {
            x: 0.30,
            y: 0.75,
            radius: 0.035
        },
        {
            x: 0.72,
            y: 0.35,
            radius: 0.035
        }
    ],

    boosts: [
        {
            x: 0.50,
            y: 0.50,
            width: 0.07,
            height: 0.07,
            direction: -Math.PI / 4
        }
    ]
},


/* =========================================================
   LEVEL 34
   ========================================================= */

{
    maxBounces: 7,

    ball: {
        x: 0.12,
        y: 0.50
    },

    hole: {
        x: 0.88,
        y: 0.50
    },

    obstacles: [
        {
            x: 0.25,
            y: 0.15,
            width: 0.07,
            height: 0.30
        },
        {
            x: 0.42,
            y: 0.55,
            width: 0.07,
            height: 0.30
        },
        {
            x: 0.59,
            y: 0.15,
            width: 0.07,
            height: 0.30
        },
        {
            x: 0.76,
            y: 0.55,
            width: 0.07,
            height: 0.30
        }
    ],

    portals: [
        {
            x: 0.20,
            y: 0.75,
            radius: 0.055
        },
        {
            x: 0.80,
            y: 0.25,
            radius: 0.055
        }
    ],

    spikes: [
        {
            x: 0.34,
            y: 0.50,
            radius: 0.035
        },
        {
            x: 0.51,
            y: 0.50,
            radius: 0.035
        },
        {
            x: 0.68,
            y: 0.50,
            radius: 0.035
        }
    ],

    cobwebs: [
        {
            x: 0.34,
            y: 0.25,
            radius: 0.035
        },
        {
            x: 0.51,
            y: 0.75,
            radius: 0.035
        }
    ],

    boosts: [
        {
            x: 0.42,
            y: 0.30,
            width: 0.07,
            height: 0.07,
            direction: 0
        },
        {
            x: 0.67,
            y: 0.70,
            width: 0.07,
            height: 0.07,
            direction: Math.PI
        }
    ]
},


/* =========================================================
   LEVEL 35
   ========================================================= */

{
    maxBounces: 7,

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
            x: 0.25,
            y: 0.25,
            width: 0.50,
            height: 0.07
        },
        {
            x: 0.25,
            y: 0.68,
            width: 0.50,
            height: 0.07
        },
        {
            x: 0.46,
            y: 0.32,
            width: 0.07,
            height: 0.36
        }
    ],

    portals: [
        {
            x: 0.20,
            y: 0.80,
            radius: 0.055
        },
        {
            x: 0.80,
            y: 0.20,
            radius: 0.055
        }
    ],

    spikes: [
        {
            x: 0.35,
            y: 0.50,
            radius: 0.04
        },
        {
            x: 0.65,
            y: 0.50,
            radius: 0.04
        }
    ],

    cobwebs: [
        {
            x: 0.30,
            y: 0.35,
            radius: 0.035
        },
        {
            x: 0.70,
            y: 0.65,
            radius: 0.035
        }
    ],

    boosts: [
        {
            x: 0.60,
            y: 0.35,
            width: 0.07,
            height: 0.07,
            direction: Math.PI / 2
        }
    ]
},


/* =========================================================
   LEVEL 36
   ========================================================= */

{
    maxBounces: 7,

    ball: {
        x: 0.15,
        y: 0.85
    },

    hole: {
        x: 0.85,
        y: 0.15
    },

    obstacles: [
        {
            x: 0.20,
            y: 0.20,
            width: 0.07,
            height: 0.45
        },
        {
            x: 0.38,
            y: 0.55,
            width: 0.07,
            height: 0.25
        },
        {
            x: 0.56,
            y: 0.20,
            width: 0.07,
            height: 0.35
        },
        {
            x: 0.74,
            y: 0.45,
            width: 0.07,
            height: 0.35
        }
    ],

    spikes: [
        {
            x: 0.30,
            y: 0.72,
            radius: 0.035
        },
        {
            x: 0.48,
            y: 0.30,
            radius: 0.035
        },
        {
            x: 0.67,
            y: 0.65,
            radius: 0.035
        }
    ],

    cobwebs: [
        {
            x: 0.30,
            y: 0.35,
            radius: 0.035
        },
        {
            x: 0.66,
            y: 0.30,
            radius: 0.035
        }
    ],

    boosts: [
        {
            x: 0.47,
            y: 0.70,
            width: 0.07,
            height: 0.07,
            direction: 0
        },
        {
            x: 0.70,
            y: 0.25,
            width: 0.07,
            height: 0.07,
            direction: -Math.PI / 2
        }
    ]
},


/* =========================================================
   LEVEL 37
   ========================================================= */

{
    maxBounces: 8,

    ball: {
        x: 0.12,
        y: 0.50
    },

    hole: {
        x: 0.88,
        y: 0.50
    },

    obstacles: [
        {
            x: 0.20,
            y: 0.20,
            width: 0.07,
            height: 0.30
        },
        {
            x: 0.36,
            y: 0.50,
            width: 0.07,
            height: 0.30
        },
        {
            x: 0.52,
            y: 0.20,
            width: 0.07,
            height: 0.30
        },
        {
            x: 0.68,
            y: 0.50,
            width: 0.07,
            height: 0.30
        }
    ],

    portals: [
        {
            x: 0.15,
            y: 0.20,
            radius: 0.055
        },
        {
            x: 0.85,
            y: 0.80,
            radius: 0.055
        }
    ],

    spikes: [
        {
            x: 0.28,
            y: 0.55,
            radius: 0.04
        },
        {
            x: 0.44,
            y: 0.45,
            radius: 0.04
        },
        {
            x: 0.60,
            y: 0.55,
            radius: 0.04
        },
        {
            x: 0.76,
            y: 0.45,
            radius: 0.04
        }
    ],

    cobwebs: [
        {
            x: 0.29,
            y: 0.25,
            radius: 0.035
        },
        {
            x: 0.60,
            y: 0.75,
            radius: 0.035
        }
    ],

    boosts: [
        {
            x: 0.44,
            y: 0.25,
            width: 0.07,
            height: 0.07,
            direction: 0
        },
        {
            x: 0.70,
            y: 0.75,
            width: 0.07,
            height: 0.07,
            direction: Math.PI
        }
    ]
},


/* =========================================================
   LEVEL 38
   ========================================================= */

{
    maxBounces: 8,

    ball: {
        x: 0.15,
        y: 0.15
    },

    hole: {
        x: 0.85,
        y: 0.85
    },

    obstacles: [
        {
            x: 0.22,
            y: 0.25,
            width: 0.45,
            height: 0.07
        },
        {
            x: 0.33,
            y: 0.68,
            width: 0.45,
            height: 0.07
        },
        {
            x: 0.67,
            y: 0.32,
            width: 0.07,
            height: 0.36
        }
    ],

    portals: [
        {
            x: 0.20,
            y: 0.80,
            radius: 0.055
        },
        {
            x: 0.80,
            y: 0.20,
            radius: 0.055
        }
    ],

    spikes: [
        {
            x: 0.35,
            y: 0.45,
            radius: 0.04
        },
        {
            x: 0.55,
            y: 0.55,
            radius: 0.04
        },
        {
            x: 0.72,
            y: 0.45,
            radius: 0.04
        }
    ],

    cobwebs: [
        {
            x: 0.30,
            y: 0.55,
            radius: 0.035
        },
        {
            x: 0.58,
            y: 0.30,
            radius: 0.035
        }
    ],

    boosts: [
        {
            x: 0.45,
            y: 0.75,
            width: 0.07,
            height: 0.07,
            direction: Math.PI
        },
        {
            x: 0.52,
            y: 0.20,
            width: 0.07,
            height: 0.07,
            direction: 0
        }
    ]
},


/* =========================================================
   LEVEL 39
   ========================================================= */

{
    maxBounces: 9,

    ball: {
        x: 0.12,
        y: 0.85
    },

    hole: {
        x: 0.88,
        y: 0.15
    },

    obstacles: [
        {
            x: 0.20,
            y: 0.20,
            width: 0.07,
            height: 0.35
        },
        {
            x: 0.35,
            y: 0.45,
            width: 0.07,
            height: 0.35
        },
        {
            x: 0.50,
            y: 0.20,
            width: 0.07,
            height: 0.35
        },
        {
            x: 0.65,
            y: 0.45,
            width: 0.07,
            height: 0.35
        }
    ],

    portals: [
        {
            x: 0.18,
            y: 0.18,
            radius: 0.055
        },
        {
            x: 0.82,
            y: 0.82,
            radius: 0.055
        }
    ],

    spikes: [
        {
            x: 0.28,
            y: 0.65,
            radius: 0.035
        },
        {
            x: 0.43,
            y: 0.35,
            radius: 0.035
        },
        {
            x: 0.58,
            y: 0.65,
            radius: 0.035
        },
        {
            x: 0.73,
            y: 0.35,
            radius: 0.035
        }
    ],

    cobwebs: [
        {
            x: 0.28,
            y: 0.30,
            radius: 0.035
        },
        {
            x: 0.58,
            y: 0.30,
            radius: 0.035
        },
        {
            x: 0.73,
            y: 0.70,
            radius: 0.035
        }
    ],

    boosts: [
        {
            x: 0.42,
            y: 0.70,
            width: 0.07,
            height: 0.07,
            direction: Math.PI / 2
        },
        {
            x: 0.62,
            y: 0.25,
            width: 0.07,
            height: 0.07,
            direction: -Math.PI / 2
        }
    ]
},


/* =========================================================
   LEVEL 40
   FINAL CHALLENGE
   ========================================================= */

{
    maxBounces: 10,

    ball: {
        x: 0.12,
        y: 0.88
    },

    hole: {
        x: 0.88,
        y: 0.12
    },

    obstacles: [
        {
            x: 0.20,
            y: 0.20,
            width: 0.07,
            height: 0.35
        },
        {
            x: 0.36,
            y: 0.45,
            width: 0.07,
            height: 0.35
        },
        {
            x: 0.52,
            y: 0.20,
            width: 0.07,
            height: 0.35
        },
        {
            x: 0.68,
            y: 0.45,
            width: 0.07,
            height: 0.35
        }
    ],

    portals: [
        {
            x: 0.16,
            y: 0.20,
            radius: 0.055
        },
        {
            x: 0.84,
            y: 0.80,
            radius: 0.055
        }
    ],

    spikes: [
        {
            x: 0.28,
            y: 0.65,
            radius: 0.04
        },
        {
            x: 0.44,
            y: 0.35,
            radius: 0.04
        },
        {
            x: 0.60,
            y: 0.65,
            radius: 0.04
        },
        {
            x: 0.76,
            y: 0.35,
            radius: 0.04
        }
    ],

    cobwebs: [
        {
            x: 0.28,
            y: 0.30,
            radius: 0.035
        },
        {
            x: 0.44,
            y: 0.70,
            radius: 0.035
        },
        {
            x: 0.60,
            y: 0.30,
            radius: 0.035
        },
        {
            x: 0.76,
            y: 0.70,
            radius: 0.035
        }
    ],

    boosts: [
        {
            x: 0.36,
            y: 0.25,
            width: 0.07,
            height: 0.07,
            direction: 0
        },
        {
            x: 0.52,
            y: 0.75,
            width: 0.07,
            height: 0.07,
            direction: Math.PI
        },
        {
            x: 0.68,
            y: 0.25,
            width: 0.07,
            height: 0.07,
            direction: 0
        }
    ]
},

];


/* =========================================================
   GAME SETTINGS
   ========================================================= */

let impactEffects = [];
let powerEffects = [];

const POWER_EFFECT_DURATION = 400;

const IMPACT_DURATION = 180;

function createPowerEffect(x, y, type) {

    powerEffects.push({
        x: x,
        y: y,
        type: type,
        startTime: performance.now()
    });
}



function drawPowerEffects() {

    const now = performance.now();

    for (let i = powerEffects.length - 1; i >= 0; i--) {

        const effect = powerEffects[i];

        const progress = Math.min(
            (now - effect.startTime) / POWER_EFFECT_DURATION,
            1
        );

        const alpha = 1 - progress;

        const radius =
            BALL_RADIUS +
            progress * 25;

        ctx.save();

        ctx.globalAlpha = alpha;

        ctx.beginPath();

        ctx.arc(
            effect.x,
            effect.y,
            radius,
            0,
            Math.PI * 2
        );

        ctx.strokeStyle =
            effect.type === "web"
                ? "#888"
                : "#e0b800";

        ctx.lineWidth = 3;

        ctx.stroke();

        ctx.restore();

        if (progress >= 1) {
            powerEffects.splice(i, 1);
        }
    }

}
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
const WALL_THICKNESS = 6;

const BALL_SPEED = 0.52;

let currentLevel = 0;
document.addEventListener("keydown", (event) => {
    if (event.key === "l") {
        const level = prompt("Enter level number:");

        const levelNumber = parseInt(level);

        if (
            !isNaN(levelNumber) &&
            levelNumber >= 1 &&
            levelNumber <= levels.length
        ) {
            loadLevel(levelNumber - 1);
        }
    }
});



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
let spikes = [];
let portals = [];
let cobwebs = [];
let boosts = [];

let portalCooldown = 0;
let webbed = false;
let webSlowStart = 0;

const WEB_DURATION = 1000; // 1 second to completely stop

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
    portalCooldown = 0;
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

    obstacles = level.obstacles.map(obstacle => {

    const width = obstacle.width * canvasSize;
    const height = obstacle.height * canvasSize;

    /*
       Make every obstacle the same thickness
       as the outer border.
    */

    if (width < height) {

        return {
            x: obstacle.x * canvasSize,
            y: obstacle.y * canvasSize,
            width: WALL_THICKNESS,
            height: height
        };

    } else {

        return {
            x: obstacle.x * canvasSize,
            y: obstacle.y * canvasSize,
            width: width,
            height: WALL_THICKNESS
        };
    }
});

spikes = (level.spikes || []).map(spike => ({
    x: spike.x * canvasSize,
    y: spike.y * canvasSize,
    radius: spike.radius * canvasSize
}));

portals = (level.portals || []).map(portal => ({
    x: portal.x * canvasSize,
    y: portal.y * canvasSize,
    radius: portal.radius * canvasSize
}));

cobwebs = (level.cobwebs || []).map(web => ({
    x: web.x * canvasSize,
    y: web.y * canvasSize,
    radius: web.radius * canvasSize
}));

boosts = (level.boosts || []).map(boost => ({
    x: boost.x * canvasSize,
    y: boost.y * canvasSize,
    width: boost.width * canvasSize,
    height: boost.height * canvasSize,
    direction: boost.direction
}));
webbed = false;
webSlowStart = 0;


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

    /*
       Keep tracking the pointer even when it leaves
       the canvas. clientX/clientY are still available
       outside the canvas.
    */

    const rect = canvas.getBoundingClientRect();

    let clientX;
    let clientY;

    if (event.touches && event.touches.length > 0) {
        clientX = event.touches[0].clientX;
        clientY = event.touches[0].clientY;
    } else {
        clientX = event.clientX;
        clientY = event.clientY;
    }

    aimCurrent.x = clientX - rect.left;
    aimCurrent.y = clientY - rect.top;

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

    /*
       Get the final pointer position even if it is
       outside the canvas.
    */

    const rect = canvas.getBoundingClientRect();

    let clientX;
    let clientY;

    if (event.changedTouches && event.changedTouches.length > 0) {
        clientX = event.changedTouches[0].clientX;
        clientY = event.changedTouches[0].clientY;
    } else {
        clientX = event.clientX;
        clientY = event.clientY;
    }

    aimCurrent.x = clientX - rect.left;
    aimCurrent.y = clientY - rect.top;

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

/*
   Listen on the whole window while aiming so the
   mouse can leave the canvas.
*/

window.addEventListener("mousemove", pointerMove);
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

    console.log("HOLE DETECTED");

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

       console.log("HOLE ANIMATION RUNNING");

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

    webbed = false;
    webSlowStart = 0;

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


function registerBounce() {

    bounceCount++;

    updateBounceText();

    if (bounceCount > levels[currentLevel].maxBounces) {
        startDeathAnimation();
    }
}


/* =========================================================
   CIRCLE / RECTANGLE COLLISION
   ========================================================= */

function circleRectangleCollision(cx, cy, radius, rect) {

    /*
       Find the closest point on the rectangle
       to the centre of the ball.
    */

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

    if (distanceSquared > radius * radius) {
        return null;
    }

    /*
       The ball is touching the wall.

       Work out which side is closest based on the
       ball's previous position and its velocity.
    */

    const left = rect.x;
    const right = rect.x + rect.width;
    const top = rect.y;
    const bottom = rect.y + rect.height;

    /*
       Calculate penetration into each side.
    */

    const penetrationLeft =
        Math.abs((cx + radius) - left);

    const penetrationRight =
        Math.abs(right - (cx - radius));

    const penetrationTop =
        Math.abs((cy + radius) - top);

    const penetrationBottom =
        Math.abs(bottom - (cy - radius));

    const minHorizontal =
        Math.min(penetrationLeft, penetrationRight);

    const minVertical =
        Math.min(penetrationTop, penetrationBottom);

    /*
       If horizontal penetration is smaller,
       treat it as a vertical wall.

       Otherwise treat it as a horizontal wall.
    */

    if (minHorizontal < minVertical) {

        if (cx < rect.x + rect.width / 2) {

            return {
                x: rect.x - radius,
                y: cy,
                axis: "x"
            };

        } else {

            return {
                x: rect.x + rect.width + radius,
                y: cy,
                axis: "x"
            };
        }

    } else {

        if (cy < rect.y + rect.height / 2) {

            return {
                x: cx,
                y: rect.y - radius,
                axis: "y"
            };

        } else {

            return {
                x: cx,
                y: rect.y + rect.height + radius,
                axis: "y"
            };
        }
    }
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

    /*
       Move the ball completely outside the wall
       before changing its direction.
    */

    newX = collision.x;
    newY = collision.y;

    if (collision.axis === "x") {

        ball.vx *= -1;

        createImpactEffect(
            newX,
            newY,
            "x"
        );

    } else {

        ball.vy *= -1;

        createImpactEffect(
            newX,
            newY,
            "y"
        );
    }

    registerBounce();

    if (!moving) {
        return;
    }
}


    ball.x = newX;
    ball.y = newY;

    /*
   SPIKE CHECK
*/

if (checkSpikeCollision()) {
    return;
}
checkCobwebCollision();
checkBoostCollision();

/*
   Cobweb slows the ball down gradually.
*/

if (webbed) {

    const elapsed = performance.now() - webSlowStart;

    const progress = Math.min(
        elapsed / WEB_DURATION,
        1
    );

    /*
       Gradually reduce the ball's speed
       until it reaches zero.
    */

    const currentSpeed = Math.hypot(
        ball.vx,
        ball.vy
    );

    const originalSpeed = BALL_SPEED;

    const newSpeed =
        originalSpeed * (1 - progress);

    if (currentSpeed > 0) {

        const scale = newSpeed / currentSpeed;

        ball.vx *= scale;
        ball.vy *= scale;

    }

    /*
       After one second, the ball dies.
    */

    if (progress >= 1) {

        ball.vx = 0;
        ball.vy = 0;

        startDeathAnimation();

        return;
    }
}

/*
   PORTAL CHECK
*/

checkPortalCollision();




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
   PORTAL COLLISION
   ========================================================= */

function checkPortalCollision() {

    if (portalCooldown > 0) {
        portalCooldown--;
        return false;
    }

    if (portals.length < 2) {
        return false;
    }

    for (let i = 0; i < portals.length; i++) {

        const portal = portals[i];

        const distance = Math.hypot(
            ball.x - portal.x,
            ball.y - portal.y
        );

        if (distance <= BALL_RADIUS + portal.radius) {

            const pairIndex =
                i % 2 === 0
                    ? i + 1
                    : i - 1;

            const destination = portals[pairIndex];

            if (!destination) {
                return false;
            }

            ball.x = destination.x;
            ball.y = destination.y;

            /*
               Keep velocity exactly the same.
            */

            portalCooldown = 8;

            return true;
        }
    }

    return false;
}

/* =========================================================
   SPIKE COLLISION
   ========================================================= */

function checkSpikeCollision() {

    for (const spike of spikes) {

        const distance = Math.hypot(
            ball.x - spike.x,
            ball.y - spike.y
        );

        /*
           Ball touches spike
        */

        if (distance <= BALL_RADIUS + spike.radius) {

            startDeathAnimation();
            return true;
        }
    }

    return false;
}

/* =========================================================
   COBWEB COLLISION
   ========================================================= */

function checkCobwebCollision() {

    if (webbed) {
        return true;
    }

    for (const web of cobwebs) {

        const distance = Math.hypot(
            ball.x - web.x,
            ball.y - web.y
        );

        if (distance <= BALL_RADIUS + web.radius) {

            webbed = true;
webSlowStart = performance.now();

createPowerEffect(
    ball.x,
    ball.y,
    "web"
);

return true;
        }
    }

    return false;
}

function checkBoostCollision() {

    for (const boost of boosts) {

        // Don't trigger this boost again
        if (boost.used) {
            continue;
        }

        const closestX = Math.max(
            boost.x,
            Math.min(ball.x, boost.x + boost.width)
        );

        const closestY = Math.max(
            boost.y,
            Math.min(ball.y, boost.y + boost.height)
        );

        const distance = Math.hypot(
            ball.x - closestX,
            ball.y - closestY
        );

        if (distance <= BALL_RADIUS) {

            const speed = BALL_SPEED;

            // Mark this boost as used
            boost.used = true;

            // ONE yellow ring
            createPowerEffect(
                ball.x,
                ball.y,
                "boost"
            );

            if (boost.direction === "up") {
                ball.vx = 0;
                ball.vy = -speed;
            }
            else if (boost.direction === "down") {
                ball.vx = 0;
                ball.vy = speed;
            }
            else if (boost.direction === "left") {
                ball.vx = -speed;
                ball.vy = 0;
            }
            else if (boost.direction === "right") {
                ball.vx = speed;
                ball.vy = 0;
            }

            webbed = false;
            webSlowStart = 0;

            return true;
        }
    }

    return false;
}

/* =========================================================
   WIN / LOSE
   ========================================================= */

function winLevel() {

    moving = false;
    aiming = false;
    holeAnimation = false;

    playWinSound();

    winOverlay.classList.remove("hidden");
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
   SPIKES
*/

for (const spike of spikes) {
    drawSpike(spike);
}

/*
   PORTALS
*/

for (const portal of portals) {
    drawPortal(portal);
}


/*
   COBWEBS
*/

for (const web of cobwebs) {
    drawCobweb(web);
}


/*
   BOOSTS
*/

for (const boost of boosts) {
    drawBoost(boost);
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
   WEB / BOOST EFFECTS
*/

drawPowerEffects();







    /*
       BALL
    */

    drawBall(ballRadius);
}

function drawSpike(spike) {

    ctx.save();

    ctx.translate(
        spike.x,
        spike.y
    );

    const points = 12;

    ctx.beginPath();

    for (let i = 0; i < points * 2; i++) {

        const angle =
            (Math.PI * 2 * i) /
            (points * 2);

        const radius =
            i % 2 === 0
                ? spike.radius * 1.35
                : spike.radius * 0.75;

        const x =
            Math.cos(angle) * radius;

        const y =
            Math.sin(angle) * radius;

        if (i === 0) {
            ctx.moveTo(x, y);
        } else {
            ctx.lineTo(x, y);
        }
    }

    ctx.closePath();

    ctx.fillStyle = "#222";

    ctx.fill();


    /*
       Small centre circle
    */

    ctx.beginPath();

    ctx.arc(
        0,
        0,
        spike.radius * 0.55,
        0,
        Math.PI * 2
    );

    ctx.fillStyle = "#080808";

    ctx.fill();

    ctx.restore();
}

function drawPortal(portal) {

    ctx.save();

    /*
       Outer light ring
    */

    ctx.beginPath();

    ctx.arc(
        portal.x,
        portal.y,
        portal.radius + 4,
        0,
        Math.PI * 2
    );

    ctx.strokeStyle = "#d0d0d0";
    ctx.lineWidth = 2;
    ctx.stroke();


    /*
       Black hole
    */

    ctx.beginPath();

    ctx.arc(
        portal.x,
        portal.y,
        portal.radius,
        0,
        Math.PI * 2
    );

    ctx.fillStyle = "#111";
    ctx.fill();


    /*
       White spiral
    */

    ctx.beginPath();

    const turns = 2.5;
    const points = 80;

    for (let i = 0; i <= points; i++) {

        const progress = i / points;

        const angle =
            progress * Math.PI * 2 * turns;

        const radius =
            portal.radius *
            0.85 *
            (1 - progress);

        const x =
            portal.x +
            Math.cos(angle) * radius;

        const y =
            portal.y +
            Math.sin(angle) * radius;

        if (i === 0) {
            ctx.moveTo(x, y);
        } else {
            ctx.lineTo(x, y);
        }
    }

    ctx.strokeStyle = "#fff";
    ctx.lineWidth = 2.5;
    ctx.lineCap = "round";

    ctx.stroke();

    ctx.restore();
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
   DRAW COBWEB
   ========================================================= */

function drawCobweb(web) {

    ctx.save();

    ctx.strokeStyle = "#222";
    ctx.lineWidth = 1.5;

    const r = web.radius;

    /*
       Main radial lines
    */

    for (let i = 0; i < 8; i++) {

        const angle =
            (Math.PI * 2 * i) / 8;

        ctx.beginPath();

        ctx.moveTo(
            web.x,
            web.y
        );

        ctx.lineTo(
            web.x + Math.cos(angle) * r,
            web.y + Math.sin(angle) * r
        );

        ctx.stroke();
    }


    /*
       Curved web rings
    */

    for (let ring = 1; ring <= 4; ring++) {

        const radius = r * ring / 4;

        ctx.beginPath();

        for (let i = 0; i <= 32; i++) {

            const angle =
                (Math.PI * 2 * i) / 32;

            const x =
                web.x +
                Math.cos(angle) * radius;

            const y =
                web.y +
                Math.sin(angle) * radius;

            if (i === 0) {
                ctx.moveTo(x, y);
            } else {
                ctx.lineTo(x, y);
            }
        }

        ctx.stroke();
    }

    ctx.restore();
}


/* =========================================================
   DRAW BOOST
   ========================================================= */

function drawBoost(boost) {

    ctx.save();

    ctx.translate(boost.x, boost.y);

    /*
       Rotate arrow according to direction
    */

    let angle = 0;

    if (boost.direction === "up") {
        angle = -Math.PI / 2;
    } 
    else if (boost.direction === "down") {
        angle = Math.PI / 2;
    } 
    else if (boost.direction === "left") {
        angle = Math.PI;
    } 
    else {
        angle = 0;
    }

    ctx.rotate(angle);

    /*
       Simple black arrow
    */

    const length = Math.min(boost.width, boost.height) * 1.5;
    const width = Math.min(boost.width, boost.height) * 0.6;

    ctx.fillStyle = "#222";

    ctx.beginPath();

    ctx.moveTo(
        -length * 0.5,
        -width * 0.5
    );

    ctx.lineTo(
        length * 0.05,
        -width * 0.5
    );

    ctx.lineTo(
        length * 0.05,
        -width
    );

    ctx.lineTo(
        length * 0.5,
        0
    );

    ctx.lineTo(
        length * 0.05,
        width
    );

    ctx.lineTo(
        length * 0.05,
        width * 0.5
    );

    ctx.lineTo(
        -length * 0.5,
        width * 0.5
    );

    ctx.closePath();

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