export default function authHeader() {
  const user = JSON.parse(localStorage.getItem('customer'))

  if (user && user.jwtToken) {
    return { Authorization: 'Bearer ' + user.jwtToken } // for Spring Boot back-end
  } else {
    return {}
  }
}
