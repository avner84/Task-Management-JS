const mongoose = require("mongoose");
const Task = require("../models/task");

// Function to create a new task with the provided data
const createNewTask = async (taskData) => {
  try {
    const newTask = new Task(taskData);
    await newTask.save();
    console.log(`Task "${taskData.title}" created successfully`);
    return newTask;
  } catch (error) {
    throw error;
  }
};

// Function to update a task by ID with the provided data
const updateTask = async (taskId, updateData) => {
  try {
    const updatedTask = await Task.findByIdAndUpdate(taskId, updateData, { new: true });
    console.log('updatedTask :', updatedTask);
    if (!updatedTask) {
      throw new Error(`Task with ID ${taskId} not found.`);
    }
    console.log(`Task with ID "${taskId}" has been updated successfully.`);
    return updatedTask;
  } catch (error) {
    throw error;
  }
};

// Function to delete a task by ID
const deleteTask = async (taskId) => {
  try {
    const deletedTask = await Task.findByIdAndDelete(taskId);
    if (!deletedTask) {
      console.log(`Task with ID ${taskId} not found.`);
      return false;
    }
    console.log(`Task with ID "${taskId}" has been deleted successfully.`);
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};

module.exports = { createNewTask, updateTask, deleteTask };
