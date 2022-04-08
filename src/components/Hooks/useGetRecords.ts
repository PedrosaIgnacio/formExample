import React from "react";
import axios from "axios";
import { useQuery } from "react-query";

interface IRecord {
  id: number;
  firstname: string;
  lastname: string;
}

interface IRecords {
  data: Array<IRecord>;
  loading: boolean;
  error: boolean;
}

export const useGetRecords = (): IRecords => {
  const records = useQuery("records", () => {
    return axios.get(process.env.REACT_APP_API_URL + "/Test");
  });
  return {
    data: records.data?.data ?? [],
    loading: records.isLoading,
    error: records.isError,
  };
};
