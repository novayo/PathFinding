import TableUI from './TableHelper/TableUI';
import { useContext, useEffect } from 'react';
import Spinner from 'react-bootstrap/Spinner';
import { sysStatusContext } from '../Core';

function Table() {  
	const sysStatus = useContext(sysStatusContext);

	useEffect(()=>{
		setTimeout(()=>{sysStatus.set("IDLE");}, 1000);
	}, [])

	if (sysStatus.get === "LOADING"){
		return (<Spinner animation="border" variant="warning" />);
	}
	else{
		return (
	        <div id = "UI">
	            <TableUI/>
	        </div>
	    )
	}
}

export default Table
