import { useDispatch, useSelector } from 'react-redux';
import { addTask, resetAddTaskStatus } from '../../redux/features/tasks/tasksSlice';

// Custom hook for adding a task
const useAddTask = () => {
  const dispatch = useDispatch();
  const { addTaskStatus, addTaskError } = useSelector((state) => state.tasks);

  // Function to dispatch addTask action
  const addTaskHandler = (formData) => {
    dispatch(addTask(formData));
  };

  // Function to reset the add task status
  const resetStatus = () => {
    dispatch(resetAddTaskStatus());
  };


  return { addTaskStatus, addTaskError, addTask: addTaskHandler, resetStatus };
};

export default useAddTask;
