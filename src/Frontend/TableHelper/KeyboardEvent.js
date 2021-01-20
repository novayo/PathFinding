import { componentKind, keyboardSupport, weightValueRange } from './TableIndex'
import { position } from '../../Core/index'


export function KeyboardEvent(event, weightValue = null) {
    // console.log("KeyboardEvent")

    if(event.key === keyboardSupport.w){
        if(componentKind.add === componentKind.wall){
            componentKind.add = componentKind.weight
            keyboardSupport.down = false
        }else{
            componentKind.add = componentKind.wall
            keyboardSupport.down = true
        }

    }else if(event.key === keyboardSupport.plus && position.weightValue + weightValueRange.increase <= weightValueRange.max){
        if(weightValue != null){
            weightValue.set("+")
            keyboardSupport.down = false
        }else{
            keyboardSupport.down = true
        }

    }else if(event.key === keyboardSupport.sub && position.weightValue - weightValueRange.increase >= weightValueRange.min){
        if(weightValue != null){
            weightValue.set("-")
            keyboardSupport.down = false
        }else{
            keyboardSupport.down = true
        }

    }else if(event.key === keyboardSupport.plus || event.key === keyboardSupport.sub){
        if(weightValue != null){
            weightValue.set(!weightValue.get.status)
            keyboardSupport.down = false
        }else{
            keyboardSupport.down = true
        }
    }

    // console.log(position.weightValue)

}
