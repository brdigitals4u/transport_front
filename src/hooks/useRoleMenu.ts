import { useEffect, useState } from "react";
import axios from "axios";
import { useAxios } from "../utils/useAxios";

export const useMenus = (userRole: string) => {
  const [menus, setMenus] = useState([]);

  const { res, mutate, isPending, error } = useAxios({
    url: "/api/service/menu",
  });

  useEffect(() => {
    if (userRole) {
      mutate({
        role: userRole,
      });
    }
  }, [userRole]);

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
