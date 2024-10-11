"use client";
import React, { useEffect, useState } from "react";
import { Todo } from "../types/todo";
import axios from "axios";

const API_URL = "http://localhost:4000/todos";

const page = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [todoList, setTodoList] = useState<Todo[]>([]);
  const [formData, setFormData] = useState<Todo>({
    id: new Date().getTime() + 1 + "",
    title: "",
    contents: "",
    isDone: false,
  });

  const handleGetTodoList = async () => {
    const res = await axios.get(API_URL);
    const data: Todo[] = res.data;
    setTodoList(data);
    setIsLoading(false);
  };

  useEffect(() => {
    handleGetTodoList();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddTodo = async (formData: Todo) => {
    const res = await axios.post(API_URL, formData);
    await handleGetTodoList();
    return res;
  };

  const handleDeleteTodo = async (id: string) => {
    const res = await axios.delete(`${API_URL}/${id}`);
    await handleGetTodoList();
    return res;
  };

  const handleCompleted = async (id: string) => {
    const res = await axios.patch(`${API_URL}/${id}`, {
      ...formData,
      isDone: !formData.isDone,
    });
    await handleGetTodoList();
    return res;
  };

  if (isLoading) return <div>로딩중...</div>;
  return (
    <div>
      <h1>My TodoList</h1>
      {/* 투두리스트 추가 영역 */}
      <div className="flex flex-row">
        <input
          className="border-2"
          type="text"
          name="title"
          value={formData.title}
          onChange={(e) => handleChange(e)}
        />
        <input
          className="border-2"
          type="text"
          name="contents"
          value={formData.contents}
          onChange={(e) => handleChange(e)}
        />
        <button onClick={() => handleAddTodo(formData)}>추가</button>
      </div>
      <div className="flex flex-col gap-2">
        <h1>In Progress</h1>
        <div>
          {/* 투두리스트 isDone false 영역 */}
          {todoList
            .filter((todo) => todo.isDone === false)
            .map((todo) => (
              <div key={todo.id} className="flex flex-col">
                <div>제목:{todo.title}</div>
                <div>내용:{todo.contents}</div>
                <div>
                  <button onClick={() => handleDeleteTodo(todo.id)}>
                    삭제
                  </button>
                  <button onClick={() => handleCompleted(todo.id)}>완료</button>
                </div>
              </div>
            ))}
        </div>
        {/* 투두리스트 isDone true 영역 */}
        <div>
          <h1>Completed</h1>
          {todoList
            .filter((todo) => todo.isDone === true)
            .map((todo) => (
              <div key={todo.id} className="flex flex-col">
                <div>제목:{todo.title}</div>
                <div>내용:{todo.contents}</div>
                <div>
                  <button onClick={() => handleDeleteTodo(todo.id)}>
                    삭제
                  </button>
                  <button onClick={() => handleCompleted(todo.id)}>취소</button>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default page;
