import { collection, addDoc  , updateDoc , doc , Timestamp , getDocs , getDoc } from "firebase/firestore";
import { getMaterial } from './materials';
import { db } from '../firebase';

const addMaterial = async (material) => {
    try {
        const name = material.material.split('/')[2]
        const ref = doc(db,'materials',name);
        const data = await getMaterial(name);
        await updateDoc(ref,{cantidad:material.cantidad + parseInt(data.data.cantidad)});
        return;
    } catch (error) {
        throw error;
    }
}

export const readInbounds = async () => {
    try {
        let data = [];
        let list = [];
        const qSnap = await getDocs(collection(db,'inbounds'));
        qSnap.forEach(doc => {
            const item = doc.data();
            let material = item.materials.length;
            let date = item.date.toDate().toLocaleDateString('es-ES');
            let provider = item.provider;
            let providerId = String(provider).split('/')[2];
            let args = {
                id:doc.id,
                date,
                provider:providerId,
                materials:material,
                price:item.price,
                payed:item.payed
            };
            data = [...data,args];
            list = [...list,item];
        });
        return {success:true,data}
    } catch (error) {
        throw error;        
    }
}

export const createInbond = async (args) => {
    try {
        args.date = Timestamp.now();
        await Promise.all(args.materials.map(doc => addMaterial(doc)));
        await addDoc(collection(db,'inbounds'),{...args});
        return {success:true}
    } catch (error) {
        throw error;
    }
}

export const getInbound = async (id) => {
    try {
        const ref = doc(db,'inbounds',id);
        const snap = await getDoc(ref);
        if(!snap.exists()) return {success:false}
        return {data:snap.data()}
    } catch (error) {
        throw error;
    }
}