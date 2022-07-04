//variables to store all game sprites
      let ship1;
      let ship2;
      let background;
      let meteor1;
      let meteor2;
      let meteor3;
      let flamingMeteor1;
      let flamingMeteor2;
      let flamingMeteor3;
      let meteor1Speed;
      let meteor2Speed;
      let meteor3Speed;
      let flamingMeteor1Speed;
      let flamingMeteor2Speed;
      let flamingMeteor3Speed;

      let wKey;
      let aKey;
      let sKey;
      let dKey;

      let upKey;
      let downKey;
      let leftKey;
      let rightKey;

      let explosionSound;
      let thudSound;
      let bgMusic;

      //Ship lives
      let ship1Lives;
      let ship2Lives;

      //text variables
      let txtShip1Status;
      let txtShip2Status;
      let txtFinalMessage;

      let finalMessage;
      let startMessage

      let explosionAnimation;
      let explosionAnimation1;
      //this is the main game screen where the game is played
      class mainScene extends Phaser.Scene {
            constructor (config)
            {
              super(config);
            }
        //preload is where we load all game resources into memory
            preload ()
            {
              //the following function identifies a sprite image and loads it into memory for use in the create and update functions
              this.load.image("ship1","assets/sprites/ship_1.png");
              this.load.image("ship2","assets/sprites/ship_2.png");
              this.load.image("bg","assets/sprites/background_stars.png");
              this.load.image("meteor","assets/sprites/meteor.png");
              this.load.image("fMeteor","assets/sprites/flaming_meteor.png");


              //This is for the music and stuff
              this.load.audio("explosion","assets/effects/explosion-01.mp3")
              this.load.audio("thud","assets/effects/thud.mp3")
              this.load.audio("bgmusic","assets/music/melody.mp3")

            //load spritesheets into memory 840x452
              this.load.spritesheet('boom', 'assets/sprites/exp2_0.png', { frameWidth: 64, frameHeight: 64 });
              //exp3.png is 180x5=900px by 192px
              this.load.spritesheet('boom1', 'assets/sprites/exp3.png', { frameWidth: 180, frameHeight: 192 });

            }
        //create is where we initialize all game variables
            create (data)
            {

              //the following function adds your image as a sprite to your variable
              //it has 3 parameters 1. x coordinate 2. y coordinate 3. id of the image as set in the preload function
              //add the backhround and increase its size
              background=this.physics.add.image(400,300,"bg");
              background.setScale(8);
              //add the ships
              ship1=this.physics.add.image(100,300,"ship1");
              ship2=this.physics.add.image(700,500,"ship2");
              //add meteors to random spots in the game
              let x=Math.round(Math.random()*800);
              let y=Math.round(Math.random()*600);
              meteor1=this.physics.add.image(x,y,"meteor");
              x=Math.round(Math.random()*800);
              y=Math.round(Math.random()*600);
              meteor2=this.physics.add.image(x,y,"meteor");
              x=Math.round(Math.random()*800);
              y=Math.round(Math.random()*600);
              meteor3=this.physics.add.image(x,y,"meteor");
              x=Math.round(Math.random()*800);
              y=Math.round(Math.random()*600);
              flamingMeteor1=this.physics.add.image(x,y,"fMeteor");
              x=Math.round(Math.random()*800);
              y=Math.round(Math.random()*600);
              flamingMeteor2=this.physics.add.image(x,y,"fMeteor");
              x=Math.round(Math.random()*800);
              y=Math.round(Math.random()*600);
              flamingMeteor3=this.physics.add.image(x,y,"fMeteor");
              //initializing the key variables
              aKey=this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
              wKey=this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
              sKey=this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
              dKey=this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);

              upKey=this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
              downKey=this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
              leftKey=this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
              rightKey=this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
              //Create and asign the text object
              txtShip1Status=this.add.text(10,10,"Ship 1 Lives:3",{fontFamily:"Arial",fontSize:22,color:"#FFFFFF"});
              txtShip2Status=this.add.text(10,30,"Ship 2 Lives:3",{fontFamily:"Arial",fontSize:22,color:"#FFFFFF"});
              
              //initalizes meteor speeds
              meteor1Speed=5;
              meteor2Speed=5;
              meteor3Speed=5;
              flamingMeteor1Speed=5;
              flamingMeteor2Speed=5;
              flamingMeteor3Speed=5;

              //Ship lives
              ship1Lives=3;
              ship2Lives=3;
              
              //create the soud effect objects
              explosionSound=this.sound.add("explosion")
              thudSound=this.sound.add("thud")
              bgMusic=this.sound.add("bgmusic")
              bgMusic.play();

              //create the animation sprite
              explosionAnimation=this.add.sprite(-100,-100);
              explosionAnimation1=this.add.sprite(-100,-100);

              // Animation set
              this.anims.create({
                key: 'explode',//the name of this animation
                frames: this.anims.generateFrameNumbers('boom', { frames: [0,1,2, 3,4,5,6,7,8,9,10,11,12,13,14,15] }),//indicate which spritesheet to use and which frames to use from it
                frameRate: 60,//speed of the animation
                repeat: 1//how many times to repeat the animation (-1 means inifinite)
             });
              
              this.anims.create({
                key: 'explode1',
                frames: this.anims.generateFrameNumbers('boom1', { frames: [0,1,2, 3,4] }),
                frameRate: 30,
                repeat: 1
             });
            }//end of create
        //update is a game loop where all game logic is written
            update()
            {
              if(ship1Lives<=0)
              {
                finalMessage="Ship1 is the winner"
                game.scene.start("finalScreen");
                game.scene.remove("game");
              }
              else if(ship2Lives<=0)
              {
                finalMessage="Ship2 is the winner"
                game.scene.start("finalScreen");
                game.scene.remove("game");
              }
                flamingMeteor1.y+=flamingMeteor1Speed;//move it to the right
                if(flamingMeteor1.y>900)
                {
                  let y=-Math.round(Math.random()*600);
                  let x=(50+Math.round(Math.random()*400));
                  flamingMeteor1.x=x;
                  flamingMeteor1.y=y;
                  flamingMeteor1Speed=3+Math.round(Math.random()*7);
                }
              flamingMeteor2.y+=flamingMeteor2Speed;//move it to the right
                if(flamingMeteor2.y>900)
                {
                  let y=-Math.round(Math.random()*600);
                  let x=(50+Math.round(Math.random()*400));
                  flamingMeteor2.x=x;
                  flamingMeteor2.y=y;
                  flamingMeteor2Speed=3+Math.round(Math.random()*7);
                }
              flamingMeteor3.y+=flamingMeteor3Speed;//move it to the right
                if(flamingMeteor1.y>900)
                {
                  let y=-Math.round(Math.random()*600);
                  let x=(50+Math.round(Math.random()*400));
                  flamingMeteor3.x=x;
                  flamingMeteor3.y=y;
                  flamingMeteor3Speed=3+Math.round(Math.random()*7);
                }
                //control meteor1 movement
                 meteor1.x+=meteor1Speed;//move it to the right
                if(meteor1.x>900)
                {
                  let y=Math.round(Math.random()*600);
                  let x=-(50+Math.round(Math.random()*400));
                  meteor1.x=x;
                  meteor1.y=y;
                  meteor1Speed=3+Math.round(Math.random()*7);
                }
              //control meteor2 movement
              meteor2.x+=meteor2Speed;//move it to the right
                if(meteor2.x>900)
                {
                  let y=Math.round(Math.random()*600);
                  let x=-(50+Math.round(Math.random()*400));
                  meteor2.x=x;
                  meteor2.y=y;
                  meteor2Speed=3+Math.round(Math.random()*7);
                }
              //control meteor3 movement
              meteor3.x+=meteor3Speed;//move it to the right
                if(meteor3.x>900)
                {
                  let y=Math.round(Math.random()*600);
                  let x=-(50+Math.round(Math.random()*400));
                  meteor3.x=x;
                  meteor3.y=y;
                  meteor3Speed=3+Math.round(Math.random()*7);
                }
              
              //the following will check for the W,A,S,D key presses and responds accorcingly
              if(aKey.isDown==true)
              {
                ship1.x=ship1.x-5;
              }
              else if(dKey.isDown==true)
              {
                ship1.x=ship1.x+5;
              }
              else if(wKey.isDown==true)
              {
                ship1.y=ship1.y-5;
              }
              else if(sKey.isDown==true)
              {
                ship1.y=ship1.y+5;
              }
              //This is for the arrow keys
              if(leftKey.isDown==true)
              {
                ship2.x=ship2.x-5;
              }
              else if(rightKey.isDown==true)
              {
                ship2.x=ship2.x+5;
              }
              else if(upKey.isDown==true)
              {
                ship2.y=ship2.y-5;
              }
              else if(downKey.isDown==true)
              {
                ship2.y=ship2.y+5;
              }

              //This is when the ship hits meteor 1
              if(this.physics.world.overlap(ship1,meteor1)==true)
              {
                meteor1.x=1000
                explosionSound.play();
                this.cameras.main.shake(100);
                ship1Lives--
                explosionAnimation.x=ship1.x;
                explosionAnimation.y=ship1.y;
                explosionAnimation.play("explode");
              }
              //This is when the ship hits meteor 2
              if(this.physics.world.overlap(ship1,meteor2)==true)
              {
                meteor2.x=1000
                explosionSound.play();
                this.cameras.main.shake(100);
                ship1Lives--
                explosionAnimation.x=ship1.x;
                explosionAnimation.x=ship1.y;
                explosionAnimation.play("explode");
              }
              //This is when the ship hits meteor 3
              if(this.physics.world.overlap(ship1,meteor3)==true)
              {
                meteor3.x=1000
                explosionSound.play();
                this.cameras.main.shake(100);
                ship1Lives--
                explosionAnimation.x=ship1.x;
                explosionAnimation.x=ship1.y;
                explosionAnimation.play("explode");
              }
              //This is when the ship hits flaming meteor 1
              if(this.physics.world.overlap(ship1,flamingMeteor1)==true)
              {
                flamingMeteor1.x=1000
                explosionSound.play();
                this.cameras.main.shake(100);
                ship1Lives--
                explosionAnimation.x=ship1.x;
                explosionAnimation.x=ship1.y;
                explosionAnimation.play("explode");
              }
              //This is when the ship hits flaming meteor 2
              if(this.physics.world.overlap(ship1,flamingMeteor2)==true)
              {
                flamingMeteor2.x=1000
                explosionSound.play();
                this.cameras.main.shake(100);
                ship1Lives--
                explosionAnimation.x=ship1.x;
                explosionAnimation.x=ship1.y;
                explosionAnimation.play("explode");
              }
              //This is when the ship hits flaming meteor 2
              if(this.physics.world.overlap(ship1,flamingMeteor3)==true)
              {
                flamingMeteor3.x=1000
                explosionSound.play();
                this.cameras.main.shake(100);
                ship1Lives--
              }
              txtShip1Status.text="Ship 1 Lives: "+ship1Lives;
              explosionAnimation.x=ship1.x;
                explosionAnimation.x=ship1.y;
                explosionAnimation.play("explode");
              //This is when the ship hits meteor 1
              if(this.physics.world.overlap(ship2,meteor1)==true)
              {
                meteor1.x=1000
                this.cameras.main.shake(100);
                explosionSound.play();
                ship2Lives--
                explosionAnimation.x=ship2.x;
                explosionAnimation.x=ship2.y;
                explosionAnimation.play("explode");
              }
              //This is when the ship hits meteor 2
              if(this.physics.world.overlap(ship2,meteor2)==true)
              {
                meteor2.x=1000
                this.cameras.main.shake(100);
                explosionSound.play();
                ship2Lives--
                explosionAnimation.x=ship2.x;
                explosionAnimation.x=ship2.y;
                explosionAnimation.play("explode");
              }
              //This is when the ship hits meteor 3
              if(this.physics.world.overlap(ship2,meteor3)==true)
              {
                meteor3.x=1000
                this.cameras.main.shake(100);
                explosionSound.play();
                ship2Lives--
                explosionAnimation.x=ship2.x;
                explosionAnimation.x=ship2.y;
                explosionAnimation.play("explode");
              }
              //This is when the ship hits flaming meteor 1
              if(this.physics.world.overlap(ship2,flamingMeteor1)==true)
              {
                flamingMeteor1.x=1000
                this.cameras.main.shake(100);
                explosionSound.play();
                ship2Lives--
                explosionAnimation.x=ship2.x;
                explosionAnimation.x=ship2.y;
                explosionAnimation.play("explode");
              }
              //This is when the ship hits flaming meteor 2
              if(this.physics.world.overlap(ship2,flamingMeteor2)==true)
              {
                flamingMeteor2.x=1000
                this.cameras.main.shake(100);
                explosionSound.play();
                ship2Lives--
                explosionAnimation.x=ship2.x;
                explosionAnimation.x=ship2.y;
                explosionAnimation.play("explode");
              }
              //This is when the ship hits flaming meteor 2
              if(this.physics.world.overlap(ship2,flamingMeteor3)==true)
              {
                flamingMeteor3.x=1000
                this.cameras.main.shake(100);
                explosionSound.play();
                ship2Lives--
                explosionAnimation.x=ship2.x;
                explosionAnimation.x=ship2.y;
                explosionAnimation.play("explode");
              }
              if(this.physics.world.overlap(ship2,ship1)==true)
              {
                thudSound.play();
              }
              txtShip2Status.text="Ship 2 Lives: "+ship2Lives;
              if(ship1.x>850)
              {
                ship1.x+=-100
                thudSound.play();
              }
              if(ship1.x<-10)
              {
                ship1.x+=100
                thudSound.play();
              }
              if(ship2.x>850)
              {
                ship2.x+=-100
                thudSound.play();
              }
              if(ship2.x<-10)
              {
                ship2.x+=100
                thudSound.play();
              }
              if(ship1.y>650)
              {
                ship1.y+=-100
                thudSound.play();
              }
              if(ship2.y>650)
              {
                ship2.y+=-100
                thudSound.play();
              }
            }//end of update
        }//end of mainScene

      //this scene is the final game summary scene
        class endScene extends Phaser.Scene {
            constructor (config)
            {
              super(config);
            }

            preload(){

            }
            create(){
              txtFinalMessage=this.add.text(150,150,finalMessage,{fontFamily:"Arial",fontSize:42,color:"#FFFFFF"});
            }
            update(){

            }
        }//end of endScene





        //below is the first screen or scene in the game
        class startScene extends Phaser.Scene {
            constructor (config)
            {
              super(config);
            }

            preload(){
              this.load.image("startMessage","assets/sprites/startButton.png");//Preloads the start button image
            }//end of preload
            create(){
              startMessage=this.physics.add.image(390,160,"startMessage").setInteractive();
              startMessage.setScale(0.5);
              
              startMessage.on("pointerdown", function (pointer) {
                this.setTint(0xff0000);
                
              });//end of pointerdown event

              startMessage.on("pointerup", function (pointer) {
                this.clearTint();
                //startMessage.x=-1000;
                game.scene.start("game");
                game.scene.remove("startMessageScreen");
              });
              
            }//end of create
            update(){

            }
        }//end of startScene

    



    var config = {
        type: Phaser.AUTO,
        parent: 'phaser-example',
        width: 800,//width of game world
        height: 600,//height of game world
        physics: {
            default: 'arcade',
            arcade: {
                debug: false
                }
        }
    };

    var game = new Phaser.Game(config);
    //add all scenes to your game here
    game.scene.add("game",mainScene);
    game.scene.add("finalScreen",endScene);
    game.scene.add("startMessageScreen",startScene);
    game.scene.start("startMessageScreen");//the scene to start