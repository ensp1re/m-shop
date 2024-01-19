export async function checkUserRole(user : any) {
    if (!user || user.role !== "ADMIN") {
      throw new Error("Access denied");
    }
  }