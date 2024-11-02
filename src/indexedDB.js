// indexedDB.js

// Fonction pour initialiser la base de données IndexedDB
export const initDB = (callback) => {
  const request = indexedDB.open("MusixelDB", 2);

  request.onupgradeneeded = (event) => {
    const db = event.target.result;
    if (!db.objectStoreNames.contains("tracks")) {
      db.createObjectStore("tracks", { autoIncrement: true });
    }
    if (!db.objectStoreNames.contains("uploadedFiles")) {
      db.createObjectStore("uploadedFiles", { autoIncrement: true });
    }
  };

  request.onerror = (event) => {
    console.log("Erreur d'ouverture de la base de données", event);
  };

  request.onsuccess = (event) => {
    console.log("Base de données ouverte avec succès");
  };
};

// Fonction pour ajouter un enregistrement (track) à l'object store "tracks"
export const addTrack = (track, updateFunction, setOkMessage) => {
  const request = indexedDB.open("MusixelDB", 2);
  request.onsuccess = (event) => {
    const db = event.target.result;
    const transaction = db.transaction(["tracks"], "readwrite");
    const objectStore = transaction.objectStore("tracks");
    const addRequest = objectStore.add(track);

    addRequest.onsuccess = () => {
      refreshData(updateFunction);  // Rafraîchir les données après l'ajout
      setOkMessage(`Le fichier a été enregistré avec succès !`);
    };
  };
};

// Function to retrieve all data from the "tracks" object store
export const getAllTracks = () => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open("MusixelDB", 2);

    request.onsuccess = (event) => {
      const db = event.target.result;
      const transaction = db.transaction(["tracks"], "readonly");
      const objectStore = transaction.objectStore("tracks");
      const getAllRequest = objectStore.getAll();

      getAllRequest.onsuccess = () => {
        resolve(getAllRequest.result);
      };

      getAllRequest.onerror = () => {
        reject("Error retrieving data");
      };

      transaction.onerror = () => {
        reject("Transaction error");
      };
    };

    request.onerror = () => {
      reject("Error opening database");
    };
  });
};

// Function to refresh data
export const refreshData = async (updateFunction) => {
  if (typeof updateFunction !== 'function') {
    console.error('updateFunction must be a function');
    return;
  }
  try {
    const allTracks = await getAllTracks();
    updateFunction(allTracks);
  } catch (error) {
    console.error('Error refreshing data:', error);
  }
};

// Fonction pour ajouter le nom du fichier uploadé
export const addUploadedFileName = (fileName) => {
  const request = indexedDB.open("MusixelDB", 2);
  request.onsuccess = (event) => {
    const db = event.target.result;
    const transaction = db.transaction(["uploadedFiles"], "readwrite");
    const objectStore = transaction.objectStore("uploadedFiles");
    objectStore.add(fileName);
  };
};

// Fonction pour supprimer toutes les données des object stores
// indexedDB.js

export const clearAllData = () => {
  const request = indexedDB.open("MusixelDB", 2);

  request.onsuccess = (event) => {
    const db = event.target.result;
    const transaction = db.transaction(["tracks", "uploadedFiles"], "readwrite");

    transaction.oncomplete = () => {
      console.log("Toutes les données ont été supprimées.");
      window.location.reload(); // Refresh the page after clearing data
    };

    transaction.onerror = (event) => {
      console.error("Erreur de transaction :", event.target.error);
    };

    const tracksStore = transaction.objectStore("tracks");
    tracksStore.clear().onsuccess = () => {
      console.log("Object store 'tracks' vidé.");
    };

    const uploadedFilesStore = transaction.objectStore("uploadedFiles");
    uploadedFilesStore.clear().onsuccess = () => {
      console.log("Object store 'uploadedFiles' vidé.");
    };
  };

  request.onerror = (event) => {
    console.error("Erreur lors de l'ouverture de la base de données :", event.target.error);
  };
};

// Fonction pour vérifier si le fichier a déjà été uploadé
export const checkIfFileExists = async (fileName) => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open("MusixelDB", 2);
    request.onsuccess = (event) => {
      const db = event.target.result;
      const transaction = db.transaction(["uploadedFiles"], "readonly");
      const objectStore = transaction.objectStore("uploadedFiles");
      const getAllRequest = objectStore.getAll();

      getAllRequest.onsuccess = () => {
        const allFileNames = getAllRequest.result;
        const fileExists = allFileNames.includes(fileName);
        resolve(fileExists);
      };

      getAllRequest.onerror = () => {
        reject("Erreur lors de la récupération des noms de fichiers");
      };
    };
  });
};

