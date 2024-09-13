document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('floorplan-canvas');
    const ctx = canvas.getContext('2d');

    
    canvas.width = 600;
    canvas.height = 600;

    let scale = 1;  
    let panX = 0;   
    let panY = 0;

    
    const data = {
        "Regions": [
            [
                { "X": 100, "Y": 100, "Z": 52 },
                { "X": 500, "Y": 100, "Z": 52 }
            ],
            [
                { "X": 500, "Y": 100, "Z": 52 },
                { "X": 500, "Y": 500, "Z": 52 }
            ],
            [
                { "X": 500, "Y": 500, "Z": 52 },
                { "X": 100, "Y": 500, "Z": 52 }
            ],
            [
                { "X": 100, "Y": 500, "Z": 52 },
                { "X": 100, "Y": 100, "Z": 52 }
            ]
        ],
        "Doors": [
            {
                "Location": { "X": 300, "Y": 100, "Z": 52 },
                "Rotation": 0,
                "Width": 40
            }
        ],
        "Furnitures": [
            {
                "xPlacement": 200,
                "yPlacement": 200,
                "width": 50,
                "height": 50,
                "equipName": "Table"
            },
            {
                "xPlacement": 400,
                "yPlacement": 400,
                "width": 60,
                "height": 30,
                "equipName": "Chair"
            }
        ]
    };

   
    function drawRegions() {
        ctx.strokeStyle = 'black';
        ctx.lineWidth = 2;
        data.Regions.forEach(region => {
            ctx.beginPath();
            ctx.moveTo(region[0].X, region[0].Y);
            ctx.lineTo(region[1].X, region[1].Y);
            ctx.stroke();
        });
    }

    
    function drawDoors() {
        ctx.fillStyle = 'brown';
        data.Doors.forEach(door => {
            ctx.fillRect(door.Location.X - door.Width / 2, door.Location.Y - 5, door.Width, 10);
        });
    }

    
    function drawFurnitures() {
        ctx.fillStyle = 'blue';
        data.Furnitures.forEach(furniture => {
            ctx.fillRect(furniture.xPlacement, furniture.yPlacement, furniture.width, furniture.height);
            ctx.fillStyle = 'white';
            ctx.font = '12px Arial';
            ctx.fillText(furniture.equipName, furniture.xPlacement + 5, furniture.yPlacement + 25);
            ctx.fillStyle = 'blue';
        });
    }


    function render() {
        ctx.clearRect(0, 0, canvas.width, canvas.height); 
        ctx.save();
        ctx.translate(panX, panY);
        ctx.scale(scale, scale);
        drawRegions();
        drawDoors();
        drawFurnitures();
        ctx.restore();
    }

    
    document.getElementById('zoom-in').addEventListener('click', () => {
        scale += 0.1;
        render();
    });

    document.getElementById('zoom-out').addEventListener('click', () => {
        scale = Math.max(0.5, scale - 0.1);  
        render();
    });

   
    let isDragging = false;
    let startX, startY;

    function handleMouseDown(e) {
        isDragging = true;
        startX = e.clientX - panX;
        startY = e.clientY - panY;
    }

    function handleMouseMove(e) {
        if (!isDragging) return;
        panX = e.clientX - startX;
        panY = e.clientY - startY;
        render();
    }

    function handleMouseUp() {
        isDragging = false;
    }

    
    canvas.addEventListener('mousedown', handleMouseDown);
    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseup', handleMouseUp);
    canvas.addEventListener('mouseout', handleMouseUp);

    render();
});
