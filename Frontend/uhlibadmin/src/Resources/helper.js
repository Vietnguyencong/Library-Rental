
import { TopToolbar, ShowButton, ListButton} from 'react-admin';
import TrueIcon from '@material-ui/icons/Done'
import FalseIcon from '@material-ui/icons/Clear'


export const  MyBooleanfield = ({ record={}, source}) =>{
    if (record[source] === 1 ){
        return <div>
            <TrueIcon/> 
        </div>
    }
    else{
        return <div><FalseIcon/></div>
    }
}


export const  Actions = ({ basePath, data, resource }) => (
    <TopToolbar>
        <ShowButton basePath={basePath} record={data} />
        <ListButton basePath={basePath} label="Back"  />
    </TopToolbar>
);