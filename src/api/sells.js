import { doc , addDoc , getDocs , collection , getDoc , Timestamp } from 'firebase/firestore';
import { db } from '../firebase';

export const createSell = async (args) => {
    try {
        args.date = Timestamp.now();
        await addDoc(collection(db,'sells'),{...args});
        return {success:true}
    } catch (error) {
        throw error;
    }
}

export const readSells = async () => {
    try {
        let data = []
        let list = []
        const qSnap = await getDocs(collection(db,'sells'));
        qSnap.forEach(doc => {
            const item = doc.data();
            const args = {
                id:doc.id,
                fecha:item.date.toDate().toLocaleDateString('es-ES'),
                monto:item.price,
                status:item.payed,
                outbound:item.outbound.split('/')[2]
            }
            data = [...data,args];
            list = [...list,item]
        });
        return {success:true,data,list}
    } catch (error) {
        throw error;        
    }
}

export const getSell = async (id) => {
    try {
        const ref = doc(db,'sells',id);
        const snap = await getDoc(ref);
        if(!snap.exists()) return {success:false}
        return {data:snap.data()}
    } catch (error) {
        throw error;
    }
}
