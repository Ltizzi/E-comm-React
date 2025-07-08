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

  async function getRegisteredUsers() {
    const users = await getUsers();
    const localUsers = getRegisteredLocalUsers();
    return users.concat(localUsers);
  }

  function getRegisteredLocalUsers() {
    return JSON.parse(localStorage.getItem("eComUsers")) || [];
  }

  async function login(obj) {
    const users = await getRegisteredUsers();

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

  function registerUser(formUser) {
    const user = {
      email: formUser.email,
      password: formUser.password,
      name: formUser.email.split("@")[0],
      lastname: "",
      nickname: formUser.email.split("@")[0],
      isAdmin: false,
      avatar: "https://avatar.iran.liara.run/public",
    };
    const users = getRegisteredLocalUsers();
    users.push(user);
    try {
      localStorage.setItem("eComUsers", JSON.stringify(users));
      return "OK";
    } catch (err) {
      console.error(err);
      return err;
    }
  }

  async function alreadyRegister(mail) {
    const users = await getRegisteredUsers();
    return (
      users.filter((user) => user.email.toLowerCase() === mail.toLowerCase())
        .length > 0
    );
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
        alreadyRegister,
        registerUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
