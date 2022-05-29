import { doc , setDoc , getDocs , collection , getDoc } from 'firebase/firestore';
import { db } from '../firebase';

export const addMaterial = async (args) => {
    try {
        await setDoc(doc(db,'materials',args.name),{...args});
        return {success:true,message:'Material registrado exitosamente'};
    } catch (error) {
        throw error;
    }
};

export const readMaterials = async () => {
    try {
        let data = [];
        let list = [];
        const qSnap = await getDocs(collection(db,'materials'));
        qSnap.forEach(doc => {
            const item = doc.data();
            const args = {
                nombre:item.name,
                'tipo':item.tipo,
                'existencia':item.cantidad + item.medidas
            }
            data = [...data,args];
            list = [...list,item];

        });
        return {success:true,data,list}
    } catch (error) {
        throw error;        
    }
}

export const getMaterial = async (name) => {
    try {
        const ref = doc(db,'materials',name);
        const snap = await getDoc(ref);
        if(!snap.exists()) return {success:false}
        return {data:snap.data()}
    } catch (error) {
        throw error;
    }
}