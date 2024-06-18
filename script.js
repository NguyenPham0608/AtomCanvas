/**@type{HTMLCanvasElement} */
const canvas = document.getElementById('canvas1')
const ctx = canvas.getContext('2d')


let radius=40
// range of selections

let canvasPosition = canvas.getBoundingClientRect()

let atomsFilled=0

let trashImage=new Image()
trashImage.src='https://cdn3.iconfinder.com/data/icons/linecons-free-vector-icons-pack/32/trash-512.png'

let eraseImage=new Image()
eraseImage.src='https://www.svgrepo.com/download/66231/eraser.svg'

let mode='draw'
let label=1

let connectionIdx=0

let erase=false

let snapAudio=new Audio()
// snapAudio.src='Finger Snap.wav'
snapAudio.src='Button-Click.wav'

let optionsAudio=new Audio()
// optionsAudio.src='OptionsSFX.wav'
optionsAudio.src='Create.wav'



let deleteX=0
let deleteY=0

let nextId=1

let optionX=0
let optionY=0

let atoms=0

let lastKey

let connected=0

let hoverLabel=0

let z =0

let undo=0

let atomsTobeFilled=0

let mouseX=0
let mouseY=0

let inRangeX=0
let inRangeY=0

let brushArmlength=0

let mouseDownTime=0

let armNumber=0

let space=false
let hydrogenFixed=false

let newestMoleculeIdx=0

let newAtomCreated=false

let click=false

let panX=0
let panY=0

let hoverTrash=false

let detectors=0

let newDetectedIDX=0
let newDetectedARM=0
let newDetectedMLCIDX=0
let newDetectedMLCIDXCan=0

let moleculeX=0
let moleculeY=0

let detectorPositions

let fillHydrogen=false

let dx=0
let dy=0
let distance=0

let hoverErase=false

let moleculeRadius=30

let selected=0

let mouseDownX=0
let mouseDownY=0

let deleteIdx=0

let mouseDown=false

let brush = 1

const moleculeArray=[]

const detectorArray=[]

class Molecule{
    constructor(x,y,idx,id,type,armLength){

        this.detectorPositions=detectorPositions



        this.id=id
        this.distance=0
        this.dx=0
        this.dy=0
        this.brushType=type

        this.click=false
        
        this.tmp=0
        
        this.connected=connected
        this.brightness=0

        this.moleculeRadius=armLength/3
        this.armLength=armLength

        this.fillHydrogen='ready'

        this.selected=false
        this.armNumber=armNumber

        this.idx=idx
        this.noArms=hydrogenFixed

        if(this.idx==newDetectedMLCIDX){
            this.x=moleculeX
            this.y=moleculeY
        }


        this.x=x+this.moleculeRadius
        this.y=y+this.moleculeRadius

        if (this.brushType==1) {
            this.fillStyle='black'
            this.strokestyle='black'
            this.label='C'
        } else {
            if(this.brushType==2){
                this.fillStyle='blue'
                this.strokestyle='blue'
                this.label='H'
            }else{
                this.fillStyle='red'
                this.strokestyle='red'
                this.label='O'
            }
        }
        
        if(this.brushType !==2){
            atomsTobeFilled++
        }


        if(this.brushType==1){

            if(this.connected==1){
                this.maxArms=3

                if(this.armNumber==1){
                    this.connectedArms=[2]

                    this.unUsedArmsArray=[1,3,4]

                    detectors++
                    detectorArray.push(new Detector(this.x-4.90+this.armLength,this.y-4.90, 1, this.idx,this.armLength,detectors))
                    detectors++
                    detectorArray.push(new Detector(this.x-4.90,this.y-4.95+this.armLength, 3, this.idx,this.armLength,detectors))
                    detectors++
                    detectorArray.push(new Detector(this.x-4.90,this.y-4.95-this.armLength, 4, this.idx,this.armLength,detectors))
                }else{
                    if(this.armNumber==2){
                        this.connectedArms=[1]

                        this.unUsedArmsArray=[2,3,4]

                        detectors++
                        detectorArray.push(new Detector(this.x-4.90-this.armLength,this.y-4.90, 2, this.idx,this.armLength,detectors))
                        detectors++
                        detectorArray.push(new Detector(this.x-4.90,this.y-4.95+this.armLength, 3, this.idx,this.armLength,detectors))
                        detectors++
                        detectorArray.push(new Detector(this.x-4.90,this.y-4.95-this.armLength, 4, this.idx,this.armLength,detectors))
                    }else{
                        if(this.armNumber==3){
                            this.connectedArms=[4]

                            this.unUsedArmsArray=[1,2,3]

                            detectors++
                            detectorArray.push(new Detector(this.x-4.90+this.armLength,this.y-4.90, 1, this.idx,this.armLength,detectors))
                            detectors++
                            detectorArray.push(new Detector(this.x-4.90-this.armLength,this.y-4.90, 2, this.idx,this.armLength,detectors))
                            detectors++
                            detectorArray.push(new Detector(this.x-4.90,this.y-4.95+this.armLength, 3, this.idx,this.armLength,detectors))
                        }else{
                            this.connectedArms=[3]
                            this.unUsedArmsArray=[1,2,4]

                            detectors++
                            detectorArray.push(new Detector(this.x-4.90+this.armLength,this.y-4.90, 1, this.idx,this.armLength,detectors))
                            detectors++
                            detectorArray.push(new Detector(this.x-4.90-this.armLength,this.y-4.90, 2, this.idx,this.armLength,detectors))
                            detectors++
                            detectorArray.push(new Detector(this.x-4.90,this.y-4.95-this.armLength, 4, this.idx,this.armLength,detectors))

                        }
                    }
                }
            }else{
                this.maxArms=4
                this.connectedArms=[]
                this.unUsedArmsArray=[1,2,3,4]

                detectors++
                detectorArray.push(new Detector(this.x-4.90+this.armLength,this.y-4.90, 1, this.idx,this.armLength,detectors))
                detectors++
                detectorArray.push(new Detector(this.x-4.90-this.armLength,this.y-4.90, 2, this.idx,this.armLength,detectors))
                detectors++
                detectorArray.push(new Detector(this.x-4.90,this.y-4.95+this.armLength, 3, this.idx,this.armLength,detectors))
                detectors++
                detectorArray.push(new Detector(this.x-4.90,this.y-4.95-this.armLength, 4, this.idx,this.armLength,detectors))
            }
        }else{
            if(this.brushType==2){


                if(this.connected==0){
                    this.connectedArms=[]
                    this.unUsedArmsArray=[4]
                    this.maxArms=1

                    detectors++
                    detectorArray.push(new Detector(this.x+this.moleculeRadius/2,this.y+3-this.armLength, 4, this.idx,this.armLength,detectors))
                    
                }else{
                    if(this.armNumber==1){
                        this.connectedArms=[1]
                        this.unUsedArmsArray=[]
                        this.maxArms=0
                    }else{
                        if(this.armNumber==2){
                            this.connectedArms=[2]
                            this.unUsedArmsArray=[]
                            this.maxArms=0
                        }else{
                            if(this.armNumber==3){
                                this.connectedArms=[3]
                                this.unUsedArmsArray=[]
                                this.maxArms=0
                            }else{
                                this.connectedArms=[4]
                                this.unUsedArmsArray=[]
                                this.maxArms=0
                            }
                        }
                    }
                }
            }else{
                this.maxArms=2

                //next//
                if(this.connected==0){
                    this.connectedArms=[]
                    this.unUsedArmsArray=[3,4]
                    this.maxArms=2
                    detectors++
                    detectorArray.push(new Detector(this.x-3,this.y-3+this.armLength, 3, this.idx,this.armLength,detectors))
                    detectors++
                    detectorArray.push(new Detector(this.x-3,this.y-3-this.armLength, 4, this.idx,this.armLength,detectors))
                    
                }else{

                    if(this.detectorPositions==1){
                        this.connectedArms=[1]
                        this.unUsedArmsArray=[2]
                        this.maxArms=1
                        detectors++
                        detectorArray.push(new Detector(this.x-3+this.armLength,this.y-3, 1, this.idx,this.armLength,detectors))
                    }else{
                        if(this.detectorPositions==2){
                            this.connectedArms=[2]
                            this.unUsedArmsArray=[1]
                            this.maxArms=1
                            detectors++
                            detectorArray.push(new Detector(this.x-3-this.armLength,this.y-3, 2, this.idx,this.armLength,detectors))
                        }else{
                            if(this.detectorPositions==3){
                                this.connectedArms=[3]
                                this.unUsedArmsArray=[4]
                                this.maxArms=1
                                detectors++
                                detectorArray.push(new Detector(this.x-3,this.y-3+this.armLength, 3, this.idx,this.armLength,detectors))
                            }else{
                                this.connectedArms=[4]
                                this.unUsedArmsArray=[3]
                                this.maxArms=1
                                detectors++
                                detectorArray.push(new Detector(this.x-3,this.y-3-this.armLength, 4, this.idx,this.armLength,detectors))
                            }
                        }  
                    }
                }
            }
        }

        this.offset=0
        this.unUsedArms=this.maxArms


    }
    calculate(){

        if(mouseDown){
            this.click=1
        }

        if(this.unUsedArms==0){
            this.unUsedArms='full'
        }

        if(newDetectedIDX==this.idx){
            if(this.click==1){
                if(this.unUsedArms==0){
                    this.unUsedArms='full'
                }else{
                    this.unUsedArms--
                }
                this.connectedArms.push(newDetectedARM)
                console.log()
                deleteWantedIdx(newDetectedARM,this.unUsedArmsArray)
                this.click
            }
        }

        if(fillHydrogen){
            if(this.fillHydrogen=='ready'){
                this.fillHydrogen=true
            }
        }

        if(this.brushType !==2){
            if(this.fillHydrogen==true){
                console.log(this.unUsedArmsArray)

                for(let i = 0; i<this.unUsedArmsArray.length; i++){
                    this.tmp=this.unUsedArmsArray[i]
                    if(this.brushType==1){
                        this.offset=15.5
                        if(this.tmp==1){
                            connected=1
                            connectionIdx=this.idx
                            // newDetectedIDX=this.idx
                            newDetectedIDX=Math.floor(Math.random()*10-1)
                            newDetectedARM=1
                            armNumber=1
                            newDetectedMLCIDX=newDetectedMLCIDXCan
                            moleculeArray.push(new Molecule(this.x-this.offset+this.armLength*1.5,this.y-this.offset, Math.floor(Math.random()*10-1) ,nextId++,2,7.4*3))
                        }else{
                            if(this.tmp==2){
                                connected=1
                                connectionIdx=this.idx
                                // newDetectedIDX=this.idx
                                newDetectedIDX=Math.floor(Math.random()*10-1)
                                newDetectedARM=2
                                armNumber=2
                                newDetectedMLCIDX=newDetectedMLCIDXCan
                                moleculeArray.push(new Molecule(this.x-this.offset-this.armLength*1.5,this.y-this.offset, Math.floor(Math.random()*10-1) ,nextId++,2,7.4*3))
                            }else{
                                if(this.tmp==3){
                                    connected=1
                                    connectionIdx=this.idx
                                    // newDetectedIDX=this.idx
                                    newDetectedIDX=Math.floor(Math.random()*10-1)
                                    newDetectedARM=3
                                    armNumber=3
                                    newDetectedMLCIDX=newDetectedMLCIDXCan
                                    moleculeArray.push(new Molecule(this.x-this.offset,this.y-this.offset+this.armLength*1.5, Math.floor(Math.random()*10-1) ,nextId++,2,7.4*3))
                                }else{
                                    connected=1
                                    connectionIdx=this.idx
                                    // newDetectedIDX=this.idx
                                    newDetectedIDX=Math.floor(Math.random()*10-1)
                                    newDetectedARM=4
                                    armNumber=4
                                    newDetectedMLCIDX=newDetectedMLCIDXCan
                                    moleculeArray.push(new Molecule(this.x-this.offset,this.y-this.offset-this.armLength*1.48, Math.floor(Math.random()*10-1) ,nextId++,2,7.4*3))
                                }
                            }
                        }
                    }else{
                        if(this.brushType==2){
        
                        }else{
                            if(this.brushType==3){
        
                            }else{
                                if(this.brushType==4){
        
                                }else{
                                    
                                }
                            } 
                        } 
                    }
                }
                atomsFilled++
                this.fillHydrogen=false
            }
        }

        



        this.dx=mouseX-this.x
        this.dy=mouseY-this.y
        this.distance=Math.sqrt((this.dx*this.dx)+(this.dy*this.dy))



        if(erase){
            if(this.distance<this.moleculeRadius*3){
                if(mouseDown){
                    deleteIdx=this.idx
                    deleteItemById(this.id,moleculeArray)

                }
            }else{
                if(mouseDown){
                    this.brightness=0
                    this.selected=false
                }
            }
        }
    }
    
    update(){
        

    }
    draw(){

        // if(this.idx==deleteIdx){
        //     deleteItemById(this.id)
        // }

        ctx.beginPath()
        ctx.lineWidth=2
        ctx.strokeStyle=this.strokestyle
        ctx.fillStyle=this.fillStyle
        if(this.brushType==1){
            ctx.moveTo(this.x-this.moleculeRadius,this.y-this.moleculeRadius)
            ctx.lineTo(this.x-this.moleculeRadius,this.armLength+this.y-this.moleculeRadius)
    
            ctx.moveTo(this.x-this.moleculeRadius,this.y-this.moleculeRadius)
            ctx.lineTo(this.x-this.moleculeRadius,-this.armLength+this.y-this.moleculeRadius)
    
            ctx.moveTo(this.x-this.moleculeRadius,this.y-this.moleculeRadius)
            ctx.lineTo(this.armLength+this.x-this.moleculeRadius,this.y-this.moleculeRadius)
    
            ctx.moveTo(this.x-this.moleculeRadius,this.y-this.moleculeRadius)
            ctx.lineTo(-this.armLength+this.x-this.moleculeRadius,this.y-this.moleculeRadius)
        }else{
            
            if(this.brushType==2){
                if(this.armNumber==1){
                    ctx.moveTo(this.x-this.moleculeRadius,this.y-this.moleculeRadius)
                    ctx.lineTo(-this.armLength+this.x-this.moleculeRadius,this.y-this.moleculeRadius)
                }else{
                    if(this.armNumber==2){
                        ctx.moveTo(this.x-this.moleculeRadius,this.y-this.moleculeRadius)
                        ctx.lineTo(this.armLength+this.x-this.moleculeRadius,this.y-this.moleculeRadius)
                    }else{
                        if(this.armNumber==3){
                            ctx.moveTo(this.x-this.moleculeRadius,this.y-this.moleculeRadius)
                            ctx.lineTo(this.x-this.moleculeRadius,-this.armLength+this.y-this.moleculeRadius)
                        }else{
                            ctx.moveTo(this.x-this.moleculeRadius,this.y-this.moleculeRadius)
                            ctx.lineTo(this.x-this.moleculeRadius,this.armLength+this.y-this.moleculeRadius)
                        }
                    }
                }
            }else{
                if(this.armNumber==1){
                    ctx.moveTo(this.x-this.moleculeRadius,this.y-this.moleculeRadius)
                    ctx.lineTo(-this.armLength+this.x-this.moleculeRadius,this.y-this.moleculeRadius)
            
                    ctx.moveTo(this.x-this.moleculeRadius,this.y-this.moleculeRadius)
                    ctx.lineTo(this.armLength+this.x-this.moleculeRadius,this.y-this.moleculeRadius)
                }else{
                    if(this.armNumber==2){
                        ctx.moveTo(this.x-this.moleculeRadius,this.y-this.moleculeRadius)
                        ctx.lineTo(this.armLength+this.x-this.moleculeRadius,this.y-this.moleculeRadius)
            
                        ctx.moveTo(this.x-this.moleculeRadius,this.y-this.moleculeRadius)
                        ctx.lineTo(-this.armLength+this.x-this.moleculeRadius,this.y-this.moleculeRadius)
                    }else{
                        if(this.armNumber==3){
                            ctx.moveTo(this.x-this.moleculeRadius,this.y-this.moleculeRadius)
                            ctx.lineTo(this.x-this.moleculeRadius,-this.armLength+this.y-this.moleculeRadius)
            
                            ctx.moveTo(this.x-this.moleculeRadius,this.y-this.moleculeRadius)
                            ctx.lineTo(this.x-this.moleculeRadius,this.armLength+this.y-this.moleculeRadius)
                        }else{
                            if(this.armNumber==4){
                                ctx.moveTo(this.x-this.moleculeRadius,this.y-this.moleculeRadius)
                                ctx.lineTo(this.x-this.moleculeRadius,this.armLength+this.y-this.moleculeRadius)
                
                                ctx.moveTo(this.x-this.moleculeRadius,this.y-this.moleculeRadius)
                                ctx.lineTo(this.x-this.moleculeRadius,-this.armLength+this.y-this.moleculeRadius)
                            }
                        }
                    }
                }
            }
        }
        ctx.stroke()

        ctx.beginPath()
        ctx.fillStyle=this.fillStyle
        ctx.arc(this.x-this.moleculeRadius,this.y-this.moleculeRadius,this.moleculeRadius,0,Math.PI*2,false)

        ctx.fill()

        ctx.beginPath()

        if(label==1){
            ctx.fillStyle='white'
            if(this.brushType==1){
                ctx.beginPath()
                ctx.font='30px verdana'
                ctx.fillText(this.label, this.x-27, this.y-3, 99999000)
            }else{
                if(this.brushType==2){
                    ctx.beginPath()
                    ctx.font='13px verdana'
                    ctx.fillText(this.label, this.x-12, this.y-3, 99999000)
                }else{
                    ctx.beginPath()
                    ctx.font='25px verdana'
                    ctx.fillText(this.label, this.x-24, this.y-4, 99999000)
                }
            }
        }
    }
}


class Detector{
    constructor(x,y,armNumber, moleculeIDX, armLength,idx){
        this.moleculeIdx=moleculeIDX
        this.armNumber=armNumber
        this.armLength=0
        this.bondDistance=armLength+brushArmlength
        this.x=x
        this.y=y
        this.dx=0
        this.dy=0
        this.distance=0
        this.range=10
        this.idx=idx
        this.fillStyle='blue'
        this.active=true
        this.delay=false
        this.delayDelay=0

    }

    calculate(){
        if(this.active){
            this.dx=this.x-mouseX-this.range
            this.dy=this.y-mouseY-this.range
            this.distance=Math.sqrt((this.dx**2)+(this.dy**2))
        }
    }
    update(){
        if(this.active){
            this.bondDistance=this.armLength+brushArmlength
            if(this.distance<this.range){
                connectionIdx=this.moleculeIdx
                // newDetectedIDX=this.moleculeIdx
                newDetectedIDX=Math.floor(Math.random()*10-1)

                newDetectedARM=this.armNumber
                newDetectedMLCIDX=newDetectedMLCIDXCan
                if(this.armNumber==1){
                    inRangeX=this.x+this.bondDistance-this.range-0.5
                    inRangeY=this.y-this.range-0.5
                    detectorPositions=1
                    connected=1
    
                }else{
                    if(this.armNumber==2){
    
                        inRangeX=this.x-this.bondDistance-this.range-0.5
                        inRangeY=this.y-this.range-0.5
                        detectorPositions=2
                        connected=1
    
                    }else{
                        if(this.armNumber==3){
                            inRangeX=this.x-this.range-0.5
                            inRangeY=this.y+this.bondDistance-this.range-0.5
                            detectorPositions=3
                            connected=1
    
    
                        }else{
                            inRangeX=this.x-this.range-0.5
                            inRangeY=this.y-this.bondDistance-this.range-0.5
                            detectorPositions=4
                            connected=1
                        
                        }
                    }
                }



                

                hydrogenFixed=true
                armNumber=this.armNumber
            
                // if(newAtomCreated){
                //     this.active=false
                //     newAtomCreated=false
                // }
    
            }
            if (this.distance<this.range) {
                this.fillStyle='#3AFF00'
            } else {
                this.fillStyle='white'
            }
            ctx.beginPath()
            ctx.fillStyle=this.fillStyle
            ctx.arc(this.x-1-this.range,this.y-1-this.range,this.range,0,2*Math.PI,false)
            ctx.fill()
    
    
    
        }
    }
}

function loop(){
    atomsFilled=0
    armNumber=3
    inRangeX=mouseX
    inRangeY=mouseY
    hydrogenFixed=false
    connected=0
    
    ctx.clearRect(0,0,canvas.width,canvas.height)
    connectionIdx=0
    if(erase){

        ctx.fillStyle='#FF0000'
        ctx.fillRect(0,0,canvas.width,10)
        ctx.fillRect(0,canvas.height,canvas.width,-10)
        ctx.fillRect(panX+300,canvas.height,10,-canvas.height)
        ctx.fillRect(canvas.width,canvas.height,-10,-canvas.height)



    }
    drawOptions()
    detectorArray.forEach(detector=>{
        detector.calculate()
        detector.update()})

        if(undo==1){
            atoms--
            moleculeArray.shift()
            detectorArray.splice(detectorArray.length-4,4)
            undo=0
        }


    moleculeArray.forEach(atom=>{
        atom.calculate()
        atom.update()
        atom.draw()})


    if(mouseX>300+brushArmlength){
        drawGhostedAtoms()
    }

    if(atomsFilled==atomsTobeFilled){
        fillHydrogen=false
    }
    

    requestAnimationFrame(loop)

}

    function drawOptions(){
    ctx.fillStyle='lightgray'
    // if(mouseX<310){
    //     panX+=0.2*(0-panX)
    // }else{
    //     panX+=0.2*(-350-panX)
    // }
    panX=0
    ctx.fillRect(panX,panY,300,canvas.height)

    optionX=70
    optionY=70
    ctx.beginPath()
    ctx.strokeStyle='black'
    ctx.moveTo(panX+optionX,optionY)
    ctx.lineTo(panX+optionX+(15.4*3),optionY)
    ctx.moveTo(panX+optionX,optionY)
    ctx.lineTo(panX+optionX-(15.4*3),optionY)
    ctx.moveTo(panX+optionX,optionY)
    ctx.lineTo(panX+optionX,optionY+(15.4*3))
    ctx.moveTo(panX+optionX,optionY)
    ctx.lineTo(panX+optionX,optionY-(15.4*3))

    ctx.stroke()

    ctx.beginPath()
    ctx.fillStyle='black'
    ctx.arc(panX+optionX,optionY,15.4,0,2*Math.PI,'false')
    ctx.fill()


    dx=(panX+optionX)-mouseX
    dy=optionY-mouseY
    distance=sqrt(dx**2+dy**2)
    if(distance<radius){
        if(mouseDown){
            if(brush !==1){
                brush=1
            }
            optionsAudio.play()
        }
    }

    ctx.fillStyle='white'
    ctx.font='27px verdana'
    ctx.fillText('C',panX+optionX-11,optionY+11)

    optionY=190
    ctx.beginPath()
    ctx.fillStyle='blue'
    ctx.arc(panX+optionX,optionY,7.4,0,2*Math.PI,'false')
    dx=(panX+optionX)-mouseX
    dy=optionY-mouseY
    distance=sqrt(dx**2+dy**2)
    if(distance<radius){
        if(mouseDown){
            if(brush !==2){
                brush=2
            }
            optionsAudio.play()

        }
    }

    ctx.fill()

    ctx.fillStyle='white'
    ctx.font='13px verdana'
    ctx.fillText('H',panX+optionX-5,optionY+5)

    ctx.beginPath()
    ctx.strokeStyle='blue'
    ctx.moveTo(panX+optionX,optionY)
    ctx.lineTo(panX+optionX,optionY-(7.4*3))
    ctx.stroke()

    optionY=290

    ctx.beginPath()
    ctx.fillStyle='red'
    ctx.arc(panX+optionX,optionY,13.7,0,2*Math.PI,'false')
    dx=(panX+optionX)-mouseX
    dy=optionY-mouseY
    distance=sqrt(dx**2+dy**2)
    if(distance<radius){
        if(mouseDown){
            if(brush !==3){
                brush=3
            }
            optionsAudio.play()

        }
    }

    ctx.fill()



    ctx.beginPath()
    ctx.strokeStyle='red'
    ctx.moveTo(panX+optionX,optionY+(13.7*3))
    ctx.lineTo(panX+optionX,optionY-(13.7*3))
    ctx.stroke()

    ctx.fillStyle='white'
    ctx.font='25px verdana'
    ctx.fillText('O',panX+optionX-10,optionY+10)

    ctx.drawImage(trashImage,0,0,512,512,panX+10,830,100,100)
    dx=(panX+60)-mouseX
    dy=890-mouseY
    distance=sqrt(dx**2+dy**2)


    if(distance<50){
        hoverTrash=true
    }else{
        hoverTrash=false
    }


    ctx.drawImage(eraseImage,0,0,800,800,panX+130,830,100,100)
    dx=(panX+180)-mouseX
    dy=870-mouseY
    distance=sqrt(dx**2+dy**2)


    
    if(distance<60){
        hoverErase=true
    }else{
        hoverErase=false
    }



    ctx.beginPath()
    ctx.fillStyle='white'
    ctx.roundRect(panX+10,750,180,-70,10)
    ctx.fill()
    ctx.fillStyle='black'
    ctx.font='50px Arial Black'
    ctx.fillText('label', panX+20, 730, 9999999)

    dx=(panX+100)-mouseX
    dy=750-35-mouseY
    distance=sqrt(dx**2+dy**2)
    if(distance<100){
        hoverLabel=1
    }else{
        hoverLabel=0

    }
    ctx.beginPath()
    ctx.strokeStyle='black'
    ctx.lineWidth=5
    ctx.moveTo(panX+300,0)
    ctx.lineTo(panX+300,canvas.height)
    ctx.stroke()
    ctx.lineWidth=2



}

function sqrt(x){
    return(Math.sqrt(x))
}

window.addEventListener('click', function(){

    if((mouseX<300)==false){
        newDetectedMLCIDXCan=getRandomInt(100000,999999)
        atoms++
        if(erase==false){
            if(connected==0){
                moleculeArray.unshift(new Molecule(inRangeX,inRangeY, Math.floor(Math.random()*10-1) ,nextId++,brush,brushArmlength))
            }else{
                moleculeArray.unshift(new Molecule(inRangeX,inRangeY, connectionIdx ,nextId++,brush,brushArmlength))
            }
            if(connected==1){
                newAtomCreated=true
            }
            snapAudio.play()

        }

        click=true

    }
    if(hoverTrash){
        atoms=0
        moleculeArray.splice(0,moleculeArray.length)
        detectorArray.splice(0,detectorArray.length)
        atomsTobeFilled=0
        optionsAudio.play()
    }

    if(hoverLabel){
        label=1-label
        optionsAudio.play()

    }

    if(hoverErase){
        if(erase){
            erase=false
        }else{
            erase=true
        }
    
        optionsAudio.play()

    }

})


window.addEventListener('mousemove',function(e){
    // mouseX=e.x-canvasPosition.left
    // mouseY=e.y-canvasPosition.top
    mouseX=e.pageX
    mouseY=e.pageY
    click=false
})

window.addEventListener('mousedown',function(e){
    mouseDownX=mouseX
    mouseDownY=mouseY
    mouseDown=true
    mouseDownTime++
})
window.addEventListener('mouseup',function(){
    mouseDown=false
    mouseDownTime=0
})

window.addEventListener('keydown', function(e){

    if(e.key==' '){
        space=true
    }
    if(e.key=='z'){
        z=true
    }
    if(e.key=='z'){
        if(lastKey=='Control'||lastKey=='Meta'){
            undo=1
        }
    }else{
        lastKey=e.key
    }
    if(e.key=='Backspace'){
        erase=true
    }

})

window.addEventListener('keyup', function(e){
    if(e.key==' '){
        space=false
    }
    if(e.key=='h'){
        atomsFilled=0
        fillHydrogen=true
    }
})

window.addEventListener('resize', resizeCanvas())


function getRandomInt(min, max) {
    const minCeiled = Math.ceil(min);
    const maxFloored = Math.floor(max);
    return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled);
  }

  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}


function drawGhostedAtoms(){
    if(erase){

    }else{
        if (brush==1) {
            brushArmlength=15.4*3
            ctx.beginPath()
            ctx.strokeStyle='lightgrey'
            ctx.moveTo(inRangeX,inRangeY)
            ctx.lineTo(inRangeX+brushArmlength,inRangeY)
                    
            ctx.moveTo(inRangeX,inRangeY)
            ctx.lineTo(inRangeX-brushArmlength,inRangeY)
    
            ctx.moveTo(inRangeX,inRangeY)
            ctx.lineTo(inRangeX,inRangeY+brushArmlength)
    
            ctx.moveTo(inRangeX,inRangeY)
            ctx.lineTo(inRangeX,inRangeY-brushArmlength)
            ctx.stroke()
    
            ctx.beginPath()
            ctx.fillStyle='lightgrey'
            ctx.arc(inRangeX,inRangeY,15.4,0,2*Math.PI,false)
            ctx.fill()
            ctx.fillStyle='white'
            ctx.font='27px verdana'
            ctx.fillText('C',inRangeX-13+2,inRangeY+13-2,99999)
    
    
        } else {
            if(brush==2){
                brushArmlength=7.4*3
    
                ctx.beginPath()
                ctx.strokeStyle='lightblue'
                ctx.moveTo(inRangeX,inRangeY)
    
                if(armNumber==1){
                    ctx.lineTo(inRangeX-brushArmlength,inRangeY)
                }else{
                    if(armNumber==2){
                        ctx.lineTo(inRangeX+brushArmlength,inRangeY)
                    }else{
                        if(armNumber==3){
                            ctx.lineTo(inRangeX,inRangeY-brushArmlength)
                        }else{
                            ctx.lineTo(inRangeX,inRangeY+brushArmlength)
                        }
                    }
                }
    
                ctx.stroke()
                ctx.beginPath()
                ctx.fillStyle='lightblue'
                ctx.arc(inRangeX,inRangeY,7.4,0,2*Math.PI,false)
                ctx.fill()
                ctx.fillStyle='white'
                ctx.font='13px verdana'
                ctx.fillText('H',inRangeX-7+2,inRangeY+7-2,99999)
    
            }else{
                brushArmlength=13.7*3
    
                ctx.beginPath()
                ctx.strokeStyle='#FFADAD'
    
                if(armNumber==1){
                    ctx.moveTo(inRangeX,inRangeY)
                    ctx.lineTo(inRangeX-brushArmlength,inRangeY)
                    ctx.moveTo(inRangeX,inRangeY)
                    ctx.lineTo(inRangeX+brushArmlength,inRangeY)
                }else{
                    if(armNumber==2){
                        ctx.moveTo(inRangeX,inRangeY)
                        ctx.lineTo(inRangeX+brushArmlength,inRangeY)
                        ctx.moveTo(inRangeX,inRangeY)
                        ctx.lineTo(inRangeX-brushArmlength,inRangeY)
                    }else{
                        if(armNumber==3){
                            ctx.moveTo(inRangeX,inRangeY)
                            ctx.lineTo(inRangeX,inRangeY-brushArmlength)
                            ctx.moveTo(inRangeX,inRangeY)
                            ctx.lineTo(inRangeX,inRangeY+brushArmlength)
                        }else{
                            ctx.moveTo(inRangeX,inRangeY)
                            ctx.lineTo(inRangeX,inRangeY-brushArmlength)
                            ctx.moveTo(inRangeX,inRangeY)
                            ctx.lineTo(inRangeX,inRangeY+brushArmlength)
                        }
                    }
                }
    
                ctx.stroke()
                ctx.beginPath()
                ctx.fillStyle='#FFADAD'
                ctx.arc(inRangeX,inRangeY,13.7,0,2*Math.PI,false)
                ctx.fill()
                ctx.fillStyle='white'
                ctx.font='25px verdana'
                ctx.fillText('O',inRangeX-12+2,inRangeY+12-2,99999)
    
            }           
        }
    }

}

function deleteItemById(id,array) {
    const index = array.findIndex(item => item.id === id);
    if (index !== -1) {
        array.splice(index, 1);
    } 
    if(array==moleculeArray){
        atomsTobeFilled--
    }
}

function deleteWantedIdx(value,array){
    let indexOfValue=array.indexOf(value)
    if (indexOfValue !== -1) {
        array.splice(indexOfValue, 1);
    }
}

loop()