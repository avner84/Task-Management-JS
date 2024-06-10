import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { updateTask, resetUpdateTaskStatus } from '../../redux/features/tasks/tasksSlice';

// Custom hook for updating a task
const useUpdateTask = () => {
  const dispatch = useDispatch();
  const { updateTaskStatus, updateTaskError } = useSelector((state) => state.tasks);

  // Function to dispatch updateTask action
  const updateTaskHandler = (taskId, updateData) => {
    dispatch(updateTask({ taskId, updateData }));
  };

  useEffect(() => {
    // Reset the update task status after a successful update
    if (updateTaskStatus === 'succeeded') {
      dispatch(resetUpdateTaskStatus());
    }
  }, [updateTaskStatus, dispatch]);

  // Function to reset the update task status and error
  const resetStatus = () => {
    if (updateTaskError !== null) {
      dispatch(resetUpdateTaskStatus());
    }
  };

 
  return { updateTaskStatus, updateTaskError, updateTask: updateTaskHandler, resetStatus };
};

export default useUpdateTask;
