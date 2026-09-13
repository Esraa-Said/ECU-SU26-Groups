async function fetchUser(userId) {
    try {
        const user = await getUserData(userId);
        return user;
    } catch (error) {
        return `Failed to fetch user: ${error.message}`;
    }
}