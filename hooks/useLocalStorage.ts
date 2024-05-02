const useLocalStorage = (key:string) => {
    return localStorage.getItem('key')
}

export default useLocalStorage