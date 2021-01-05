import { componentKind, picture } from './TableIndex'


export function WhichComponent(element, touch){

    if(element === picture.start){
        return {kind: componentKind.start, picture: picture.start, touch: touch.get.start, type: 0}

    }else if(element === picture.end){
        return {kind: componentKind.end, picture: picture.end, touch: touch.get.end, type: 0}

    }else if(element === picture.bomb){
        return {kind: componentKind.bomb, picture: picture.bomb, touch: touch.get.bomb, type: 0}

    }else if(element === picture.wall){
        return {kind: componentKind.wall, rKind: componentKind.background, picture: picture.wall, rPicture: picture.background, type: 1}
    
    }else{
        return {kind: componentKind.background, rKind: componentKind.wall, picture: picture.background, rPicture: picture.wall, type: 1}
    
    }

}