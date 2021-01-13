import { componentKind, keyboardSupport } from './TableIndex'


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
    } 
}
