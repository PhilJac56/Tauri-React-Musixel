// indexedDB.js

// Function to initialize the IndexedDB database
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
    console.log("Error opening the database", event);
  };

  request.onsuccess = (event) => {
    console.log("Database opened successfully");
  };
};

// Function to add a record (track) to the "tracks" object store
export const addTrack = (track, updateFunction, setOkMessage) => {
  const request = indexedDB.open("MusixelDB", 2);
  request.onsuccess = (event) => {
    const db = event.target.result;
    const transaction = db.transaction(["tracks"], "readwrite");
    const objectStore = transaction.objectStore("tracks");
    const addRequest = objectStore.add(track);

    addRequest.onsuccess = () => {
      refreshData(updateFunction);  // Refresh data after adding
      setOkMessage(`The file has been successfully saved!`);
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

// Function to add the name of the uploaded file
export const addUploadedFileName = (fileName) => {
  const request = indexedDB.open("MusixelDB", 2);
  request.onsuccess = (event) => {
    const db = event.target.result;
    const transaction = db.transaction(["uploadedFiles"], "readwrite");
    const objectStore = transaction.objectStore("uploadedFiles");
    objectStore.add(fileName);
  };
};

// Function to clear all data from the object stores
export const clearAllData = () => {
  const request = indexedDB.open("MusixelDB", 2);

  request.onsuccess = (event) => {
    const db = event.target.result;
    const transaction = db.transaction(["tracks", "uploadedFiles"], "readwrite");

    transaction.oncomplete = () => {
      console.log("All data has been cleared.");
      window.location.reload(); // Refresh the page after clearing data
    };

    transaction.onerror = (event) => {
      console.error("Transaction error:", event.target.error);
    };

    const tracksStore = transaction.objectStore("tracks");
    tracksStore.clear().onsuccess = () => {
      console.log("Object store 'tracks' cleared.");
    };

    const uploadedFilesStore = transaction.objectStore("uploadedFiles");
    uploadedFilesStore.clear().onsuccess = () => {
      console.log("Object store 'uploadedFiles' cleared.");
    };
  };

  request.onerror = (event) => {
    console.error("Error opening the database:", event.target.error);
  };
};

// Function to check if the file has already been uploaded
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
        reject("Error retrieving file names");
      };
    };
  });
};

