// First load of the page:
export const getIsFirstLoad = () => {
    const isFirstLoad = localStorage.getItem("isFirstLoad");
    return isFirstLoad === null ? true : JSON.parse(isFirstLoad);
};

export const setIsFirstLoad = (isFirstLoad) => {
    localStorage.setItem("isFirstLoad", JSON.stringify(isFirstLoad));
};

// User
export const addUserToLocalStorage = (user) => {
    localStorage.setItem('user', JSON.stringify(user))
}

export const removeUserFromLocalStorage = () => {
    localStorage.removeItem('user')
}

export const getUserFromLocalStorage = () => {
    const result = localStorage.getItem('user')
    return result ? JSON.parse(result) : null
}

// Access token 
export const addAccessTokenToLocalStorage = (access_token) => {
    localStorage.setItem('access_token', JSON.stringify(access_token))
}

export const removeAccessTokenFromLocalStorage = () => {
    localStorage.removeItem('access_token')
}

export const getAccessTokenFromLocalStorage = () => {
    const result = localStorage.getItem('access_token')
    return result ? JSON.parse(result) : null

}

// refresh token
export const addRefreshTokenToLocalStorage = (refresh_token) => {
    localStorage.setItem('refresh_token', JSON.stringify(refresh_token));
};

export const removeRefreshTokenFromLocalStorage = () => {
    localStorage.removeItem('refresh_token');
};

export const getRefreshTokenFromLocalStorage = () => {
    const result = localStorage.getItem('refresh_token');
    return result ? JSON.parse(result) : null;
};

// Visualizations
const VISUALIZATIONS_KEY = 'visualizations';

export const initializeVisualizations = () => {
    if (!localStorage.getItem('visualizations')) {
        localStorage.setItem('visualizations', JSON.stringify([]));
    }
};

export function getVisualizationsFromLocalStorage() {
    const data = localStorage.getItem(VISUALIZATIONS_KEY);
    if (!data) {
        return [];
    }
    return JSON.parse(data);
}

export function appendVisualizationToLocalStorage(visualization) {
    const currentVisualizations = getVisualizationsFromLocalStorage();
    const updatedVisualizations = [...currentVisualizations, visualization];
    localStorage.setItem(VISUALIZATIONS_KEY, JSON.stringify(updatedVisualizations));
}

export function generateUniqueIndex() {
    const currentVisualizations = getVisualizationsFromLocalStorage();
    if (currentVisualizations.length === 0) {
        return 1;
    }
    const maxIndex = currentVisualizations.reduce((max, visualization) => Math.max(max, visualization.index), 0);
    return maxIndex + 1;
}

export function removeVisualizationFromLocalStorage(index) {
    const visualizations = getVisualizationsFromLocalStorage();
    const filteredVisualizations = visualizations.filter((viz) => viz.index !== index);
    localStorage.setItem('visualizations', JSON.stringify(filteredVisualizations));
}

export function removeAllVisualizationsFromLocalStorage() {
    localStorage.removeItem('visualizations')
}

export function updateVisualizationInLocalStorage(index, newTitle, newDescription) {
    const visualizations = getVisualizationsFromLocalStorage();
    const updatedVisualizations = visualizations.map((visualization) => {
        if (visualization.index === index) {
            return {
                ...visualization,
                title: newTitle,
                description: newDescription,
            };
        }
        return visualization;
    });
    localStorage.setItem(VISUALIZATIONS_KEY, JSON.stringify(updatedVisualizations));
}

/************************************************************************************** */
// Visualizations Edit mode
const EDIT_VISUALIZATIONS_KEY = 'edit_visualizations';

export const initializeEditVisualizations = () => {
    if (!localStorage.getItem(EDIT_VISUALIZATIONS_KEY)) {
        localStorage.setItem(EDIT_VISUALIZATIONS_KEY, JSON.stringify([]));
    }
};

export const setEditVisualizations = (editVisualizations) => {
    localStorage.setItem(EDIT_VISUALIZATIONS_KEY, JSON.stringify(editVisualizations));
}

export function getEditVisualizationsFromLocalStorage() {
    const data = localStorage.getItem(EDIT_VISUALIZATIONS_KEY);
    if (!data) {
        return [];
    }
    return JSON.parse(data);
}

export function appendEditVisualizationToLocalStorage(visualization) {
    const currentVisualizations = getEditVisualizationsFromLocalStorage();
    const updatedVisualizations = [...currentVisualizations, visualization];
    localStorage.setItem(EDIT_VISUALIZATIONS_KEY, JSON.stringify(updatedVisualizations));
}

export function removeEditVisualizationFromLocalStorage(index) {
    const visualizations = getEditVisualizationsFromLocalStorage();
    const filteredVisualizations = visualizations.filter((viz) => viz.index !== index || viz.id !== index);
    localStorage.setItem(EDIT_VISUALIZATIONS_KEY, JSON.stringify(filteredVisualizations));
}

export function removeAllEditVisualizationsFromLocalStorage() {
    localStorage.removeItem(EDIT_VISUALIZATIONS_KEY)
}

export function generateUniqueEditIndex() {
    const currentVisualizations = getEditVisualizationsFromLocalStorage();
    if (currentVisualizations.length === 0) {
        return 1;
    }
    const maxIndex = currentVisualizations.reduce((max, visualization) => Math.max(max, visualization.index_edit), 0);
    return maxIndex + 1;
}


// Edit mode
export const initializeEditMode = () => {
    localStorage.setItem('editMode', 0);
};

export const setEditModeToZero = () => {
    localStorage.setItem('editMode', 0);
};

export const setEditModeToOne = () => {
    localStorage.setItem('editMode', 1);
};

export const removeEditMode = () => {
    localStorage.removeItem('editMode');
};

export const getEditMode = () => {
    const result = localStorage.getItem('editMode')
    return parseInt(result); 
}

// View mode
export const initializeViewMode = () => {
    localStorage.setItem('viewMode', 0);
};

export const setViewModeToZero = () => {
    localStorage.setItem('viewMode', 0);
};

export const setViewModeToOne = () => {
    localStorage.setItem('viewMode', 1);
};

export const removeViewMode = () => {
    localStorage.removeItem('viewMode');
};

export const getViewMode = () => {
    const result = localStorage.getItem('viewMode')
    return parseInt(result); 
}

// Add mode
export const initializeAddMode = () => {
    localStorage.setItem('addMode', 0);
};

export const setAddModeToZero = () => {
    localStorage.setItem('addMode', 0);
};

export const setAddModeToOne = () => {
    localStorage.setItem('addMode', 1);
};

export const removeAddMode = () => {
    localStorage.removeItem('addMode');
};

export const getAddMode = () => {
    const result = localStorage.getItem('addMode')
    return parseInt(result); 
}