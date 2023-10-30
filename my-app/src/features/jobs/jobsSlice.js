import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getJobs, addJobs, editJobs, deleteJobs } from "./jobsAPI";

const initialState = {
  jobs: [],
  isLoading: false,
  isError: false,
  error: "",
  editJobs: {},
  status: "",
  search: "",
  filterJobsBySalary: "Default",
};

export const fetchJobs = createAsyncThunk("jobs/fetchJobs", async () => {
  const allJobs = await getJobs();
  return allJobs;
});

export const createJob = createAsyncThunk("job/createJob", async (data) => {
  const newJobs = await addJobs(data);
  return newJobs;
});

export const editJob = createAsyncThunk("job/editJob", async ({ id, data }) => {
  const updateJobs = await editJobs(id, data);
  return updateJobs;
});

export const removeJob = createAsyncThunk("job/removeJob", async (id) => {
  const removeJobs = await deleteJobs(id);
  return removeJobs;
});

const jobsSlice = createSlice({
  name: "jobs",
  initialState,
  reducers: {
    editForm: (state, action) => {
      state.editJobs = action.payload;
    },

    //filter-books
    filterJobs: (state, action) => {
      state.status = action.payload;
    },
    //search books
    searchJobs: (state, action) => {
      state.search = action.payload;
    },
    //search books
    searchJobsBySalaryValue: (state, action) => {
      state.filterJobsBySalary = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      //FETCH-DATA
      .addCase(fetchJobs.pending, (state) => {
        state.isError = false;
        state.isLoading = true;
      })
      .addCase(fetchJobs.fulfilled, (state, action) => {
        state.isLoading = false;
        state.jobs = action.payload;
      })
      .addCase(fetchJobs.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.error = action.error?.message;
        state.jobs = [];
      })

      // ADD-JOB
      .addCase(createJob.pending, (state) => {
        state.isError = false;
        state.isLoading = true;
      })
      .addCase(createJob.fulfilled, (state, action) => {
        state.isLoading = false;

        state.jobs.push(action.payload);
      })
      .addCase(createJob.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.error = action.error?.message;
      })

      // EDIT-JOB
      .addCase(editJob.pending, (state) => {
        state.isError = false;
        state.isLoading = true;
      })
      .addCase(editJob.fulfilled, (state, action) => {
        state.isLoading = false;

        const ifIdMatched = state.jobs.findIndex(
          (jobId) => jobId.id === action.payload.id
        );

        state.jobs[ifIdMatched] = action.payload;
      })
      .addCase(editJob.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.error = action.error?.message;
      })

      // DELETE-JOB
      .addCase(removeJob.pending, (state) => {
        state.isError = false;
        state.isLoading = true;
      })
      .addCase(removeJob.fulfilled, (state, action) => {
        // console.log(action)
        state.isError = false;
        state.isLoading = false;

        state.jobs = state.jobs.filter((job) => job.id !== action.meta.arg);
      })
      .addCase(removeJob.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.error = action.error?.message;
      });
  },
});

export default jobsSlice.reducer;
export const { editForm, filterJobs, searchJobs, searchJobsBySalaryValue } =
  jobsSlice.actions;
