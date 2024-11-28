import { Injectable } from '@angular/core';
import { FirebaseApp, FirebaseOptions, initializeApp } from 'firebase/app';
import { Analytics, getAnalytics } from 'firebase/analytics';
import { Auth, getAuth, GoogleAuthProvider, signInWithPopup, User } from "firebase/auth";
import { getFirestore, collection, doc, getDoc, getDocs, query, where, Firestore, addDoc } from "firebase/firestore";

@Injectable({
  providedIn: 'root',
})
export class DatabaseService {
  private firebaseConfig: FirebaseOptions = {
    apiKey: 'AIzaSyDJvCGra1gDM3dl2ecNn_Z6olJOJv8spyU',
    authDomain: 'countdown-b9409.firebaseapp.com',
    projectId: 'countdown-b9409',
    storageBucket: 'countdown-b9409.firebasestorage.app',
    messagingSenderId: '351457288353',
    appId: '1:351457288353:web:c5e32e71b6a0f56f6d50e0',
    measurementId: 'G-BVYG90KCNZ',
  };
  private app: FirebaseApp;
  private analytics: Analytics;
  private provider: GoogleAuthProvider;
  private auth: Auth;
  private user: User | null = null;
  private db: Firestore;

  constructor() {
    this.app = initializeApp(this.firebaseConfig);
    this.analytics = getAnalytics(this.app);
    this.provider = new GoogleAuthProvider();
    this.auth = getAuth();
    this.auth.useDeviceLanguage();
    this.db = getFirestore();

    this.auth.onAuthStateChanged(user => {
      if (user) {
        this.user = user;
      } else {
        this.user = null;
      }
    })
  }

  public login(): void {
    signInWithPopup(this.auth, this.provider).then((result) => {
      this.user = result.user;
    }).catch((error) => {
      console.error(error);
    });
  }

  public logout(): void {
    this.auth.signOut().then(() => {
      this.user = null;
    }).catch((error) => {
      console.error(error);
    });
  }

  public getUser(): User | null {
    return this.user;
  }

  public async getEvents(): Promise<any> {
    if (!this.user)
      return Promise.reject("User not logged in");
    
    try {
      const eventsRef = collection(this.db, "users", this.user.uid, "events");
      const eventSnapshot = await getDocs(eventsRef);
      return Promise.resolve(eventSnapshot.docs.map(doc => doc.data()));
    }
    catch (error) {
      return Promise.reject(error);
    }
  }

  public async createEvent(): Promise<any> {
    if (!this.user)
      return Promise.reject("User not logged in");

    try {
      const eventsRef = collection(this.db, "users", this.user.uid, "events");
      const eventDocRef = await addDoc(eventsRef, {
        test: 2,
      });
    } catch (error) {
      return Promise.reject(error);
    }
  }
}
