import { Notyf } from 'notyf';
import 'notyf/notyf.min.css';


const CenterTop = new Notyf({
    duration:10000,
    position:{x:'center',y:'top'},
    types: [
        {
          type: 'info',
          background: 'blue',
          icon: false
        }
      ]
});

const RightTop = new Notyf({
    duration:10000,
    position:{x:'right',y:'top'}
});

export const Info = (message) => CenterTop.open({type:'info',message})