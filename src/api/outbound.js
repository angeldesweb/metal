import { collection, addDoc  , updateDoc , doc , Timestamp , getDoc , getDocs } from "firebase/firestore";
import { getMaterial } from './materials';
import { db } from '../firebase';

const addMaterial = async (material) => {
    try {
        const name = material.material.split('/')[2]
        const ref = doc(db,'materials',name);
        const data = await getMaterial(name);
        await updateDoc(ref,{cantidad:parseInt(data.data.cantidad) - material.cantidad});
        return;
    } catch (error) {
        throw error;
    }
}

export const createOutbound = async (args) => {
    try {
        args.date = Timestamp.now();
        await Promise.all(args.materials.map(doc => addMaterial(doc)));
        await addDoc(collection(db,'outbounds'),{...args});
        return {success:true}
    } catch (error) {
        throw error;
    }
}

export const readOutbounds = async () => {
    try {
        let data = [];
        let list = [];
        const qSnap = await getDocs(collection(db,'outbounds'));
        qSnap.forEach(doc => {
            const item = doc.data();
            let id = doc.id
            let materialcount = item.materials.length;
            let materials = item.materials;
            let date = item.date.toDate().toLocaleDateString('es-ES');
            let args = {
                id,
                date,
                materialcount,
                materials
            };
            data = [...data,args];
            list = [...list,item,id];
        });
        return {success:true,data,list}
    } catch (error) {
        throw error;        
    }
}

export const getOutbound = async (id) => {
    try {
        const ref = doc(db,'outbounds',id);
        const snap = await getDoc(ref);
        if(!snap.exists()) return {success:false}
        return {out:snap.data()}
    } catch (error) {
        throw error;
    }
}