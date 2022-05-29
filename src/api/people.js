import { doc , setDoc , getDocs , collection , getDoc } from 'firebase/firestore';
import { db } from '../firebase';

export const addPeople = async (args) => {
    try {
        await setDoc(doc(db,'people',args.id),{...args});
        return {success:true,message:'Datos registrados exitosamente'};
    } catch (error) {
        throw error;
    }
};

export const readProviders = async () => {
    try {
        let data = []
        let list = []
        const qSnap = await getDocs(collection(db,'people'));
        qSnap.forEach(doc => {
            const item = doc.data();
            const args = {
                nombre:item.name,
                'cédula':item.id,
                'teléfono':item.phone
            }
            data = [...data,args];
            list = [...list,item]
        });
        return {success:true,data,list}
    } catch (error) {
        throw error;        
    }
}

export const getPeople = async (id) => {
    try {
        const ref = doc(db,'people',id);
        const snap = await getDoc(ref);
        if(!snap.exists()) return {success:false}
        return {person:snap.data()}
    } catch (error) {
        throw error;
    }
}