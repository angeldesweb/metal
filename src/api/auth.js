import { signInWithEmailAndPassword , sendEmailVerification, sendPasswordResetEmail ,
    createUserWithEmailAndPassword 
} from 'firebase/auth';
import { doc , getDoc , getDocs , collection , setDoc } from 'firebase/firestore';
import { auth , db , logOut  } from '../firebase';

export const signIn = async (args) => {
    try {
        const {email,password} = args;
        const userCredential = await signInWithEmailAndPassword(auth,email,password);
        const { uid , emailVerified } = userCredential.user;
        const docRef = doc(db,'users',uid);
        const docSnap = await getDoc(docRef);
        if(!docSnap.exists()) return {success:false,message:'No se encuentra registrado el usuario'};
        let user = docSnap.data();
        user.verified = emailVerified;
        if(!user.verified) sendEmailVerification(userCredential.user)
        user.uid = uid; 
        return {success:true,data:user};
    } catch (error) {
        throw error;
    }
};

const addUser = async (uid,args) => {
    try {
        const {name,email,role} = args;
        await setDoc(doc(db,'users',uid),{name,email,role});
        return {success:true,message:'Registrado exitosamente'};
    } catch (error) {
        throw error;
    }
};

export const signUp = async (args) => {
    try {
        const user = await createUserWithEmailAndPassword(auth,args.email,args.password);
        const { uid } = user.user;
        const data = await addUser(uid,{...args});
        console.log(data);
        return {data};
    } catch (error) {
        throw error;        
    }
}

export const signOut = async () => {
    try {
        await logOut();
    } catch (error) {
        throw error;
    }
}

export const readUsers = async () => {
    try {
        let data = [];
        const qSnap = await getDocs(collection(db,'users'));
        qSnap.forEach(doc => {
            const item = doc.data();
            data = [...data,item];

        });
        return {success:true,data}
    } catch (error) {
        throw error;        
    }
}

export const resetPassword = async (email) => {
    try {
        const data = await sendPasswordResetEmail(auth,email);
        return data
    } catch (error) {
        throw error;
    }
}

