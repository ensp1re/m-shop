

export default async function getUSers() {
    try {
        const users = prisma?.user.findMany()
        return new Promise((resolve) =>
        setTimeout(() => {
            resolve(users)
        }, 1000))
    } catch (error: any) {
        throw new Error(error)
    }
}