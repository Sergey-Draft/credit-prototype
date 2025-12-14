import store from '../RTK/index';

const safeParse = (json) => {
    try {
        return JSON.parse(json);
    } catch (e) {
        console.warn("safeParse: invalid JSON", e);
        return null;
    }
};


const getUserData = () => {

    const state = store.getState();
    if (state?.user?.user) {
        return state.user.user;
    }

    const stored = localStorage.getItem("user");
    if (!stored) return null;
    const parsed = safeParse(stored);
    if (!parsed || typeof parsed !== "object") return null;

    return parsed;
};

export default getUserData;