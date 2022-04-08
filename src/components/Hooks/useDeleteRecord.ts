import { useMutation, useQueryClient } from "react-query";
import React from "react";
import axios from "axios";

interface IDeleteRecordParams {
  id: number;
}

interface IDeleteRecord {
  data: boolean | undefined;
  loading: boolean;
  error: boolean;
}

export const useDeleteRecord = () => {
  const queryclient = useQueryClient();

  const mutation = useMutation(
    ({ id }: IDeleteRecordParams) => {
      return axios.delete(process.env.REACT_APP_API_URL + `/Test?id=${id}`);
    },
    {
      onSuccess: () => {
        queryclient.invalidateQueries("records");
      },
    }
  );

  const deleteRecord = async ({
    id,
  }: IDeleteRecordParams): Promise<IDeleteRecord> => {
    try {
      await mutation.mutateAsync({ id });
      return {
        data: mutation.data?.data,
        loading: mutation.isLoading,
        error: mutation.isError,
      };
    } catch (error) {
      return {
        data: undefined,
        loading: false,
        error: true,
      };
    }
  };

  return { deleteRecord };
};
