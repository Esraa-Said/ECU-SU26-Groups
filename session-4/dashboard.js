async function getUserData(userId) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (userId <= 0) {
                reject(new Error("Invalid user ID"));
            } else {
                resolve({ id: userId, name: "John Doe" });
            }
        }, 1000);
    });
}

async function getUserPosts(userId) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve([
                { id: 101, title: "First Post", userId: userId },
                { id: 102, title: "Second Post", userId: userId }
            ]);
        }, 1000);
    });
}

async function getPostComments(postId) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve([
                { id: 1, text: "Great post!" },
                { id: 2, text: "Thanks for sharing." }
            ]);
        }, 1000);
    });
}

async function loadDashboard(userId) {
    try {
        const user = await getUserData(userId);
        const posts = await getUserPosts(user.id);
        const comments = posts.length > 0 ? await getPostComments(posts[0].id) : [];

        return {
            user,
            posts,
            comments
        };
    } catch (error) {
        return { error: error.message };
    }
}