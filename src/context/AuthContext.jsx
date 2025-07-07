import { createContext, useState } from "react";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [isLogged, setIsLogged] = useState(() => {
    const loggedData = localStorage.getItem("logged");
    return !!loggedData;
  });
  const [isAdmin, setIsAdmin] = useState(false);
  const [user, setUser] = useState();

  async function getUsers() {
    return await fetch("/data/users.json")
      .then((res) => {
        if (!res.ok) throw new Error("Error al cargar el archivo");
        return res.json();
      })
      .catch((err) => {
        console.error("Error:", err);
      });
  }
  async function login(obj) {
    const users = await getUsers();
    //const jsonUsers = await getUsers();
    const localUsers = JSON.parse(localStorage.getItem("localUsers"));

    //users.concat(jsonUsers);
    if (localUsers && localUsers.length > 0) {
      users.concat(localUsers);
    }

    const filteredUser = users.filter(
      (user) => user.email.toLowerCase() === obj.email.toLowerCase()
    );

    if (!filteredUser || filteredUser.length < 1) {
      return "Invalid e-mail";
    } else {
      if (filteredUser[0].password !== obj.password) {
        return "Wrong password";
      } else {
        const user = filteredUser[0];
        user.password = "********";
        localStorage.setItem("logged", JSON.stringify(user));
        localStorage.setItem("isAdmin", JSON.stringify(user.isAdmin));
        setUser(user);
        setIsLogged(true);
        setIsAdmin(user.isAdmin);

        return "logged";
      }
    }
  }

  function logLocalUser(obj) {
    setUser(obj);
    setIsLogged(true);
    setIsAdmin(obj.isAdmin);
  }

  function logout() {
    localStorage.removeItem("logged");
    localStorage.removeItem("isAdmin");
    setIsLogged(false);
  }

  function setAdmin() {
    setIsAdmin((prevIsAdmin) => !prevIsAdmin);
  }

  function checkIsAdmin() {
    const isAdmin = JSON.parse(localStorage.getItem("isAdmin"));
    return isAdmin;
  }

  return (
    <AuthContext.Provider
      value={{
        isLogged,
        isAdmin,
        login,
        logout,
        setAdmin,
        checkIsAdmin,
        user,
        logLocalUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
