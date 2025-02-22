import { IoIosCloseCircleOutline } from "react-icons/io";
import { useSnackbar } from "notistack";

export const SnackbarCloseButton = ({ key }: { key: string }) => {
  const { closeSnackbar } = useSnackbar();

  return (
    <button onClick={() => closeSnackbar(key)} style={{ color: "#ffffff" }}>
      X
    </button>
  );
};
