function LevelUp () {
    powerbrick.MotorRunDual(posspeed, posspeed * -1)
    basic.pause(travelpause)
    powerbrick.MotorStopAll()
}
function change_threshold (threshold: number) {
    travelpause = threshold
}
function change_travelpuase (puase: number) {
    travelpause = puase
}
function check_cap () {
    let threshold = 0
    if (powerbrick.GC_Brightness() <= threshold) {
        Isfull = 1
    } else {
        Isfull = 0
    }
}
input.onButtonPressed(Button.A, function () {
    GoTofloor(0)
    operation = []
})
function change_brightness (brightness: number) {
    brightness = brightness
}
function Leveldown () {
    powerbrick.MotorRunDual(negspeed, negspeed * -1)
    basic.pause(travelpause)
    powerbrick.MotorStopAll()
}
function GoTofloor (floor: number) {
    if (floor > 2 || floor < 0) {
        return 0
    }
    distance = floor - IsInFloor
    direction = Math.abs(distance)
    if (distance == 0) {
        return 0
    }
    IsArrive = 0
    if (distance > 0) {
        for (let index = 0; index < direction; index++) {
            basic.showArrow(ArrowNames.North)
            LevelUp()
        }
        basic.clearScreen()
    } else if (distance < 0) {
        for (let index = 0; index < direction; index++) {
            basic.showArrow(ArrowNames.South)
            Leveldown()
        }
        basic.clearScreen()
    }
    IsInFloor = floor
    IsArrive = 1
    return 0
}
function receive_floor_instr (floor: number) {
    if (operation.length < 2 && (IsOprate == 0 && floor != IsInFloor)) {
        j = 0
        for (let index = 0; index < operation.length; index++) {
            if (operation[j] == floor || operation[j] == IsInFloor) {
                return 0
            }
            j += 1
        }
        operation.push(floor)
        led.plotBrightness(floor * 2, 3, 125)
    }
    return 0
}
input.onButtonPressed(Button.AB, function () {
    receive_floor_instr(2)
})
input.onButtonPressed(Button.B, function () {
    check_cap()
    if (IsOprate == 0) {
        if (Isfull == 1) {
            i = 0
            for (let index = 0; index < operation.length; index++) {
                if (operation[i] == 0) {
                    operation.removeAt(i)
                    temp = operation.shift()
                    operation.unshift(0)
                    operation.push(temp)
                }
                i += 1
            }
        }
        IsOprate = 1
        while (operation.length > 0) {
            if (operation[0] == IsInFloor) {
                operation.shift()
                continue;
            }
            GoTofloor(operation.shift())
            if (operation.length > 0) {
                led.plotBrightness(operation[0] * 2, 3, 125)
                basic.pause(5000)
            }
        }
        IsOprate = 0
    }
})
function change_speed (speed: number) {
    if (speed > 0) {
        posspeed = speed
    } else {
        negspeed = speed
    }
}
let temp = 0
let j = 0
let direction = 0
let distance = 0
let travelpause = 0
let negspeed = 0
let posspeed = 0
let brightness = 0
let Isfull = 0
let IsOprate = 0
let IsArrive = 0
let IsInFloor = 0
let operation: number[] = []
let i = 0
i = 0
for (let index = 0; index < operation.length; index++) {
    led.plotBrightness(operation[i] * 2, 3, 25)
    i += 1
}
i = 0
let receive = 0
IsInFloor = 0
IsArrive = 1
IsOprate = 0
Isfull = 0
brightness = 30
posspeed = 45
negspeed = -45
travelpause = 3000
powerbrick.rgbConnect(powerbrick.Ports.PORT1)
powerbrick.setBrightness(brightness)
powerbrick.showColor(powerbrick.colors(powerbrick.NeoPixelColors.White))
basic.forever(function () {
    led.plotBrightness(IsInFloor * 2, 2, 255)
})
