import React, { useState } from "react";
import "../styles/Todolist.scss";
import { IoIosAddCircleOutline } from "react-icons/io";
import { BsXCircle } from "react-icons/bs";
import { HiPencilAlt } from "react-icons/hi";
import { MdCheckCircle } from "react-icons/md";

function Todolist() {
    // 1. 예쁘게 꾸미기
    // 2. 삭제
    // 3. 수정
    // 4. 완료한 일정 체크
    // 5. 브라우저를 종료했다가 들어와도 투두리스트 유지되기
    // 6. 일정내에 완료하지 못한 일정 dim처리
    // 7. 덜 끝낸 일정 세모표시

    const [text, setText] = useState("");
    const [todolist, setTodolist] = useState([]);
    const [count, setCount] = useState(0);
    const [editIndex, setEditIndex] = useState(-1);
    const [editText, setEditText] = useState("");

    const textValue = (input) => {
        if (input.key === "Enter") {
            addTodo();
            return;
        }
        setText(input.target.value);
    };

    const addTodo = () => {
        if (text === "") return;
        const newTodolist = [];
        for (let i = 0; i < todolist.length; i++) {
            newTodolist[i] = todolist[i];
        }
        newTodolist[count] = text;
        setCount(count + 1);
        setTodolist(newTodolist);
        setText("");
        setEditIndex(-1);
        setEditText("");
    };

    const tryEdit = (index) => {
        setEditIndex(index);
        setEditText(todolist[index]);
    };

    const removeTodo = (index) => {
        const newTodolist = [];
        let j = 0;
        for (let i = 0; i < todolist.length; i++) {
            if (i === index) continue;
            newTodolist[j] = todolist[i];
            j++;
        }
        setCount(count - 1);
        setTodolist(newTodolist);
        setEditIndex(-1);
        setEditText("");
    };

    const editValue = (input, index) => {
        if (input.key === "Enter") {
            editTodo(index);
            return;
        }
        setEditText(input.target.value);
    };

    const editTodo = (index) => {
        const newTodolist = [];
        for (let i = 0; i < todolist.length; i++) {
            if (i === index) {
                newTodolist[i] = editText;
                continue;
            }
            newTodolist[i] = todolist[i];
        }
        setTodolist(newTodolist);
        setEditIndex(-1);
        setEditText("");
    };

    return (
        <div className="Todolist">
            <div className="Header">
                <input
                    type="text"
                    onKeyUp={textValue}
                    placeholder="What do you have to do?"
                />
                <IoIosAddCircleOutline
                    size={70}
                    color="white"
                    onClick={addTodo}
                />
            </div>
            <div className="Body">
                {todolist.map((value, index) => (
                    <div className="todo" key={index}>
                        {index === editIndex ? (
                            <input
                                className="editInput"
                                onKeyUp={(input) => editValue(input, index)}
                                defaultValue={value}
                            />
                        ) : (
                            value
                        )}
                        <div className="icons">
                            {index === editIndex ? (
                                <MdCheckCircle
                                    onClick={() => editTodo(index)}
                                />
                            ) : (
                                <HiPencilAlt onClick={() => tryEdit(index)} />
                            )}

                            <BsXCircle onClick={() => removeTodo(index)} />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Todolist;
