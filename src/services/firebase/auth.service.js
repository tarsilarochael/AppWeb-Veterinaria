import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "./config";

export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    // Pega as informações do usuário logado
    const user = result.user;
    
    return {
      name: user.displayName,
      email: user.email,
      photoURL: user.photoURL,
      uid: user.uid,
      token: await user.getIdToken()
    };
  } catch (error) {
    console.error("Erro no login com Google:", error);
    throw error;
  }
};