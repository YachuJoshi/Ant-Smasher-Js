let count = 0;

class Ball {
    constructor(props) {
        this.coordinates = props.coordinates;
        this.ballNo = this.constructor.increaseCount();
        this.size = props.size || 24;
        this.limitX = props.limitX;
        this.limitY = props.limitY;
        this.initElement();
    }

    initElement() {
        let ballElement = document.createElement('div');
        ballElement.className = 'ball';
        ballElement.id = this.ballNo;
        this.element = ballElement;
    }

    update() {
        this.coordinates.x += this.coordinates.dx;
        this.coordinates.y += this.coordinates.dy;
        
        if(this.coordinates.x <= 0) {
            this.coordinates.x = 1;
            this.coordinates.dx = 1;
        }

        if(this.coordinates.x >= this.limitX - this.size) {
            this.coordinates.x = this.limitX - this.size;
            this.coordinates.dx = -1;
        }

        if(this.coordinates.y <= 0) {
            this.coordinates.y = 1;
            this.coordinates.dy = 1;
        }

        if(this.coordinates.y >= this.limitY - this.size) {
            this.coordinates.y = this.limitY - this.size;
            this.coordinates.dy = -1;
        }
    }

    static increaseCount() {
        return count++;
    }

    render() {
        this.element.style.left = this.coordinates.x + 'px';
        this.element.style.top = this.coordinates.y + 'px';
    }
}

class Board {
    constructor(props) {
        this.parentElement = props.parentElement;
        this.balls = props.balls.map(ball => new Ball(
            Object.assign(ball, {
                limitX: boardCoordinates.screenSizeX,
                limitY: boardCoordinates.screenSizeY
                })
            )
        );
        this.ballArray = this.balls;
    }

    appendBalls() {
        this.balls.forEach(ball => {
            this.parentElement.appendChild(ball.element);
        });
    }

    updateBalls() {
        this.balls.forEach(ball => {
            ball.update();
        });
    }

    renderBalls() {
        this.balls.forEach(ball => {
            ball.render();
        });
    }

    checkCollision() {
        //TODO
        // for(let i=0; i<this.ballArray.length; i++) {
        //     let ball1 = this.ballArray[i];
        //     for(let j=i+1; j<this.ballArray.length; j++) {
        //         let ball2 = this.ballArray[j]
        //         if(ball1.coordinates.x + 24 > ball2.coordinates.x && 
        //             ball2.coordinates.x < ball2.coordinates.x + 24 && 
        //             ball1.coordinates.y + 24 > ball2.coordinates.y && 
        //             ball1.coordinates.y < ball2.coordinates.y + 24) {
        //                 ball1.coordinates.dx = this.generateRandomNumber();
        //                 ball1.coordinates.dy = this.generateRandomNumber();
        //                 ball2.coordinates.dx = this.generateRandomNumber();
        //                 ball2.coordinates.dy = this.generateRandomNumber();
        //         }
        //     }
        // }
    }

    deleteBallEventListner() {
        this.ballArray.forEach(ball => {
            ball.element.addEventListener('click', () => {
                let id = event.target.id;
                console.log(`You smashed ball no: ${id}`);
                this.deleteBall(parseInt(id));
                this.parentElement.removeChild(ball.element);
            });
        });
    }

    deleteBall(id) {
        let idArray , index;
        idArray = this.balls.map(ball => ball.ballNo);
        index = idArray.indexOf(id);
        if(index !== -1) {
            this.balls.splice(index, 1);
        }
    }

    // test() {
    //     console.log(this.balls);
    // }

    init() {
        this.appendBalls();
        this.deleteBallEventListner();
        // console.log(this.balls);
        setInterval(() => {
            this.updateBalls();
            this.renderBalls();
        }, 50);
    }
}

const boardCoordinates = {
    screenSizeX: 500,
    screenSizeY: 735
}

const game = new Board({
    parentElement: document.querySelector('.board'),
    balls: [
        {
            coordinates: {x: 200, y: 250, dx: 1, dy: 1} ,
        } ,
        {
            coordinates: {x: 300, y: 450, dx: 1, dy: -1}
        } ,
        {
            coordinates: {x: 152, y: 624, dx: -1, dy: 1}
        } , 
        {
            coordinates: {x: 18, y: 502, dx: 1, dy: -1}
        } , 
        {
            coordinates: {x: 424, y: 318, dx: 1, dy: 1}
        },
        {
            coordinates: {x: 120, y: 550, dx: -1, dy: 1} ,
        } ,
        {
            coordinates: {x: 388, y: 10, dx: 1, dy: -1}
        } ,
        {
            coordinates: {x: 298, y: 124, dx: -1, dy: 1}
        } , 
        {
            coordinates: {x: 385, y: 332 , dx: 1, dy: -1}
        } , 
        {
            coordinates: {x: 44, y: 38, dx: 1, dy: -1}
        }
    ]
});

game.init();
