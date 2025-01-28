const functions = {

    url: 'localhost:8000',

    getUserData: () => {
        const userId = localStorage.getItem("userid");
        const username = localStorage.getItem("username");
        const clearance = localStorage.getItem("clearance");
    
        return {
          userId: userId || null, // Return `null` if the value is not found
          username: username || null,
          clearance: clearance || null,
        };
      },

    generalValidate: () => {
        const data = functions.getUserData();
        if (data.userId === null || data.username === null || data.clearance === null) {
            return false;
        }
        return true;
    },

    clientValidate: () => {
        const data = functions.getUserData();
        if (functions.generalValidate()) {
            if (data.clearance === 4) {
                return true
            }
        }
        return false;
    },

    employeeValidate: () => {
        const data = functions.getUserData();
        if (functions.generalValidate()) {
            if (data.clearance === 1 || data.clearance === 2 || data.clearance === 3) {
                return true
            }
        }
        return false;
    }
}

export default functions;