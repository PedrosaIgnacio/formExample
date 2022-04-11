import axios from "axios";
import React from "react";
import { useMutation, useQueryClient } from "react-query";

interface IUpdateRecordParams {
  id: number | undefined;
  firstname: string | undefined;
  lastname: string | undefined;
}
interface IRecord {
  id: number;
  firstname: string;
  lastname: string;
}

interface IUpdateRecord {
  data: IRecord;
  loading: boolean;
  error: boolean;
}

export const useUpdateRecord = () => {
  const queryclient = useQueryClient();
  const mutation = useMutation(
    ({ id, firstname, lastname }: IUpdateRecordParams) => {
      return axios.put(process.env.REACT_APP_API_URL + "/Test", {
        id: id,
        firstname: firstname,
        lastname: lastname,
      });
    },
    {
      onSuccess: () => {
        queryclient.invalidateQueries("records");
      },
    }
  );
  const updateRecord = async ({
    id,
    firstname,
    lastname,
  }: IUpdateRecordParams): Promise<IUpdateRecord> => {
    try {
      await mutation.mutateAsync({ id, firstname, lastname });
      return {
        data: mutation.data?.data as unknown as IRecord,
        loading: mutation.isLoading,
        error: mutation.isError,
      };
    } catch (error) {
      return {
        data: mutation.data?.data as unknown as IRecord,
        loading: false,
        error: true,
      };
    }
  };
  return { updateRecord };
};
