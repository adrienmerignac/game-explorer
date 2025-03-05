import { getFirestoreInstance } from "../../services/AuthService";
import { getLevelFromXP } from "./levelSystem";
import { checkForNewBadges } from "./badgeSystem";

export const updateUserXP = async (uid: string, earnedXP: number) => {
  try {
    const { db, doc, getDoc, updateDoc } = await getFirestoreInstance();
    const userRef = doc(db, "users", uid);
    const userDoc = await getDoc(userRef);

    if (!userDoc.exists()) {
      console.error("User not found in Firestore");
      return;
    }

    const userData = userDoc.data();
    const newXP = (userData.xp || 0) + earnedXP;
    const newLevel = getLevelFromXP(newXP);

    // ✅ Vérifie que `badges` est un tableau ou initialise-le
    const existingBadges = Array.isArray(userData.badges)
      ? userData.badges
      : [];
    const newBadges = checkForNewBadges({
      ...userData,
      badges: existingBadges,
    });

    console.log(
      "New XP:",
      newXP,
      "New Level:",
      newLevel,
      "New Badges:",
      newBadges
    );

    await updateDoc(userRef, {
      xp: newXP,
      level: newLevel,
      badges: newBadges,
    });

    return { xp: newXP, level: newLevel, badges: newBadges };
  } catch (error) {
    console.error("Erreur lors de la mise à jour de l'XP :", error);
  }
};
