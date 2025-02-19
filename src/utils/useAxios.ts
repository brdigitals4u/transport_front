import { useMutation, UseMutationResult } from "@tanstack/react-query";
import { requestPayload } from "./requestPayload";






interface AxiosProps {
  action?: string;
  url: string;
  onSuccess?: (data: any) => void;
  onError?: (error: any) => void;
}

export const useAxios = ({
  action,
  url,
  onSuccess = () => {},
  onError = () => {},
}: AxiosProps) => {
  const mutation: UseMutationResult<any, any, any, any> = useMutation({
    mutationFn: (body: any) => {
      const payload = {
        method: action,
        ...body,
      };
      return requestPayload(payload, url);
    },

    onSuccess(data) {
      onSuccess(data);
    },
    onError(error) {
      onError(error);
    },
  });

  return {
    mutate: mutation.mutate,
    res: mutation?.data,
    isPending: mutation.isPending, // ✅ Corrected property
    error: mutation.error,
  };
};
