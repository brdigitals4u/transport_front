import { useEffect, useState } from "react";
import axios from "axios";
import { useAxios } from "../utils/useAxios";
import { getItem } from "../utils/storage";

export const useMenus = (userRole: string) => {
  const [menus, setMenus] = useState([]);

  const user = getItem("user");
  // console.log("CARRIER");
  const userRole1 = user?.user.role;
  //console.log(userRole1);

  const { res, mutate, isPending, error } = useAxios({
    url: "/api/service/menu",
  });

  useEffect(() => {
    if (userRole1) {
      mutate({
        role: userRole1,
      });
    }
  }, [userRole1]);

  console.log(userRole);

  useEffect(() => {
    if (res) {
      setMenus(res?.data?.data);
    }
  }, [res]);

  console.log(res);

  //   useEffect(() => {
  //     const fetchMenus = async () => {
  //       try {
  //         const { data } = await axios.get(`/api/menus?role=${userRole}`);
  //         setMenus(data);
  //       } catch (error) {
  //         console.error("Error fetching menus", error);
  //       }
  //     };

  //     if (userRole) fetchMenus();
  //   }, [userRole]);

  return menus;
};
