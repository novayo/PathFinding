import { componentKind, keyboardSupport, weightValueRange } from './TableIndex'
import { position } from '../../Core/index'
import { RestrictComp } from './RestrictComp'


export function KeyboardEvent(event, algorithm, weightValue = null) {
    // console.log("KeyboardEvent")

    if(RestrictComp(algorithm).weight === false){ // 檢查algorithm是否能新增或增加weight
        if(weightValue != null){
            componentKind.add = false
            keyboardSupport.down = false
        }else{
            componentKind.add = componentKind.wall
            keyboardSupport.down = true
        }
        return
    
    }

    if(event.key === keyboardSupport.w){ // 新增weight只是更改componentKind.add
        if(componentKind.add === componentKind.wall){
            componentKind.add = componentKind.weight
            keyboardSupport.down = false
        }else{
            componentKind.add = componentKind.wall
            keyboardSupport.down = true
        }

    }else if(event.key === keyboardSupport.plus && position.weightValue + weightValueRange.increase <= weightValueRange.max){ // 限制weightValueRange
        if(weightValue != null){
            weightValue.set("+")
            keyboardSupport.down = false
        }else{
            keyboardSupport.down = true
        }

    }else if(event.key === keyboardSupport.sub && position.weightValue - weightValueRange.increase >= weightValueRange.min){ // 限制weightValueRange
        if(weightValue != null){
            weightValue.set("-")
            keyboardSupport.down = false
        }else{
            keyboardSupport.down = true
        }

    }else if(event.key === keyboardSupport.plus || event.key === keyboardSupport.sub){ // 若weightValue = Max or Min時，利用若weightValue = true and false切換讓weightModal出現
        if(weightValue != null){
            weightValue.set(!weightValue.get.status)
            keyboardSupport.down = false
        }else{
            keyboardSupport.down = true
        }
    }

    // console.log(position.weightValue)

}
