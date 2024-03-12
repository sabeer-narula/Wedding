import React, { useEffect, useState } from 'react';
import Header from './Header';
import { auth, firestore } from '../firebase';
import { collection, doc, getDocs, setDoc, deleteDoc, updateDoc, onSnapshot } from 'firebase/firestore';

interface Task {
  id: number;
  text: string;
  completed: boolean;
  dueDate: string;
  labels: string[];
  budget: number;
  notes: string;
}

interface Label {
  id: number;
  name: string;
}

const TodoList: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [completedTasks, setCompletedTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState('');
  const [newDueDate, setNewDueDate] = useState('');
  const [labels, setLabels] = useState<Label[]>([]);
  const [newLabel, setNewLabel] = useState('');
  const [selectedLabel, setSelectedLabel] = useState('');
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [filterLabel, setFilterLabel] = useState('');

  useEffect(() => {
    const user = auth.currentUser;
    if (user) {
      const unsubscribe = onSnapshot(collection(firestore, 'users', user.uid, 'tasks'), (snapshot) => {
        const tasksData: Task[] = [];
        snapshot.forEach((doc) => {
          tasksData.push(doc.data() as Task);
        });
        setTasks(tasksData.filter((task) => !task.completed));
        setCompletedTasks(tasksData.filter((task) => task.completed));
      });
  
      // Unsubscribe from the listener when the component unmounts
      return () => unsubscribe();
    }
  }, []);

  const handleAddTask = async () => {
    if (newTask.trim() !== '') {
      const newTaskItem: Task = {
        id: Date.now(),
        text: newTask,
        completed: false,
        dueDate: newDueDate,
        labels: selectedLabel ? [selectedLabel] : [],
        budget: 0,
        notes: '',
      };
      const user = auth.currentUser;
      if (user) {
        await setDoc(doc(firestore, 'users', user.uid, 'tasks', newTaskItem.id.toString()), newTaskItem);
      }
      setNewTask('');
      setNewDueDate('');
      setSelectedLabel('');
    }
  };

  const handleRemoveTask = async (taskId: number) => {
    const user = auth.currentUser;
    if (user) {
      await deleteDoc(doc(firestore, 'users', user.uid, 'tasks', taskId.toString()));
    }
  };

  const handleToggleCompleted = async (taskId: number) => {
    const user = auth.currentUser;
    if (user) {
      const taskRef = doc(firestore, 'users', user.uid, 'tasks', taskId.toString());
      await updateDoc(taskRef, { completed: true });
    }
  };

  const handleAddLabel = () => {
    if (newLabel.trim() !== '') {
      const newLabelItem: Label = {
        id: Date.now(),
        name: newLabel,
      };
      setLabels([...labels, newLabelItem]);
      setNewLabel('');
    }
  };

  const handleOpenModal = (task: Task) => {
    setSelectedTask(task);
  };

  const handleCloseModal = () => {
    setSelectedTask(null);
  };

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilterLabel(e.target.value);
  };

  const filteredTasks = filterLabel
    ? tasks.filter((task) => task.labels.includes(filterLabel))
    : tasks;

  const filteredCompletedTasks = filterLabel
    ? completedTasks.filter((task) => task.labels.includes(filterLabel))
    : completedTasks;

  return (
    <>
    <Header/>
    <div>
      <h2 className="text-2xl font-bold mb-4">Todo List</h2>
      <div className="mb-4">
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Enter a new task"
          className="border border-gray-300 rounded px-2 py-1 mr-2"
        />
        <input
          type="date"
          value={newDueDate}
          onChange={(e) => setNewDueDate(e.target.value)}
          className="border border-gray-300 rounded px-2 py-1 mr-2"
        />
        <select
          value={selectedLabel}
          onChange={(e) => setSelectedLabel(e.target.value)}
          className="border border-gray-300 rounded px-2 py-1 mr-2"
        >
          <option value="">Select a label</option>
          {labels.map((label) => (
            <option key={label.id} value={label.name}>
              {label.name}
            </option>
          ))}
        </select>
        <button
          onClick={handleAddTask}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded"
        >
          Add Task
        </button>
      </div>
      <div className="mb-4">
        <input
          type="text"
          value={newLabel}
          onChange={(e) => setNewLabel(e.target.value)}
          placeholder="Enter a new label"
          className="border border-gray-300 rounded px-2 py-1 mr-2"
        />
        <button
          onClick={handleAddLabel}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded"
        >
          Add Label
        </button>
      </div>
      <h3 className="text-xl font-bold mb-2">Pending Tasks</h3>
      <div className="mb-4">
        <label className="mr-2">Filter by label:</label>
        <select
          value={filterLabel}
          onChange={handleFilterChange}
          className="border border-gray-300 rounded px-2 py-1"
        >
          <option value="">All</option>
          {labels.map((label) => (
            <option key={label.id} value={label.name}>
              {label.name}
            </option>
          ))}
        </select>
      </div>
      <ul>
        {filteredTasks.map((task) => (
          <li key={task.id} className="mb-4">
            <span>{task.text}</span>
            <span> - Due: {task.dueDate}</span>
            {task.labels.map((label) => (
              <span key={label} className="label bg-gray-200 rounded px-2 py-1 ml-2">
                {label}
              </span>
            ))}
            <div className="mt-2">
              <button
                onClick={() => handleOpenModal(task)}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded mr-2"
              >
                See More
              </button>
              <button
                onClick={() => handleToggleCompleted(task.id)}
                className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-2 rounded mr-2"
              >
                Complete
              </button>
              <button
                onClick={() => handleRemoveTask(task.id)}
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
              >
                Remove
              </button>
            </div>
          </li>
        ))}
      </ul>
      <div className="mt-8">
        <h3 className="text-xl font-bold mb-2">Completed Tasks</h3>
        <div className="mb-4">
          <label className="mr-2">Filter by label:</label>
          <select
            value={filterLabel}
            onChange={handleFilterChange}
            className="border border-gray-300 rounded px-2 py-1"
          >
            <option value="">All</option>
            {labels.map((label) => (
              <option key={label.id} value={label.name}>
                {label.name}
              </option>
            ))}
          </select>
        </div>
        <ul>
          {filteredCompletedTasks.map((task) => (
            <li key={task.id} className="mb-4">
              <span>{task.text}</span>
              <span> - Due: {task.dueDate}</span>
              {task.labels.map((label) => (
                <span key={label} className="label bg-gray-200 rounded px-2 py-1 ml-2">
                  {label}
                </span>
              ))}
              <div className="mt-2">
                <button
                  onClick={() => handleOpenModal(task)}
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded"
                >
                  See More
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
      {selectedTask && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded p-4">
            <h3 className="text-xl font-bold mb-2">{selectedTask.text}</h3>
            <p>Due Date: {selectedTask.dueDate}</p>
            <div className="mb-4">
              <label className="block mb-2">Budget:</label>
              <input
                type="number"
                value={selectedTask.budget}
                onChange={(e) =>
                  setSelectedTask({
                    ...selectedTask,
                    budget: Number(e.target.value),
                  })
                }
                className="border border-gray-300 rounded px-2 py-1"
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2">Notes:</label>
              <textarea
                value={selectedTask.notes}
                onChange={(e) =>
                  setSelectedTask({ ...selectedTask, notes: e.target.value })
                }
                className="border border-gray-300 rounded px-2 py-1"
              ></textarea>
            </div>
            <button
              onClick={handleCloseModal}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
    </>
  );
};

export default TodoList;