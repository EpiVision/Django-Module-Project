
const useCookies = () => {

    const saveToCookie = (cookieName, cookieValue) => {
        console.log('entro a saveToCookie');
        console.log(document.cookie);
        document.cookie = document.cookie+"; "+ `${cookieName}=${JSON.stringify(cookieValue)}`;
        console.log(document.cookie);
        console.log('out of saveToCookie');
    }
        
    const readCookie = (cookieName, cookieValue) => {
      const cookies = document.cookie.split(';')
      let formCookie = "";
          cookies.forEach((cookie) => {
            if(cookie.startsWith(`${cookieName}=`)){
               formCookie = cookie.replace(`${cookieName}=`,"");
            }
          })
          return formCookie
      }
      
      return [saveToCookie, readCookie]
}
export function deleteAllCookies() {
    const cookies = document.cookie.split(";");

    for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i];
        const eqPos = cookie.indexOf("=");
        const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
        document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
    }
}
export default useCookies;