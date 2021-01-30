import PC from './HeaderHelper/HeaderHepler/PC';
import Mobile from './HeaderHelper/HeaderHepler/Mobile';

function Header() {

    if (navigator.userAgent.match(/Mobile/i)) {
        import('./HeaderHelper/Css/Mobile.css');
        return (
            <Mobile />
        )
    } else {
        import('./HeaderHelper/Css/PC.css');
        return (
            <PC />
        )
    }

}



export default Header
