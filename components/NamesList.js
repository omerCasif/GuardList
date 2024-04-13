import React, { useState } from 'react';
import { FaTrashCan } from "react-icons/fa6";
import { FaArrowUp } from "react-icons/fa";
import { FaArrowDown } from "react-icons/fa";

export default function NamesList({ currentUsername, names, setNames, nameIndex, setNameIndex }) {
  const [newName, setNewName] = useState('');
  const [newLastName, setNewLastName] = useState('');
  const [isAdd, setIsAdd] = useState(false)

  const addName = async () => {
    if (newName.trim() !== '') {
      const updatedNames = [...names, { name: newName, lastName: newLastName, active: true }];
      await updateNamesInDatabase(updatedNames);
      setNames(updatedNames);
      setNewName('');
      setNewLastName('');
    }
    else {
      alert("Name is empty")
    }
  };

  const getNextActiveUser = (index) => {
    for (let i = index + 1; i < names.length; i++) {
      if (names[i].active)
        return i;
    }
    return -1;
  }

  const toggleActive = async (index) => {
    const newNames = [...names];
    if(index != 0){
      newNames[index].active = !newNames[index].active;
      await updateNamesInDatabase(newNames);
      setNames(newNames);
    }
    else{
      const nextActive = getNextActiveUser(0)
      if(nextActive != -1){
        if(newNames.length > 0){
          newNames[index].active = !newNames[index].active;
          if(!newNames[index].active){
            changeListStarter(nextActive)
            await updateNamesInDatabase(newNames);
          }
          else{ // First person is inactive            
            await updateNamesInDatabase(newNames);
            setNames(newNames);
          }
        }
        else{ // Only 1 person in the list
          alert("Must have at least one active member")
        }
      }
      else{ // nextActive == -1
        alert("Must have at least one active member")
      }
    }
  }

  const deleteName = async (index) => {
    const newNames = [...names];
    newNames.splice(index, 1);
    await updateNamesInDatabase(newNames);
    setNames(newNames);
  };

  const shuffleNames = async () => {
    let newNames = [...names];
    for (let i = newNames.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newNames[i], newNames[j]] = [newNames[j], newNames[i]];
    }
    await updateNamesInDatabase(newNames);
    setNames(newNames);
  }

  const MoveUp = async (index) => {
    if (index == 0){
      return
    }
    let newNames = [...names];
    [newNames[index], newNames[index - 1]] = [newNames[index - 1], newNames[index]];    
    await updateNamesInDatabase(newNames);
    setNames(newNames);
  }

  const MoveDown = async (index) => {
    if (index == names.length - 1){
      return
    }
    let newNames = [...names];
    [newNames[index], newNames[index + 1]] = [newNames[index + 1], newNames[index]];    
    await updateNamesInDatabase(newNames);
    setNames(newNames);
  }

  const updateNamesInDatabase = async (updatedNames) => {
    try {
      const requestData = {
        names: updatedNames,
        username: currentUsername
      }
      await fetch('/api/update_names', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData)
      });
    } catch (error) {
      console.error('Error updating names in the database:', error);
    }
  }

  return (
      <div className='flex flex-col'>
            <div className="flex-1/3 mx-4 p-8 overflow-y-auto">
                <div className='flex flex-row'>
                    <h1 className="text-2xl font-bold">Peoples</h1>
                    </div>

                {names.length > 0 && 
                    <table className="leading-normal shadow-md rounded my-6">
                        <thead>
                            <tr>
                                <th className="text-center p-3 bg-gray-700 text-gray-100 font-semibold">
                                    Active
                                </th>                                
                                <th className="text-center p-3 bg-gray-700 text-gray-100 font-semibold">
                                    First Name
                                </th>                           
                                <th className="text-center p-3 bg-gray-700 text-gray-100 font-semibold">
                                    Last Name
                                </th>
                                <th className="text-center p-3 bg-gray-700 text-gray-100 font-semibold">
                                    Operations
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                        {names.map((person, index) => (
                            <tr className={`${!person.active ? 'bg-gray-200' : ''}`}>
                                <td className="text-center border-b border-gray-200">
                                <input
                                    type="checkbox"
                                    checked={person.active}
                                    onChange={() => toggleActive(index)}
                                    className="mx-2"
                                />                            
                                </td>                                
                                <td className="text-center p-3 border-b border-gray-200">
                                    <div className="flex-col flex font-bold">
                                        {person.name}
                                    </div>
                                </td>                           
                                <td className="text-center p-3 border-b border-gray-200">
                                    <div className="flex-col flex font-bold">
                                        {person.lastName}
                                    </div>
                                </td>
                                <td className="text-center p-3 border-b border-gray-200">
                                    <div className="flex-row flex">
                                        <button onClick={() => deleteName(index)}>
                                            <FaTrashCan />
                                        </button>
                                        <button onClick={() => MoveUp(index)}>
                                            <FaArrowUp />
                                        </button>
                                        <button onClick={() => MoveDown(index)}>
                                            <FaArrowDown />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                            
                        </tbody>
                    </table>
                }
                {isAdd &&
                <div>
                    <table>
                        <tr>
                            <td className="text-left">
                                First Name: 
                            </td>
                            <td>
                            <input
                              type="text"
                              value={newName}
                              onChange={(e) => setNewName(e.target.value)}
                              placeholder="Jhon"
                              className="border p-2"
                            />
                            </td>
                        </tr>
                        <tr>
                            <td className="text-left">
                                Last Name: 
                            </td>
                            <td>
                            <input
                              type="text"
                              value={newLastName}
                              onChange={(e) => setNewLastName(e.target.value)}
                              placeholder="Smith"
                              className="border p-2"
                            />
                            </td>
                        </tr>
                    </table>                
                    <button onClick={addName} className="border font-bold rounded py-2 px-4 m-2">
                        Add
                    </button>
                    <button onClick={() => setIsAdd(false)} className="border font-bold rounded py-2 px-4 m-2">
                        Cancel
                    </button>
                </div>
                }
                {!isAdd &&                                 
                    <button onClick={() => setIsAdd(true)} className="border font-bold rounded py-2 px-4 m-2">
                    Add Person
                    </button>
                }
                <button onClick={shuffleNames} className="border font-bold rounded py-2 px-4 m-2">
                    Shuffle Names
                    </button>
            </div>        
        </div>
  );



}
