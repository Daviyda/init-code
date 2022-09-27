var players=[]
var dices=[]
var turn = 0
var diceNumbers = []
var poses = []
var avatars=[]
var rolled = true

function rand(x) {
    return (Math.round(Math.random()*x))
}

/*********************************************************************************************************************************

                                                        Board Creation

*********************************************************************************************************************************/

function addClass(elem, clss) {
    elem.className+=' '+clss
}

function resize() {
    board.style.width = window.innerHeight+'px'
    board.style.height = window.innerHeight+'px'

    width = window.innerHeight/12

    unit = window.innerHeight/24

    createBoard()

    board.style.gridTemplateColumns = unit+'px '+unit+'px '+unit+'px '+unit+'px '+unit+'px '+unit+'px '+unit+'px '+unit+'px '+unit+'px '+unit+'px '+unit+'px '+unit+'px '+unit+'px '+unit+'px '+unit+'px '+unit+'px '+unit+'px '+unit+'px '+unit+'px '+unit+'px '+unit+'px '+unit+'px '+unit+'px'
    board.style.gridTemplateRows = unit+'px '+unit+'px '+unit+'px '+unit+'px '+unit+'px '+unit+'px '+unit+'px '+unit+'px '+unit+'px '+unit+'px '+unit+'px '+unit+'px '+unit+'px '+unit+'px '+unit+'px '+unit+'px '+unit+'px '+unit+'px '+unit+'px '+unit+'px '+unit+'px '+unit+'px '+unit+'px'
}

function plot(x) {
    var temp = document.createElement('span')
    temp.id = x.name
    temp.className = 'plots'
    poses.push(temp)
    board.appendChild(temp)

    switch (x.pos) {
        case 'side':
            temp.style.width = width+'px'
            break
        case 'corner' :
            temp.style.width = width*1.5+'px'
            break
    }
    temp.style.height = width*1.5+'px'

    if (x.card != tempCard) {
        tempCard = x.card
        switch (x.card) {
            case 'south':
                tempNum = 20
                break
            case 'west':
                tempNum = 20
                break
            case 'north':
                tempNum = 4
                break
            case 'east':
                tempNum = 4
                break
            default:
                break
        }
    }
    switch (x.card) {
        case 'south':
            temp.style.gridColumn = tempNum+'/span2'
            tempNum-=2
            break
        case 'west':
            temp.style.gridRow = tempNum+'/span2'
            temp.style.marginLeft = unit/2+'px'
            temp.style.marginTop = - unit/2+'px'
            tempNum-=2
            break
        case 'north':
            temp.style.gridColumn = tempNum+'/span2'
            tempNum+=2
            break
        case 'east':
            temp.style.gridRow = tempNum+'/span2'
            temp.style.marginLeft = unit/2+'px'
            temp.style.marginTop = -unit/2+'px'
            tempNum+=2
            break
        default:
            break
    }
    if (x.type == 'land') {
        addClass(temp, groups[tempNum0])
        tempNum0++
    }

    addClass(temp, x.card)
    addClass(temp, x.type)

    temp.textContent = x.name
}

function createBoard() {
    plots.forEach(i => {
        plot(i)
    });
}

/*******************************************************Board Creation************************************************************/

/**********************************************************************************************************************************
 
                                                    Player Creation

**********************************************************************************************************************************/

function getPlayers() {
    var tempName = ''
    var tempPass = ''
    var i = 0
    function Player(nam, password, cash=20000, pos=0, deeds=[]) {
        this.nam = nam
        this.password = password
        this.cash = cash
        this.pos = pos
        this.deeds = deeds
    }

    nam = localStorage.getItem('names')
    pass = localStorage.getItem('passes')
    names = []
    passes = []
    while (i<=nam.length) {
        if (nam.charAt(i) !== ',' && nam.charAt(i)!='') {
            tempName += nam.charAt(i)
            i++
        }
        else {
            names.push(tempName)
            tempName = ''
            i++
        }
    }
    while (i<pass.length) {
        if (pass.charAt(i) != ',' && pass.charAt(i)!='') {
            tempPass += pass.charAt(i)
            i++
        }
        else {
            passes.push(tempPass)
            tempPass = ''
            i++
        }
    }

    names.forEach(i=> {
        tempPlayer = new Player(i, names.indexOf(i))
        players.push(tempPlayer)
    })
}

function createPlayer() {
    players.forEach(i=> {
        var player = document.createElement('span')
        player.className = 'player'
        player.id = i.nam
        player.textContent = i.nam
        avatars.push(player)
        poses[i.pos].appendChild(player)
    })
}

/*****************************************************Player Creation*************************************************************/

/*********************************************************Space********************************************************************/
function space() {
    space = document.createElement('div')
    space.id = 'space'
    board.appendChild(space)

    dice()
}
/*********************************************************Space********************************************************************/

/*********************************************************Dice********************************************************************/
function circle(x,y, par, r='10%') {
    par.innerHTML+='<circle cx="'+x+'" cy="'+y+'" r="'+r+'" fill="black" />'    
}

function dice() {
    space.innerHTML+="<svg width='100' height='100' class='dice'></svg><svg width='100' height='100' class='dice'></svg>"
    dices[0]=space.children[0]
    dices[1]=space.children[1]
    dices = space.children
    dices[0].func = faces
    dices[1].func = faces

    dices[0].func(1)
    dices[1].func(1)
}

function faces(num) {
    this.innerHTML = ''
    switch (num) {
        case 1:
            circle('50%', '50%', this, '20%')
            break
        case 2:
            circle('35%', '50%', this)
            circle('65%', '50%', this)
            break
            case 3:
                circle('20%', '20%', this)
            circle('50%', '50%', this)
            circle('80%', '80%', this)
            break
            case 4:
            circle('35%', '35%', this)
            circle('65%', '35%', this)
            circle('35%', '65%', this)
            circle('65%', '65%', this)
            break
            case 5:
                circle('25%', '25%', this)
            circle('75%', '25%', this)
            circle('50%', '50%', this)
            circle('25%', '75%', this)
            circle('75%', '75%', this)
            break
        case 6:
            circle('25%', '35%', this)
            circle('25%', '65%', this)
            circle('50%', '35%', this)
            circle('50%', '65%', this)
            circle('75%', '35%', this)
            circle('75%', '65%', this)
            break
        default:
            break
    }
    return(num)
}

function rollDice() {
    rollCount = 0
    rolls = Math.round(Math.random()*30)
    while (rolls<10) {rolls = Math.round(Math.random()*30)}
    
    rolling = setInterval(function() {
        if (rollCount<=rolls) {
            for (i=0; i<dices.length; i++) {
                faceNum = rand(6)
                while (faceNum==0) {faceNum = rand(6)}
                diceNumbers[i] = dices[i].func(faceNum)
            }
            rollCount++
        }
        else {
            clearInterval(rolling)
            moveTo = diceNumbers[0]+diceNumbers[1]
            move(moveTo)
        }
    }, 50)
    rolled = true
}

/*********************************************************Dice********************************************************************/

/*********************************************************GamePlay****************************************************************/

function beginTurn() {
    if (rolled == true) {
        if (turn<players.length) {
            currPlayer = players[turn]
            turn++
        }
        else {
            turn = 0
            currPlayer = players[turn]
            turn++
        }

        named.textContent = currPlayer.nam + "'s Turn"
        rolled = false
        currPlayer.danger = 0
    }
    else {
        alert('Roll the Dice')
    }
}

function move(newPos) {
    newPos = currPlayer.pos+newPos
    tempPos = currPlayer.pos
    tempPlot = poses[tempPos]
    if (tempPos == 39) {
        tempPos = -1
        newPos -= 40
    }
    dest = poses[tempPos+1]
    playerIn = players.indexOf(currPlayer)
    movingF = setInterval(() => {
        if (currPlayer.pos<newPos) {
            tempPlot.removeChild(avatars[playerIn])
            currPlayer.pos+=1
            var tempPos = currPlayer.pos
            dest.appendChild(avatars[playerIn])
            tempPlot = poses[tempPos]
            if (tempPos == 39) {
                tempPos = -1
                currPlayer.pos = -1
                newPos -= 40
                console.log(newPos)
            }
            dest = poses[tempPos+1]
            console.log(dest)
        }
        else {
            clearInterval(movingF)
        }
    }, 200)
    movingB = setInterval(() => {
        if (currPlayer.pos>newPos) {
            poses[tempPos].removeChild(avatars[playerIn])
            currPlayer.pos-=1
            var tempPos = currPlayer.pos
            poses[tempPos].appendChild(avatars[playerIn])
            poses
        }
        else {
            clearInterval(movingB)
        }
    }, 100)
    if (diceNumbers[0]==diceNumbers[1]) {
        rolled = false
        currPlayer.danger++
    }
    if (currPlayer.danger==3) {

    }
}



/*********************************************************GamePlay****************************************************************/
window.onload = () => {
    board = document.getElementById('board')
    test = document.getElementById('test')
    
    die1 = document.createElement('canvas')
    die2 = document.createElement('canvas')
    
    named = document.getElementById('name')
    end = document.getElementById('end')
    
    roll = document.getElementById('roll')
    roll.onclick = () => {
        if (rolled == false) {
            rollDice()
        }
        else {alert("You have already rolled the dice for this turn")}
    }
    
    
    tempCard = 'proto'
    tempNum = 1
    tempNum0 = 0
    
    resize()
    getPlayers()
    space()
    beginTurn()
    createPlayer()
    
    end.onclick = () => {beginTurn()}
}

window.onkeyup = (k) => {
    switch (k.key) {
        case 'e':
            beginTurn()
            break
        case 'r':
            if (rolled == false) {
                rollDice()
            }
            else {alert("You have already rolled the dice for this turn")}
             break
        default:
            break
        }
}

// window.onresize = () => {
    //     resize()
    // }
