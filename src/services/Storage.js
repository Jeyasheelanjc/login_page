export const StorageUser = (dataInput) => {
    localStorage.setItem("idToken", dataInput)
}

export const getUserData = () => {
    return localStorage.getItem("idToken")
}
export const removeUserData = () => {
    return localStorage.removeItem("idToken")

}