import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";

export const youtrackApi = createApi({
  reducerPath: "youtrack/api",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://demo-apptrix.myjetbrains.com/youtrack/api/",
    prepareHeaders: (headers) => {
      headers.set(
        "Authorization",
        `Bearer ${process.env.REACT_APP_YOUTRACKTOKEN}`
      );
      return headers;
    },
  }),
  refetchOnFocus: true,
  endpoints: (build) => ({
    searchUsers: build.query({
      query: () => ({
        url: "users?fields=id,login,name,email,type",
      }),
    }),
    searchTasks: build.query({
      query: (search) => ({
        url: `issues?fields=id,project(name),summary&query=summary:+%7B${search}%7D`,
      }),
    }),
    searchProject: build.query({
      query: (projectname) => ({
        url: `issues?fields=id,summary,project(name)&query=project:+%7B${projectname}%7D`,
      }),
    }),
    searchallProject: build.query({
      query: () => ({
        url: "issues?fields=id,summary,project(name)",
      }),
    }),
    searchTimesheetsProject: build.query({
        query: (id) => ({
          url: `workItems?author,creator,startDate,endDate,&query=id:+%7B${id}%7D`,
        }),
      }),
  }),
});

export const {
  useSearchUsersQuery,
  useSearchTasksQuery,
  useLazySearchProjectQuery,
  useSearchallProjectQuery,
  useSearchTimesheetsProjectQuery,
} = youtrackApi;
