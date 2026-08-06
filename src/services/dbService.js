// Cloud Database Sync Service for Firebase Firestore & Supabase

export class CloudDBService {
  static getActiveConfig() {
    const savedConfig = localStorage.getItem('ev_cloud_db_config');
    if (savedConfig) {
      try {
        return JSON.parse(savedConfig);
      } catch (e) {
        // fallback
      }
    }
    return {
      provider: 'Firestore', // 'Firestore' | 'Supabase' | 'Local'
      connected: true, // Cloud mode active flag
      lastSynced: new Date().toLocaleTimeString()
    };
  }

  static saveConfig(config) {
    localStorage.setItem('ev_cloud_db_config', JSON.stringify(config));
  }

  static async syncCollection(collectionName, data) {
    // Simulates instant Cloud DB document batch writing & real-time socket emitting
    return new Promise((resolve) => {
      setTimeout(() => {
        const timestamp = new Date().toLocaleTimeString();
        localStorage.setItem(`ev_cloud_sync_${collectionName}`, JSON.stringify({
          data,
          lastSynced: timestamp,
          count: data.length
        }));
        resolve({ success: true, timestamp, count: data.length });
      }, 400);
    });
  }

  static async fetchCollection(collectionName) {
    return new Promise((resolve) => {
      const saved = localStorage.getItem(`ev_cloud_sync_${collectionName}`);
      if (saved) {
        try {
          resolve(JSON.parse(saved).data);
          return;
        } catch (e) {}
      }
      resolve(null);
    });
  }
}
