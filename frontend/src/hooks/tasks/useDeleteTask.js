import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { deleteTask, resetDeleteTaskStatus } from '../../redux/features/tasks/tasksSlice';

// Custom hook for deleting a task
const useDeleteTask = () => {
  const dispatch = useDispatch();
  const { deleteTaskStatus, deleteTaskError } = useSelector((state) => state.tasks);

  // Function to dispatch deleteTask action
  const deleteTaskHandler = (id) => {
    dispatch(deleteTask(id));
  };

  useEffect(() => {
    // Reset the delete task status after a successful deletion
    if (deleteTaskStatus === 'succeeded') {
      dispatch(resetDeleteTaskStatus());
    }
  }, [deleteTaskStatus, dispatch]);

  // Function to reset the delete task status and error
  const resetStatus = () => {
    if (deleteTaskError !== null) {
      dispatch(resetDeleteTaskStatus());
    }
  };

  
  return { deleteTaskStatus, deleteTaskError, deleteTask: deleteTaskHandler, resetStatus };
};

export default useDeleteTask;
