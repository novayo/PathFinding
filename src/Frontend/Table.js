import TableUI from './TableHelper/TableUI';
import { useContext, useEffect } from 'react';
import Spinner from 'react-bootstrap/Spinner';
import { sysStatusContext } from '../Core';
import WeightModal from './TableHelper/WeightModal';

function Table() {  
	const sysStatus = useContext(sysStatusContext);

	useEffect(()=>{
		setTimeout(()=>{sysStatus.set("IDLE");}, 1000);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])
	

	if (sysStatus.get === "LOADING"){
		return (<Spinner animation="border" variant="warning" />);
	}
	else{
		return (
	        <div id = "UI">
	            <TableUI/>
				<WeightModal />
	        </div>
	    )
	}
}

export default Table
