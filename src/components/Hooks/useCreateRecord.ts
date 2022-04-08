import { useMutation, useQueryClient } from "react-query";
import React from "react";
import axios from "axios";

interface ICreateRecordParams {
  firstname: string;
  lastname: string;
}

interface IRecord {
  id: number;
  firstname: string;
  lastname: string;
}

interface ICreateRecord {
  data: IRecord;
  loading: boolean;
  error: boolean;
}

export const useCreateRecord = () => {
  const queryclient = useQueryClient();

  const mutation = useMutation(
    ({ firstname, lastname }: ICreateRecordParams) => {
      return axios.post(process.env.REACT_APP_API_URL + "/Test", {
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

  const createRecord = async ({
    firstname,
    lastname,
  }: ICreateRecordParams): Promise<ICreateRecord> => {
    try {
      await mutation.mutateAsync({ firstname, lastname });
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

  return { createRecord };
};
