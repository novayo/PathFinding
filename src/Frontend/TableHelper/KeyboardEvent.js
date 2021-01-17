import { componentKind, keyboardSupport } from './TableIndex'
import { position } from '../../Core/index'


export function KeyboardEvent(event) {
    console.log("KeyboardEvent")

    if(event.key === keyboardSupport.w){
        if(componentKind.add === componentKind.wall){
            componentKind.add = componentKind.weight
            keyboardSupport.down = false
        }else{
            componentKind.add = componentKind.wall
            keyboardSupport.down = true
        }

    }else if(event.key === keyboardSupport.plus && position.weightValue < 100){
        position.weightValue += 1

    }else if(event.key === keyboardSupport.sub && position.weightValue > 0){
        position.weightValue -= 1

    }

}
